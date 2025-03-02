from fastapi import APIRouter,Header
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from models import BankAccount,BankAccountCreate,Transaction,TransactionCreate
from database import get_db
router = APIRouter()

@router.get("/")
def home():
    return {"message": "Service ACOUNT responding"}

@router.post("/acc")
def create_acc(bank_account:BankAccountCreate,db: Session = Depends(get_db)):
    bank_account_dict = bank_account.model_dump()

    db_acc = BankAccount(**bank_account_dict)
    db.add(db_acc)
    db.commit()
    return {"message": f"account : {db_acc.account_number} created successfully!"}