from langchain_ollama import OllamaLLM

model = OllamaLLM(model="Gemma3:4b")

result = model.invoke(input="hello world")
print(result)
