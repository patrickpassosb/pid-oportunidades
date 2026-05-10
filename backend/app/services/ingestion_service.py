"""
Serviço de ingestão de dados de APIs públicas reais.

Busca dados de IBGE/SIDRA, ANEEL, NASA POWER e FUNAI/ICMBio,
processa e salva em cache local (data/processed/).
"""

import logging
import requests
from typing import Any

from app.services.data_loader import save_processed_json, load_processed_json

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constantes de municípios de Roraima (código IBGE e coordenadas)
# ---------------------------------------------------------------------------
RORAIMA_MUNICIPIOS = [
    {"cod_ibge": "1400100", "nome": "Alto Alegre", "lat": 2.99, "lon": -61.31},
    {"cod_ibge": "1400027", "nome": "Amajari", "lat": 3.65, "lon": -61.37},
    {"cod_ibge": "1400159", "nome": "Boa Vista", "lat": 2.82, "lon": -60.67},
    {"cod_ibge": "1400175", "nome": "Bonfim", "lat": 3.36, "lon": -59.83},
    {"cod_ibge": "1400209", "nome": "Cantá", "lat": 2.61, "lon": -60.59},
    {"cod_ibge": "1400233", "nome": "Caracaraí", "lat": 1.83, "lon": -61.13},
    {"cod_ibge": "1400282", "nome": "Caroebe", "lat": 0.88, "lon": -59.70},
    {"cod_ibge": "1400308", "nome": "Iracema", "lat": 2.18, "lon": -61.04},
    {"cod_ibge": "1400407", "nome": "Mucajaí", "lat": 2.43, "lon": -60.90},
    {"cod_ibge": "1400456", "nome": "Normandia", "lat": 3.88, "lon": -59.62},
    {"cod_ibge": "1400472", "nome": "Pacaraima", "lat": 4.48, "lon": -61.15},
    {"cod_ibge": "1400506", "nome": "Rorainópolis", "lat": -0.94, "lon": -60.44},
    {"cod_ibge": "1400605", "nome": "São João da Baliza", "lat": 0.95, "lon": -59.91},
    {"cod_ibge": "1400704", "nome": "São Luiz", "lat": 1.01, "lon": -60.04},
    {"cod_ibge": "1400803", "nome": "Uiramutã", "lat": 4.60, "lon": -60.18},
]

REQUEST_TIMEOUT = 30  # seconds


# ===================================================================
# 1. IBGE / SIDRA — Municípios, população, PIB
# ===================================================================

def ingest_ibge_sidra_roraima() -> dict:
    """
    Busca dados populacionais e de PIB de Roraima via API SIDRA.
    Tabela 6579 (população) e 5938 (PIB), filtrados para UF 14 (Roraima).
    """
    logger.info("Ingestão IBGE/SIDRA: iniciando…")
    result = {"status": "ok", "errors": []}

    # --- População ---
    pop_data = {}
    try:
        pop_url = (
            "https://apisidra.ibge.gov.br/values"
            "/t/6579/n6/in%20n3%2014/v/9324/p/last%201"
        )
        resp = requests.get(pop_url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        raw = resp.json()
        # Primeiro item é header, pular
        for item in raw[1:]:
            nome = item.get("D1N", "")
            cod = item.get("D1C", "")
            valor = item.get("V", "")
            if valor and valor not in ("...", "-", "X"):
                pop_data[nome] = {
                    "cod_ibge": cod,
                    "populacao": int(float(valor)),
                }
        logger.info(f"IBGE população: {len(pop_data)} municípios")
    except Exception as e:
        logger.error(f"Erro na ingestão de população IBGE: {e}")
        result["errors"].append(f"populacao: {e}")

    # --- PIB ---
    pib_data = {}
    try:
        pib_url = (
            "https://apisidra.ibge.gov.br/values"
            "/t/5938/n6/in%20n3%2014/v/37/p/last%201"
        )
        resp = requests.get(pib_url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        raw = resp.json()
        for item in raw[1:]:
            nome = item.get("D1N", "")
            valor = item.get("V", "")
            if valor and valor not in ("...", "-", "X"):
                pib_data[nome] = float(valor)
    except Exception as e:
        logger.error(f"Erro na ingestão de PIB IBGE: {e}")
        result["errors"].append(f"pib: {e}")

    # --- Merge e cálculo de demandProxyScore ---
    municipios = []
    for mun in RORAIMA_MUNICIPIOS:
        nome = mun["nome"]
        # Match por substring (SIDRA retorna "Boa Vista (RR)" etc.)
        pop_entry = _find_by_name(pop_data, nome)
        pib_valor = _find_value_by_name(pib_data, nome)

        populacao = pop_entry.get("populacao", 0) if pop_entry else 0
        cod = pop_entry.get("cod_ibge", mun["cod_ibge"]) if pop_entry else mun["cod_ibge"]

        municipios.append({
            "cod_ibge": cod,
            "nome": nome,
            "lat": mun["lat"],
            "lon": mun["lon"],
            "populacao": populacao,
            "pib": pib_valor or 0,
        })

    # Normalizar demandProxyScore (0-100 baseado em população)
    max_pop = max((m["populacao"] for m in municipios), default=1) or 1
    for m in municipios:
        m["demandProxyScore"] = round((m["populacao"] / max_pop) * 100, 1)

    output = {
        "state": "Roraima",
        "uf": "RR",
        "source": "IBGE/SIDRA",
        "tables": ["6579 (população)", "5938 (PIB)"],
        "dataQuality": "real" if pop_data else "fallback",
        "municipios": municipios,
    }

    save_processed_json("ibge_municipios_roraima.json", output, source="IBGE/SIDRA")
    result["municipios_count"] = len(municipios)
    logger.info(f"IBGE/SIDRA: {len(municipios)} municípios salvos")
    return result


# ===================================================================
# 2. ANEEL — Geração elétrica (SIGA / dados abertos)
# ===================================================================

def ingest_aneel_siga_roraima() -> dict:
    """
    Busca dados de geração elétrica de Roraima via API ANEEL dados abertos.
    Usa CKAN datastore_search para encontrar empreendimentos em RR.
    """
    logger.info("Ingestão ANEEL SIGA: iniciando…")
    result = {"status": "ok", "errors": []}

    empreendimentos = []
    try:
        # Primeiro, buscar o package do SIGA
        pkg_url = (
            "https://dadosabertos.aneel.gov.br/api/3/action/package_show"
            "?id=siga-sistema-de-informacoes-de-geracao-da-aneel"
        )
        resp = requests.get(pkg_url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        pkg = resp.json()

        # Encontrar resource com dados tabulares
        resources = pkg.get("result", {}).get("resources", [])
        resource_id = None
        for res in resources:
            fmt = (res.get("format", "") or "").upper()
            if fmt in ("CSV", "JSON") or res.get("datastore_active"):
                resource_id = res.get("id")
                break

        if resource_id:
            # Buscar dados filtrados por UF = RR
            ds_url = (
                "https://dadosabertos.aneel.gov.br/api/3/action/datastore_search"
                f"?resource_id={resource_id}"
                '&filters={"SigUFPrincipal":"RR"}'
                "&limit=500"
            )
            resp = requests.get(ds_url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            ds = resp.json()
            records = ds.get("result", {}).get("records", [])
            empreendimentos = records
            logger.info(f"ANEEL SIGA: {len(records)} empreendimentos em RR")
        else:
            logger.warning("ANEEL: nenhum resource com datastore encontrado")
            result["errors"].append("resource_id não encontrado no SIGA")

    except Exception as e:
        logger.error(f"Erro na ingestão ANEEL: {e}")
        result["errors"].append(str(e))

    # Agregar por fonte de geração
    by_source = {}
    total_kw = 0
    for emp in empreendimentos:
        tipo = emp.get("DscTipoGeracao") or emp.get("SigTipoGeracao") or "Outros"
        pot = _safe_float(emp.get("MdaPotenciaFiscalizadaKw") or emp.get("MdaPotenciaOutorgadaKw") or 0)
        fase = emp.get("DscFaseUsina") or emp.get("DscOrigemCombustivel") or ""

        if tipo not in by_source:
            by_source[tipo] = {"count": 0, "capacidade_kw": 0, "empreendimentos": []}

        by_source[tipo]["count"] += 1
        by_source[tipo]["capacidade_kw"] += pot
        total_kw += pot

        if len(by_source[tipo]["empreendimentos"]) < 5:  # top 5 por tipo
            by_source[tipo]["empreendimentos"].append({
                "nome": emp.get("NomEmpreendimento", ""),
                "municipio": emp.get("NomMunicipio", ""),
                "potencia_kw": pot,
                "fase": fase,
            })

    # Classificar fontes como fóssil ou renovável
    FOSSIL_KEYWORDS = {"térmica", "termica", "diesel", "óleo", "oleo", "gás", "gas", "fóssil", "fossil", "ute"}
    summary_by_type = {}
    fossil_kw = 0
    renewable_kw = 0
    for tipo, info in by_source.items():
        is_fossil = any(kw in tipo.lower() for kw in FOSSIL_KEYWORDS)
        category = "fossil" if is_fossil else "renewable"
        if is_fossil:
            fossil_kw += info["capacidade_kw"]
        else:
            renewable_kw += info["capacidade_kw"]
        summary_by_type[tipo] = {
            **info,
            "category": category,
            "capacidade_mw": round(info["capacidade_kw"] / 1000, 2),
        }

    output = {
        "state": "Roraima",
        "uf": "RR",
        "source": "ANEEL Dados Abertos / SIGA",
        "dataQuality": "real" if empreendimentos else "fallback",
        "total_empreendimentos": len(empreendimentos),
        "total_capacidade_kw": total_kw,
        "total_capacidade_mw": round(total_kw / 1000, 2),
        "fossil_mw": round(fossil_kw / 1000, 2),
        "renewable_mw": round(renewable_kw / 1000, 2),
        "fossil_share": round(fossil_kw / total_kw * 100, 1) if total_kw > 0 else 0,
        "by_source": summary_by_type,
    }

    save_processed_json("aneel_siga_roraima.json", output, source="ANEEL")
    result["total_empreendimentos"] = len(empreendimentos)
    return result


# ===================================================================
# 3. NASA POWER — Irradiação solar
# ===================================================================

def ingest_nasa_solar_roraima() -> dict:
    """
    Busca irradiação solar (GHI) para municípios-chave de Roraima via NASA POWER.
    """
    logger.info("Ingestão NASA POWER: iniciando…")
    result = {"status": "ok", "errors": []}

    solar_data = []
    key_municipios = [m for m in RORAIMA_MUNICIPIOS if m["nome"] in
        ["Boa Vista", "Rorainópolis", "Caracaraí", "Pacaraima", "Mucajaí",
         "Alto Alegre", "Cantá", "Iracema", "Bonfim"]]

    for mun in key_municipios:
        try:
            url = (
                "https://power.larc.nasa.gov/api/temporal/climatology/point"
                f"?parameters=ALLSKY_SFC_SW_DWN,T2M,PRECTOTCORR"
                f"&community=RE"
                f"&longitude={mun['lon']}"
                f"&latitude={mun['lat']}"
                f"&format=JSON"
            )
            resp = requests.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            data = resp.json()

            props = data.get("properties", {}).get("parameter", {})
            ghi = props.get("ALLSKY_SFC_SW_DWN", {})
            ghi_annual = ghi.get("ANN", 0)

            solar_data.append({
                "municipio": mun["nome"],
                "lat": mun["lat"],
                "lon": mun["lon"],
                "ghi_annual_kwh_m2_day": ghi_annual,
                "ghi_monthly": {k: v for k, v in ghi.items() if k != "ANN"},
                "dataQuality": "real",
            })
            logger.info(f"NASA POWER: {mun['nome']} GHI={ghi_annual}")

        except Exception as e:
            logger.error(f"Erro NASA POWER para {mun['nome']}: {e}")
            result["errors"].append(f"{mun['nome']}: {e}")
            solar_data.append({
                "municipio": mun["nome"],
                "lat": mun["lat"],
                "lon": mun["lon"],
                "ghi_annual_kwh_m2_day": 5.0,  # fallback razoável para equador
                "ghi_monthly": {},
                "dataQuality": "fallback",
            })

    output = {
        "state": "Roraima",
        "source": "NASA POWER",
        "dataQuality": "real" if any(s["dataQuality"] == "real" for s in solar_data) else "fallback",
        "municipios": solar_data,
    }

    save_processed_json("nasa_solar_roraima.json", output, source="NASA POWER")
    result["municipios_count"] = len(solar_data)
    return result


# ===================================================================
# 4. FUNAI / ICMBio — Restrições socioambientais (shapefiles reais)
# ===================================================================

# Bounding box de Roraima (aprox.)
RR_BBOX = {
    "min_lon": -64.83,
    "max_lon": -58.89,
    "min_lat": -1.58,
    "max_lat": 5.28,
}


def ingest_restrictions_roraima() -> dict:
    """
    Busca dados reais de terras indígenas (FUNAI) e unidades de conservação
    (ICMBio/MMA) via GeoServer WFS, filtrando para Roraima.
    """
    logger.info("Ingestão Restrições: iniciando…")
    result = {"status": "ok", "errors": []}
    layers = []

    # --- Terras Indígenas (FUNAI GeoServer) ---
    try:
        bbox_str = f"{RR_BBOX['min_lon']},{RR_BBOX['min_lat']},{RR_BBOX['max_lon']},{RR_BBOX['max_lat']}"
        ti_url = (
            "https://geoserver.funai.gov.br/geoserver/Funai/ows"
            "?service=WFS&version=1.0.0"
            "&request=GetFeature"
            "&typeName=Funai:tis_poligonais"
            "&outputFormat=application/json"
            f"&bbox={bbox_str}"
            "&maxFeatures=200"
        )
        resp = requests.get(ti_url, timeout=60)
        resp.raise_for_status()
        geojson = resp.json()
        features = geojson.get("features", [])

        # Filtrar features que intersectam Roraima
        ti_list = []
        for feat in features:
            props = feat.get("properties", {})
            nome = props.get("terrai_nom") or props.get("nome") or "N/A"
            situacao = props.get("situacao_") or props.get("fase_ti") or ""
            area_ha = _safe_float(props.get("superfic_h") or props.get("area_ha") or 0)

            ti_list.append({
                "nome": nome,
                "situacao": situacao,
                "area_ha": area_ha,
                "uf": props.get("uf_sigla") or "RR",
            })

        layers.append({
            "id": "terras-indigenas",
            "name": "Terras indígenas",
            "type": "territorial",
            "severity": "critical",
            "source": "FUNAI GeoServer",
            "dataQuality": "real",
            "count": len(ti_list),
            "total_area_ha": sum(t["area_ha"] for t in ti_list),
            "description": (
                f"{len(ti_list)} terras indígenas identificadas em Roraima, "
                f"totalizando {sum(t['area_ha'] for t in ti_list):,.0f} ha. "
                "Exigem consulta adequada e análise jurídica antes de qualquer intervenção."
            ),
            "items": ti_list[:20],  # top 20 para manter JSON leve
        })
        logger.info(f"FUNAI: {len(ti_list)} terras indígenas em RR")

    except Exception as e:
        logger.error(f"Erro na ingestão FUNAI: {e}")
        result["errors"].append(f"FUNAI: {e}")
        layers.append({
            "id": "terras-indigenas",
            "name": "Terras indígenas",
            "type": "territorial",
            "severity": "critical",
            "source": "FUNAI",
            "dataQuality": "partial",
            "count": None,
            "description": (
                "Roraima possui expressiva presença de terras indígenas. "
                "Dados não puderam ser atualizados — requer verificação manual."
            ),
            "items": [],
        })

    # --- Unidades de Conservação (ICMBio/MMA) ---
    try:
        uc_url = (
            "https://geoserver.icmbio.gov.br/geoserver/ows"
            "?service=WFS&version=1.0.0"
            "&request=GetFeature"
            "&typeName=uc_federal"
            "&outputFormat=application/json"
            f"&CQL_FILTER=uf='RR'"
            "&maxFeatures=100"
        )
        resp = requests.get(uc_url, timeout=60)
        resp.raise_for_status()
        geojson = resp.json()
        features = geojson.get("features", [])

        uc_list = []
        for feat in features:
            props = feat.get("properties", {})
            uc_list.append({
                "nome": props.get("nome") or props.get("nomeuc") or "N/A",
                "categoria": props.get("categori3") or props.get("categoria") or "",
                "area_ha": _safe_float(props.get("areaha") or props.get("area_ha") or 0),
                "esfera": props.get("esfera") or "Federal",
            })

        layers.append({
            "id": "unidades-conservacao",
            "name": "Unidades de conservação",
            "type": "ambiental",
            "severity": "attention",
            "source": "ICMBio GeoServer",
            "dataQuality": "real",
            "count": len(uc_list),
            "total_area_ha": sum(u["area_ha"] for u in uc_list),
            "description": (
                f"{len(uc_list)} unidades de conservação federais em Roraima. "
                "Exigem avaliação legal e ambiental de compatibilidade do projeto."
            ),
            "items": uc_list[:20],
        })
        logger.info(f"ICMBio: {len(uc_list)} UCs em RR")

    except Exception as e:
        logger.error(f"Erro na ingestão ICMBio: {e}")
        result["errors"].append(f"ICMBio: {e}")
        layers.append({
            "id": "unidades-conservacao",
            "name": "Unidades de conservação",
            "type": "ambiental",
            "severity": "attention",
            "source": "ICMBio",
            "dataQuality": "partial",
            "count": None,
            "description": (
                "Áreas protegidas que exigem avaliação legal, ambiental "
                "e de compatibilidade do projeto."
            ),
            "items": [],
        })

    # --- Camadas complementares (sempre incluídas como parciais) ---
    layers.extend([
        {
            "id": "areas-embargadas",
            "name": "Áreas embargadas",
            "type": "legal",
            "severity": "critical",
            "source": "IBAMA",
            "dataQuality": "planned",
            "count": None,
            "description": (
                "Sinalizam necessidade de due diligence antes de qualquer "
                "decisão de prospecção. Integração com IBAMA planejada."
            ),
            "items": [],
        },
        {
            "id": "app-reserva-legal",
            "name": "APP / Reserva Legal",
            "type": "legal",
            "severity": "attention",
            "source": "CAR/SFB",
            "dataQuality": "planned",
            "count": None,
            "description": (
                "Indicadores de restrição de uso do solo. Integração "
                "com Cadastro Ambiental Rural planejada."
            ),
            "items": [],
        },
    ])

    output = {
        "state": "Roraima",
        "dataQuality": "real" if any(l["dataQuality"] == "real" for l in layers) else "partial",
        "disclaimer": (
            "A análise é preliminar e não substitui licenciamento ambiental, "
            "consulta adequada ou análise jurídica especializada."
        ),
        "layers": layers,
    }

    save_processed_json("restrictions_roraima.json", output, source="FUNAI/ICMBio")
    result["layers_count"] = len(layers)
    return result


# ===================================================================
# Orquestração
# ===================================================================

def ingest_all() -> dict:
    """Roda todas as ingestões. Retorna resumo de cada uma."""
    results = {}
    for name, fn in [
        ("ibge_sidra", ingest_ibge_sidra_roraima),
        ("aneel_siga", ingest_aneel_siga_roraima),
        ("nasa_solar", ingest_nasa_solar_roraima),
        ("restrictions", ingest_restrictions_roraima),
    ]:
        try:
            results[name] = fn()
        except Exception as e:
            logger.error(f"Falha na ingestão {name}: {e}")
            results[name] = {"status": "error", "error": str(e)}
    return results


# ===================================================================
# Helpers
# ===================================================================

def _safe_float(val: Any) -> float:
    try:
        return float(val)
    except (ValueError, TypeError):
        return 0.0


def _find_by_name(data: dict, nome: str):
    """Busca por nome parcial em dict keyed por nome completo SIDRA."""
    for key, val in data.items():
        # SIDRA retorna "Boa Vista (RR)" — match por início
        if nome.lower() in key.lower():
            return val
    return None


def _find_value_by_name(data: dict, nome: str):
    for key, val in data.items():
        if nome.lower() in key.lower():
            return val
    return None
