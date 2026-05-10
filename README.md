# PID Oportunidades — Decarbonization Intelligence System

O **PID Oportunidades** é uma plataforma de inteligência de dados voltada para a descarbonização regional e setorial. O sistema permite simular trajetórias de descarbonização, estimar investimentos, prazos e identificar as regiões mais promissoras para projetos de energia limpa, com foco inicial no estado de Roraima.

## 🚀 Visão Geral

A aplicação evoluiu de um buscador de usinas solares para uma ferramenta estratégica de planejamento. Ela responde a perguntas críticas como:
- **Quanto custa** descarbonizar uma região?
- **Quanto tempo** leva a transição?
- **Onde investir** prioritariamente para maximizar o impacto?

## 🛠️ Tecnologias

O projeto é dividido em uma arquitetura moderna de frontend e backend:

### Frontend
- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Biblioteca:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Runtime:** [Bun](https://bun.sh/)

### Backend
- **Linguagem:** [Python 3.12+](https://www.python.org/)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Servidor:** [Uvicorn](https://www.uvicorn.org/)
- **Banco de Dados:** SQLAlchemy (preparado para integração)
- **Fontes de Dados:** Integrações com SIDRA (IBGE), ANEEL, ONS e NASA.

## 📂 Estrutura do Repositório

```text
pid-oportunidades/
├── frontend/        # Aplicação Next.js (Interface do usuário)
├── backend/         # API FastAPI (Processamento e dados)
├── docs/            # Documentação técnica e especificações de design
├── SVG/             # Ativos visuais (Logos e ícones)
└── README.md        # Este arquivo
```

## 📋 Principais Funcionalidades

1.  **Configuração de Cenários:** Definição de setor e estado para análise de descarbonização.
2.  **Simulação de Trajetória:** Visualização de alavancas (ex: solar, baterias, eficiência), custos e cronogramas.
3.  **Mapa de Oportunidades:** Identificação de regiões prioritárias com scores técnicos e socioambientais.
4.  **Relatório Executivo:** Consolidação de dados para tomada de decisão em formato executivo.
5.  **Restrições Socioambientais:** Camadas geográficas de áreas protegidas, terras indígenas e restrições legais.
6.  **Copiloto PID:** Assistente inteligente para suporte na análise de dados.

## ⚙️ Como Executar

### Pré-requisitos
- [Bun](https://bun.sh/) (para o frontend)
- [Python 3.12+](https://www.python.org/) (para o backend)

### Backend
1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Inicie o servidor:
   ```bash
   uvicorn app.main:app --reload
   ```
   A API estará disponível em `http://localhost:8000`.

### Frontend
1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   bun install
   ```
3. Inicie o ambiente de desenvolvimento:
   ```bash
   bun dev
   ```
   Acesse a aplicação em `http://localhost:3000`.

## 📄 Documentação Adicional

Para detalhes técnicos mais profundos, consulte a pasta `docs/`:
- [Arquitetura do Projeto](docs/pivot-marina-arquitetura.md)
- [Contrato de API](docs/api-contract.md)

---
*Desenvolvido como parte do projeto PID (Painel de Inteligência de Descarbonização).*
