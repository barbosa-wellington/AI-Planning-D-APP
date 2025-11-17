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

Your job is to generate diet plans.

You MUST respond using ONLY valid JSON, with this exact structure:

[
  {
    "diet_plan": "A diet plan title",
    "time_diet": "Breakfast or Lunch or Dinner or Snack",
    "time_meal": "a human-readable time range like '07:00-09:00'",
    "calories": integer total calories for this meal,
    "protein": integer grams of protein for this meal,
    "carbs": integer grams of carbohydrates for this meal,
    "fat": integer grams of fat for this meal,
    "ingridients": "short ingredient list as a single string",
    "instructions": "short step-by-step instructions as a single string"
  }
]

Rules:
- Return ONLY a JSON array of these objects. No markdown. No explanations.
- All numeric fields (calories, protein, carbs, fat) MUST be integers, not strings.
- "ingridients" and "instructions" MUST be plain text strings.
- If the user asks for something that is NOT about diet, nutrition, or meal planning,
  you MUST return: [{"error": "non_diet_request"}] and nothing else.
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
                          options={"format":"json"},
                           messages=[
        {'role':'system','content': SYSTEM},
        {"role":"user", "content": req.prompt}
        ])
        text = res["message"]["content"]
        return GenerateResponse(response=text)
    except Exception as e:
        # present a clean error to the frontend
        raise HTTPException(status_code=500, detail=f"Ollama error: {e}")