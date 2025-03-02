from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import httpx

app = FastAPI()

# Backend service mappings
BACKENDS = {
    "user": "http://localhost:8001",
    'account': "http://localhost:8002"
}
    
async def forward_request(service_url: str, method: str, path: str, body=None, headers=None):
    async with httpx.AsyncClient() as client:
        url = f"{service_url}{path}"
        response = await client.request(method, url, content=body, headers=headers)
        return response

@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def gateway(service: str, path: str, request: Request):
    if service not in BACKENDS:
        raise HTTPException(status_code=404, detail="Service not found")

    service_url = BACKENDS[service]
    body = await request.body() if request.method in ["POST", "PUT", "PATCH"] else None
    headers = dict(request.headers)
    response = await forward_request(service_url, request.method, f"/{path}", body, headers)

    return JSONResponse(status_code=response.status_code, content=response.json())