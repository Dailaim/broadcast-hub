from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from constants.database import DATABASE_URL
from database.models.user import User
from database.models.group import Group
from database.models.group_user import GroupUser
from database.models.message import Message
from database.models.base import Base


engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)
