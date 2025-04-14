from sqlalchemy import Column, Integer, String, DateTime, Text
from database.models.base import Base

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    scheduled_time = Column(DateTime)
    recipients = Column(Text)
    status = Column(String, default='pending')

