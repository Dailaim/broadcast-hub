
from sqlalchemy import Column, Integer, String
from database.models.base import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
