"""
Dados semi-mockados para o cenário de descarbonização.

NOTA: Todos os valores neste módulo são estimativas indicativas para fins de
demonstração (hackathon MVP). Futuramente, estes dados devem ser substituídos por:

- Dados reais de energia (ANEEL, ONS, EPE, CCEE)
- Bases geoespaciais (IBAMA, ICMBio, FUNAI, INCRA)
- Motor de cálculo de investimento e payback
- Banco de dados (PostgreSQL / PostGIS)
- Processamento de CSV/GeoJSON de fontes oficiais
- Integração com APIs públicas (SIDRA/IBGE, NASA POWER, etc.)
"""

# --------------------------------------------------------------------------
# Cenário de descarbonização — Roraima / Energia
# --------------------------------------------------------------------------

SCENARIO_RORAIMA = {
    "state": "Roraima",
    "sector": "Energia",
    "objective": "Reduzir dependência de geração fóssil e expandir renováveis",
    "baselineProblem": (
        "Roraima depende fortemente de geração térmica fóssil devido à isolação "
        "do sistema elétrico nacional, com alto custo e emissões."
    ),
    "estimatedInvestment": 420_000_000,
    "estimatedInvestmentFormatted": "R$ 420 milhões",
    "estimatedTimeline": "6 a 8 anos",
    "timelineMinYears": 6,
    "timelineMaxYears": 8,
    "avoidedEmissions": 180_000,
    "avoidedEmissionsFormatted": "180 mil tCO₂/ano",
    "priorityProjects": [
        "Usinas solares distribuídas",
        "Armazenamento com baterias",
        "Modernização da rede",
        "Eficiência energética em cargas públicas",
    ],
    "levers": [
        {
            "id": "solar-distribuida",
            "name": "Usinas solares distribuídas",
            "impact": "Alto",
            "cost": "Médio",
            "timeline": "2 a 4 anos",
            "timelineMinYears": 2,
            "timelineMaxYears": 4,
            "estimatedInvestment": 160_000_000,
            "estimatedInvestmentFormatted": "R$ 160 milhões",
            "description": (
                "Implantação de usinas solares fotovoltaicas de médio e grande "
                "porte próximas aos centros de carga, reduzindo a dependência "
                "de geração térmica."
            ),
        },
        {
            "id": "baterias",
            "name": "Armazenamento com baterias",
            "impact": "Médio",
            "cost": "Alto",
            "timeline": "3 a 5 anos",
            "timelineMinYears": 3,
            "timelineMaxYears": 5,
            "estimatedInvestment": 110_000_000,
            "estimatedInvestmentFormatted": "R$ 110 milhões",
            "description": (
                "Sistemas de armazenamento de energia (BESS) para firmar a "
                "geração solar e atender picos de demanda noturna."
            ),
        },
        {
            "id": "modernizacao-rede",
            "name": "Modernização da rede",
            "impact": "Alto",
            "cost": "Alto",
            "timeline": "5 a 8 anos",
            "timelineMinYears": 5,
            "timelineMaxYears": 8,
            "estimatedInvestment": 120_000_000,
            "estimatedInvestmentFormatted": "R$ 120 milhões",
            "description": (
                "Reforço e digitalização da infraestrutura de transmissão e "
                "distribuição para absorver novas fontes renováveis e reduzir "
                "perdas."
            ),
        },
        {
            "id": "eficiencia-publica",
            "name": "Eficiência energética em cargas públicas",
            "impact": "Médio",
            "cost": "Baixo",
            "timeline": "1 a 2 anos",
            "timelineMinYears": 1,
            "timelineMaxYears": 2,
            "estimatedInvestment": 30_000_000,
            "estimatedInvestmentFormatted": "R$ 30 milhões",
            "description": (
                "Substituição de luminárias, eficientização de prédios públicos "
                "e gestão inteligente da demanda."
            ),
        },
    ],
}

# --------------------------------------------------------------------------
# Regiões prioritárias — Roraima
# --------------------------------------------------------------------------

REGIONS_RORAIMA = {
    "state": "Roraima",
    "sector": "Energia",
    "regions": [
        {
            "id": "boa-vista-mucajai",
            "name": "Boa Vista — Mucajaí",
            "score": 78,
            "project": "Usina solar fotovoltaica de 5 MW",
            "estimatedInvestment": 18_500_000,
            "estimatedInvestmentFormatted": "R$ 18,5 milhões",
            "payback": 6.8,
            "risk": "Médio",
            "contributionToPlan": "Alta",
            "recommendation": "Avançar para estudo técnico",
            "explanation": (
                "Bom potencial solar, proximidade relativa da infraestrutura "
                "elétrica e menor sobreposição aparente com áreas de restrição "
                "crítica."
            ),
        },
        {
            "id": "rorainopolis",
            "name": "Rorainópolis",
            "score": 71,
            "project": "Usina solar fotovoltaica de 5 MW",
            "estimatedInvestment": 22_000_000,
            "estimatedInvestmentFormatted": "R$ 22 milhões",
            "payback": 7.4,
            "risk": "Médio",
            "contributionToPlan": "Média",
            "recommendation": "Avaliar conexão e logística",
            "explanation": (
                "Irradiação solar favorável e potencial para atender demanda "
                "regional. Requer estudo de capacidade de rede."
            ),
        },
        {
            "id": "caracarai",
            "name": "Caracaraí",
            "score": 64,
            "project": "Usina solar fotovoltaica de 3 MW",
            "estimatedInvestment": 14_000_000,
            "estimatedInvestmentFormatted": "R$ 14 milhões",
            "payback": 8.1,
            "risk": "Médio",
            "contributionToPlan": "Média",
            "recommendation": "Requer análise logística",
            "explanation": (
                "Posição intermediária no estado com potencial solar adequado. "
                "Distância de conexão pode elevar CAPEX."
            ),
        },
        {
            "id": "pacaraima",
            "name": "Pacaraima",
            "score": 49,
            "project": "Estudo preliminar necessário",
            "estimatedInvestment": None,
            "estimatedInvestmentFormatted": "Indeterminado",
            "payback": 9.2,
            "risk": "Alto",
            "contributionToPlan": "Baixa",
            "recommendation": "Evitar prospecção inicial sem due diligence",
            "explanation": (
                "Risco socioambiental alto na triagem preliminar. Não "
                "recomendada para prospecção inicial da demo."
            ),
        },
    ],
}

# --------------------------------------------------------------------------
# Restrições socioambientais — Roraima
# --------------------------------------------------------------------------

RESTRICTIONS_RORAIMA = {
    "state": "Roraima",
    "layers": [
        {
            "id": "terras-indigenas",
            "name": "Terras indígenas",
            "type": "territorial",
            "severity": "critical",
            "description": (
                "Camada indicativa para evitar sobreposição e apoiar consulta "
                "adequada nos estudos posteriores."
            ),
        },
        {
            "id": "unidades-conservacao",
            "name": "Unidades de conservação",
            "type": "ambiental",
            "severity": "attention",
            "description": (
                "Áreas protegidas que exigem avaliação legal, ambiental e de "
                "compatibilidade do projeto."
            ),
        },
        {
            "id": "areas-embargadas",
            "name": "Áreas embargadas",
            "type": "legal",
            "severity": "critical",
            "description": (
                "Sinalizam necessidade de due diligence antes de qualquer "
                "decisão de prospecção."
            ),
        },
        {
            "id": "app-reserva-legal",
            "name": "APP / Reserva Legal",
            "type": "legal",
            "severity": "attention",
            "description": (
                "Indicadores de restrição de uso do solo que precisam ser "
                "confirmados em base oficial."
            ),
        },
        {
            "id": "conflitos-fundiarios",
            "name": "Conflitos fundiários",
            "type": "territorial",
            "severity": "critical",
            "description": (
                "Alertas preliminares para validação de titularidade, posse "
                "e governança territorial."
            ),
        },
    ],
}

# --------------------------------------------------------------------------
# Relatório executivo — Roraima
# --------------------------------------------------------------------------

REPORT_RORAIMA = {
    "title": "Plano Preliminar de Descarbonização",
    "subtitle": "Setor de Energia — Estado de Roraima",
    "executiveSummary": (
        "Roraima apresenta dependência crítica de geração térmica fóssil "
        "devido à isolação do SIN. A trajetória preliminar de descarbonização "
        "envolve a expansão de usinas solares distribuídas, armazenamento com "
        "baterias, modernização da rede e eficiência energética em cargas "
        "públicas. O investimento estimado é de R$ 420 milhões, com prazo de "
        "6 a 8 anos e potencial de evitar 180 mil tCO₂/ano."
    ),
    "estimatedInvestment": 420_000_000,
    "estimatedInvestmentFormatted": "R$ 420 milhões",
    "estimatedTimeline": "6 a 8 anos",
    "timelineMinYears": 6,
    "timelineMaxYears": 8,
    "avoidedEmissions": 180_000,
    "avoidedEmissionsFormatted": "180 mil tCO₂/ano",
    "priorityRegion": {
        "id": "boa-vista-mucajai",
        "name": "Boa Vista — Mucajaí",
        "score": 78,
        "recommendation": "Avançar para estudo técnico",
    },
    "levers": [
        {
            "id": "solar-distribuida",
            "name": "Usinas solares distribuídas",
            "impact": "Alto",
            "cost": "Médio",
            "timeline": "2 a 4 anos",
            "estimatedInvestment": 160_000_000,
            "estimatedInvestmentFormatted": "R$ 160 milhões",
        },
        {
            "id": "baterias",
            "name": "Armazenamento com baterias",
            "impact": "Médio",
            "cost": "Alto",
            "timeline": "3 a 5 anos",
            "estimatedInvestment": 110_000_000,
            "estimatedInvestmentFormatted": "R$ 110 milhões",
        },
        {
            "id": "modernizacao-rede",
            "name": "Modernização da rede",
            "impact": "Alto",
            "cost": "Alto",
            "timeline": "5 a 8 anos",
            "estimatedInvestment": 120_000_000,
            "estimatedInvestmentFormatted": "R$ 120 milhões",
        },
        {
            "id": "eficiencia-publica",
            "name": "Eficiência energética em cargas públicas",
            "impact": "Médio",
            "cost": "Baixo",
            "timeline": "1 a 2 anos",
            "estimatedInvestment": 30_000_000,
            "estimatedInvestmentFormatted": "R$ 30 milhões",
        },
    ],
    "risks": [
        {
            "id": "terras-indigenas",
            "name": "Terras indígenas",
            "severity": "critical",
            "description": (
                "Requer consulta adequada e evitar sobreposição em estudos "
                "posteriores."
            ),
        },
        {
            "id": "custo-conexao",
            "name": "Custo de conexão elétrica",
            "severity": "attention",
            "description": (
                "Distância da rede pode elevar CAPEX em regiões mais remotas."
            ),
        },
        {
            "id": "validacao-fundiaria",
            "name": "Validação fundiária",
            "severity": "attention",
            "description": (
                "Due diligence de titularidade e posse necessária antes de "
                "investimentos."
            ),
        },
    ],
    "nextSteps": [
        "Executar due diligence territorial nas regiões prioritárias",
        "Solicitar estudo de conexão à concessionária local",
        "Validar CAPEX com fornecedores e EPCs locais",
        "Iniciar triagem jurídica e ambiental especializada",
        "Elaborar estudo técnico detalhado para Boa Vista — Mucajaí",
    ],
}
