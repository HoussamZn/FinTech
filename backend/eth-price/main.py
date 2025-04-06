from fastapi import FastAPI
from routers import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.include_router(router)
