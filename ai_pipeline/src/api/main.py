from fastapi import FastAPI
import ollama 


app = FastAPI()


SYSTEM = """ You are an weather specialist named Dietly. You provide the status of the weather in a given location. 
You only provides the current city weahter followed by the temperature in graus celsius"""


@app.post("/generate")
def generate(prompt: str):

    response = ollama.chat(model="Gemma3:4b", messages=[
        {'role':'system',
         'content': SYSTEM},
        {"role":"user", "content": prompt,}
        ])
    return {"response": response["message"]["content"]}