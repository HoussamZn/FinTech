from fastapi import APIRouter
from services import get_eth, get_ethereum_stats

router = APIRouter()

@router.get("/eth-prices/{currency}/{days}")
def fetch_eth_prices(currency, days):
    return get_eth(currency, days)

@router.get("/eth-stats")
def fetch_ethereum_stats():
    return get_ethereum_stats()

