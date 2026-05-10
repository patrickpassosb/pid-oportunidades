from fastapi import APIRouter

from app.services.ons_service import (
    get_carga,
    get_geracao,
    get_subsistemas,
    get_intercambio,
    get_reservatorios,
    get_operacao,
    get_transmissao,
    get_consumo_regional
)

router = APIRouter(
    tags=["ONS"]
)


@router.get("/carga")
def carga():
    return get_carga()


@router.get("/geracao")
def geracao():
    return get_geracao()


@router.get("/subsistemas")
def subsistemas():
    return get_subsistemas()


@router.get("/intercambio")
def intercambio():
    return get_intercambio()


@router.get("/reservatorios")
def reservatorios():
    return get_reservatorios()


@router.get("/operacao")
def operacao():
    return get_operacao()


@router.get("/transmissao")
def transmissao():
    return get_transmissao()


@router.get("/consumo-regional")
def consumo_regional():
    return get_consumo_regional()