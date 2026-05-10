import requests


BASE_URL = "https://power.larc.nasa.gov/api/temporal/climatology/point"


def fetch_nasa(parameter):

    params = {
        "parameters": parameter,
        "community": "RE",
        "longitude": -38.5,
        "latitude": -7.2,
        "format": "JSON"
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return {
            "erro": "Erro ao consultar NASA",
            "status": response.status_code
        }

    try:
        dados = response.json()

        return {
            "parametro": parameter,
            "dados": dados.get("properties", {})
        }

    except Exception:
        return {
            "erro": "Resposta inválida",
            "detalhe": response.text
        }


def get_temperatura():
    return fetch_nasa("T2M")


def get_precipitacao():
    return fetch_nasa("PRECTOTCORR")


def get_radiacao_solar():
    return fetch_nasa("ALLSKY_SFC_SW_DWN")


def get_qualidade_ar():
    return fetch_nasa("AOD_55")


def get_clima():
    return fetch_nasa("T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN")