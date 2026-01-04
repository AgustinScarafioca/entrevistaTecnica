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