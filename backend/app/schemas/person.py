from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class PersonCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    nombre: str = Field(..., min_length=2, max_length=80, examples=["Agustin"])
    edad: int = Field(..., ge=0, le=120, examples=[27])

class PersonOut(BaseModel):
    id: int
    nombre: str
    edad: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)