from fastapi import FastAPI
import ollama 


app = FastAPI()


SYSTEM = """ You are an weather specialist who only provides information about wheater. You only provides the current city weahter followed by the temperature in graus celsius and https://www.builder.io/blog/stream-ai-javascript"""


@app.post("/generate")
def generate(prompt: str):

    response = ollama.chat(model="Gemma3:4b", messages=[{"role":"user", "content": prompt,"system": SYSTEM}])
    return {"response": response["message"]["content"]}