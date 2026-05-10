from fastapi import APIRouter

from app.services.nasa_service import (
    get_temperatura,
    get_precipitacao,
    get_radiacao_solar,
    get_qualidade_ar,
    get_clima
)

router = APIRouter()


@router.get("/temperatura")
def temperatura():
    return get_temperatura()


@router.get("/precipitacao")
def precipitacao():
    return get_precipitacao()


@router.get("/radiacao-solar")
def radiacao_solar():
    return get_radiacao_solar()


@router.get("/qualidade-ar")
def qualidade_ar():
    return get_qualidade_ar()


@router.get("/clima")
def clima():
    return get_clima()