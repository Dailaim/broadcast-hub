from sqlalchemy import Column, Integer, String
from database.models.base import Base


class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)