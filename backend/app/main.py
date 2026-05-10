import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.sidra import router as sidra_router
from app.routes.aneel import router as aneel_router
from app.routes.ons import router as ons_router
from app.routes.nasa import router as nasa_router
from app.routes.decarbonization import router as decarbonization_router
from app.routes.datasets import router as datasets_router

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


def _get_allowed_origins() -> list[str]:
    """Return explicit frontend origins allowed to call the API."""
    defaults = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "https://pid-six.vercel.app",
        "https://pid-oportunidades.vercel.app",
    ]
    configured = os.getenv("CORS_ALLOW_ORIGINS")
    if not configured:
        return defaults

    return [
        origin.strip().rstrip("/")
        for origin in configured.split(",")
        if origin.strip()
    ]


def _get_allowed_origin_regex() -> str | None:
    """Return an optional regex for preview deployments."""
    return os.getenv("CORS_ALLOW_ORIGIN_REGEX")


# ---------------------------------------------------------------------------
# Startup: verifica cache sem bloquear o servidor
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Verifica cache na inicialização sem bloquear o servidor."""
    logger.info("=== PID API Startup — verificando cache de dados ===")
    try:
        from app.services.data_loader import load_processed_json
        ibge = load_processed_json("ibge_municipios_roraima.json", max_age_hours=24)
        if ibge is None:
            logger.info("Cache não encontrado — dados serão carregados sob demanda na primeira requisição.")
        else:
            logger.info("Cache válido encontrado — pulando ingestão.")
    except Exception as e:
        logger.error(f"Erro ao verificar cache (API continuará): {e}")
    yield


app = FastAPI(
    title="PID API",
    description="API de dados energéticos e descarbonização — dados reais de APIs públicas",
    version="2.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — permitir chamadas do frontend local e produção (Vercel)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=_get_allowed_origins(),
    allow_origin_regex=_get_allowed_origin_regex(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "mensagem": "PID API funcionando",
        "version": "2.0.0",
        "data": "Dados reais de APIs públicas (IBGE, ANEEL, NASA, FUNAI)",
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "pid-decarbonization-api",
        "version": "2.0.0",
        "dataMode": "live",
    }


# SIDRA (legado)
app.include_router(
    sidra_router,
    prefix="/sidra"
)

# ANEEL (legado)
app.include_router(
    aneel_router,
    prefix="/aneel"
)

# ONS (legado)
app.include_router(
    ons_router,
    prefix="/ons"
)

# NASA (legado)
app.include_router(
    nasa_router,
    prefix="/nasa"
)

# Descarbonização (endpoints do pivot — dados reais)
app.include_router(
    decarbonization_router,
    prefix="/api/decarbonization"
)

# Datasets (status e refresh)
app.include_router(
    datasets_router,
    prefix="/api/datasets"
)
