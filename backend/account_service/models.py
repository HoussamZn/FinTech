from sqlalchemy import Column, Integer, String,Date,Enum,Float,ForeignKey,Boolean, DateTime
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.sql import func
from datetime import date,timedelta,datetime
import enum
from sqlalchemy.orm import relationship

from database import Base

ACC_EXPIRING_DELTA = 3

#Enums
class Currency(str,enum.Enum):
    USD = 'USD'
    MAD = 'MAD'

class BankName(str,enum.Enum):
    CIH = 'CIH'
    TWB = 'TWB'

class TransactionType(str,enum.Enum):
    ACC_TO_ACC = 'AA'
    ACC_TO_BANK = 'AB'

class TransactionState(str,enum.Enum):
    DONE = 'DONE'
    CANCELED = 'CANCELED'

#Models
class BankAccount(Base):
    __tablename__ = "bank_accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    account_number = Column(String, unique=True,nullable=False)
    expire_date = Column(Date, default=lambda: date.today() + timedelta(days=ACC_EXPIRING_DELTA*365))
    created_at = Column(Date, default=func.now())
    currency = Column(Enum(Currency),default=Currency.USD)
    user_id = Column(Integer,nullable=False)
    bank_name = Column(Enum(BankName),nullable=False)

    sent_transactions = relationship("Transaction",back_populates="sender_account",foreign_keys="[Transaction.sender_account_id]")
    received_transactions = relationship("Transaction",back_populates="receiver_account",foreign_keys="[Transaction.receier_account_id]")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float,nullable=False)
    transaction_type = Column(Enum(TransactionType),nullable=False)
    sender_account_id = Column(Integer,ForeignKey("bank_accounts.id"),nullable=False)
    receier_account_id = Column(Integer,ForeignKey("bank_accounts.id"),nullable=True)
    receiver_account_number = Column(String,nullable=True)
    transaction_date = Column(Date, default=func.now())
    state = Column(Enum(TransactionState),default=TransactionState.DONE)

    sender_account = relationship("BankAccount", foreign_keys=[sender_account_id], back_populates="sent_transactions")
    receiver_account = relationship("BankAccount", foreign_keys=[receier_account_id], back_populates="received_transactions")


class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    user_id = Column(Integer, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())



#schemas
class BankAccountCreate(BaseModel):
    account_number: str
    name:str
    user_id : int
    bank_name : BankName
    currency : Optional[Currency] = None

class TransactionCreate(BaseModel):
    amount: float
    sender_account_id : int
    receiver_account_number : str

class NotificationCreate(BaseModel):
    title: str
    message: str
    user_id: int

class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    user_id: int
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True


def model_to_dict(obj):
    return {
        column.name: getattr(obj, column.name)
        for column in obj.__table__.columns
    }





