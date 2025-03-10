from fastapi import APIRouter,Header
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from database import get_db
from services import UserCreate,get_user_by_username,get_user_by_email,get_user_by_CIN,create_user,authenticate_user,ACCESS_TOKEN_EXPIRE_MINUTES,create_access_token,verify_token

router = APIRouter()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = get_user_by_CIN(db, CIN=user.CIN)
    if db_user:
        raise HTTPException(status_code=400, detail="CIN already registered")
    return create_user(db=db, user=user)

@router.get("/")
def home():
    return {"message": "Service USER responding"}

@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"user":user ,"access_token": access_token, "token_type": "bearer"}

@router.get("/verify-token")
async def verify_user_token(authorization: str = Header(None),db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=400, detail="Authorization header missing")

    token = authorization.replace("Bearer ", "")  # Remove "Bearer " prefix
    username = verify_token(token=token)
    username = username.get("sub")
    user = get_user_by_username(db,username=username)
    return {"message": "Token is valid, Username:",'user': user}