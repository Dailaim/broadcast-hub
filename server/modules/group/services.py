from sqlalchemy.orm import Session
from modules.group import models
from database.models.group import Group as GroupModel

def create_group(db: Session, payload: models.GroupCreate):
    group = GroupModel(**payload.model_dump())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group

def get_groups(db: Session):
    return db.query(GroupModel).all()

def get_group(db: Session, group_id: int):
    return db.query(GroupModel).filter(GroupModel.id == group_id).first()

def update_group(db: Session, group_id: int, payload: models.GroupUpdate):
    group = db.query(GroupModel).filter(GroupModel.id == group_id).first()
    if not group:
        return None
    for key, value in payload.model_dump().items():
        setattr(group, key, value)
    db.commit()
    db.refresh(group)
    return group

def delete_group(db: Session, group_id: int):
    group = db.query(GroupModel).filter(GroupModel.id == group_id).first()
    if not group:
        return None
    db.delete(group)
    db.commit()
    return group
