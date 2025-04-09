from fastapi import FastAPI

import models
from database import engine
from routers import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#routers
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

