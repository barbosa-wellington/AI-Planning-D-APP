from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama 
from pydantic import BaseModel
import json 
# import config


app = FastAPI(title="Dietly API API")


SYSTEM = """ You are an diet and nutricionist specialist named Dietly. You only provide information on about food and nutrients.

Your output should be on a json strcuture format exactly like the one bellow.

[
{
    "diet_plan": {
    "meal": "Breakfast",
    "days": ["days of the week as a list",
    "options": [
        {
            "day": "day of the week",
            "meal": "name fo the meal",
            "description": "simple ingredient list",
            "calories": "total of calories"
    },
}
]
"""


# SYSTEM = """ You are a diet and nutricionist specialist named Dietly. 

# Your output should be on a structure json fromat exactly like the one bellow. You are not allow to write anything other than the json object:

# [
# {
#     "country": the country that you will get the capital of
#     "capital": the capital of the country stated
# }
# ]
# """
# add the expo localhost app 
# origins = [
#     "http://localhost:8081/ai_assistant"
# ]


# CORS - to allow local dev from Expo Metro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # only for deve
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    response: str


@app.get("/health")
def health():
    return {"status":"This API is working correctly."}


@app.post("/generate", response_model=GenerateResponse)
# def generate(prompt: str):
def generate(req: GenerateRequest):

    try:
        # import the environment variable
        model_name = "Gemma3:4b"


        res = ollama.chat(model=model_name,
                           messages=[
        {'role':'system','content': SYSTEM},
        {"role":"user", "content": req.prompt}
        ])
        text = res["message"]["content"]
        return GenerateResponse(response=text)
    except Exception as e:
        # present a clean error to the frontend
        raise HTTPException(status_code=500, detail=f"Ollama error: {e}")