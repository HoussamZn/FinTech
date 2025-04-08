from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

from models import Favorite, User,UserCreate,UserUpdate,UserPassword,FavoriteCreate

#auth
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Your JWT secret and algorithm
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_favorite_by_name_user(db: Session,user:int, name: str):
    return db.query(Favorite).filter(Favorite.user_id == user,Favorite.name == name).first()

def get_favorite_by_account_user(db: Session,user:int, account: str):
    return db.query(Favorite).filter(Favorite.user_id == user,Favorite.account == account).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, id: str):
    return db.query(User).filter(User.id == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_CIN(db: Session, CIN: str):
    return db.query(User).filter(User.CIN == CIN).first()

#create the new user
def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password

    db_user = User(**user_dict)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": f"User : {db_user.username} registered successfully!"}

#update info
def update_user(db: Session,user:User, updated: UserUpdate):
    updated_dict = updated.model_dump(exclude_unset=True)
    
    for key, value in updated_dict.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return {"message": "Info updated successfully!"}

#update passowrd
def update_password(db: Session,user:User, data: UserPassword):
    if not pwd_context.verify(data.password, user.password):
        return False
    hashed_password = pwd_context.hash(data.new_password)
    user.password = hashed_password
    db.commit()
    db.refresh(user)
    return {"message": "Password updated successfully!"}

def delete_user(db: Session,user:User):
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

# Authenticate the user
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.password):
        return False
    return user

# Create access token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")
    

def create_favorite(db:Session,favorite:FavoriteCreate):
    favorite_dict = favorite.model_dump()

    db_favorite = Favorite(**favorite_dict)
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return {"message": f"favorite : {db_favorite.name} created successfully!"}


def get_favorites(id:int, db: Session):
    favorites = db.query(Favorite).filter(Favorite.user_id == id).all()
    return favorites
    

