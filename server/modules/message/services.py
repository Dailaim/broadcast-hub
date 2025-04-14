# modules/messages/services.py

from sqlalchemy.orm import Session
from modules.message import models
from modules.scheduler.services import schedule_message
from fastapi import HTTPException
from datetime import datetime
from database.models.message import Message as MessageModel

def create_scheduled_message(db: Session, message_data: models.MessageCreate):
    message = MessageModel(**message_data.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)

    schedule_message(message.id)

    return message

def get_scheduled_messages(db: Session):
    return db.query(MessageModel).all()

def get_scheduled_message(db: Session, message_id: int):
    return db.query(MessageModel).filter(MessageModel.id == message_id).first()

def update_scheduled_message(db: Session, message_id: int, update_data: models.MessageUpdate):
    message = get_scheduled_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    for field, value in update_data.model_dump(exclude_unset=True).items():
        setattr(message, field, value)
    
    db.commit()
    db.refresh(message)

    if update_data.scheduled_time and update_data.scheduled_time > datetime.now():
        schedule_message(message.id)

    return message

def delete_scheduled_message(db: Session, message_id: int):
    message = get_scheduled_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return {"detail": "Message deleted"}
