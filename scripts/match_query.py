import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import torch
import clip
import faiss
import numpy as np
from PIL import Image
import pandas as pd

# Set device and load CLIP
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device)

# Paths
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
embeddings_dir = os.path.join(ROOT_DIR, 'data', 'embeddings')
embeddings_path = os.path.join(embeddings_dir, 'baxus_embeddings.npy')
meta_path = os.path.join(embeddings_dir, 'baxus_meta.csv')

# Load embeddings and metadata
baxus_embeddings = np.load(embeddings_path)
meta_df = pd.read_csv(meta_path)

# Create FAISS index (using inner product; embeddings must be normalized)
faiss.normalize_L2(baxus_embeddings)
index = faiss.IndexFlatIP(baxus_embeddings.shape[1])
index.add(baxus_embeddings)

def search_similar(query_image_path, top_k=5):
    # Load and preprocess query image
    image = Image.open(query_image_path).convert("RGB")
    image_input = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        query_embedding = model.encode_image(image_input)
    query_embedding = query_embedding.cpu().numpy().flatten()

    # Normalize query embedding
    query_embedding = query_embedding / np.linalg.norm(query_embedding)

    # Search in the FAISS index
    D, I = index.search(np.array([query_embedding]), top_k)
    return D[0], I[0]

# Example usage:
query_image = os.path.join(ROOT_DIR, 'sample2.jpg')
scores, indices = search_similar(query_image, top_k=3)
print("Top matches:")
for score, idx in zip(scores, indices):
    result = meta_df.iloc[idx]
    print(f"Name: {result['name']}, Score: {score:.4f}, Path: {result['relative_path']}")
