import os
import pandas as pd
import torch
import clip  # pip install git+https://github.com/openai/CLIP.git
from PIL import Image
import numpy as np

# Load CLIP model and preprocess
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device)

# Paths
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
metadata_path = os.path.join(ROOT_DIR, 'data', 'clip_metadata.csv')
embeddings_dir = os.path.join(ROOT_DIR, 'data', 'embeddings')
os.makedirs(embeddings_dir, exist_ok=True)

# Load metadata
df = pd.read_csv(metadata_path)

image_embeddings = []
meta_list = []  # to store corresponding metadata

for index, row in df.iterrows():
    image_path = os.path.join(ROOT_DIR, row['relative_path'])
    try:
        image = Image.open(image_path).convert("RGB")
    except Exception as e:
        print(f"Error loading image {image_path}: {e}")
        continue

    # Preprocess and compute embedding
    image_input = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        embedding = model.encode_image(image_input)
    embedding = embedding.cpu().numpy().flatten()
    image_embeddings.append(embedding)

    # Save associated metadata (e.g. id, name, text_prompt)
    meta_list.append({
        "id": row["id"],
        "name": row["name"],
        "text_prompt": row["text_prompt"],
        "relative_path": row["relative_path"]
    })

# Save embeddings and metadata
embeddings_array = np.vstack(image_embeddings)
np.save(os.path.join(embeddings_dir, 'baxus_embeddings.npy'), embeddings_array)
pd.DataFrame(meta_list).to_csv(os.path.join(embeddings_dir, 'baxus_meta.csv'), index=False)

print("✅ Embeddings built and saved!")
