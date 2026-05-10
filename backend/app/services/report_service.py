"""
Serviço de relatório executivo dinâmico.

Combina dados do cenário, regiões e restrições para gerar
um relatório executivo consolidado com dados reais.
"""

import logging
from app.services.scenario_service import build_scenario
from app.services.scoring_service import compute_all_region_scores
from app.services.data_loader import load_processed_json

logger = logging.getLogger(__name__)


def build_report(state: str = "roraima") -> dict:
    """Gera relatório executivo consolidado a partir dos dados reais."""
    scenario = build_scenario(state)
    regions = compute_all_region_scores()
    restrictions = load_processed_json("restrictions_roraima.json", max_age_hours=0)

    # Região prioritária (melhor score)
    best_region = regions[0] if regions else None

    # Riscos do relatório
    risks = _build_risks(restrictions)

    # Executive summary dinâmico
    summary = _build_executive_summary(scenario, best_region)

    return {
        "title": "Plano Preliminar de Descarbonização",
        "subtitle": f"Setor de {scenario['sector']} — Estado de {scenario['state']}",
        "executiveSummary": summary,
        "estimatedInvestment": scenario["estimatedInvestment"],
        "estimatedInvestmentFormatted": scenario["estimatedInvestmentFormatted"],
        "estimatedTimeline": scenario["estimatedTimeline"],
        "timelineMinYears": scenario["timelineMinYears"],
        "timelineMaxYears": scenario["timelineMaxYears"],
        "avoidedEmissions": scenario["avoidedEmissions"],
        "avoidedEmissionsFormatted": scenario["avoidedEmissionsFormatted"],
        "priorityRegion": {
            "id": best_region["id"],
            "name": best_region["name"],
            "score": best_region["score"],
            "recommendation": best_region["recommendation"],
        } if best_region else None,
        "levers": [
            {
                "id": l["id"],
                "name": l["name"],
                "impact": l["impact"],
                "cost": l["cost"],
                "timeline": l["timeline"],
                "estimatedInvestment": l["estimatedInvestment"],
                "estimatedInvestmentFormatted": l["estimatedInvestmentFormatted"],
            }
            for l in scenario["levers"]
        ],
        "risks": risks,
        "nextSteps": [
            f"Executar due diligence territorial em {best_region['name']}" if best_region else "Identificar regiões prioritárias",
            "Solicitar estudo de conexão à concessionária local",
            "Validar CAPEX com fornecedores e EPCs locais",
            "Iniciar triagem jurídica e ambiental especializada",
            f"Elaborar estudo técnico detalhado para {best_region['name']}" if best_region else "Elaborar estudos técnicos",
        ],
        "dataQuality": scenario.get("dataQuality", {}),
        "sources": scenario.get("sources", []),
    }


def _build_executive_summary(scenario: dict, best_region: dict | None) -> str:
    """Gera sumário executivo textual dinâmico."""
    parts = [
        f"Roraima apresenta dependência crítica de geração térmica fóssil "
        f"devido à isolação do SIN.",
        f"A trajetória preliminar de descarbonização envolve {len(scenario['levers'])} "
        f"alavancas principais: {', '.join(l['name'].lower() for l in scenario['levers'])}.",
        f"O investimento estimado é de {scenario['estimatedInvestmentFormatted']}, "
        f"com prazo de {scenario['estimatedTimeline']} e potencial de evitar "
        f"{scenario['avoidedEmissionsFormatted']}.",
    ]
    if best_region:
        parts.append(
            f"A região prioritária identificada é {best_region['name']} "
            f"(score {best_region['score']}/100)."
        )
    return " ".join(parts)


def _build_risks(restrictions: dict | None) -> list[dict]:
    """Extrai riscos a partir das restrições processadas."""
    risks = []

    if restrictions:
        for layer in restrictions.get("layers", []):
            if layer.get("severity") == "critical":
                risks.append({
                    "id": layer["id"],
                    "name": layer["name"],
                    "severity": "critical",
                    "description": layer.get("description", ""),
                })

    # Riscos operacionais sempre presentes
    risks.extend([
        {
            "id": "custo-conexao",
            "name": "Custo de conexão elétrica",
            "severity": "attention",
            "description": "Distância da rede pode elevar CAPEX em regiões mais remotas.",
        },
        {
            "id": "validacao-fundiaria",
            "name": "Validação fundiária",
            "severity": "attention",
            "description": "Due diligence de titularidade e posse necessária antes de investimentos.",
        },
    ])

    return risks
