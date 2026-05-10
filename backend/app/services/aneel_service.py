import requests


BASE_URL = (
    "https://dadosabertos.aneel.gov.br/api/3/action/package_search"
)


def fetch_data(query):

    response = requests.get(
        BASE_URL,
        params={"q": query}
    )

    if response.status_code != 200:
        return {
            "erro": "Erro ao consultar ANEEL",
            "status": response.status_code
        }

    return response.json()

def get_usinas():
    return fetch_data("usinas")

def get_solar():
    return fetch_data("solar")

def get_eolica():
    return fetch_data("eolica")

def get_hidreletricas():
    return fetch_data("hidreletrica")

def get_transmissao():
    return fetch_data("transmissao")

def get_geracao():
    return fetch_data("geracao")