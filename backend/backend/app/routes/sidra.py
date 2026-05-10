from fastapi import APIRouter

from app.services.sidra_service import (
    get_populacao,
    get_pib,
    get_densidade_economica
)

router = APIRouter()


@router.get("/populacao")
def populacao():
    return get_populacao()

@router.get("/pib")
def pib():
    return get_pib()

@router.get("/densidade-economica")
def densidade_economica():
    return get_densidade_economica()