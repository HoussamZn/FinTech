from fastapi import FastAPI, Request, HTTPException
import httpx

app = FastAPI()

# Backend service mappings
BACKENDS = {
    "service1": "http://localhost:8001"
}

async def proxy_request(service_url: str, request: Request):
    """Forward the request to the backend service"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.request(
                method=request.method,
                url=f"{service_url}{request.url.path.replace('/' + request.path_params['service'], '')}",
                headers={key: value for key, value in request.headers.items() if key != "host"},
                content=await request.body(),
                params=request.query_params
            )
            return response
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Backend service error: {str(e)}")

@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def gateway(service: str, path: str, request: Request):
    """Route request to appropriate backend service"""
    if service in BACKENDS:
        backend_url = BACKENDS[service]
        proxied_response = await proxy_request(backend_url, request)
        return proxied_response.json()
    
    raise HTTPException(status_code=404, detail="Service not found")
