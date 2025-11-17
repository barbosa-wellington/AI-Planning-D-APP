from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama 
from pydantic import BaseModel
import json 
# import config


app = FastAPI(title="Dietly API API")


SYSTEM = """
You are Dietly, a diet and nutrition specialist.
You ONLY provide information about food, nutrition, and diet plans.

Your job is to answer user's enquires related exclusivelly about food.

"""



# CORS - to allow local dev from Expo Metro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # only for deve
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/health")
def health():
    return {"status":"This API is working correctly."}




class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    response: str


@app.post("/generate", response_model=GenerateResponse)
# def generate(prompt: str):
def generate(req: GenerateRequest):

    try:
        # import the environment variable
        model_name = "Gemma3:4b"


        res = ollama.chat(model=model_name,
                          options={"format":"json",
                                   "num_predict": 50},
                           messages=[
        {'role':'system','content': SYSTEM},
        {"role":"user", "content": req.prompt}
        ])
        text = res["message"]["content"]
        return GenerateResponse(response=text)
    except Exception as e:
        # present a clean error to the frontend
        raise HTTPException(status_code=500, detail=f"Ollama error: {e}")