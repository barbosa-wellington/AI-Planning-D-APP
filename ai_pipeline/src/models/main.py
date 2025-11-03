from fastapi import FastAPI
import ollama 


app = FastAPI()

@app.post("/generate")
def generate(prompt: str):
    response = ollama.chat(model="Gemma3:4b", messages=[{"role":"user", "content": prompt}])
    return {"response": response["message"]["content"]}