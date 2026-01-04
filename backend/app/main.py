from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette import status

from app.db.session import engine
from app.db.base import Base
from app.routers.persons import router as persons_router
from app.core.errors import error_response

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PmIT Challenge Backend with FastApi", version="1.0.0")

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
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=error_response("VALIDATION_ERROR", "Invalid request", details),
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response("INTERNAL_ERROR", "Unexpected error"),
    )