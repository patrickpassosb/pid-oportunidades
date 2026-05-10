import requests

BASE_URL = "https://dados.ons.org.br/api/3/action/package_search"


def fetch_ons(query):

    response = requests.get(
        BASE_URL,
        params={"q": query}
    )

    if response.status_code != 200:
        return {
            "erro": "Erro ao consultar ONS",
            "status": response.status_code
        }

    return response.json()


def get_carga():
    return fetch_ons("carga")


def get_geracao():
    return fetch_ons("geracao")


def get_subsistemas():
    return fetch_ons("subsistema")


def get_intercambio():
    return fetch_ons("intercambio")


def get_reservatorios():
    return fetch_ons("reservatorio")


def get_operacao():
    return fetch_ons("operacao")


def get_transmissao():
    return fetch_ons("transmissao")


def get_consumo_regional():
    return fetch_ons("consumo regional")