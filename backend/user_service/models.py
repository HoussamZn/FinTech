from sqlalchemy import Column, Integer, String,Enum
from pydantic import BaseModel,EmailStr
from typing import Optional
import enum


from database import Base


class UserType(str,enum.Enum):
    CLIENT = 'CLIENT'
    ADMIN = 'ADMIN'
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    email = Column(String , unique=True)
    CIN = Column(String,unique=True,nullable=True)
    type = Column(Enum(UserType),default=UserType.CLIENT)
    number = Column(String,unique=True,nullable=True)

#register schema
class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    CIN: Optional[str] = None
    type : Optional[UserType] = None
    number: Optional[str] = None


class UserUpdate(BaseModel):
    id:int
    username: str
    email: str
    CIN: Optional[str] = None
    number: Optional[str] = None

class UserPassword(BaseModel):
    id:int
    password : str
    new_password : str
