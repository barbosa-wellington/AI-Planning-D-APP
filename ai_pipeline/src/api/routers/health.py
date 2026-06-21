from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/health")
def health():
    return {"status":"Testing if different health api status"}
