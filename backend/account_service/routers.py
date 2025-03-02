from fastapi import APIRouter,Header
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from models import BankAccount
from database import get_db
router = APIRouter()

@router.get("/")
def home(db: Session = Depends(get_db)):
    new = BankAccount(user_id=1,account_number='asas',currency='as')
    db.add(new)
    db.commit()
    return {"message": "Service ACOUNT responding"}