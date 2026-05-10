"""
Utilitário de cache para dados processados.

Gerencia o ciclo de vida dos JSONs em data/processed/:
- Salvar dados com timestamp
- Carregar dados com verificação de TTL (max_age_hours)
- Retornar status do cache (age, freshness)
"""

import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

# Diretório base para dados processados
_BASE_DIR = Path(__file__).resolve().parent.parent / "data"
PROCESSED_DIR = _BASE_DIR / "processed"
METADATA_DIR = _BASE_DIR / "metadata"

# Garante que os diretórios existam
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
METADATA_DIR.mkdir(parents=True, exist_ok=True)

# TTL padrão: 24 horas
DEFAULT_MAX_AGE_HOURS = 24


def _meta_path(data_path: Path) -> Path:
    """Retorna o caminho do arquivo de metadados associado a um JSON de dados."""
    return data_path.with_suffix(".meta.json")


def save_processed_json(filename: str, data: Any, source: str = "") -> Path:
    """
    Salva dados processados em JSON com metadados de timestamp.

    Args:
        filename: Nome do arquivo (ex: 'ibge_municipios_roraima.json')
        data: Dados a salvar (serializável em JSON)
        source: Identificador da fonte (ex: 'IBGE/SIDRA')

    Returns:
        Path do arquivo salvo
    """
    filepath = PROCESSED_DIR / filename
    meta_filepath = _meta_path(filepath)

    now = datetime.now(timezone.utc)

    # Salva os dados
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Salva metadados
    meta = {
        "source": source,
        "saved_at": now.isoformat(),
        "saved_at_unix": time.time(),
        "filename": filename,
    }
    with open(meta_filepath, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

    return filepath


def load_processed_json(
    filename: str,
    max_age_hours: float = DEFAULT_MAX_AGE_HOURS,
) -> Optional[Any]:
    """
    Carrega dados processados do cache se existirem e estiverem frescos.

    Args:
        filename: Nome do arquivo
        max_age_hours: Idade máxima em horas (0 = sem limite)

    Returns:
        Dados desserializados ou None se cache expirado/inexistente
    """
    filepath = PROCESSED_DIR / filename
    meta_filepath = _meta_path(filepath)

    if not filepath.exists():
        return None

    # Verifica TTL
    if max_age_hours > 0 and meta_filepath.exists():
        try:
            with open(meta_filepath, "r", encoding="utf-8") as f:
                meta = json.load(f)
            saved_at_unix = meta.get("saved_at_unix", 0)
            age_hours = (time.time() - saved_at_unix) / 3600
            if age_hours > max_age_hours:
                return None  # Cache expirado
        except (json.JSONDecodeError, KeyError):
            pass  # Metadata corrompida, tenta carregar os dados mesmo assim

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return None


def get_cache_status(filename: str) -> dict:
    """
    Retorna status do cache para um arquivo.

    Returns:
        Dict com is_cached, is_fresh, age_hours, last_updated, source
    """
    filepath = PROCESSED_DIR / filename
    meta_filepath = _meta_path(filepath)

    if not filepath.exists():
        return {
            "is_cached": False,
            "is_fresh": False,
            "age_hours": None,
            "last_updated": None,
            "source": None,
        }

    meta = {}
    if meta_filepath.exists():
        try:
            with open(meta_filepath, "r", encoding="utf-8") as f:
                meta = json.load(f)
        except (json.JSONDecodeError, OSError):
            pass

    saved_at_unix = meta.get("saved_at_unix", 0)
    age_hours = (time.time() - saved_at_unix) / 3600 if saved_at_unix else None
    is_fresh = age_hours is not None and age_hours < DEFAULT_MAX_AGE_HOURS

    return {
        "is_cached": True,
        "is_fresh": is_fresh,
        "age_hours": round(age_hours, 2) if age_hours else None,
        "last_updated": meta.get("saved_at"),
        "source": meta.get("source"),
    }


def get_all_cache_statuses() -> dict:
    """Retorna status de todos os caches processados."""
    expected_files = [
        "ibge_municipios_roraima.json",
        "aneel_siga_roraima.json",
        "nasa_solar_roraima.json",
        "restrictions_roraima.json",
    ]
    return {f: get_cache_status(f) for f in expected_files}
