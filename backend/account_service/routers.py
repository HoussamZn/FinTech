from fastapi import APIRouter,Body,HTTPException
from fastapi import Depends,WebSocket
from sqlalchemy.orm import Session
from models import BankAccount,BankAccountCreate, NotificationCreate,Transaction,TransactionCreate,TransactionType
from database import get_db
from services import create_notification, get_accounts,get_accounts_by_number,get_transactions,get_accounts_by_id
import httpx
from fastapi.responses import JSONResponse
from kafka_producer import send_notification
import json
from websocket_manager import manager
import os


router = APIRouter()
BACKENDS = {
    "bank": os.environ.get("BANK_SERVICE","http://localhost:8003")
}

async def forward_request(service_url: str, method: str, path: str, body=None, headers=None):
    async with httpx.AsyncClient() as client:
        url = f"{service_url}{path}"
        response = await client.request(method, url, content=body, headers=headers)
        return response
    
    
async def make_transaction(db:Session,sender_acc:BankAccount,receiver:str,amount):
    
    response = await forward_request(BACKENDS["bank"], 'PUT', "/transaction")
    data = {
            "sender": sender_acc.account_number,
            "receiver": receiver,
            "amount": amount
            }
    async with httpx.AsyncClient() as client:
        response = await client.request("PUT", f'{BACKENDS["bank"]}/transaction', json=data)
        return response
    


@router.get("/")
def home():
    return {"message": "Service ACOUNT responding"}

@router.post("/acc")
async def create_acc(bank_account:BankAccountCreate,db: Session = Depends(get_db)):
    response = await forward_request(BACKENDS["bank"], 'GET', f"/acc/{bank_account.account_number}")
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="No Bank account with this number")

    db_acc = get_accounts_by_number(bank_account.account_number,db=db)
    if db_acc:
        raise HTTPException(status_code=400, detail="Acount with this number already exists")

    bank_account_dict = bank_account.model_dump()
    db_acc = BankAccount(**bank_account_dict)
    db.add(db_acc)
    db.commit()
    db.refresh(db_acc)
    return {"message": f"account : {db_acc.account_number} created successfully!"}

@router.post("/accs")
async def get_accs(user_id: int = Body(..., embed=True),db: Session = Depends(get_db)):
    accs = get_accounts(user_id,db)

    for acc in accs:
        response = await forward_request(BACKENDS["bank"], 'GET', f"/acc/{acc['account_number']}")
        acc['balance'] = response.json()['balance']

    return accs

@router.post("/transactions")
def get_trans(user_id: int = Body(..., embed=True),db: Session = Depends(get_db)):
    return get_transactions(user_id,db)


@router.post("/transaction")
async def create_trans(transaction:TransactionCreate,db: Session = Depends(get_db)):
    transaction_dict = transaction.model_dump()
    receiver_number = transaction.receiver_account_number
    db_acc = get_accounts_by_number(receiver_number,db=db)
    if db_acc:
        transaction_dict["receier_account_id"] = db_acc.id
        transaction_dict['transaction_type'] = TransactionType.ACC_TO_ACC
        del transaction_dict["receiver_account_number"]
    else :
        transaction_dict['transaction_type'] = TransactionType.ACC_TO_BANK

    sender_acc = get_accounts_by_id(db=db,id=transaction.sender_account_id)
    if sender_acc is None:
        raise HTTPException(status_code=404, detail="No Bank account with this id")

    response = await make_transaction(db,sender_acc,receiver_number,transaction.amount)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json()["detail"])
    
    db_transaction = Transaction(**transaction_dict)
    db.add(db_transaction)
    db.commit()
    if db_acc :
        notif_dict = {
                    "title": "New transaction",
                    "message": f"You have received {db_transaction.amount}$",
                    "user_id": db_acc.user_id
                    }
        print(f'teeeeeeeeeeeeeeeeest : {db_acc.user_id}')
        notify(notif=NotificationCreate(**notif_dict),db=db)
    return {"message": "Transaction created successfully!"}


@router.post("/notify")
def notify(notif: NotificationCreate, db: Session = Depends(get_db)):
    db_notif = create_notification(db, notif)
    send_notification("notifications", json.dumps(notif.model_dump()))
    return {"status": "sent"}


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket, user_id)
    try:
        while True:
            await websocket.receive_text()  # To keep connection alive
    except:
        manager.disconnect(user_id)



