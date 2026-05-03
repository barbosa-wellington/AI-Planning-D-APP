# This is the file scrip for image generator using sdlx diffusion Model



import requests
import base64

def generate_meal_image(meal_name):
    # O endpoint completo é crucial para não dar erro de rota
    url = "http://127.0.0.1:7860/sdapi/v1/txt2img"
    
    payload = {
        # "prompt": f"A single isolated minimalist flat vector icon of {meal_name}, white background, professional style",
        "prompt": f"Professional minimalist flat vector icon of {meal_name}, high-quality 2D graphic, vibrant studio lighting, clean sharp edges, solid white background, centered composition, masterwork, 8k resolution, trending on Dribbble, culinary app style",
        "negative_prompt": "realistic, 3d, shadows, text, watermark, blurry, messy, complex background",
        "steps": 4,           
        "cfg_scale": 1.0, # SDXL Lightning usa CFG baixo (1 a 2)
        "width": 1024,
        "height": 1024,
        "sampler_name": "Euler a" # Euler a costuma ser mais estável com Lightning
    }

    print(f"🚀 Enviando para SD na porta 7860...")

    try:
        response = requests.post(url, json=payload, timeout=600)
        
        if response.status_code == 200:
            r = response.json()
            # IMPORTANTE: r['images'] é uma lista. Pegamos o índice [0]
            image_base64 = r['images'][0] 
            # "output_diet_icon.png"
            with open(meal_name+".png", "wb") as f:
                f.write(base64.b64decode(image_base64))
            
            print(f"✅ Sucesso! Imagem {meal_name}.png' criada.")
        else:
            print(f"❌ Erro {response.status_code}: {response.text}")

    except Exception as e:
        print(f"❌ Falha de conexão: {e}")

if __name__ == "__main__":
    generate_meal_image("pizza calabreza")