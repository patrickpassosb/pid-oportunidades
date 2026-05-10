"""
Motor de scoring multicritério para regiões de investimento.

Calcula scores determinísticos e explicáveis a partir de dados reais
(IBGE, ANEEL, NASA POWER, FUNAI/ICMBio).

Modelo:
  score_final = demand * 0.30 + infrastructure * 0.25 +
                decarbonization * 0.20 + restriction * 0.15 + economic * 0.10
"""

import logging
from typing import Optional

from app.services.data_loader import load_processed_json

logger = logging.getLogger(__name__)

# Pesos do modelo
WEIGHTS = {
    "demand": 0.30,
    "infrastructure": 0.25,
    "decarbonization": 0.20,
    "restriction": 0.15,
    "economic": 0.10,
}

# Referências de custo (R$/kWp instalado para solar)
SOLAR_COST_PER_KWP = 2_500  # R$/kWp — referência projetos 5-10 MW em Roraima
SOLAR_CAPACITY_FACTOR = 0.20  # Fator de capacidade solar em Roraima (irradiação favorável)
TARIFF_RR = 0.90  # R$/kWh — tarifa média alta em Roraima (sistema isolado)
EMISSION_FACTOR = 0.65  # tCO2/MWh — fator de emissão da geração fóssil em RR


def compute_all_region_scores() -> list[dict]:
    """
    Calcula scores para todas as regiões-chave de Roraima usando dados reais.
    Retorna lista de regiões rankeadas por score.
    """
    ibge_data = load_processed_json("ibge_municipios_roraima.json", max_age_hours=0)
    aneel_data = load_processed_json("aneel_siga_roraima.json", max_age_hours=0)
    solar_data = load_processed_json("nasa_solar_roraima.json", max_age_hours=0)
    restrictions_data = load_processed_json("restrictions_roraima.json", max_age_hours=0)

    if not ibge_data:
        logger.warning("Scoring: sem dados IBGE, usando fallback")
        return _fallback_regions()

    municipios = ibge_data.get("municipios", [])
    solar_by_mun = _index_solar(solar_data)
    restriction_info = _process_restriction_context(restrictions_data)
    aneel_info = _process_aneel_context(aneel_data)

    scored_regions = []
    for mun in municipios:
        nome = mun["nome"]
        solar = solar_by_mun.get(nome, {})

        scores = {
            "demand": _compute_demand_score(mun),
            "infrastructure": _compute_infrastructure_score(mun, aneel_info),
            "decarbonization": _compute_decarbonization_score(solar, aneel_info),
            "restriction": _compute_restriction_score(mun, restriction_info),
            "economic": _compute_economic_score(mun, solar),
        }

        final = sum(scores[k] * WEIGHTS[k] for k in WEIGHTS)
        final = round(final, 1)

        # Calcular payback e investimento para projeto solar de 5 MW
        ghi = solar.get("ghi_annual_kwh_m2_day", 5.0)
        project_mw = _recommend_project_size(mun)
        investment = _estimate_investment(project_mw)
        payback = _estimate_payback(project_mw, ghi)
        co2_avoided = _estimate_co2_avoided(project_mw, ghi)

        risk = _classify_risk(scores["restriction"])
        recommendation = _generate_recommendation(final, risk)

        scored_regions.append({
            "id": _slugify(nome),
            "name": nome,
            "score": final,
            "project": f"Usina solar fotovoltaica de {project_mw} MW",
            "estimatedInvestment": investment,
            "estimatedInvestmentFormatted": _format_brl(investment),
            "payback": payback,
            "risk": risk,
            "contributionToPlan": _classify_contribution(final),
            "recommendation": recommendation,
            "explanation": _generate_explanation(scores, mun, solar),
            "scoreBreakdown": {
                "demand": round(scores["demand"], 1),
                "infrastructure": round(scores["infrastructure"], 1),
                "decarbonization": round(scores["decarbonization"], 1),
                "restriction": round(scores["restriction"], 1),
                "economic": round(scores["economic"], 1),
            },
            "dataQuality": {
                "demand": "real" if mun.get("populacao", 0) > 0 else "fallback",
                "infrastructure": "real" if aneel_info.get("has_data") else "estimated",
                "decarbonization": solar.get("dataQuality", "estimated"),
                "restriction": restriction_info.get("dataQuality", "partial"),
                "economic": "estimated",
            },
        })

    # Rankear por score
    scored_regions.sort(key=lambda r: r["score"], reverse=True)
    return scored_regions


# ===================================================================
# Sub-scores
# ===================================================================

def _compute_demand_score(mun: dict) -> float:
    """Score baseado em população e PIB — proxy de demanda energética."""
    return min(mun.get("demandProxyScore", 50), 100)


def _compute_infrastructure_score(mun: dict, aneel: dict) -> float:
    """Score baseado em presença de infraestrutura elétrica na região."""
    base = 50  # score base
    # Municípios com mais infraestrutura existente recebem bonus
    if aneel.get("has_data"):
        total_mw = aneel.get("total_mw", 0)
        if total_mw > 100:
            base += 20  # Infraestrutura significativa existente
        elif total_mw > 10:
            base += 10
    # Capital (Boa Vista) tem melhor infraestrutura
    if mun["nome"] == "Boa Vista":
        base += 25
    elif mun.get("populacao", 0) > 10000:
        base += 10
    return min(base, 100)


def _compute_decarbonization_score(solar: dict, aneel: dict) -> float:
    """Score baseado em potencial de descarbonização (GHI + % fóssil)."""
    ghi = solar.get("ghi_annual_kwh_m2_day", 4.5)
    # GHI normalizado (4.0-6.0 → 0-100)
    ghi_score = min(max((ghi - 4.0) / 2.0 * 100, 0), 100)

    # Bonus se região tem alta dependência fóssil
    fossil_share = aneel.get("fossil_share", 80)
    fossil_bonus = min(fossil_share / 100 * 30, 30)

    return min(ghi_score + fossil_bonus, 100)


def _compute_restriction_score(mun: dict, restrictions: dict) -> float:
    """Score INVERSO — quanto maior o risco, MENOR o score."""
    base = 75  # score base otimista

    ti_count = restrictions.get("ti_count", 0)
    uc_count = restrictions.get("uc_count", 0)

    # Municípios em áreas com muitas TIs/UCs recebem penalidade
    # Roraima tem alta concentração de TIs — penalizar proporcionalmente
    if ti_count > 10:
        base -= 30
    elif ti_count > 5:
        base -= 15

    if uc_count > 5:
        base -= 15
    elif uc_count > 2:
        base -= 8

    # Municípios específicos com risco conhecido
    nome = mun.get("nome", "")
    HIGH_RISK = ["Pacaraima", "Uiramutã", "Normandia", "Amajari"]
    MEDIUM_RISK = ["Alto Alegre", "Bonfim"]

    if nome in HIGH_RISK:
        base -= 25  # Forte presença de TIs
    elif nome in MEDIUM_RISK:
        base -= 10

    return max(base, 10)


def _compute_economic_score(mun: dict, solar: dict) -> float:
    """Score econômico baseado em payback estimado."""
    ghi = solar.get("ghi_annual_kwh_m2_day", 5.0)
    payback = _estimate_payback(5, ghi)  # referência 5 MW

    # Payback normalizado (5-12 anos → 100-0)
    if payback <= 5:
        return 100
    elif payback >= 12:
        return 20
    else:
        return round(100 - (payback - 5) / 7 * 80, 1)


# ===================================================================
# Cálculos financeiros
# ===================================================================

def _recommend_project_size(mun: dict) -> int:
    """Tamanho recomendado de projeto solar em MW."""
    pop = mun.get("populacao", 0)
    if pop > 100000:
        return 10
    elif pop > 30000:
        return 5
    elif pop > 10000:
        return 3
    else:
        return 1


def _estimate_investment(project_mw: int) -> int:
    """Investimento estimado para projeto solar."""
    kwp = project_mw * 1000
    return int(kwp * SOLAR_COST_PER_KWP)


def _estimate_payback(project_mw: int, ghi: float) -> float:
    """Payback em anos para projeto solar."""
    kwp = project_mw * 1000
    investment = kwp * SOLAR_COST_PER_KWP
    # Geração anual estimada (kWh)
    annual_kwh = kwp * ghi * 365 * SOLAR_CAPACITY_FACTOR
    annual_revenue = annual_kwh * TARIFF_RR
    if annual_revenue <= 0:
        return 99.0
    return round(investment / annual_revenue, 1)


def _estimate_co2_avoided(project_mw: int, ghi: float) -> float:
    """tCO2/ano evitadas pelo projeto solar."""
    kwp = project_mw * 1000
    annual_mwh = kwp * ghi * 365 * SOLAR_CAPACITY_FACTOR / 1000
    return round(annual_mwh * EMISSION_FACTOR, 0)


# ===================================================================
# Helpers
# ===================================================================

def _index_solar(solar_data: Optional[dict]) -> dict:
    if not solar_data:
        return {}
    return {m["municipio"]: m for m in solar_data.get("municipios", [])}


def _process_restriction_context(rest_data: Optional[dict]) -> dict:
    if not rest_data:
        return {"ti_count": 0, "uc_count": 0, "dataQuality": "partial"}
    layers = rest_data.get("layers", [])
    ti = next((l for l in layers if l["id"] == "terras-indigenas"), {})
    uc = next((l for l in layers if l["id"] == "unidades-conservacao"), {})
    return {
        "ti_count": ti.get("count") or 0,
        "uc_count": uc.get("count") or 0,
        "dataQuality": rest_data.get("dataQuality", "partial"),
    }


def _process_aneel_context(aneel_data: Optional[dict]) -> dict:
    if not aneel_data:
        return {"has_data": False, "total_mw": 0, "fossil_share": 80}
    return {
        "has_data": aneel_data.get("total_empreendimentos", 0) > 0,
        "total_mw": aneel_data.get("total_capacidade_mw", 0),
        "fossil_share": aneel_data.get("fossil_share", 80),
        "fossil_mw": aneel_data.get("fossil_mw", 0),
        "renewable_mw": aneel_data.get("renewable_mw", 0),
    }


def _classify_risk(restriction_score: float) -> str:
    if restriction_score >= 60:
        return "Baixo"
    elif restriction_score >= 35:
        return "Médio"
    else:
        return "Alto"


def _classify_contribution(score: float) -> str:
    if score >= 65:
        return "Alta"
    elif score >= 45:
        return "Média"
    else:
        return "Baixa"


def _generate_recommendation(score: float, risk: str) -> str:
    if score >= 70 and risk != "Alto":
        return "Avançar para estudo técnico"
    elif score >= 55:
        return "Avaliar conexão e logística"
    elif score >= 40:
        return "Requer análise detalhada"
    else:
        return "Evitar prospecção inicial sem due diligence"


def _generate_explanation(scores: dict, mun: dict, solar: dict) -> str:
    parts = []
    if scores["demand"] > 70:
        parts.append("Alta relevância de demanda regional")
    elif scores["demand"] > 40:
        parts.append("Demanda regional moderada")

    ghi = solar.get("ghi_annual_kwh_m2_day", 0)
    if ghi > 5.0:
        parts.append(f"Boa irradiação solar ({ghi:.1f} kWh/m²/dia)")
    elif ghi > 4.0:
        parts.append(f"Irradiação solar adequada ({ghi:.1f} kWh/m²/dia)")

    if scores["restriction"] < 40:
        parts.append("Risco socioambiental alto — requer due diligence")
    elif scores["restriction"] < 60:
        parts.append("Risco socioambiental moderado")

    if not parts:
        parts.append("Avaliação preliminar com base em dados disponíveis")

    return ". ".join(parts) + "."


def _slugify(text: str) -> str:
    import re
    import unicodedata
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[-\s]+", "-", text).strip("-")


def _format_brl(value: int) -> str:
    if value >= 1_000_000_000:
        return f"R$ {value / 1_000_000_000:,.1f} bilhões"
    elif value >= 1_000_000:
        return f"R$ {value / 1_000_000:,.1f} milhões"
    elif value >= 1_000:
        return f"R$ {value / 1_000:,.0f} mil"
    return f"R$ {value:,.0f}"


def _fallback_regions() -> list[dict]:
    """Regiões fallback mínimas quando não há dados."""
    return [
        {
            "id": "boa-vista",
            "name": "Boa Vista",
            "score": 70,
            "project": "Usina solar fotovoltaica de 5 MW",
            "estimatedInvestment": 22_500_000,
            "estimatedInvestmentFormatted": "R$ 22,5 milhões",
            "payback": 7.0,
            "risk": "Médio",
            "contributionToPlan": "Alta",
            "recommendation": "Avançar para estudo técnico",
            "explanation": "Capital do estado com maior demanda. Dados detalhados indisponíveis.",
            "scoreBreakdown": {"demand": 100, "infrastructure": 75, "decarbonization": 70, "restriction": 50, "economic": 65},
            "dataQuality": {"demand": "fallback", "infrastructure": "fallback", "decarbonization": "fallback", "restriction": "fallback", "economic": "fallback"},
        }
    ]
