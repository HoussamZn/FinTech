from sqlalchemy import Column, Integer, String
from pydantic import BaseModel,EmailStr
from typing import Optional


from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    email = Column(String , unique=True)
    CIN = Column(String,unique=True,nullable=True)

#register schema
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    CIN: Optional[str] = None

