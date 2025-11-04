import json
import requests 


# import ollama

url  = "http://localhost:11434/api/chat"
# url = "http://localhost:11434/api/generate"

payload = {
    "model": "Gemma3:4b",
    "messages":[{"role": "user", "content":"what is the weahter in melbourne now? "}],
    "format": "json",
    "strem": "false"
}

response = requests.post(url, json=payload, stream=True)

# Checking the response status
if response.status_code == 200:
    print("Streaming respone from Ollama:")
    # iterate over the streaming response
    for line in response.iter_lines(decode_unicode=True):
        if line:
            try:
                json_data = json.loads(line)

                if "message" in json_data and "content" in json_data["message"]:
                    print(json_data["message"]["content"], end="")
            except json.JSONDecodeError:
                print(f"\n Failed to parse line: [line]")
    print()
else:
    print("Nothing happens")


print("testing code using Ollama model")


# This project utilize Anaconda Python and the envrionment activate
# conda activate ai-planning-D-App
# ==> WARNING: A newer version of conda exists. <==
#     current version: 25.5.1
#     latest version: 25.9.1

# Please update conda by running

#     $ conda update -n base -c defaults conda

# Export environment
# conda env export > environment.yml


