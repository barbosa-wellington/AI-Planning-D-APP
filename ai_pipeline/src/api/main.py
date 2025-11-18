from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama 
from ollama import chat
from pydantic import BaseModel, conint
import json 
from typing import List
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

# This endpoint generates simple request made by the user.
@app.post("/generate", response_model=GenerateResponse)
# def generate(prompt: str):
def generate(req: GenerateRequest):

    try:
        # import the environment variable
        model_name = "Gemma3:4b"


        res = ollama.chat(model=model_name,
                          options={"num_predict": 50},
                           messages=[
        {'role':'system','content': SYSTEM},
        {"role":"user", "content": req.prompt}
        ])
        text = res["message"]["content"]
        return GenerateResponse(response=text)
    except Exception as e:
        # present a clean error to the frontend
        raise HTTPException(status_code=500, detail=f"Ollama error: {e}")
    




# Testing adapting the example into the project perspective
class DietMeal(BaseModel):
    diet_plan: str              # e.g. "Simple Vegetarian Breakfast"
    time_diet: str              # e.g. "Breakfast"
    time_meal: str              # e.g. "07:00-09:00"
    calories: conint(gt=0)      # must be positive
    protein: conint(ge=0)
    carbs: conint(ge=0)
    fat: conint(ge=0)
    ingridients: List[str]      # list for your RN card
    instructions: List[str]     # list for your RN card

class DietPlan(BaseModel):
    recepies: List[DietMeal]    # kept your spelling style "recepies"

class DietPlanRequest(BaseModel):
    prompt: str   # user's request like "vegetarian breakfast with banana around 300 calories"

PLAN_SYSTEM = """
You are Dietly, a diet and nutrition specialist.
In this endpoint your ONLY job is to generate diet plans.

You MUST produce JSON that follows exactly this structure (conceptually):

{
  "recepies": [
    {
      "diet_plan": "Simple Vegetarian Breakfast",
      "time_diet": "Breakfast",
      "time_meal": "07:00-09:00",
      "calories": 350,
      "protein": 20,
      "carbs": 40,
      "fat": 15,
      "ingridients": [
        "1/2 cup rolled oats",
        "1 cup almond milk",
        "1/4 cup blueberries",
        "1 tbsp chia seeds"
      ],
      "instructions": [
        "Combine oats and almond milk in a pot.",
        "Bring to a boil, then reduce heat and simmer for 5 minutes.",
        "Stir in blueberries and chia seeds.",
        "Serve warm."
      ]
    }
  ]
}

Rules:
- Respond with JSON ONLY, no markdown, no ```json fences.
- All macros (calories, protein, carbs, fat) MUST be integers.
- "ingridients" and "instructions" MUST be arrays of strings.
- Respect the user's preferences (vegetarian, calories, specific foods like banana).
- If the user asks for something not related to diet, meal plans, or nutrition,
  still respond with valid JSON but set "recepies" to an empty list.
"""

@app.post("/diet/plan", response_model=DietPlan)
def generate_diet_plan(req: DietPlanRequest):
    # model_name = "Mistral:latest"  # or "Gemma3:4b" if you prefer
    model_name = "phi3:mini"

    try:
        # Ask Ollama to follow the DietPlan schema
        res = ollama.chat(
            model=model_name,
            format=DietPlan.model_json_schema(),  # <-- enforce schema
            messages=[
                {"role": "system", "content": PLAN_SYSTEM},
                {
                    "role": "user",
                    "content": f"Generate a diet plan based on this request: {req.prompt}",
                },
            ],
        )

        raw = res["message"]["content"]

        # Validate and parse JSON into DietPlan
        plan = DietPlan.model_validate_json(raw)

        # At this point:
        # - `plan` is a DietPlan object
        # - `plan.recepies` is a list[DietMeal]
        # You can return it to the mobile app AND/OR save to DB here.

        return plan

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Model returned invalid JSON: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama or validation error: {e}")