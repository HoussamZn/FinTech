import asyncio
from confluent_kafka import Consumer
from websocket_manager import manager
import json

conf = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'notify-group',
    'auto.offset.reset': 'earliest'
}
consumer = Consumer(conf)
consumer.subscribe(['notifications'])

async def consume_notifications():
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            await asyncio.sleep(1)
            continue
        if msg.error():
            continue
        data = json.loads(msg.value().decode('utf-8'))
        user_id = data["user_id"]
        await manager.send_to_user(user_id, data["message"])
