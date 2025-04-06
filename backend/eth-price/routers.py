from fastapi import APIRouter
from services import get_eth

router = APIRouter()

@router.get("/eth-prices")
def fetch_eth_prices():
    return get_eth()
