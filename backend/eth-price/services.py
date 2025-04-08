import requests
from datetime import datetime
import numpy as np
def get_eth(currency,days):
    url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart"
    params = {
        "vs_currency": currency,
        "days": days 
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "prices" not in data:
        print("Erreur dans la réponse de l'API :", data)
        return [], None  

    formatted_prices = []
    prices = []

    for ts, price in data["prices"]:
        dt = datetime.fromtimestamp(ts / 1000).strftime('%Y-%m-%d %H:%M:%S')
        formatted_prices.append({
            "date": dt,
            "price": price
        })
        prices.append(price) 

    threshold = np.mean(prices)
    return formatted_prices, threshold


def get_ethereum_stats():
    url = "https://api.coingecko.com/api/v3/coins/ethereum"
    response = requests.get(url)
    data = response.json()  
    market_data = data['market_data']

    stats = {
        "Market Cap (USD)": market_data['market_cap']['usd'],
        "Volume (24h) (USD)": market_data['total_volume']['usd'],
        "Circulating Supply (ETH)": market_data['circulating_supply'],
        "Total Supply (ETH)": market_data['total_supply'],
    } 
    return stats


