"""
Service layer para dados de descarbonização — versão com DADOS REAIS.

Este service consome dados processados de APIs públicas (IBGE, ANEEL,
NASA POWER, FUNAI/ICMBio) e calcula resultados dinamicamente usando
o scoring engine e o modelo paramétrico de custos.

Cada resposta inclui metadados de dataQuality e fontes utilizadas.
"""

import logging
from typing import Optional

from app.services.scenario_service import build_scenario
from app.services.scoring_service import compute_all_region_scores
from app.services.report_service import build_report
from app.services.data_loader import load_processed_json
from app.services.ingestion_service import ingest_all

logger = logging.getLogger(__name__)

# Mapeamento de estados suportados (por slug normalizado).
_SUPPORTED_STATES = {"roraima"}


def _normalize_state(state: str) -> str:
    """Normaliza o slug do estado para minúsculas sem acentos."""
    return state.strip().lower()


def ensure_data_available():
    """
    Garante que os dados processados existam.
    Se não existirem, roda a ingestão.
    """
    ibge = load_processed_json("ibge_municipios_roraima.json", max_age_hours=24)
    if ibge is None:
        logger.info("Dados não encontrados no cache — rodando ingestão inicial…")
        ingest_all()


def get_scenario(state: str) -> Optional[dict]:
    """
    Retorna o cenário de descarbonização com dados reais.
    Usa dados de geração da ANEEL e irradiação solar da NASA.
    """
    slug = _normalize_state(state)
    if slug != "roraima":
        return None
    ensure_data_available()
    return build_scenario(slug)


def get_regions(state: str) -> Optional[dict]:
    """
    Retorna regiões prioritárias calculadas dinamicamente pelo scoring engine.
    Scores baseados em dados reais de população, energia e restrições.
    """
    slug = _normalize_state(state)
    if slug != "roraima":
        return None
    ensure_data_available()
    regions = compute_all_region_scores()
    return {
        "state": "Roraima",
        "sector": "Energia",
        "regions": regions,
    }


def get_restrictions(state: str) -> Optional[dict]:
    """
    Retorna camadas de restrição com dados reais da FUNAI e ICMBio.
    """
    slug = _normalize_state(state)
    if slug != "roraima":
        return None
    ensure_data_available()

    data = load_processed_json("restrictions_roraima.json", max_age_hours=0)
    if data:
        # Formatar para contrato do frontend
        formatted_layers = []
        for layer in data.get("layers", []):
            formatted_layers.append({
                "id": layer["id"],
                "name": layer["name"],
                "type": layer.get("type", ""),
                "severity": layer.get("severity", "attention"),
                "description": layer.get("description", ""),
                "dataQuality": layer.get("dataQuality", "partial"),
                "source": layer.get("source", ""),
                "count": layer.get("count"),
            })
        return {
            "state": "Roraima",
            "disclaimer": data.get("disclaimer", ""),
            "dataQuality": data.get("dataQuality", "partial"),
            "layers": formatted_layers,
        }

    # Fallback mínimo
    return {
        "state": "Roraima",
        "disclaimer": (
            "A análise é preliminar e não substitui licenciamento ambiental, "
            "consulta adequada ou análise jurídica especializada."
        ),
        "dataQuality": "fallback",
        "layers": [
            {
                "id": "terras-indigenas",
                "name": "Terras indígenas",
                "type": "territorial",
                "severity": "critical",
                "description": "Dados indisponíveis — requer verificação direta na FUNAI.",
                "dataQuality": "fallback",
            },
        ],
    }


def get_report(state: str) -> Optional[dict]:
    """
    Retorna relatório executivo gerado dinamicamente.
    Combina cenário, regiões e restrições com dados reais.
    """
    slug = _normalize_state(state)
    if slug != "roraima":
        return None
    ensure_data_available()
    return build_report(slug)


def get_methodology() -> dict:
    """Retorna a metodologia utilizada pelo sistema."""
    return {
        "title": "Metodologia — PID Descarbonização",
        "version": "1.0",
        "description": (
            "O sistema utiliza dados reais de APIs públicas brasileiras "
            "para calcular cenários de descarbonização e priorizar regiões "
            "de investimento."
        ),
        "sources": [
            {
                "name": "IBGE/SIDRA",
                "url": "https://apisidra.ibge.gov.br/",
                "use": "Municípios, população e PIB (proxy de demanda)",
                "tables": ["6579 (população)", "5938 (PIB)"],
                "dataQuality": "real",
            },
            {
                "name": "ANEEL Dados Abertos / SIGA",
                "url": "https://dadosabertos.aneel.gov.br/",
                "use": "Geração elétrica, capacidade instalada por fonte",
                "dataQuality": "real",
            },
            {
                "name": "NASA POWER",
                "url": "https://power.larc.nasa.gov/",
                "use": "Irradiação solar (GHI) por município",
                "dataQuality": "real",
            },
            {
                "name": "FUNAI GeoServer",
                "url": "https://geoserver.funai.gov.br/",
                "use": "Terras indígenas (shapefile/GeoJSON via WFS)",
                "dataQuality": "real",
            },
            {
                "name": "ICMBio GeoServer",
                "url": "https://geoserver.icmbio.gov.br/",
                "use": "Unidades de conservação federais",
                "dataQuality": "real",
            },
        ],
        "scoring_model": {
            "description": "Modelo multicritério determinístico e explicável",
            "formula": (
                "score = demand × 0.30 + infrastructure × 0.25 + "
                "decarbonization × 0.20 + restriction × 0.15 + economic × 0.10"
            ),
            "components": {
                "demand": "Baseado em população e PIB municipal (IBGE/SIDRA)",
                "infrastructure": "Presença de infraestrutura elétrica (ANEEL)",
                "decarbonization": "Irradiação solar + proporção de fóssil",
                "restriction": "Inverso do risco socioambiental (FUNAI/ICMBio)",
                "economic": "Payback baseado em irradiação × custo referência",
            },
        },
        "cost_model": {
            "description": "Modelo paramétrico de investimento",
            "note": (
                "Custos são estimados usando referências de mercado e não "
                "representam orçamento definitivo."
            ),
        },
        "limitations": [
            "A análise é preliminar e indicativa — não substitui estudo técnico detalhado",
            "Os custos são estimados com base em referências de mercado",
            "Restrições socioambientais requerem validação in loco",
            "O score não garante viabilidade — requer due diligence",
            "Dados de infraestrutura podem estar desatualizados",
        ],
        "cache_policy": "Dados são atualizados automaticamente a cada 24 horas",
    }


def is_supported_state(state: str) -> bool:
    """Verifica se o estado é suportado no MVP."""
    return _normalize_state(state) in _SUPPORTED_STATES
