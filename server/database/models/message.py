from sqlalchemy import Column, Integer, String, DateTime, Text
from database.models.base import Base
from sqlalchemy.sql.schema import ForeignKey
class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    scheduled_time = Column(DateTime)
    group_id = Column(Integer, ForeignKey('groups.id'))
    status = Column(String, default='pending')

