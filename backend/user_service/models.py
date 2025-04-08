from pydantic import BaseModel,EmailStr
from typing import Optional
import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship


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

    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    account = Column(String)
    name = Column(String)
    
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="favorites")


#register schema
class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    CIN: Optional[str] = None
    type : Optional[UserType] = None
    number: Optional[str] = None


class FavoriteCreate(BaseModel):
    user_id: int
    name: str
    account: str


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
