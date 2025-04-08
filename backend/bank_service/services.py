from sqlalchemy.orm import Session
from models import BankAccount,BankAccountCreate

def get_bank_by_account_number(db: Session, account_number: str):
    return db.query(BankAccount).filter(BankAccount.account_number == account_number).first()

def create_bank(db: Session, acc: BankAccountCreate):
    bank_account_dict = acc.model_dump()
    db_acc = BankAccount(**bank_account_dict)
    db.add(db_acc)
    db.commit()
    db.refresh(db_acc)
    return {"message": "Bank account created successfully!"}

def check_balance(amount: float,bank_account:BankAccount):
    if bank_account.balance >= amount : return True
    return False
    
def add_amount(db: Session, amount: float,bank_account:BankAccount):
    bank_account.balance = bank_account.balance + amount
    db.commit(bank_account)
    return bank_account.balance
