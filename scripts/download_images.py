import os
import pandas as pd
import requests
from tqdm import tqdm
from urllib.parse import urlparse

# Get root directory (one level up from script)
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Paths
csv_path = os.path.join(ROOT_DIR, 'data', 'whisky_data.csv')
images_dir = os.path.join(ROOT_DIR, 'data', 'images')

# Create images directory if it doesn't exist
os.makedirs(images_dir, exist_ok=True)

# Load dataset
df = pd.read_csv(csv_path)

# Filter out invalid URLs
df = df[df['image_url'].apply(lambda x: isinstance(x, str) and x.startswith('http'))]

# Loop through and download
for idx, row in tqdm(df.iterrows(), total=len(df)):
    image_url = row['image_url']
    image_id = row['id']

    # Extract file extension
    path = urlparse(image_url).path
    ext = os.path.splitext(path)[-1].replace('.', '')[:4]  # e.g. jpg, png

    try:
        response = requests.get(image_url, timeout=10)
        if response.status_code == 200:
            file_path = os.path.join(images_dir, f"{image_id}.{ext or 'jpg'}")
            with open(file_path, 'wb') as f:
                f.write(response.content)
        else:
            print(f"Failed to download {image_url}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {image_url}: {e}")
