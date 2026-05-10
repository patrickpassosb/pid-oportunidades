from fastapi import APIRouter

from app.services.aneel_service import (
    get_usinas,
    get_solar,
    get_eolica,
    get_hidreletricas,
    get_transmissao,
    get_geracao
)

router = APIRouter()


@router.get("/usinas")
def usinas():
    return get_usinas()


@router.get("/solar")
def solar():
    return get_solar()


@router.get("/eolica")
def eolica():
    return get_eolica()


@router.get("/hidreletricas")
def hidreletricas():
    return get_hidreletricas()


@router.get("/transmissao")
def transmissao():
    return get_transmissao()


@router.get("/geracao")
def geracao():
    return get_geracao()