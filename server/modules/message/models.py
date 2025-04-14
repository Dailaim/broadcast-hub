from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    content: str
    scheduled_time: datetime
    group_id: int

class MessageOut(BaseModel):
    id: int
    content: str
    scheduled_time: datetime
    group_id: int

    class Config:
        orm_mode = True
