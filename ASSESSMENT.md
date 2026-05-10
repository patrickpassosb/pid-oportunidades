# PID Oportunidades — Avaliação Técnica Completa do Projeto

> Data da análise: 2026-05-10  
> Contexto: Hackathon — 6 horas restantes  
> Status: Projeto funcional, com oportunidades significativas de diferenciação

---

## 1. Visão Geral do Projeto

O **PID Oportunidades** é uma plataforma de inteligência de dados para descarbonização regional, com foco inicial em **Roraima**. O sistema integra dados reais de APIs públicas (IBGE/SIDRA, ANEEL, NASA POWER, FUNAI/ICMBio) para calcular cenários de descarbonização, ranquear regiões de investimento e gerar relatórios executivos.

### Arquitetura
- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + Bun
- **Backend**: Python 3.12 + FastAPI + Uvicorn
- **Dados**: Ingestão real de APIs públicas brasileiras, cache local em JSON com TTL de 24h
- **Deploy**: Railway (backend) + Vercel (frontend)

---

## 2. Erros e Problemas Atuais

### 2.1 Erro TypeScript — `app/regiao/[slug]/page.tsx`

**Local**: `@/frontend/app/regiao/[slug]/page.tsx:15`

**Código problemático**:
```tsx
const data = await getInvestmentRegions();
const region = data.regions.find((r) => r.id === slug);
```

**Erro**: `TS18047: 'data' is possibly 'null'`

**Explicação**: A função `getInvestmentRegions()` retorna `Promise<InvestmentRegionsResponse | null>`. O código acessa `data.regions` sem verificar se `data` existe, o que pode causar um crash em runtime se o backend estiver indisponível.

**Impacto**: O build não falha (exit code 0), mas o TypeScript reporta o erro. Em produção, se a API falhar, o usuário verá uma página de erro genérica do Next.js em vez do tratamento adequado.

---

### 2.2 Avisos de Static Generation — `Dynamic server usage`

**Rotas afetadas**: `/restricoes`, `/simulacao`, `/relatorio`, `/mapa`, `/regiao/[slug]`, `/comparativo`, `/copiloto`, `/metodologia`

**Mensagem completa**:
```
Dynamic server usage: Route /simulacao couldn't be rendered statically
because it used revalidate: 0 fetch http://localhost:8000/api/decarbonization/scenario/roraima
```

**Explicação**: O Next.js App Router tenta pré-renderizar páginas durante o `next build`. Como as páginas fazem `fetch` para `localhost:8000` com `cache: "no-store"`, o build não consegue executar essas requisições (o backend não está rodando no momento do build), causando falha no pré-renderizado.

**Comportamento atual**: O build não quebra porque o `fetchJson` captura erros e retorna `null`. As páginas então renderizam com dados `null` durante o build, e depois fazem client-side fetch (se houver) ou mostram estados de erro.

**Impacto**:
- As páginas marcadas como `ƒ (Dynamic)` são renderizadas no servidor sob demanda, não como HTML estático
- Isso significa que o TTFB (Time To First Byte) será maior para essas páginas
- SEO é comprometido porque o conteúdo não está no HTML inicial
- Se o backend estiver fora no momento do acesso, o usuário vê erro em vez de conteúdo

---

### 2.3 Páginas Renderizam com Dados Nulos no Build

**Exemplo**: Durante o `next build`, a página `/simulacao` recebe `null` de `getDecarbonizationScenario()` porque o backend `localhost:8000` não está acessível no ambiente de build. O componente entra no branch de erro (`if (!scenario)`), renderizando o `<ErrorState>` em vez do conteúdo real.

**Impacto**:
- O HTML gerado no build contém a mensagem de erro, não os dados reais
- O usuário nunca vê o conteúdo real no primeiro paint (após hydration, se houver client-side fetch)
- No entanto, como as funções são `async` em Server Components, elas re-executam no servidor a cada request em produção, então o conteúdo real aparece em runtime

---

## 3. Oportunidades de Melhoria (Funcionalidades Faltantes)

### 3.1 Copiloto PID — Completamente Estático

**Local**: `@/frontend/components/copilot/CopilotWidget.tsx`

**Estado atual**:
- O widget é um componente cliente (`"use client"`) com estado de abrir/fechar
- Todo o conteúdo do chat é hardcoded — uma única pergunta e uma única resposta fixas
- A área de input (textarea) não envia nada; o botão "send" não tem handler
- As sugestões rápidas são botões estáticos sem ação

**Código problemático**:
```tsx
// Linha 61 — pergunta fixa
<p className="font-body-md text-body-md text-primary">
  Qual a avaliação geral do eixo Boa Vista — Mucajaí comparado ao
  restante do estado?
</p>

// Linha 126 — textarea sem onChange ou onSubmit
<textarea
  className="..."
  placeholder="Faça uma pergunta sobre os dados..."
></textarea>

// Linha 130 — botão send sem onClick
<button className="...">
  <span className="material-symbols-outlined text-[18px]">send</span>
</button>
```

**Impacto**: Para um hackathon, um assistente de IA é um dos maiores diferenciadores. Ter um widget puramente decorativo desperdiça uma oportunidade enorme de impressionar os jurados.

**Opções de solução**:
1. **Regra-base (rápido)**: Parsear palavras-chave da pergunta ("custo", "prazo", "região", "score", "risco") e responder com dados sintetizados da API
2. **LLM real (impacto alto)**: Integrar Cerebra/Groq API com um system prompt que injeta os dados atuais do cenário/região

---

### 3.2 Ausência de Visualizações de Dados

**Páginas afetadas**: `/simulacao`, `/regiao/[slug]`, `/relatorio`

**Estado atual**:
- `/simulacao` mostra números em cards e texto em cards — nenhum gráfico
- `/regiao/[slug]` mostra apenas métricas em cards — não há visualização do score breakdown
- `/relatorio` é puramente textual

**Impacto**: Em uma apresentação de hackathon, jurados processam visualmente dados em segundos, mas precisam de minutos para ler texto. A ausência de gráficos torna a plataforma menos persuasiva.

**Sugestões de gráficos**:
- **Pie/Donut chart**: Breakdown do investimento total por alavanca
- **Horizontal bar chart**: Timeline das alavancas mostrando sobreposição
- **Radar chart**: Score breakdown das 5 dimensões (demand, infrastructure, decarbonization, restriction, economic)
- **Bar chart comparativo**: Regiões ranqueadas por score

---

### 3.3 Simulação Não é Interativa

**Página**: `/simulacao`

**Estado atual**:
- Os valores (investimento, prazo, emissões) são estáticos vindos da API
- O usuário não pode alterar parâmetros para ver cenários alternativos
- Não há sliders, toggles, ou inputs que modifiquem o cenário

**Exemplo do que falta**:
- Slider: "Percentual de substituição da geração térmica" → 30% a 70%
- Toggle: "Incluir armazenamento com baterias" → sim/não
- Slider: "Porte médio das usinas solares" → 3 MW a 10 MW

**Impacto**: O nome da página é "Simulação", mas não há interatividade. Isso contradiz a expectativa do usuário e reduz o valor da ferramenta.

---

### 3.4 Mapa é um Mock Estático

**Local**: `@/frontend/components/map/MapMock.tsx`

**Estado atual**:
- O componente `MapMock` renderiza uma imagem ou SVG estático de um mapa
- Não há interatividade: não é possível clicar em regiões, fazer zoom, ou ver overlays
- As coordenadas geográficas reais dos municípios de Roraima não são utilizadas

**Impacto**: Um mapa interativo é fundamental para uma ferramenta de análise geoespacial. O mock atual funciona para demonstração básica, mas não transmite a profundidade da análise que o backend realmente faz.

---

### 3.5 Exportação de PDF Desabilitada

**Local**: `@/frontend/app/relatorio/page.tsx:12-14`

**Código**:
```tsx
<Button disabled title="Geração de PDF em desenvolvimento" type="button">
  Baixar PDF
</Button>
```

**Impacto**: Um relatório executivo que não pode ser exportado perde grande parte do valor prático para stakeholders. Hackathon judges valorizam "entregáveis" que o usuário pode levar consigo.

---

### 3.6 Tratamento de Loading e Estados de Erro Incompleto

**Estado atual**:
- As páginas usam Server Components async, então o Next.js mostra uma tela de loading padrão (ou não mostra nada) enquanto os dados são buscados
- Não há `loading.tsx` files nas rotas
- O tratamento de erro existe (`<ErrorState>`), mas é genérico: não oferece retry, não explica o problema em detalhes, não mostra dados parciais

**Páginas sem loading state adequado**:
- `/simulacao` — se o backend demorar, o usuário vê tela em branco
- `/mapa` — mesma situação
- `/relatorio` — mesma situação

---

## 4. Problemas Arquiteturais Menores

### 4.1 Variável de Ambiente para API URL

**Local**: `@/frontend/lib/api.ts`

**Código**:
```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
```

**Problema**: Durante o `next build`, `NEXT_PUBLIC_API_URL` pode não estar definida no ambiente de build. Isso força o fallback para `localhost:8000`, que não está acessível, causando os erros de static generation.

**Solução**: Adicionar um arquivo `.env.local` com `NEXT_PUBLIC_API_URL` apontando para a URL de produção do Railway durante o build.

### 4.2 Hardcoded "Roraima" em Múltiplos Lugares

**Ocorrências**:
- `frontend/app/page.tsx:21` — texto fixo "Roraima"
- `frontend/app/simulacao/page.tsx:26` — título fixo "Roraima — Simulação..."
- `frontend/app/configuracao/page.tsx:59` — configuração fixa de estado
- `frontend/app/mapa/page.tsx` — plano fixo "Descarbonização de Roraima"

**Problema**: A arquitetura do backend já suporta outros estados via parâmetro `state`, mas o frontend está completamente travado em Roraima. Para o hackathon MVP isso é aceitável, mas deveria ser documentado como limitação consciente.

---

## 5. Pontos Fortes do Projeto (Manter)

### 5.1 Backend Bem-Arquiteturado
- Separação clara entre routes, services e data layer
- Ingestão real de dados com cache e TTL
- Scoring engine multicritério explicável com pesos documentados
- Contrato de API bem definido em `docs/api-contract.md`
- Tratamento de fallback para dados indisponíveis

### 5.2 Frontend com Design System Consistente
- Tokens de design bem definidos (`globals.css`)
- Componentes reutilizáveis (`MetricCard`, `Button`, `AppShell`, etc.)
- Acessibilidade presente (`aria-label`, roles semânticas)
- Tipagem TypeScript completa em `lib/types.ts`

### 5.3 Integração Frontend-Backend Funcional
- Todas as páginas principais consomem a API corretamente
- Tratamento de erro existe (embora possa ser melhorado)
- Fallback para dados mockados está documentado e preparado

---

## 6. Plano de Ação Recomendado (6 Horas)

### Prioridade 1 — Diferenciadores de Hackathon (3h)

| Tarefa | Tempo | Impacto |
|--------|-------|---------|
| **Copilot funcional** (rule-based com dados reais) | 1.5h | Maior diferenciador possível |
| **Gráficos de investimento e timeline** (2-3 charts) | 1.5h | Visual instantâneo para jurados |

### Prioridade 2 — Interatividade (2h)

| Tarefa | Tempo | Impacto |
|--------|-------|---------|
| **Sliders de simulação** (substituição térmica, porte) | 1.5h | Transforma página estática em ferramenta |
| **Mapa interativo** (Leaflet com markers por região) | 1.5h | (Alternativa: 1h se usar só o mapa básico) |

### Prioridade 3 — Polimento (1h)

| Tarefa | Tempo | Impacto |
|--------|-------|---------|
| **Fix TypeScript error** em `regiao/[slug]` | 15 min | Build limpo |
| **Adicionar `loading.tsx`** nas rotas principais | 20 min | UX fluida |
| **Habilitar PDF export** (`window.print()` ou biblioteca) | 25 min | Entregável para stakeholders |

---

## 7. Checklist de Verificação Pré-Entrega

- [ ] `bun run typecheck` passa sem erros
- [ ] `bun run build` passa sem warnings críticos
- [ ] `uvicorn app.main:app --reload` inicia sem erros
- [ ] Copilot responde a pelo menos 3 perguntas diferentes
- [ ] `/simulacao` mostra pelo menos 1 gráfico
- [ ] `/mapa` permite interação (zoom, click) ou mostra dados reais
- [ ] `/relatorio` permite exportar/download
- [ ] Todas as páginas têm estado de loading
- [ ] Backend retorna dados em < 2 segundos para todas as rotas

---

## 8. Código de Referência — Fixes Rápidos

### Fix 2.1 — TypeScript null check
```tsx
// Em app/regiao/[slug]/page.tsx
const data = await getInvestmentRegions();

if (!data || !data.regions) {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto pt-12">
        <ErrorState message="Não foi possível carregar os dados da região." />
      </div>
    </AppShell>
  );
}

const region = data.regions.find((r) => r.id === slug);
```

### Fix 2.2 — Static generation com fallback
```tsx
// Em lib/api.ts, adicionar dados de fallback para build-time
const FALLBACK_SCENARIO: DecarbonizationScenario = { /* ... */ };

export async function getDecarbonizationScenario() {
  const data = await fetchJson<DecarbonizationScenario>("...");
  return data ?? FALLBACK_SCENARIO; // nunca retorna null durante build
}
```

### Fix 3.5 — PDF export básico
```tsx
// Em relatorio/page.tsx
<Button
  onClick={() => window.print()}
  type="button"
>
  Baixar PDF
</Button>
```
E adicionar media query CSS para esconder elementos na impressão.

---

## 9. Conclusão

O projeto tem uma **base técnica sólida** — backend com dados reais, scoring engine, e frontend bem estruturado. O que falta para brilhar em um hackathon são os **elementos de demonstração**: o copiloto funcional, gráficos interativos, e a sensação de que o usuário está realmente "simulando" algo, não apenas visualizando um relatório estático.

As **6 horas restantes** são suficientes para implementar os 3 maiores diferenciadores (copilot, charts, sliders) se o foco for mantido. O risco principal é tentar fazer tudo e não terminar nada com qualidade.

**Recomendação estratégica**: Foque no copilot funcional e em 2 gráficos. Isso já diferencia o projeto de 80% dos outros participantes.
