from fastapi import APIRouter, HTTPException

from app.services.decarbonization_service import (
    get_scenario,
    get_regions,
    get_restrictions,
    get_report,
    get_methodology,
    is_supported_state,
)

router = APIRouter()


def _validate_state(state: str) -> None:
    """Valida se o estado é suportado; levanta 404 se não for."""
    if not is_supported_state(state):
        raise HTTPException(
            status_code=404,
            detail={
                "error": f"Estado '{state}' não disponível",
                "detail": "No MVP, apenas 'roraima' é aceito.",
            },
        )


@router.get("/scenario/{state}")
def scenario(state: str):
    """Retorna o cenário de descarbonização para o estado."""
    _validate_state(state)
    return get_scenario(state)


@router.get("/regions/{state}")
def regions(state: str):
    """Retorna as regiões prioritárias para investimento."""
    _validate_state(state)
    return get_regions(state)


@router.get("/restrictions/{state}")
def restrictions(state: str):
    """Retorna as camadas de restrições socioambientais."""
    _validate_state(state)
    return get_restrictions(state)


@router.get("/report/{state}")
def report(state: str):
    """Retorna os dados do relatório executivo."""
    _validate_state(state)
    return get_report(state)


@router.get("/methodology")
def methodology():
    """Retorna a metodologia utilizada pelo sistema."""
    return get_methodology()
