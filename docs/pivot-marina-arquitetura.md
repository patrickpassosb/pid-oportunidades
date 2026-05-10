# Pivot Marina — Arquitetura do Projeto

> Data: 2026-05-10
> Responsável: Agente Arquiteto/Coordenador
> Status: Especificação para implementação

---

## 1. Mudança na tese do produto

### Antes
> "Onde investir em energia limpa?"

A aplicação era um buscador de regiões para instalar usinas solares fotovoltaicas em Roraima. O usuário escolhia um tipo de projeto e porte, e o sistema mostrava um mapa com regiões ranqueadas por score técnico.

### Depois
> "Quanto custa, quanto tempo leva e onde investir para descarbonizar uma região, setor ou estado?"

A aplicação agora é uma **ferramenta de simulação de trajetória de descarbonização**. O fluxo passa a ser:

1. **Configurar** o cenário (estado/setor)
2. **Simular** a trajetória de descarbonização (alavancas, custo, tempo)
3. **Visualizar no mapa** as regiões prioritárias para execução
4. **Explorar uma região** específica
5. **Gerar relatório executivo** com recomendações

O foco deixou de ser "qual cidade é melhor para uma usina solar?" e passou a ser "qual o plano preliminar para descarbonizar o setor de energia de Roraima?".

---

## 2. Arquitetura anterior

### Frontend (Next.js + React + TypeScript + Bun)
- Páginas estáticas com dados mockados em `frontend/data/`
- Rotas existentes:
  - `/` — Home com KPIs globais genéricos
  - `/configuracao` — Escolhe tipo de projeto e porte
  - `/mapa` — Mapa de oportunidades (usinas solares)
  - `/regiao/boa-vista-mucajai` — Detalhe de uma região
  - `/relatorio` — Relatório preliminar de uma região
  - `/restricoes` — Visualizador de restrições socioambientais
  - `/comparativo` — Tabela comparativa de regiões
  - `/copiloto` — Chat mockado com contexto da análise
- Dados mockados em: `frontend/data/regions.ts`, `frontend/data/layers.ts`, `frontend/data/report.ts`
- Componentes reutilizáveis em `frontend/components/`
- Estilização: Tailwind CSS com design system customizado

### Backend (Python + FastAPI)
- `backend/app/main.py` — Entrypoint FastAPI
- Rotas existentes (prefixos):
  - `/sidra/*` — Dados do IBGE/SIDRA (população, PIB, densidade econômica)
  - `/aneel/*` — Dados abertos ANEEL (usinas, solar, eólica, hidrelétricas, transmissão, geração)
  - `/ons/*` — Dados ONS (carga, geração, subsistemas, intercâmbio, reservatórios, operação, transmissão, consumo regional)
  - `/nasa/*` — (serviço existente, consultar NASA)
- Services: consomem APIs públicas externas (SIDRA, ANEEL, ONS)
- Banco: `backend/app/database/database.py` — stub existente

### Integração anterior
- **Nenhuma**. O frontend não consumia o backend. Todos os dados vinham de arquivos `.ts` estáticos.

---

## 3. Nova arquitetura

### Princípios
1. O frontend passa a consumir o backend via HTTP
2. O backend serve dados semi-mockados (estruturados, mas com valores preenchidos manualmente)
3. A arquitetura permite evoluir para dados reais sem quebrar contratos
4. Rotas legadas não são apagadas; novas rotas são adicionadas sob `/api/decarbonization/*`
5. Telas legadas podem ser adaptadas ou criadas novas conforme o fluxo

### Frontend — Novo fluxo de rotas

```
/                          → Home (adaptar para novo posicionamento)
/configuracao              → Configuração do cenário de descarbonização
/simulacao                 → NOVA: Trajetória, alavancas, custo, tempo
/mapa                      → Adaptar: mostrar regiões prioritárias do plano
/regiao/:slug              → Adaptar: detalhe de região como parte do plano
/relatorio                 → Adaptar: relatório executivo do plano de descarbonização
```

**Telas legadas ainda podem existir mas não fazem parte do fluxo principal:**
- `/restricoes` — manter, mas linkar a partir do fluxo principal
- `/comparativo` — manter
- `/copiloto` — manter

### Backend — Novos endpoints

Prefixo: `/api/decarbonization`

| Endpoint | Descrição |
|----------|-----------|
| `GET /api/health` | Healthcheck da API |
| `GET /api/decarbonization/scenario/:state` | Cenário completo de descarbonização |
| `GET /api/decarbonization/regions/:state` | Regiões prioritárias para investimento |
| `GET /api/decarbonization/restrictions/:state` | Camadas de restrição socioambiental |
| `GET /api/decarbonization/report/:state` | Relatório executivo consolidado |

Endpoints legados (`/sidra`, `/aneel`, `/ons`, `/nasa`) **não devem ser removidos**. Eles podem ser usados futuramente para enriquecer os dados do cenário.

### Evolução de dados: mockado → real

| Campo | MVP (mock) | Futuro (real) |
|-------|-----------|---------------|
| `estimatedInvestment` | Valor fixo calculado manualmente | Modelo de custo baseado em dados de mercado |
| `estimatedTimeline` | Faixa de anos fixa | Modelo de prazo com dependências entre alavancas |
| `avoidedEmissions` | Valor fixo | Cálculo por fator de emissão evitada × capacidade |
| `score` | Score fixo por região | Modelo multicritério com pesos configuráveis |
| `priorityProjects` | Lista estática | Algoritmo de otimização de portfólio |
| `risk` | Classificação manual | Integração com camadas geoespaciais (IBAMA, ICMBio, FUNAI) |

---

## 4. Endpoints que o backend deve expor

Detalhamento completo em: [`docs/api-contract.md`](./api-contract.md)

Resumo:

- `GET /api/health`
- `GET /api/decarbonization/scenario/roraima`
- `GET /api/decarbonization/regions/roraima`
- `GET /api/decarbonization/restrictions/roraima`
- `GET /api/decarbonization/report/roraima`

---

## 5. Telas que o frontend deve chamar

| Rota | Origem dos dados | Ação recomendada |
|------|-----------------|------------------|
| `/` | Backend: `/api/decarbonization/scenario/roraima` (resumo) | Adaptar KPIs para refletir o plano de Roraima |
| `/configuracao` | Local (estático) | Manter, mas alterar texto para "configurar cenário de descarbonização" |
| `/simulacao` | Backend: `/api/decarbonization/scenario/roraima` | **Criar nova tela** — mostrar alavancas, investimento, timeline |
| `/mapa` | Backend: `/api/decarbonization/regions/roraima` | Adaptar para consumir API ao invés de `frontend/data/regions.ts` |
| `/regiao/:slug` | Backend: `/api/decarbonization/regions/roraima` | Adaptar para buscar região da API |
| `/relatorio` | Backend: `/api/decarbonization/report/roraima` | Adaptar `ReportPreview` para consumir API |

---

## 6. Contrato de dados

Os tipos principais estão definidos em `docs/api-contract.md`. Resumo dos schemas:

- `DecarbonizationScenario` — cenário macro (custo, tempo, emissões, alavancas)
- `DecarbonizationLever` — cada alavanca do plano
- `InvestmentRegion` — região priorizada no plano
- `RestrictionLayer` — camada de restrição territorial
- `ReportData` — relatório executivo consolidado

---

## 7. Hackathon MVP vs. Pós-hackathon

### MVP (esta entrega)
- [ ] Backend com dados semi-mockados nos 5 endpoints novos
- [ ] Frontend `/simulacao` consumindo cenário
- [ ] Frontend `/mapa` consumindo regiões da API
- [ ] Frontend `/relatorio` consumindo relatório da API
- [ ] Integração básica frontend ↔ backend (fetch)

### Pós-hackathon
- [ ] Modelagem real de cenários (permitir outros estados/setores)
- [ ] Cálculo dinâmico de investimento e payback
- [ ] Integração com APIs geoespaciais (IBAMA, ICMBio, INCRA)
- [ ] Autenticação e persistência de cenários salvos
- [ ] Exportação de relatório em PDF
- [ ] Simulação interativa (slider de alavancas, otimizador)

---

## 8. Divisão de trabalho entre agentes

### Agente Backend
**Responsabilidades:**
- Implementar os novos endpoints em `backend/app/routes/decarbonization.py`
- Criar `backend/app/services/decarbonization_service.py` com dados semi-mockados
- Adicionar o router em `backend/app/main.py` com prefixo `/api/decarbonization`
- Garantir que `GET /api/health` funcione
- **NÃO** apagar rotas legadas (`/sidra`, `/aneel`, `/ons`, `/nasa`)
- **NÃO** modificar o frontend

**Arquivos principais:**
- `backend/app/routes/decarbonization.py` (criar)
- `backend/app/services/decarbonization_service.py` (criar)
- `backend/app/main.py` (editar — incluir router)

### Agente Frontend
**Responsabilidades:**
- Criar a nova tela `/simulacao`
- Adaptar `/`, `/mapa`, `/regiao/:slug`, `/relatorio` para consumir a nova API
- Criar funções de fetch reutilizáveis (ex: `frontend/lib/api.ts`)
- Adaptar componentes existentes (`RegionCard`, `ReportPreview`, etc.) para usarem os novos tipos
- **NÃO** apagar arquivos de dados mockados (`frontend/data/*.ts`) — podem servir como fallback
- **NÃO** modificar o backend

**Arquivos principais:**
- `frontend/app/simulacao/page.tsx` (criar)
- `frontend/lib/api.ts` (criar)
- `frontend/app/page.tsx` (editar)
- `frontend/app/mapa/page.tsx` (editar)
- `frontend/app/regiao/[slug]/page.tsx` (criar — substituir rota fixa `boa-vista-mucajai`)
- `frontend/app/relatorio/page.tsx` (editar)

### Ordem de execução recomendada
1. **Backend primeiro** — criar os endpoints e serviços mockados, validar com curl/Postman
2. **Frontend em seguida** — implementar `lib/api.ts`, criar `/simulacao`, adaptar `/mapa` e `/relatorio`
3. **Polimento paralelo** — ajustar tipos TypeScript, tratar estados de loading/erro

### Arquivos que NÃO devem ser editados ao mesmo tempo
- `backend/app/main.py` — só o backend toca
- `frontend/app/layout.tsx` — pode ser editado por qualquer um, mas avisar
- `docs/api-contract.md` — só o arquiteto toca (salvo revisão)
- `docs/pivot-marina-arquitetura.md` — só o arquiteto toca (salvo revisão)

### Convenções
- Use `fetch` no frontend (Next.js App Router, server components quando possível)
- Base URL do backend:
  - **Desenvolvimento local:** `http://localhost:8000`
  - **Produção (Railway):** `https://pid-oportunidades-production.up.railway.app`
- Use variável de ambiente no frontend para alternar entre URLs:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8000   # dev
  NEXT_PUBLIC_API_URL=https://pid-oportunidades-production.up.railway.app  # prod
  ```
- Todos os endpoints retornam JSON com `Content-Type: application/json`
- Erros retornam `{ "error": "mensagem" }` com status HTTP adequado

---

## 9. Referências rápidas

### Estrutura de repositório
```
pid-oportunidades/
├── frontend/
│   ├── app/                 # Rotas Next.js App Router
│   ├── components/          # Componentes React
│   ├── data/                # Dados mockados (legado)
│   ├── lib/                 # Utilitários (api.ts vai aqui)
│   └── package.json         # Next.js 16 + React 19 + Bun
├── backend/
│   ├── app/
│   │   ├── main.py          # Entrypoint FastAPI
│   │   ├── routes/          # Routers (novo: decarbonization.py)
│   │   ├── services/        # Lógica de negócio (novo: decarbonization_service.py)
│   │   └── database/        # Stub de banco
│   └── ...
└── docs/
    ├── pivot-marina-arquitetura.md   # Este arquivo
    └── api-contract.md               # Contrato JSON
```

### Valores semi-mockados base
Ver seção "Valores recomendados" em `docs/api-contract.md`.

---

## 10. Checklist de aceite para próximos agentes

- [ ] `docs/pivot-marina-arquitetura.md` criado e revisado
- [ ] `docs/api-contract.md` criado e revisado
- [ ] Backend: endpoints novos retornam JSON conforme contrato
- [ ] Frontend: `/simulacao` existe e mostra alavancas
- [ ] Frontend: `/mapa` consome `/api/decarbonization/regions/roraima`
- [ ] Frontend: `/relatorio` consome `/api/decarbonization/report/roraima`
- [ ] Projeto não quebrado (`next build` e `uvicorn main:app` funcionam)
