from fastapi import APIRouter,HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from models import BankAccount,BankAccountCreate
from database import get_db
from services import get_bank_by_account_number,create_bank

router = APIRouter()
BACKENDS = {
    "user": "http://localhost:8001",
    "account":"http://localhost:8002",
    'gateaway': "http://localhost:8000"
}

@router.get("/")
def home():
    return {"message": "Service Bank responding"}

@router.get("/acc/{number}")
def get_acc(number:str,db: Session = Depends(get_db)):
    acc = get_bank_by_account_number(db=db,account_number=number)
    if acc is None:
        raise HTTPException(status_code=404, detail="No account with this number")
    return acc

@router.post("/acc")
def create_acc(acc:BankAccountCreate,db: Session = Depends(get_db)):
    return create_bank(db=db,acc=acc)



