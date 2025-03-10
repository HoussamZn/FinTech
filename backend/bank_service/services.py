from sqlalchemy.orm import Session
from models import BankAccount

def get_bank_by_account_number(db: Session, account_number: str):
    return db.query(BankAccount).filter(BankAccount.account_number == account_number).first()

def check_balance(amount: float,bank_account:BankAccount):
    if bank_account.balance >= amount : return True
    return False
    
def add_amount(db: Session, amount: float,bank_account:BankAccount):
    bank_account.balance = bank_account.balance + amount
    db.commit(bank_account)
    return bank_account.balance
