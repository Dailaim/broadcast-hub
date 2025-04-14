from sqlalchemy.orm import Session
from . import models
from database.models.group_user import GroupUser as GroupUserModel

def create_group_user(db: Session, payload: models.GroupUserCreate):
    group_user = GroupUserModel(**payload.model_dump())
    db.add(group_user)
    db.commit()
    db.refresh(group_user)
    return group_user

def get_group_users(db: Session):
    return db.query(GroupUserModel).all()

def get_group_user(db: Session, group_user_id: int):
    return db.query(GroupUserModel).filter(GroupUserModel.id == group_user_id).first()

def delete_group_user(db: Session, group_user_id: int):
    group_user = get_group_user(db, group_user_id)
    if group_user:
        db.delete(group_user)
        db.commit()
    return group_user
