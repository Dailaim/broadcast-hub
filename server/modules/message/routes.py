# modules/messages/routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from modules.message import services, models

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/", response_model=models.MessageOut)
def create_message(payload: models.MessageCreate, db: Session = Depends(get_db)):
    return services.create_scheduled_message(db, payload)

@router.get("/", response_model=list[models.MessageOut])
def list_messages(db: Session = Depends(get_db)):
    return services.get_scheduled_messages(db)

@router.get("/{message_id}", response_model=models.MessageOut)
def get_message(message_id: int, db: Session = Depends(get_db)):
    message = services.get_scheduled_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.put("/{message_id}", response_model=models.MessageOut)
def update_message(message_id: int, payload: models.MessageUpdate, db: Session = Depends(get_db)):
    return services.update_scheduled_message(db, message_id, payload)

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    return services.delete_scheduled_message(db, message_id)
