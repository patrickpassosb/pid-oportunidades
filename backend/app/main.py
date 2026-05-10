from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.sidra import router as sidra_router
from app.routes.aneel import router as aneel_router
from app.routes.ons import router as ons_router
from app.routes.nasa import router as nasa_router
from app.routes.decarbonization import router as decarbonization_router

app = FastAPI(
    title="PID API",
    description="API de dados energéticos e descarbonização",
    version="1.0.0"
)

# ---------------------------------------------------------------------------
# CORS — permitir chamadas do frontend local (Next.js) e produção
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "mensagem": "PID API funcionando"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "pid-decarbonization-api",
        "version": "1.0.0"
    }


# SIDRA
app.include_router(
    sidra_router,
    prefix="/sidra"
)

# ANEEL
app.include_router(
    aneel_router,
    prefix="/aneel"
)

# ONS
app.include_router(
    ons_router,
    prefix="/ons"
)

# NASA
app.include_router(
    nasa_router,
    prefix="/nasa"
)

# Descarbonização (novos endpoints do pivot)
app.include_router(
    decarbonization_router,
    prefix="/api/decarbonization"
)