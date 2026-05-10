import requests


def fetch_sidra(url):
    response = requests.get(url)

    if response.status_code != 200:
        return {
            "erro": "Falha ao consultar SIDRA",
            "status_code": response.status_code,
            "detalhe": response.text
        }

    try:
        return response.json()
    except Exception:
        return {
            "erro": "Resposta inválida",
            "detalhe": response.text
        }


def limpar_sidra(data):
    if not isinstance(data, list):
        return data

    resultado = []

    for item in data[1:]:
        resultado.append({
            "municipio": item.get("D1N"),
            "valor": item.get("V"),
            "ano": item.get("D2N")
        })

    return resultado

def get_populacao():
    url = (
        "https://apisidra.ibge.gov.br/values/"
        "t/6579/n6/all/v/9324/p/last%201"
    )

    dados = fetch_sidra(url)

    return limpar_sidra(dados)

def get_pib():
    url = (
        "https://apisidra.ibge.gov.br/values/"
        "t/5938/n6/all/v/37/p/last%201"
    )

    dados = fetch_sidra(url)

    return limpar_sidra(dados)

def get_densidade_economica():

    pib = get_pib()
    pop = get_populacao()

    mapa_pop = {
        item["municipio"]: float(item["valor"])
        for item in pop
        if item["valor"] not in [None, "..."]
    }

    resultado = []

    for item in pib:

        municipio = item["municipio"]

        try:
            valor_pib = float(item["valor"])
            valor_pop = mapa_pop.get(municipio)

            if valor_pop and valor_pop > 0:

                densidade = valor_pib / valor_pop

                resultado.append({
                    "municipio": municipio,
                    "pib": valor_pib,
                    "populacao": valor_pop,
                    "densidade_economica": round(densidade, 2)
                })

        except:
            pass

    return resultado