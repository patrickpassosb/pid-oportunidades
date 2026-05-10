from fastapi import FastAPI

from app.routes.sidra import router as sidra_router
from app.routes.aneel import router as aneel_router
from app.routes.ons import router as ons_router
from app.routes.nasa import router as nasa_router

app = FastAPI(
    title="PID API",
    description="API de dados energéticos e descarbonização",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "mensagem": "PID API funcionando"
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