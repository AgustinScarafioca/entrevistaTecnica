from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import select 

from app.db.session import get_db
from app.models.person import Person
from app.schemas.person import PersonCreate, PersonOut

router = APIRouter(prefix="", tags=["personas"])

@router.post("/personas", response_model=PersonOut, status_code=status.HTTP_201_CREATED)
def create_person(payload: PersonCreate, db: Session = Depends(get_db)):
    person = Person(nombre=payload.nombre, edad=payload.edad)
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


@router.get("/personas", response_model=list[PersonOut])
def list_persons(db: Session = Depends(get_db)):
    stmt = select(Person).order_by(Person.id.desc())
    persons = db.scalars(stmt).all()
    return persons

# boceto de delete que no paso 
"""
@router.delete("/personas/{person_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_person(person_id: int, db: Session = Depends(get_db)):
    person = db.get(Person, person_id)
    if not person:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=error_response(
                "NOT_FOUND",
                "Person not found",
                [{"field": "id", "message": f"Person with id={person_id} does not exist"}],
            ),
        )

    db.delete(person)
    db.commit()
    return None
    
"""