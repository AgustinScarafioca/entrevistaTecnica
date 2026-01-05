from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette import status
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

from app.db.session import engine
from app.db.base import Base
from app.routers.persons import router as persons_router
from app.core.errors import error_response

from fastapi.responses import HTMLResponse

load_dotenv()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PmIT Challenge Backend con FastApi", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(persons_router)

#added for styling
@app.get("/", response_class=HTMLResponse)
def root():
    return """
<!doctype html>
    <html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PmIT Challenge</title>
        <style>
        body {
            margin: 0;
            height: 100vh;
            display: grid;
            place-items: center;
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            background: #f6f7f9;
            color: #111827;
        }
        .card {
            background: #ffffff;
            padding: 28px 32px;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,.08);
            border: 1px solid rgba(0,0,0,.06);
            text-align: center;
            max-width: 720px;
        }
        h1 { margin: 0 0 10px; font-size: 22px; }
        p { margin: 0; color: #6b7280; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="card">
        <h1>Bienvenido al challenge técnico de Agustín</h1>
        <p>Endpoints principales: <code>GET /personas</code> • <code>POST /personas</code> • <code>GET /docs</code></p>
        </div>
    </body>
    </html>
"""

@app.get("/health")
def health():
    return {"status": "ok"}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    details = []
    for e in exc.errors():
        loc = e.get("loc", [])
        field = loc[-1] if loc else "body"
        details.append({"field": str(field), "message": e.get("msg", "Invalid value")})

    return JSONResponse(
    status_code=422,
    content=error_response("VALIDATION_ERROR", "Invalid request", details),
)

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=error_response("INTERNAL_ERROR", "Unexpected error"),
    )