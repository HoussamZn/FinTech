from fastapi import FastAPI, Request
import httpx

app = FastAPI()

# Backend service mappings
BACKENDS = {
    "user": "http://localhost:8001"
}

async def proxy_request(url: str, request: Request, body: bytes):
    async with httpx.AsyncClient() as client:
        # Forward the request with the body to the backend
        response = await client.request(
            method=request.method,
            url=url,
            headers=request.headers.raw,
            content=body 
        )
        try:
            response_data = response.json()
        except Exception as e:
            response_data = {"error": "Failed to serialize response from backend"}

        return response_data

@app.api_route("/{service:path}/{path:path}", methods=["POST", "PUT","GET"])
async def gateway(request: Request, path: str,service:str):
    backend_url = f"{BACKENDS[service]}/{path}"
    
    # Read the body from the incoming request
    body = await request.body()

    return await proxy_request(backend_url, request, body)
