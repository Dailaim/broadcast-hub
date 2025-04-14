from pydantic import BaseModel

class UserBase(BaseModel):
    phone: str
    name: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    phone: str | None = None
    name: str | None = None

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True
