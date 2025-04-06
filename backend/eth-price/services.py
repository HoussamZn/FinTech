import requests
import datetime

def get_eth():
    url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart"
    params = {
        "vs_currency": "usd",
        "days": 30
    }
    response = requests.get(url, params=params)
    data = response.json()

    prices = [
        {
            "date": datetime.datetime.fromtimestamp(ts / 1000).strftime('%Y-%m-%d'),
            "price": price
        }
        for ts, price in data["prices"]
    ]
    return prices
