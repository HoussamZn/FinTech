from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import httpx
from pydantic import BaseModel,EmailStr
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    'http://192.168.56.1:5173',
    "http://192.168.56.1:5173/",
    'http://192.168.1.182'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Backend service mappings
BACKENDS = {
    "user": "http://localhost:8001",
    'account': "http://localhost:8002",
    "bank" : "http://localhost:8003"
}


async def forward_request(service_url: str, method: str, path: str, body=None, headers=None):
    async with httpx.AsyncClient(timeout=60.0) as client:
        url = f"{service_url}{path}"
        response = await client.request(method, url, content=body, headers=headers)
        return response

async def verify_token_(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(status_code=400, detail="Authorization header missing")

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BACKENDS['user']}/verify-token", headers={"Authorization": authorization})

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json().get("detail"))
    
    return response.json()  

@app.post("/register")
async def register(request:Request):
    body = await request.body()
    response = await forward_request(BACKENDS["user"], request.method, "/register", body)

    return JSONResponse(status_code=response.status_code, content=response.json())

@app.get("/verify-token")
async def verify_token(request:Request):
    response = await forward_request(BACKENDS["user"], request.method, "/verify-token",headers=request.headers)

    return JSONResponse(status_code=response.status_code, content=response.json())

@app.post("/login")
async def get_token(request:Request):
    body = await request.body()
    headers = dict(request.headers)
    response = await forward_request(BACKENDS["user"], request.method, "/token", body,headers)

    return JSONResponse(status_code=response.status_code, content=response.json())

@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def gateway(service: str, path: str, request: Request):
    if service not in BACKENDS:
        raise HTTPException(status_code=404, detail="Service not found")
    
    await verify_token_(request)


    service_url = BACKENDS[service]
    body = await request.body() if request.method in ["POST", "PUT", "PATCH",'DELETE'] else None
    headers = dict(request.headers)
    response = await forward_request(service_url, request.method, f"/{path}", body, headers)

    return JSONResponse(status_code=response.status_code, content=response.json())