# modules/messages/schemas.py

from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    scheduled_time: datetime
    group_id: int

class MessageCreate(MessageBase):
    pass

class MessageUpdate(BaseModel):
    content: str | None = None
    scheduled_time: datetime | None = None
    group_id: int | None = None

class MessageOut(MessageBase):
    id: int

    class Config:
        from_attributes = True
