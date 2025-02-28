from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Service 2 responding"}
#check
