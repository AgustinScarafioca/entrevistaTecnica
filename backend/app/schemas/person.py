from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class PersonCreate(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=80, examples=['Agustin'])
    edad: int = Field(..., ge=0, le=120, examples=[27])

    @classmethod
    def model_validate(cls, obj, **kwargs):
        if isinstance(obj, dict) and "nombre" in obj and isinstance(obj["nombre"], str):
            obj = {**obj, "nombre": obj["nombre"].strip()}
        return super().model_validate(obj, **kwargs)

class PersonOut(BaseModel):
    id: int
    nombre: str
    edad: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)