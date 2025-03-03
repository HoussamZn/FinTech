from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from models import BankAccount,BankAccountCreate
from database import get_db


router = APIRouter()
BACKENDS = {
    "user": "http://localhost:8001",
    'gateaway': "http://localhost:8000"
}


@router.get("/")
def home():
    return {"message": "Service Bank responding"}


