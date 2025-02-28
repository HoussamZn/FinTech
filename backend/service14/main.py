from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
def home():
    return {"message": "Service 1 responding"}
