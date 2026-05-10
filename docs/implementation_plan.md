# Plano de Implementação (PID Oportunidades)

Este plano detalha as melhorias propostas pelo `ASSESSMENT.md`, com **exceção do Copilot**, dividindo-as em tarefas atômicas. Como solicitado, executarei cada tarefa individualmente e pausarei após cada uma para que você possa revisar e **realizar os commits separadamente**, simulando uma execução "attended" do Ralph Loop.

> [!IMPORTANT]
> **Revisão de Usuário Necessária**
> Verifique se as tarefas e ferramentas sugeridas abaixo (como o uso de `recharts` para gráficos e `react-leaflet` para o mapa) estão de acordo com sua visão para o Hackathon.

## Tarefas a Implementar (Em Ordem)

### 1. Correção de TypeScript (`Prioridade 3`)
- **Modificar**: `frontend/app/regiao/[slug]/page.tsx`
- **Ação**: Adicionar verificação de nulidade (`if (!data || !data.regions)`) antes de tentar acessar `.find()`. Isso garantirá que o build ocorra limpo e previne crash no frontend.

### 2. Adição de Loading States (`Prioridade 3`)
- **Novos Arquivos**: 
  - `frontend/app/simulacao/loading.tsx`
  - `frontend/app/mapa/loading.tsx`
  - `frontend/app/relatorio/loading.tsx`
- **Ação**: Implementar componentes de skeleton/loading nestas rotas para melhorar a Experiência do Usuário (UX) enquanto o `Server Component` faz fetch do backend.

### 3. Melhoria no Static Generation (Build) (`Problema Arquitetural`)
- **Modificar**: `frontend/lib/api.ts` (ou similar)
- **Ação**: Adicionar fallbacks explícitos se os dados não vierem no momento do build, ou verificar o uso de `process.env.NEXT_PUBLIC_API_URL` para apontar corretamente durante o CI/CD (evitando chamadas frustradas no `localhost`).
- **Novo Arquivo**: `frontend/.env.local` contendo as variáveis padrão.

### 4. Exportação de PDF (`Prioridade 3`)
- **Modificar**: `frontend/app/relatorio/page.tsx` e `frontend/app/globals.css`
- **Ação**: Ativar o botão "Baixar PDF" utilizando a função nativa `window.print()`. Adicionar media queries CSS (`@media print`) para esconder a sidebar e botões na visualização de impressão, focando apenas no conteúdo do relatório.

### 5. Simulação Interativa (Sliders) (`Prioridade 2`)
- **Modificar**: `frontend/app/simulacao/page.tsx`
- **Ação**: Transformar a página em interativa (pode precisar virar `"use client"` ou ter Client Components encapsulados) e adicionar controles como sliders simulados ou toggles (ex: Substituição Térmica, Armazenamento com baterias) que ajustem visualmente ou re-calculem os indicadores de forma heurística no lado do cliente (MVP para o Hackathon).

### 6. Visualização de Dados (Gráficos) (`Prioridade 1`)
- **Ação Preliminar**: Executar a instalação de bibliotecas gráficas. Sugestão: `bun add recharts`.
- **Modificar**: `frontend/app/simulacao/page.tsx` e `frontend/app/regiao/[slug]/page.tsx`
- **Ação**: Adicionar gráficos interativos e visuais (Pie/Donut de investimentos, Radar chart para o Score da região) visando causar maior impacto na demonstração para os jurados.

### 7. Mapa Interativo (`Prioridade 2`)
- **Ação Preliminar**: Instalar `leaflet` e `react-leaflet` ou fazer mapa via SVG nativo enriquecido. Sugestão: `bun add leaflet react-leaflet @types/leaflet`
- **Modificar**: Componente `MapMock` / `frontend/app/mapa/page.tsx`
- **Ação**: Substituir o mapa puramente estático por um interativo.

---

## Verificação e Execução
Como você solicitou "poder commitar tudo separadamente", funcionará da seguinte maneira:
1. Assim que você aprovar este plano, criarei o arquivo `task.md`.
2. Implementarei a **Tarefa 1**. Em seguida, vou **parar a execução** e informá-lo.
3. Você faz o commit localmente.
4. Você me pede para prosseguir ("pode ir para a próxima"). E repetimos o ciclo.

## Open Questions

- Você aprova a instalação de `recharts` e `react-leaflet` via Bun para cumprir as tarefas de Gráficos e Mapa Interativo rapidamente e com qualidade? Ou prefere apenas componentes nativos / SVG simples?
- A estratégia de execução passo a passo está alinhada com o que você quis dizer em relação a "poder fazer o commit separadamente"?

Por favor, forneça sua aprovação ou ajustes para começarmos!
