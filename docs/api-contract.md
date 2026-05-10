# Contrato de API — Decarbonização

> Data: 2026-05-10
> Versão: 1.0 — MVP Hackathon
> Base URL (dev): `http://localhost:8000`
> Base URL (produção): `https://pid-oportunidades-production.up.railway.app`

---

## Endpoints

### 1. Healthcheck

```http
GET /api/health
```

**Resposta 200 OK:**
```json
{
  "status": "ok",
  "service": "pid-decarbonization-api",
  "version": "1.0.0"
}
```

---

### 2. Cenário de descarbonização

```http
GET /api/decarbonization/scenario/{state}
```

**Parâmetros:**
- `state` (path): Sigla ou nome do estado. Ex: `roraima`

**Resposta 200 OK:**
```json
{
  "state": "Roraima",
  "sector": "Energia",
  "objective": "Reduzir dependência de geração fóssil e expandir renováveis",
  "baselineProblem": "Roraima depende fortemente de geração térmica fóssil devido à isolação do sistema elétrico nacional, com alto custo e emissões.",
  "estimatedInvestment": 420000000,
  "estimatedInvestmentFormatted": "R$ 420 milhões",
  "estimatedTimeline": "6 a 8 anos",
  "timelineMinYears": 6,
  "timelineMaxYears": 8,
  "avoidedEmissions": 180000,
  "avoidedEmissionsFormatted": "180 mil tCO₂/ano",
  "priorityProjects": [
    "Usinas solares distribuídas",
    "Armazenamento com baterias",
    "Modernização da rede",
    "Eficiência energética em cargas públicas"
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
      "estimatedInvestment": 160000000,
      "estimatedInvestmentFormatted": "R$ 160 milhões",
      "description": "Implantação de usinas solares fotovoltaicas de médio e grande porte próximas aos centros de carga, reduzindo a dependência de geração térmica."
    },
    {
      "id": "baterias",
      "name": "Armazenamento com baterias",
      "impact": "Médio",
      "cost": "Alto",
      "timeline": "3 a 5 anos",
      "timelineMinYears": 3,
      "timelineMaxYears": 5,
      "estimatedInvestment": 110000000,
      "estimatedInvestmentFormatted": "R$ 110 milhões",
      "description": "Sistemas de armazenamento de energia (BESS) para firmar a geração solar e atender picos de demanda noturna."
    },
    {
      "id": "modernizacao-rede",
      "name": "Modernização da rede",
      "impact": "Alto",
      "cost": "Alto",
      "timeline": "5 a 8 anos",
      "timelineMinYears": 5,
      "timelineMaxYears": 8,
      "estimatedInvestment": 120000000,
      "estimatedInvestmentFormatted": "R$ 120 milhões",
      "description": "Reforço e digitalização da infraestrutura de transmissão e distribuição para absorver novas fontes renováveis e reduzir perdas."
    },
    {
      "id": "eficiencia-publica",
      "name": "Eficiência energética em cargas públicas",
      "impact": "Médio",
      "cost": "Baixo",
      "timeline": "1 a 2 anos",
      "timelineMinYears": 1,
      "timelineMaxYears": 2,
      "estimatedInvestment": 30000000,
      "estimatedInvestmentFormatted": "R$ 30 milhões",
      "description": "Substituição de luminárias, eficientização de prédios públicos e gestão inteligente da demanda."
    }
  ]
}
```

**Schema:** `DecarbonizationScenario`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `state` | string | Nome do estado |
| `sector` | string | Setor econômico alvo |
| `objective` | string | Objetivo geral do cenário |
| `baselineProblem` | string | Descrição do problema atual |
| `estimatedInvestment` | number | Valor em reais (centavos) |
| `estimatedInvestmentFormatted` | string | Valor legível |
| `estimatedTimeline` | string | Descrição textual do prazo |
| `timelineMinYears` | number | Prazo mínimo em anos |
| `timelineMaxYears` | number | Prazo máximo em anos |
| `avoidedEmissions` | number | tCO₂/ano evitados |
| `avoidedEmissionsFormatted` | string | Valor legível |
| `priorityProjects` | string[] | Lista de nomes de projetos prioritários |
| `levers` | DecarbonizationLever[] | Alavancas do plano |

**Schema:** `DecarbonizationLever`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Slug único da alavanca |
| `name` | string | Nome legível |
| `impact` | "Alto" \| "Médio" \| "Baixo" | Impacto na descarbonização |
| `cost` | "Alto" \| "Médio" \| "Baixo" | Nível de custo relativo |
| `timeline` | string | Faixa de anos legível |
| `timelineMinYears` | number | Prazo mínimo |
| `timelineMaxYears` | number | Prazo máximo |
| `estimatedInvestment` | number | Valor em reais |
| `estimatedInvestmentFormatted` | string | Valor legível |
| `description` | string | Explicação técnica |

---

### 3. Regiões prioritárias

```http
GET /api/decarbonization/regions/{state}
```

**Parâmetros:**
- `state` (path): Ex: `roraima`

**Resposta 200 OK:**
```json
{
  "state": "Roraima",
  "sector": "Energia",
  "regions": [
    {
      "id": "boa-vista-mucajai",
      "name": "Boa Vista — Mucajaí",
      "score": 78,
      "project": "Usina solar fotovoltaica de 5 MW",
      "estimatedInvestment": 18500000,
      "estimatedInvestmentFormatted": "R$ 18,5 milhões",
      "payback": 6.8,
      "risk": "Médio",
      "contributionToPlan": "Alta",
      "recommendation": "Avançar para estudo técnico",
      "explanation": "Bom potencial solar, proximidade relativa da infraestrutura elétrica e menor sobreposição aparente com áreas de restrição crítica."
    },
    {
      "id": "rorainopolis",
      "name": "Rorainópolis",
      "score": 71,
      "project": "Usina solar fotovoltaica de 5 MW",
      "estimatedInvestment": 22000000,
      "estimatedInvestmentFormatted": "R$ 22 milhões",
      "payback": 7.4,
      "risk": "Médio",
      "contributionToPlan": "Média",
      "recommendation": "Avaliar conexão e logística",
      "explanation": "Irradiação solar favorável e potencial para atender demanda regional. Requer estudo de capacidade de rede."
    },
    {
      "id": "caracarai",
      "name": "Caracaraí",
      "score": 64,
      "project": "Usina solar fotovoltaica de 3 MW",
      "estimatedInvestment": 14000000,
      "estimatedInvestmentFormatted": "R$ 14 milhões",
      "payback": 8.1,
      "risk": "Médio",
      "contributionToPlan": "Média",
      "recommendation": "Requer análise logística",
      "explanation": "Posição intermediária no estado com potencial solar adequado. Distância de conexão pode elevar CAPEX."
    },
    {
      "id": "pacaraima",
      "name": "Pacaraima",
      "score": 49,
      "project": "Estudo preliminar necessário",
      "estimatedInvestment": null,
      "estimatedInvestmentFormatted": "Indeterminado",
      "payback": 9.2,
      "risk": "Alto",
      "contributionToPlan": "Baixa",
      "recommendation": "Evitar prospecção inicial sem due diligence",
      "explanation": "Risco socioambiental alto na triagem preliminar. Não recomendada para prospecção inicial da demo."
    }
  ]
}
```

**Schema:** `InvestmentRegion`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Slug único da região |
| `name` | string | Nome legível |
| `score` | number | Score de 0 a 100 |
| `project` | string | Tipo de projeto recomendado |
| `estimatedInvestment` | number \| null | Valor em reais (ou null) |
| `estimatedInvestmentFormatted` | string | Valor legível |
| `payback` | number | Anos de payback estimado |
| `risk` | "Baixo" \| "Médio" \| "Alto" | Risco socioambiental |
| `contributionToPlan` | "Alta" \| "Média" \| "Baixa" | Contribuição para o plano estadual |
| `recommendation` | string | Recomendação executiva |
| `explanation` | string | Justificativa técnica |

---

### 4. Restrições socioambientais

```http
GET /api/decarbonization/restrictions/{state}
```

**Parâmetros:**
- `state` (path): Ex: `roraima`

**Resposta 200 OK:**
```json
{
  "state": "Roraima",
  "layers": [
    {
      "id": "terras-indigenas",
      "name": "Terras indígenas",
      "type": "territorial",
      "severity": "critical",
      "description": "Camada indicativa para evitar sobreposição e apoiar consulta adequada nos estudos posteriores."
    },
    {
      "id": "unidades-conservacao",
      "name": "Unidades de conservação",
      "type": "ambiental",
      "severity": "attention",
      "description": "Áreas protegidas que exigem avaliação legal, ambiental e de compatibilidade do projeto."
    },
    {
      "id": "areas-embargadas",
      "name": "Áreas embargadas",
      "type": "legal",
      "severity": "critical",
      "description": "Sinalizam necessidade de due diligence antes de qualquer decisão de prospecção."
    },
    {
      "id": "app-reserva-legal",
      "name": "APP / Reserva Legal",
      "type": "legal",
      "severity": "attention",
      "description": "Indicadores de restrição de uso do solo que precisam ser confirmados em base oficial."
    },
    {
      "id": "conflitos-fundiarios",
      "name": "Conflitos fundiários",
      "type": "territorial",
      "severity": "critical",
      "description": "Alertas preliminares para validação de titularidade, posse e governança territorial."
    }
  ]
}
```

**Schema:** `RestrictionLayer`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Slug único da camada |
| `name` | string | Nome legível |
| `type` | string | Categoria da restrição |
| `severity` | "critical" \| "attention" \| "info" | Nível de gravidade |
| `description` | string | Explicação da restrição |

---

### 5. Relatório executivo

```http
GET /api/decarbonization/report/{state}
```

**Parâmetros:**
- `state` (path): Ex: `roraima`

**Resposta 200 OK:**
```json
{
  "title": "Plano Preliminar de Descarbonização",
  "subtitle": "Setor de Energia — Estado de Roraima",
  "executiveSummary": "Roraima apresenta dependência crítica de geração térmica fóssil devido à isolação do SIN. A trajetória preliminar de descarbonização envolve a expansão de usinas solares distribuídas, armazenamento com baterias, modernização da rede e eficiência energética em cargas públicas. O investimento estimado é de R$ 420 milhões, com prazo de 6 a 8 anos e potencial de evitar 180 mil tCO₂/ano.",
  "estimatedInvestment": 420000000,
  "estimatedInvestmentFormatted": "R$ 420 milhões",
  "estimatedTimeline": "6 a 8 anos",
  "timelineMinYears": 6,
  "timelineMaxYears": 8,
  "avoidedEmissions": 180000,
  "avoidedEmissionsFormatted": "180 mil tCO₂/ano",
  "priorityRegion": {
    "id": "boa-vista-mucajai",
    "name": "Boa Vista — Mucajaí",
    "score": 78,
    "recommendation": "Avançar para estudo técnico"
  },
  "levers": [
    {
      "id": "solar-distribuida",
      "name": "Usinas solares distribuídas",
      "impact": "Alto",
      "cost": "Médio",
      "timeline": "2 a 4 anos",
      "estimatedInvestment": 160000000,
      "estimatedInvestmentFormatted": "R$ 160 milhões"
    },
    {
      "id": "baterias",
      "name": "Armazenamento com baterias",
      "impact": "Médio",
      "cost": "Alto",
      "timeline": "3 a 5 anos",
      "estimatedInvestment": 110000000,
      "estimatedInvestmentFormatted": "R$ 110 milhões"
    },
    {
      "id": "modernizacao-rede",
      "name": "Modernização da rede",
      "impact": "Alto",
      "cost": "Alto",
      "timeline": "5 a 8 anos",
      "estimatedInvestment": 120000000,
      "estimatedInvestmentFormatted": "R$ 120 milhões"
    },
    {
      "id": "eficiencia-publica",
      "name": "Eficiência energética em cargas públicas",
      "impact": "Médio",
      "cost": "Baixo",
      "timeline": "1 a 2 anos",
      "estimatedInvestment": 30000000,
      "estimatedInvestmentFormatted": "R$ 30 milhões"
    }
  ],
  "risks": [
    {
      "id": "terras-indigenas",
      "name": "Terras indígenas",
      "severity": "critical",
      "description": "Requer consulta adequada e evitar sobreposição em estudos posteriores."
    },
    {
      "id": "custo-conexao",
      "name": "Custo de conexão elétrica",
      "severity": "attention",
      "description": "Distância da rede pode elevar CAPEX em regiões mais remotas."
    },
    {
      "id": "validacao-fundiaria",
      "name": "Validação fundiária",
      "severity": "attention",
      "description": "Due diligence de titularidade e posse necessária antes de investimentos."
    }
  ],
  "nextSteps": [
    "Executar due diligence territorial nas regiões prioritárias",
    "Solicitar estudo de conexão à concessionária local",
    "Validar CAPEX com fornecedores e EPCs locais",
    "Iniciar triagem jurídica e ambiental especializada",
    "Elaborar estudo técnico detalhado para Boa Vista — Mucajaí"
  ]
}
```

**Schema:** `ReportData`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `title` | string | Título do relatório |
| `subtitle` | string | Subtítulo |
| `executiveSummary` | string | Resumo executivo em texto corrido |
| `estimatedInvestment` | number | Valor total em reais |
| `estimatedInvestmentFormatted` | string | Valor legível |
| `estimatedTimeline` | string | Prazo legível |
| `timelineMinYears` | number | Prazo mínimo |
| `timelineMaxYears` | number | Prazo máximo |
| `avoidedEmissions` | number | tCO₂/ano |
| `avoidedEmissionsFormatted` | string | Valor legível |
| `priorityRegion` | object | Região prioritária resumida |
| `levers` | object[] | Alavancas resumidas |
| `risks` | object[] | Riscos identificados |
| `nextSteps` | string[] | Próximos passos recomendados |

---

## Erros

Todos os endpoints retornam erros no formato:

```json
{
  "error": "Descrição legível do erro",
  "detail": "Informação técnica adicional (opcional)"
}
```

**Status codes:**
- `400` — Requisição inválida (parâmetro ausente ou malformado)
- `404` — Estado não encontrado / cenário não disponível
- `500` — Erro interno do servidor

---

## Notas de implementação

1. **Valores formatados**: todos os endpoints retornam tanto o valor numérico bruto quanto uma versão formatada para exibição. Isso facilita o frontend e permite evolução futura para internacionalização.
2. **Estado hardcoded**: no MVP, apenas `roraima` é aceito. Outros estados podem retornar `404`.
3. **Dados semi-mockados**: os valores vêm de lógica estática no service layer. Não há consulta a banco de dados ou API externa nesta fase.
4. **Extensibilidade**: novos campos podem ser adicionados aos schemas sem quebrar contratos existentes. Mantenha campos obrigatórios mínimos.
