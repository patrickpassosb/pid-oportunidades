"""
Serviço de cenário de descarbonização.

Gera cenários dinâmicos baseados em dados reais de geração (ANEEL),
irradiação solar (NASA POWER) e modelo paramétrico de custos.
"""

import logging
from app.services.data_loader import load_processed_json

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constantes do modelo paramétrico (centralizadas, não espalhadas)
# ---------------------------------------------------------------------------
COST_MODEL = {
    "solar-distribuida": {
        "name": "Usinas solares distribuídas",
        "cost_per_mw": 4_500_000,  # R$/MW instalado
        "share_of_replacement": 0.45,  # 45% da capacidade fóssil substituída
        "timeline_min": 2,
        "timeline_max": 4,
        "impact": "Alto",
        "cost_level": "Médio",
        "description": (
            "Implantação de usinas solares fotovoltaicas de médio e grande "
            "porte próximas aos centros de carga, reduzindo a dependência "
            "de geração térmica."
        ),
    },
    "baterias": {
        "name": "Armazenamento com baterias",
        "cost_per_mwh": 1_800_000,  # R$/MWh de armazenamento
        "hours_storage": 4,  # horas de armazenamento
        "share_of_solar": 0.30,  # 30% da capacidade solar precisa de bateria
        "timeline_min": 3,
        "timeline_max": 5,
        "impact": "Médio",
        "cost_level": "Alto",
        "description": (
            "Sistemas de armazenamento de energia (BESS) para firmar a "
            "geração solar e atender picos de demanda noturna."
        ),
    },
    "modernizacao-rede": {
        "name": "Modernização da rede",
        "cost_per_mw_served": 500_000,  # R$/MW de carga servida
        "share_of_total": 0.25,  # % do investimento total
        "timeline_min": 5,
        "timeline_max": 8,
        "impact": "Alto",
        "cost_level": "Alto",
        "description": (
            "Reforço e digitalização da infraestrutura de transmissão e "
            "distribuição para absorver novas fontes renováveis e reduzir "
            "perdas."
        ),
    },
    "eficiencia-publica": {
        "name": "Eficiência energética em cargas públicas",
        "fixed_cost": 30_000_000,  # R$ fixo para o estado
        "timeline_min": 1,
        "timeline_max": 2,
        "impact": "Médio",
        "cost_level": "Baixo",
        "description": (
            "Substituição de luminárias, eficientização de prédios públicos "
            "e gestão inteligente da demanda."
        ),
    },
}

# Fator de emissão médio para geração fóssil em Roraima (tCO2/MWh)
EMISSION_FACTOR_TCO2_PER_MWH = 0.65
# Horas de operação por ano para térmica
THERMAL_HOURS_PER_YEAR = 6500


def build_scenario(state: str = "roraima") -> dict:
    """
    Constrói cenário de descarbonização baseado em dados reais.
    """
    aneel = load_processed_json("aneel_siga_roraima.json", max_age_hours=0)
    solar = load_processed_json("nasa_solar_roraima.json", max_age_hours=0)

    # Dados de geração real
    if aneel and aneel.get("total_empreendimentos", 0) > 0:
        fossil_mw = aneel.get("fossil_mw", 0)
        renewable_mw = aneel.get("renewable_mw", 0)
        total_mw = aneel.get("total_capacidade_mw", 0)
        fossil_share = aneel.get("fossil_share", 0)
        gen_quality = "real"
    else:
        # Fallback baseado em dados públicos conhecidos sobre Roraima
        fossil_mw = 350  # ~350 MW térmico estimado
        renewable_mw = 15  # pequena capacidade solar/hidro existente
        total_mw = 365
        fossil_share = 96
        gen_quality = "estimated"

    # GHI médio de Roraima
    avg_ghi = 5.0
    if solar:
        ghis = [m.get("ghi_annual_kwh_m2_day", 5.0)
                for m in solar.get("municipios", [])
                if m.get("ghi_annual_kwh_m2_day")]
        if ghis:
            avg_ghi = sum(ghis) / len(ghis)

    # --- Calcular alavancas ---
    levers = []

    # 1. Solar distribuída
    solar_capacity_mw = fossil_mw * COST_MODEL["solar-distribuida"]["share_of_replacement"]
    solar_investment = int(solar_capacity_mw * COST_MODEL["solar-distribuida"]["cost_per_mw"])
    levers.append({
        "id": "solar-distribuida",
        "name": COST_MODEL["solar-distribuida"]["name"],
        "impact": COST_MODEL["solar-distribuida"]["impact"],
        "cost": COST_MODEL["solar-distribuida"]["cost_level"],
        "timeline": f"{COST_MODEL['solar-distribuida']['timeline_min']} a {COST_MODEL['solar-distribuida']['timeline_max']} anos",
        "timelineMinYears": COST_MODEL["solar-distribuida"]["timeline_min"],
        "timelineMaxYears": COST_MODEL["solar-distribuida"]["timeline_max"],
        "estimatedInvestment": solar_investment,
        "estimatedInvestmentFormatted": _format_brl(solar_investment),
        "description": COST_MODEL["solar-distribuida"]["description"],
    })

    # 2. Baterias
    battery_mw = solar_capacity_mw * COST_MODEL["baterias"]["share_of_solar"]
    battery_mwh = battery_mw * COST_MODEL["baterias"]["hours_storage"]
    battery_investment = int(battery_mwh * COST_MODEL["baterias"]["cost_per_mwh"])
    levers.append({
        "id": "baterias",
        "name": COST_MODEL["baterias"]["name"],
        "impact": COST_MODEL["baterias"]["impact"],
        "cost": COST_MODEL["baterias"]["cost_level"],
        "timeline": f"{COST_MODEL['baterias']['timeline_min']} a {COST_MODEL['baterias']['timeline_max']} anos",
        "timelineMinYears": COST_MODEL["baterias"]["timeline_min"],
        "timelineMaxYears": COST_MODEL["baterias"]["timeline_max"],
        "estimatedInvestment": battery_investment,
        "estimatedInvestmentFormatted": _format_brl(battery_investment),
        "description": COST_MODEL["baterias"]["description"],
    })

    # 3. Modernização da rede
    grid_investment = int((solar_investment + battery_investment) * COST_MODEL["modernizacao-rede"]["share_of_total"])
    levers.append({
        "id": "modernizacao-rede",
        "name": COST_MODEL["modernizacao-rede"]["name"],
        "impact": COST_MODEL["modernizacao-rede"]["impact"],
        "cost": COST_MODEL["modernizacao-rede"]["cost_level"],
        "timeline": f"{COST_MODEL['modernizacao-rede']['timeline_min']} a {COST_MODEL['modernizacao-rede']['timeline_max']} anos",
        "timelineMinYears": COST_MODEL["modernizacao-rede"]["timeline_min"],
        "timelineMaxYears": COST_MODEL["modernizacao-rede"]["timeline_max"],
        "estimatedInvestment": grid_investment,
        "estimatedInvestmentFormatted": _format_brl(grid_investment),
        "description": COST_MODEL["modernizacao-rede"]["description"],
    })

    # 4. Eficiência energética
    efficiency_investment = COST_MODEL["eficiencia-publica"]["fixed_cost"]
    levers.append({
        "id": "eficiencia-publica",
        "name": COST_MODEL["eficiencia-publica"]["name"],
        "impact": COST_MODEL["eficiencia-publica"]["impact"],
        "cost": COST_MODEL["eficiencia-publica"]["cost_level"],
        "timeline": f"{COST_MODEL['eficiencia-publica']['timeline_min']} a {COST_MODEL['eficiencia-publica']['timeline_max']} anos",
        "timelineMinYears": COST_MODEL["eficiencia-publica"]["timeline_min"],
        "timelineMaxYears": COST_MODEL["eficiencia-publica"]["timeline_max"],
        "estimatedInvestment": efficiency_investment,
        "estimatedInvestmentFormatted": _format_brl(efficiency_investment),
        "description": COST_MODEL["eficiencia-publica"]["description"],
    })

    total_investment = solar_investment + battery_investment + grid_investment + efficiency_investment

    # Emissões evitáveis
    # geração fóssil anual (MWh) × fator de emissão
    fossil_gen_mwh = fossil_mw * THERMAL_HOURS_PER_YEAR
    # Substituindo ~45% da capacidade fóssil por solar
    avoided_emissions = int(fossil_gen_mwh * 0.45 * EMISSION_FACTOR_TCO2_PER_MWH)

    return {
        "state": "Roraima",
        "sector": "Energia",
        "objective": "Reduzir dependência de geração fóssil e expandir renováveis",
        "baselineProblem": (
            f"Roraima depende de {fossil_share:.0f}% de geração térmica fóssil "
            f"({fossil_mw:.0f} MW) devido à isolação do sistema elétrico nacional, "
            f"com alto custo e emissões. A capacidade renovável atual é de apenas "
            f"{renewable_mw:.0f} MW."
        ),
        "estimatedInvestment": total_investment,
        "estimatedInvestmentFormatted": _format_brl(total_investment),
        "estimatedTimeline": "6 a 8 anos",
        "timelineMinYears": 6,
        "timelineMaxYears": 8,
        "avoidedEmissions": avoided_emissions,
        "avoidedEmissionsFormatted": _format_emissions(avoided_emissions),
        "priorityProjects": [l["name"] for l in levers],
        "levers": levers,
        "dataQuality": {
            "generationData": gen_quality,
            "solarRadiation": "real" if solar else "estimated",
            "costModel": "estimated",
            "overallConfidence": "high" if gen_quality == "real" else "medium",
        },
        "sources": _build_sources(aneel, solar),
    }


def _format_brl(value: int) -> str:
    if value >= 1_000_000_000:
        return f"R$ {value / 1_000_000_000:,.1f} bilhões"
    elif value >= 1_000_000:
        v = value / 1_000_000
        return f"R$ {v:,.0f} milhões" if v == int(v) else f"R$ {v:,.1f} milhões"
    elif value >= 1_000:
        return f"R$ {value / 1_000:,.0f} mil"
    return f"R$ {value:,.0f}"


def _format_emissions(value: int) -> str:
    if value >= 1_000_000:
        return f"{value / 1_000_000:,.1f} milhões tCO₂/ano"
    elif value >= 1_000:
        return f"{value / 1_000:,.0f} mil tCO₂/ano"
    return f"{value:,} tCO₂/ano"


def _build_sources(aneel, solar) -> list[dict]:
    sources = []
    if aneel:
        sources.append({
            "name": "ANEEL Dados Abertos / SIGA",
            "use": "Geração elétrica e capacidade instalada",
            "dataQuality": aneel.get("dataQuality", "fallback"),
        })
    if solar:
        sources.append({
            "name": "NASA POWER",
            "use": "Irradiação solar (GHI)",
            "dataQuality": solar.get("dataQuality", "fallback"),
        })
    sources.append({
        "name": "Modelo paramétrico PID",
        "use": "Custos de referência e timeline",
        "dataQuality": "estimated",
    })
    return sources
