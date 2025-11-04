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



# Testing using recipe mindset
class Receipe(BaseModel):
    name: str
    ingridients: list
    timeprep: int

class RecipeList(BaseModel):
    recepies: list[Receipe]

respose = chat(
    messages=[
        {
            'role':'user',
            'content':'''
                I have a recipe list.
                This is a penne calabrase. This dish has the following ingridients garlic, olives,
                sofrito, salami, stock, and penne.
                This dish has a timeprep of 5 minutes.
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