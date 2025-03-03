import random
from sqlalchemy import Column, Integer, String,Date,Enum,Float,ForeignKey
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.sql import func
from datetime import date,timedelta
import enum
from sqlalchemy.orm import relationship

from database import Base

ACC_EXPIRING_DELTA = 3

#Enums
class Currency(str,enum.Enum):
    USD = 'USD'
    MAD = 'MAD'

class CardType(str,enum.Enum):
    VISA = 'VISA'
    MASTERCARD = 'MASTERCARD'

#Models
class BankAccount(Base):
    __tablename__ = "bank_accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, unique=True,nullable=False)
    balance = Column(String,unique=True,default=0.0)
    expire_date = Column(Date, default=lambda: date.today() + timedelta(days=ACC_EXPIRING_DELTA*365))
    created_at = Column(Date, default=func.now())
    currency = Column(Enum(Currency),default=Currency.USD)
    card_type = Column(Enum(CardType),nullable=True)
    cvv = Column(String,default=lambda:f"{random.randint(100,999)}")

#schemas
class BankAccountCreate(BaseModel):
    account_number: str
    balance : Optional[float] = None
    currency : Optional[Currency] = None
    card_type : Optional[CardType] = None
    cvv : Optional[str] = None



