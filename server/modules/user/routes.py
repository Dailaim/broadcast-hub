from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from . import services, models

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=models.UserOut)
def create_user(payload: models.UserCreate, db: Session = Depends(get_db)):
    return services.create_user(db, payload)

@router.get("/", response_model=list[models.UserOut])
def list_users(db: Session = Depends(get_db)):
    return services.get_users(db)

@router.get("/{user_id}", response_model=models.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = services.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=models.UserOut)
def update_user(user_id: int, payload: models.UserUpdate, db: Session = Depends(get_db)):
    user = services.update_user(db, user_id, payload)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}", response_model=models.UserOut)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = services.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
