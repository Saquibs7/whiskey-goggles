import os
import pandas as pd
import requests
from tqdm import tqdm
from urllib.parse import urlparse
import random

# Normalization function for folder-safe names
def normalize(name):
    return (
        str(name)
        .strip()
        .lower()
        .replace(' ', '_')
        .replace('-', '')
        .replace('/', '')
        .replace(':', '')
        .replace('&', 'and')
        .replace(',', '')
        .replace('.', '')
        .replace("'", '')
        .replace('"', '')
    )

# Root directory (assumes this script is in /scripts)
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Paths
csv_path = os.path.join(ROOT_DIR, 'data', 'whisky_data_encoded.csv')
train_dir = os.path.join(ROOT_DIR, 'data', 'train')
val_dir = os.path.join(ROOT_DIR, 'data', 'val')

# Create root train and val folders
os.makedirs(train_dir, exist_ok=True)
os.makedirs(val_dir, exist_ok=True)

# Load and filter CSV
df = pd.read_csv(csv_path)
df = df[df['image_url'].apply(lambda x: isinstance(x, str) and x.startswith('http'))]
df = df.dropna(subset=['name'])  # Ensure name exists

# Set seed and split
random.seed(42)
df = df.sample(frac=1).reset_index(drop=True)  # Shuffle
split_index = int(len(df) * 0.8)
df['split'] = ['train' if i < split_index else 'val' for i in range(len(df))]

# Loop and download
for _, row in tqdm(df.iterrows(), total=len(df)):
    image_url = row['image_url']
    image_id = row['id']
    brand_name = normalize(row['name'])
    split = row['split']

    # Build file extension
    ext = os.path.splitext(urlparse(image_url).path)[-1].lower()
    ext = ext if ext in ['.jpg', '.jpeg', '.png'] else '.jpg'

    # Create target dir
    target_dir = os.path.join(ROOT_DIR, 'data', split, brand_name)
    os.makedirs(target_dir, exist_ok=True)

    # Full file path
    file_path = os.path.join(target_dir, f"{image_id}{ext}")

    # Download
    try:
        response = requests.get(image_url, timeout=10)
        if response.status_code == 200:
            with open(file_path, 'wb') as f:
                f.write(response.content)
        else:
            print(f"❌ Failed to download {image_url} — Status {response.status_code}")
    except Exception as e:
        print(f"❌ Error downloading {image_url}: {e}")

print("✅ All images downloaded and organized into train/val folders.")
