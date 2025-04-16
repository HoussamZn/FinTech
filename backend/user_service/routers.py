from fastapi import APIRouter,Header,Body
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from database import get_db
from services import UserCreate,UserUpdate,UserPassword,FavoriteCreate,get_user_by_id,get_user_by_username,get_user_by_email,get_user_by_CIN,create_user,authenticate_user,ACCESS_TOKEN_EXPIRE_MINUTES,create_access_token,verify_token,update_user,update_password,delete_user,create_favorite,get_favorite_by_name_user,get_favorite_by_account_user,get_favorites
router = APIRouter()

@router.post("/favorite")
def create_fav(favorite: FavoriteCreate, db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,favorite.user_id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    exist_favorite = get_favorite_by_name_user(db,favorite.user_id,favorite.name)
    if exist_favorite :
        raise HTTPException(status_code=400, detail="Favorite name already existed")
    exist_favorite = get_favorite_by_account_user(db,favorite.user_id,favorite.account)
    if exist_favorite :
        raise HTTPException(status_code=400, detail="Favorite account already existed")

    return create_favorite(db=db, favorite=favorite)

@router.post("/favorites")
def get_favs(user_id: int = Body(..., embed=True),db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,user_id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    return get_favorites(user_id,db)


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

@router.put("/update")
def edit_user(user: UserUpdate, db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,user.id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    db_user = get_user_by_username(db, username=user.username)
    if db_user and db_user.id != user.id:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = get_user_by_email(db, email=user.email)
    if db_user and db_user.id != user.id:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = get_user_by_CIN(db, CIN=user.CIN)
    if db_user and db_user.id != user.id:
        raise HTTPException(status_code=400, detail="CIN already registered")

    return update_user(db=db, user=selected_user,updated=user)

@router.put("/password")
def edit_password(data: UserPassword, db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,data.id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    rs = update_password(db=db,user=selected_user,data=data)
    if not rs :
        raise HTTPException(status_code=401, detail="Incorrect password")
    return rs

@router.delete("/delete")
def delete(id: int = Body(..., embed=True),db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    return delete_user(db,selected_user)


@router.put("/addwallet")
def addwallet(wallet: str = Body(..., embed=True),id: int = Body(..., embed=True),db: Session = Depends(get_db)):
    selected_user = get_user_by_id(db,id)
    if selected_user is None:
        raise HTTPException(status_code=404, detail="No user with this ID")
    selected_user.wallet = wallet
    db.commit()
    db.refresh(selected_user)
    return {"message": "wallet added successfully"}

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
    if user is None :
        raise HTTPException(status_code=404, detail="Inval Token")

    return {"message": "Token is valid, Username:",'user': user}

