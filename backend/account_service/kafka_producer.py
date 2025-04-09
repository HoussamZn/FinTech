from confluent_kafka import Producer

producer = Producer({'bootstrap.servers': 'localhost:9092'})

def send_notification(topic: str, message: str):
    producer.produce(topic, value=message)
    producer.flush()