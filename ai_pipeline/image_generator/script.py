# This is the file scrip for image generator using sdlx diffusion Model

import requests
import base64
import json
def generate_meal_image(meal_name):
    # A porta 7860 deve estar aqui na URL
    url = "http://127.0.0.1:7860"
    
    payload = {
        "prompt": f"A single isolated minimalist flat vector icon of {meal_name}, white background, professional style",
        "negative_prompt": "text, words, blurry, realistic, shadow, grid",
        "steps": 4,           # Configuração do seu modelo Lightning
        "cfg_scale": 1.0,
        "width": 1024,
        "height": 1024,
        "sampler_name": "DPM++ SDE"
    }

    print(f"🚀 Sending request to SD for: {meal_name}...")
    print("⏳ This will take about 4 minutes on your GTX 1060. Please wait...")

    try:
        # O timeout de 600 segundos (10 min) garante que o Python não desista antes da GPU terminar
        response = requests.post(url, json=payload, timeout=600)
        
        if response.status_code == 200:
            r = response.json()
            # Pega o primeiro item da lista de imagens
            image_data = base64.b64decode(r['images'][0]) 

            with open("output_diet_icon.png", "wb") as f:
                f.write(image_data)
            
            print("✅ Success! Image saved as 'output_diet_icon.png'")
        else:
            print(f"❌ Error: Server returned status {response.status_code}")
            print(response.text)

    except Exception as e:
        print(f"❌ Connection Error: {e}")
        print("💡 Make sure Stable Diffusion is running with --api in the .bat file")

# Teste manual
if __name__ == "__main__":
    generate_meal_image("Quinoa bowl with avocado")