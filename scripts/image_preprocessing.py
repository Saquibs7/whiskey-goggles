from PIL import Image
import os

# Get the absolute path to your image folder
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
image_folder = os.path.join(ROOT_DIR, 'data', 'images')

for filename in os.listdir(image_folder):
    if filename.endswith(('.jpg', '.png')):
        path = os.path.join(image_folder, filename)
        try:
            img = Image.open(path)

            # Convert images with transparency to RGBA
            if img.mode == 'P' or img.mode == 'LA':
                img = img.convert('RGBA')

            # Resize and save
            img = img.resize((224, 224))
            img.save(path)

        except Exception as e:
            print(f"Error processing image {filename}: {e}")
