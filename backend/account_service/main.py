from fastapi import FastAPI
import models
from database import engine
from routers import router
import asyncio
from kafka_consumer import consume_notifications
from contextlib import asynccontextmanager



#routers
@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(consume_notifications())
    yield 
    task.cancel()

app = FastAPI(lifespan=lifespan)
app.include_router(router)

# Create the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)