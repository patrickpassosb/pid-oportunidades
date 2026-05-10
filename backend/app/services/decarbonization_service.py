"""
Service layer para dados de descarbonização.

NOTA IMPORTANTE — DADOS SEMI-MOCKADOS:
---------------------------------------
Todos os dados retornados por este service são estimativas indicativas
preenchidas manualmente para a versão MVP (hackathon).

Futuramente, cada função deve ser evoluída para consumir:
- Dados reais de energia → APIs ANEEL, ONS, EPE, CCEE
- Bases geoespaciais → shapefiles e GeoJSON de IBAMA, ICMBio, FUNAI, INCRA, MMA
- Motor de cálculo → modelos de investimento, payback e emissões evitadas
- Banco de dados → PostgreSQL / PostGIS para armazenamento persistente
- Processamento de CSV/GeoJSON → pipelines de ingestão de dados oficiais
- Integração com APIs públicas → SIDRA/IBGE, NASA POWER, INPE, etc.

A interface (nomes de funções e formato de retorno) deve ser mantida para
não quebrar o contrato com o frontend.
"""

from typing import Optional

from app.data.mock_decarbonization import (
    SCENARIO_RORAIMA,
    REGIONS_RORAIMA,
    RESTRICTIONS_RORAIMA,
    REPORT_RORAIMA,
)


# Mapeamento de estados suportados (por slug normalizado).
# No MVP, apenas Roraima é aceito.
_SUPPORTED_STATES = {"roraima"}


def _normalize_state(state: str) -> str:
    """Normaliza o slug do estado para minúsculas sem acentos."""
    return state.strip().lower()


def get_scenario(state: str) -> Optional[dict]:
    """
    Retorna o cenário de descarbonização para o estado informado.

    Futuramente: consultar banco de dados ou motor de cálculo com
    parâmetros do estado/setor e gerar cenário dinâmico.
    """
    slug = _normalize_state(state)
    if slug == "roraima":
        return SCENARIO_RORAIMA
    return None


def get_regions(state: str) -> Optional[dict]:
    """
    Retorna as regiões prioritárias para investimento no estado.

    Futuramente: consultar camadas geoespaciais, modelo multicritério
    com pesos configuráveis e dados de irradiação solar (NASA POWER).
    """
    slug = _normalize_state(state)
    if slug == "roraima":
        return REGIONS_RORAIMA
    return None


def get_restrictions(state: str) -> Optional[dict]:
    """
    Retorna as camadas de restrição socioambiental para o estado.

    Futuramente: consultar bases geoespaciais oficiais (IBAMA, ICMBio,
    FUNAI, INCRA) e interseccionar com áreas de projeto.
    """
    slug = _normalize_state(state)
    if slug == "roraima":
        return RESTRICTIONS_RORAIMA
    return None


def get_report(state: str) -> Optional[dict]:
    """
    Retorna os dados do relatório executivo consolidado.

    Futuramente: gerar relatório dinâmico a partir de cenário, regiões
    e restrições, com suporte a exportação em PDF.
    """
    slug = _normalize_state(state)
    if slug == "roraima":
        return REPORT_RORAIMA
    return None


def is_supported_state(state: str) -> bool:
    """Verifica se o estado é suportado no MVP."""
    return _normalize_state(state) in _SUPPORTED_STATES
