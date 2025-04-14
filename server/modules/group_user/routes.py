from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from . import services, models

router = APIRouter(prefix="/group-users", tags=["Group Users"])

@router.post("/", response_model=models.GroupUserOut)
def create_group_user(payload: models.GroupUserCreate, db: Session = Depends(get_db)):
    return services.create_group_user(db, payload)

@router.get("/", response_model=list[models.GroupUserOut])
def list_group_users(db: Session = Depends(get_db)):
    return services.get_group_users(db)

@router.get("/{group_user_id}", response_model=models.GroupUserOut)
def get_group_user(group_user_id: int, db: Session = Depends(get_db)):
    group_user = services.get_group_user(db, group_user_id)
    if not group_user:
        raise HTTPException(status_code=404, detail="GroupUser not found")
    return group_user

@router.delete("/{group_user_id}", response_model=models.GroupUserOut)
def delete_group_user(group_user_id: int, db: Session = Depends(get_db)):
    group_user = services.delete_group_user(db, group_user_id)
    if not group_user:
        raise HTTPException(status_code=404, detail="GroupUser not found")
    return group_user
