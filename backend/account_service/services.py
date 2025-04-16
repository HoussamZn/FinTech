from models import BankAccount,Transaction,model_to_dict,Notification,NotificationCreate
from sqlalchemy.orm import Session
from sqlalchemy import or_

def get_accounts(id:int, db: Session):
    accounts = db.query(BankAccount).filter(BankAccount.user_id == id).all()
    return [model_to_dict(acc) for acc in accounts]

def get_accounts_by_number(number:str, db: Session):
    account = db.query(BankAccount).filter(BankAccount.account_number == number).first()
    return account

def get_accounts_by_id(id:str, db: Session):
    account = db.query(BankAccount).filter(BankAccount.id == id).first()
    return account

def get_transactions(id: int, db: Session):
    user_accounts = db.query(BankAccount).filter(BankAccount.user_id == id).all()
    account_ids = [account.id for account in user_accounts]

    transactions = db.query(Transaction).filter(
        or_(
            Transaction.sender_account_id.in_(account_ids),
            Transaction.receier_account_id.in_(account_ids)
        )
    ).all()

    return transactions

def create_notification(db: Session, notif: NotificationCreate):
    db_notif = Notification(**notif.model_dump())
    db.add(db_notif)
    db.commit()
    db.refresh(db_notif)
    return db_notif



