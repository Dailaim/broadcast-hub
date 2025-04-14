from sqlalchemy.orm import Session
from . import models
from database.models.user import User as UserModel

def create_user(db: Session, payload: models.UserCreate):
    user = UserModel(**payload.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session):
    return db.query(UserModel).all()

def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()

def update_user(db: Session, user_id: int, payload: models.UserUpdate):
    user = get_user(db, user_id)
    if not user:
        return None
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        return None
    db.delete(user)
    db.commit()
    return user
