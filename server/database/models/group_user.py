from sqlalchemy import Column, Integer, String, DateTime, Text
from database.models.base import Base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql.schema import ForeignKey

class GroupUser(Base):
    __tablename__ = 'group_users'
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey('groups.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    group = relationship("Group", backref=backref("group_users", cascade="all, delete-orphan"))
    user = relationship("User", backref=backref("group_users", cascade="all, delete-orphan"))


