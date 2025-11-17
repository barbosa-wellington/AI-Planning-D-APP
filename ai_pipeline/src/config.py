import os
from dotenv import load_dotenv

# Define environment varible referent to the LLM model and its specifications.
load_dotenv()

# Define localhost, port, model name and request timing
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1")
OLLAMA_PORT = os.getenv("OLLAMA_PORT", "11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL","Gemma3:4b")
# OLLAMA_MODEL = os.getenv("OLLAMA_MODEL","Mistral:latest") 7B parameters model
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "60"))