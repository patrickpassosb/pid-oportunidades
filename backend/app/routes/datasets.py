"""
Router para status das fontes de dados e refresh manual.
"""

from fastapi import APIRouter

from app.services.data_loader import get_all_cache_statuses
from app.services.ingestion_service import ingest_all

router = APIRouter()


@router.get("/status")
def dataset_status():
    """Retorna status de todas as fontes de dados integradas."""
    statuses = get_all_cache_statuses()

    sources = []
    source_map = {
        "ibge_municipios_roraima.json": {
            "name": "IBGE/SIDRA",
            "use": "Municípios, população e proxy de demanda",
        },
        "aneel_siga_roraima.json": {
            "name": "ANEEL Dados Abertos / SIGA",
            "use": "Geração elétrica e capacidade instalada",
        },
        "nasa_solar_roraima.json": {
            "name": "NASA POWER",
            "use": "Irradiação solar (GHI) por município",
        },
        "restrictions_roraima.json": {
            "name": "FUNAI / ICMBio",
            "use": "Restrições socioambientais (terras indígenas, UCs)",
        },
    }

    for filename, cache in statuses.items():
        info = source_map.get(filename, {"name": filename, "use": ""})
        if cache["is_cached"]:
            status = "connected" if cache["is_fresh"] else "stale"
            quality = "real"
        else:
            status = "not_ingested"
            quality = "unavailable"

        sources.append({
            "name": info["name"],
            "status": status,
            "dataQuality": quality,
            "use": info["use"],
            "lastUpdated": cache.get("last_updated"),
            "localCache": cache["is_cached"],
            "ageHours": cache.get("age_hours"),
        })

    return {"sources": sources}


@router.post("/refresh")
def refresh_datasets():
    """Força re-ingestão de todas as fontes de dados."""
    results = ingest_all()
    return {
        "message": "Ingestão concluída",
        "results": results,
    }
