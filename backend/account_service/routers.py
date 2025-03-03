from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from models import BankAccount,BankAccountCreate,Transaction,TransactionCreate
from database import get_db


router = APIRouter()
BACKENDS = {
    "user": "http://localhost:8001",
    'gateaway': "http://localhost:8000"
}


@router.get("/")
def home():
    return {"message": "Service ACOUNT responding"}

@router.post("/acc")
def create_acc(bank_account:BankAccountCreate,db: Session = Depends(get_db)):
    bank_account_dict = bank_account.model_dump()

    db_acc = BankAccount(**bank_account_dict)
    db.add(db_acc)
    db.commit()
    db.refresh(db_acc)
    return db_acc
    return {"message": f"account : {db_acc.account_number} created successfully!"}

@router.post("/transaction")
def create_acc(transaction:TransactionCreate,db: Session = Depends(get_db)):
    transaction_dict = transaction.model_dump()

    db_acc = Transaction(**transaction_dict)
    db.add(db_acc)
    db.commit()
    return {"message": f"transaction : {db_acc} created successfully!"}



import httpx
from pydantic import BaseModel,EmailStr
from typing import Optional
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    CIN: Optional[str] = None


async def call_service_b(data):
    async with httpx.AsyncClient() as client:
        response = await client.request("POST", "http://localhost:8000/user/register", json=data.dict())

        return response.json()


@router.post("/user")
async def gateway(data:UserCreate):
    return await call_service_b(data)
