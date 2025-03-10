from fastapi import FastAPI

import models
from database import engine
from routers import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#routers
app.include_router(router)

# Create the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

