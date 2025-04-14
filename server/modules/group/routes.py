from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from . import models, services

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.post("/", response_model=models.GroupOut)
def create_group(payload: models.GroupCreate, db: Session = Depends(get_db)):
    return services.create_group(db, payload)

@router.get("/", response_model=list[models.GroupOut])
def list_groups(db: Session = Depends(get_db)):
    return services.get_groups(db)

@router.get("/{group_id}", response_model=models.GroupOut)
def get_group(group_id: int, db: Session = Depends(get_db)):
    group = services.get_group(db, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.put("/{group_id}", response_model=models.GroupOut)
def update_group(group_id: int, payload: models.GroupUpdate, db: Session = Depends(get_db)):
    group = services.update_group(db, group_id, payload)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.delete("/{group_id}")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    group = services.delete_group(db, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return {"message": "Group deleted successfully"}
