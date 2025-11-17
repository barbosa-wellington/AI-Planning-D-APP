from ollama import chat
from pydantic import BaseModel

class Pet(BaseModel):
    name: str
    animal: str
    age: int
    color: str | None
    favorite_toy: str | None

class PetList(BaseModel):
    pets: list[Pet]



# Testing adapting the example into the project perspective
class Receipe(BaseModel):
    diet_plan: str
    time_diet: str
    time_meal: str
    calories: int
    prontein: int
    carbs: int
    fat: int
    ingridients: list
    instructions: str

class RecipeList(BaseModel):
    recepies: list[Receipe]

respose = chat(
    messages=[
        {
            'role':'user',
            'content':'''
                json\n[\n  {\n    \"diet_plan\": \"Simple Vegetarian Breakfast\",\n    \"time_diet\": \"Breakfast\",\n    \"time_meal\": \"07:00-09:00\",\n    \"calories\": 350,\n    \"protein\": 20,\n    \"carbs\": 40,\n    \"fat\": 15,\n    \"ingridients\": \"1/2 cup rolled oats, 1 cup almond milk, 1/4 cup blueberries, 1 tbsp chia seeds\",\n    \"instructions\": \"Combine oats and almond milk in a pot. Bring to a boil, then reduce heat and simmer for 5 minutes. Stir in blueberries and chia seeds. Serve warm.\"\n  }\n]\n
                
''',
        }
    ],
    # model='Gemma3:4b',
    model = 'Mistral:latest',
    # format=PetList.model_json_schema(),
    format=RecipeList.model_json_schema(),
)

# pets = PetList.model_validate_json(respose.message.content)
# print(pets)
recipes = RecipeList.model_validate_json(respose.message.content)
print(recipes)
print(type(recipes))