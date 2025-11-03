# This file is a configuration route for the environment variable and the endpoints.

import os
from dotenv import load_dotenv

load_dotenv()

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1")
OLLAMA_PORT = os.getenv("OLLAMA_PORT", "11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL","Gemma3:4b")
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "60"))