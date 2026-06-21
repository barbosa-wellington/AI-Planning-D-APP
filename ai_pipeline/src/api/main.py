from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama 
from ollama import chat
from pydantic import BaseModel, conint
import json 
import requests
import os
from typing import List
# import config

BACKEND_BASE_URL = os.getenv("BACKEND_BASED_URL", "http://192.168.4.32:5001")

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
        # model_name = "Gemma3:4b"
        model_name = "Mistral:latest" 


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
      "ingredients": [
        "1/2 cup rolled oats",
        "1 cup almond milk",
        "1/4 cup blueberries",
        "1 tbsp chia seeds"
      ],[oats, almond milk, blueberries, chia seeds],
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
    model_name = "Mistral:latest"  # or "Gemma3:4b" if you prefer
    # model_name = "phi3:mini"

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
    




# FITBIT_PLAN_SYSTEM_BASE = """
# You are a diet and nutrition specialist named Dietly.

# You generate personalised diet plans based on the user's health data.

# You MUST respond with JSON matching this schema exactly:

# [
#   {
#     "diet_plan": "string",
#     "time_diet": "Breakfast | Lunch | Dinner | Snack",
#     "time_meal": "HH:MM-HH:MM",
#     "calories": number,
#     "protein": number,
#     "carbs": number,
#     "fat": number,
#     "ingridients": [ "list of ingredient strings" ],
#     "instructions": [ "list of short step strings" ],
#     "fitbit_weight_kg": <the user's weight in kg, as given in the prompt>
#   }
# ]

# Rules:
# - No extra commentary or explanation.
# - No markdown fences, no ```json.
# - Only a valid JSON array.
# - Distribute calories across the meals in a reasonable way according to the user's goal (maintain / lose / gain weight).
# - Use the target_daily_calories from the Fitbit health snapshot if available.
# """


# # Defining the function for AI check fitbit data
# def get_health_snapshot():
#     """Call backend /fitbit/health-snapshot and return JSON or None."""
#     try:
#         resp = requests.get(f"{BACKEND_BASE_URL}/fitbit/health-snapshot", timeout=5)
#         if resp.status_code == 200:
#             return resp.json()
#         else:
#             print("⚠️ health-snapshot non-200:", resp.status_code, resp.text)
#             return None
#     except Exception as e:
#         print("⚠️ health-snapshot request failed:", e)
#         return None
    





# class Recipe(BaseModel):
#     diet_plan: str
#     time_diet: str
#     time_meal: str
#     calories: int
#     protein: int
#     carbs: int
#     fat: int
#     ingridients: list[str]
#     instructions: list[str]
#     fitbit_weight_kg: float | None = None
    


# class RecipeList(BaseModel):
#     recepies: list[Recipe]




# class FitbitDietPlanRequest(BaseModel):

#     preferences: str | None = None
    
# @app.post("/diet/fitbit/plan")
# def generate_diet_plan_from_fitbit(req: FitbitDietPlanRequest):

#      # 1) get snapshot from Node backend
#     snap_resp = requests.get(f"{BACKEND_BASE_URL}/fitbit/health-snapshot")
#     snap_resp.raise_for_status()
#     snap_data = snap_resp.json()

#     snapshot = snap_data.get("snapshot", {})
#     recommendation = snap_data.get("recommendation", {})

#     weight_kg = snapshot.get("weightKg")
#     bmi = snapshot.get("bmi")
#     target_cals = recommendation.get("targetCalories")

#     # 1) fetch health snapshot from backend
#     hs = get_health_snapshot()
#     if not hs:
#         raise HTTPException(
#             status_code=503,
#             detail="Could not fetch Fitbit health snapshot. Make sure Fitbit is connected."
#         )

#     # your backend returns { snapshot: {...}, recommendation: {...} }
#     snapshot = hs.get("snapshot", hs)       # fallback if shape changes
#     rec = hs.get("recommendation", {})

#     target_cal = rec.get("targetCalories")
#     goal = rec.get("goal")
#     reason = rec.get("reason")

#     # 2) build health context for the SYSTEM prompt
#     health_context = f"""
# USER_HEALTH_SNAPSHOT:
# {json.dumps(snapshot, indent=2)}

# CALORIE_RECOMMENDATION:
# - target_daily_calories: {target_cal}
# - goal: {goal}
# - reason: {reason}

# Guidelines:
# - Base the diet plan on this snapshot and target_daily_calories.
# - If preferences are provided (diet type, meals to include), respect them.
# - Keep total daily calories close to target_daily_calories if it exists.
# - If only a subset of meals is requested (e.g. breakfast + lunch),
#   allocate a reasonable share of total calories to those meals (e.g. 40–60%).
# """

#     # 3) include user preferences (optional)
#     preference_text = ""
#     if req.preferences:
#         preference_text = f"USER_PREFERENCES: {req.preferences}"

#     system_prompt = FITBIT_PLAN_SYSTEM_BASE + health_context

#     # 4) call the model with structured output
#     try:
#         model_name = "Mistral:latest"  # or your chosen model

#         res = ollama.chat(
#             model=model_name,
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {
#                     "role": "user",
#                     "content": (
#                         "Generate a personalised diet plan based ONLY on the health snapshot "
#                         "and preferences below.\n"
#                         f"{preference_text}"
#                     ),
#                 },
#             ],
#             format=RecipeList.model_json_schema(),
#         )

#         content = res["message"]["content"]
#         recipes = RecipeList.model_validate_json(content)
#         return recipes

#     except Exception as e:
#         print("❌ error in /diet/fitbit/plan:", e)
#         raise HTTPException(status_code=500, detail=f"AI error: {e}")


FITBIT_PLAN_SYSTEM_BASE = """
You are a diet and nutrition specialist named Dietly.

You generate personalised diet plans based on the user's health data.

You MUST respond with JSON matching this schema exactly:

[
  {
    "diet_plan": "title for this dietplan",
    "time_diet": "Breakfast | Lunch | Dinner | Snack",
    "time_meal": "HH:MM-HH:MM",
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "ingridients": [ "list of ingredient strings" ],
    "instructions": [ "list of short step strings" ],
    "fitbit_weight_kg": number
  }
]

Rules:
- No extra commentary or explanation.
- No markdown fences, no ```json.
- Only a valid JSON array.
- Distribute calories across the meals in a reasonable way according to the user's goal (maintain / lose / gain weight).
- Use the target_daily_calories from the Fitbit health snapshot if available.
- For every object you return, set "fitbit_weight_kg" to the user's current weight in kg given in the snapshot.
"""


def get_health_snapshot():
    """Call backend /fitbit/health-snapshot and return JSON or None."""
    try:
        resp = requests.get(f"{BACKEND_BASE_URL}/fitbit/health-snapshot", timeout=5)
        if resp.status_code == 200:
            return resp.json()
        else:
            print("⚠️ health-snapshot non-200:", resp.status_code, resp.text)
            return None
    except Exception as e:
        print("⚠️ health-snapshot request failed:", e)
        return None


class Recipe(BaseModel):
    diet_plan: str
    time_diet: str
    time_meal: str
    calories: int
    protein: int
    carbs: int
    fat: int
    ingridients: list[str]
    instructions: list[str]
    # 👇 this will carry the value coming from Fitbit
    fitbit_weight_kg: float | None = None


class RecipeList(BaseModel):
    recepies: list[Recipe]


class FitbitDietPlanRequest(BaseModel):
    preferences: str | None = None


@app.post("/diet/fitbit/plan")
def generate_diet_plan_from_fitbit(req: FitbitDietPlanRequest):
    # 1) fetch health snapshot from backend
    hs = get_health_snapshot()
    if not hs:
        raise HTTPException(
            status_code=503,
            detail="Could not fetch Fitbit health snapshot. Make sure Fitbit is connected.",
        )

    # your backend returns { snapshot: {...}, recommendation: {...} }
    snapshot = hs.get("snapshot", hs)       # fallback if shape changes
    rec = hs.get("recommendation", {})

    # Extract the pieces we care about
    weight_kg = snapshot.get("weightKg")
    bmi = snapshot.get("bmi")
    target_cal = rec.get("targetCalories")
    goal = rec.get("goal")
    reason = rec.get("reason")

    # 2) build health context
    health_context = f"""
USER_HEALTH_SNAPSHOT:
{json.dumps(snapshot, indent=2)}

CALORIE_RECOMMENDATION:
- target_daily_calories: {target_cal}
- goal: {goal}
- reason: {reason}

Guidelines:
- Base the diet plan on this snapshot and target_daily_calories.
- If preferences are provided (diet type, meals to include), respect them.
- Keep total daily calories close to target_daily_calories if it exists.
- If only a subset of meals is requested (e.g. breakfast + lunch),
  allocate a reasonable share of total calories to those meals (e.g. 40–60%).
"""

    # 3) include user preferences (optional)
    preference_text = ""
    if req.preferences:
        preference_text = f"USER_PREFERENCES: {req.preferences}"

    # 4) build system prompt and explicitly tell the model what to do with fitbit_weight_kg
    system_prompt = (
        FITBIT_PLAN_SYSTEM_BASE
        + f"\nThe user's current weight in kg from Fitbit is {weight_kg}.\n"
        + 'For EVERY object in the JSON array you return, set "fitbit_weight_kg" to '
        + (f"{weight_kg}.\n" if weight_kg is not None else "null.\n")
        + health_context
    )

    # 5) call the model with structured output
    try:
        model_name = "Mistral:latest"  # or your chosen model

        res = ollama.chat(
            model=model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": (
                        "Generate a personalised diet plan based ONLY on the health snapshot "
                        "and preferences below.\n"
                        f"{preference_text}"
                    ),
                },
            ],
            format=RecipeList.model_json_schema(),
        )

        content = res["message"]["content"]
        recipes = RecipeList.model_validate_json(content)
        return recipes

    except Exception as e:
        print("❌ error in /diet/fitbit/plan:", e)
        raise HTTPException(status_code=500, detail=f"AI error: {e}")

