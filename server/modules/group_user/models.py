from pydantic import BaseModel

class GroupUserBase(BaseModel):
    group_id: int
    user_id: int

class GroupUserCreate(GroupUserBase):
    pass

class GroupUserOut(GroupUserBase):
    id: int

    class Config:
        from_attributes = True
