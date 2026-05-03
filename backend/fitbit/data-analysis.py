# importing the necessary libraries for accessing APIs

import requests as rr
import json

#providing the API link 
# api_url = "https://preindulgent-romelia-unreputable.ngrok-free.dev/fitbit/profile"
api_url = "https://preindulgent-romelia-unreputable.ngrok-free.dev/fitbit/calories-burned"


#accessing and loading the data from a valid API call
data = rr.get(api_url)
resp = json.loads(data.text)

print(resp['date'])
print(resp['caloriesOut'])
print(resp['summary'])