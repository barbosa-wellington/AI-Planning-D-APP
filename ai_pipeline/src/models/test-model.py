import json
import requests 


import ollama

print(ollama.__version__) # This will print the installed version if successful



# from ollama import chat

# def get_temperature(city: str) -> str:
#   """Get the current temperature for a city
  
#   Args:
#     city: The name of the city

#   Returns:
#     The current temperature for the city
#   """
#   temperatures = {
#     "New York": "22°C",
#     "London": "15°C",
#     "Tokyo": "18°C",
#   }
#   return temperatures.get(city, "Unknown")

# messages = [{"role": "user", "content": "What's the temperature in New York?"}]

# # pass functions directly as tools in the tools list or as a JSON schema
# response = chat(model="qwen3", messages=messages, tools=[get_temperature], think=True)

# messages.append(response.message)
# if response.message.tool_calls:
#   # only recommended for models which only return a single tool call
#   call = response.message.tool_calls[0]
#   result = get_temperature(**call.function.arguments)
#   # add the tool result to the messages
#   messages.append({"role": "tool", "tool_name": call.function.name, "content": str(result)})

#   final_response = chat(model="qwen3", messages=messages, tools=[get_temperature], think=True)
#   print(final_response.message.content)




# print("testing Ollama model")
# url = "https://localhost:11434/generate"

# data = {
#     "model": "Mistral",
#     "prompt": "say oi?"}


# response = requests.post(url, json=data, stream=True)
# # check the response status

# if response.status_code == 200:
#     print("Generated Text: ", end="", flush=True)
#     # iterate over the streaming response
#     for l in response.iter_lines():
#         if l:
#             #Decode the line and part the json
#             decoded_line  = l.decode("utf-8")
#             result = json.loads(decoded_line)
#             # Get the text from the response
#             generated_text = result.get("response", "")
#             print(generated_text, end="", flush=True)
# else:
#     print("Error:", response.status_code, response.text)
