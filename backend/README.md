# PID API — Backend

API FastAPI para o sistema de inteligência de descarbonização PID Oportunidades.

## 🚀 Tecnologias

- **Python 3.12+**
- **FastAPI**
- **Uvicorn**
- **Pydantic**
- **SQLAlchemy**

## ⚙️ Como Executar

1. Crie um ambiente virtual (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   # ou
   venv\Scripts\activate     # Windows
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
A documentação interativa (Swagger UI) pode ser acessada em `http://localhost:8000/docs`.

## 📂 Estrutura

- `app/main.py`: Ponto de entrada da aplicação.
- `app/routes/`: Definição das rotas e endpoints.
- `app/services/`: Lógica de negócio e integração de dados.
- `app/database/`: Configuração e modelos de banco de dados.
