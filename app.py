# backend/app.py
import os
import io
import logging
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import clip
import faiss
import pandas as pd

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure paths
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
EMBEDDINGS_PATH = os.path.join(DATA_DIR, 'embeddings', 'baxus_embeddings.npy')
METADATA_PATH = os.path.join(DATA_DIR,'embeddings', 'baxus_meta.csv')


# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
logger.info(f"CLIP model loaded on {device}")

# Load embeddings and metadata
try:
    embeddings = np.load(EMBEDDINGS_PATH)
    meta_df = pd.read_csv(METADATA_PATH)
    logger.info(f"Loaded {len(meta_df)} embeddings and metadata")
except Exception as e:
    logger.error(f"Error loading data: {e}")
    raise

# Normalize embeddings and build FAISS index
faiss.normalize_L2(embeddings)
index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings)
logger.info("FAISS index initialized")


def validate_image(file_stream):
    try:
        image = Image.open(io.BytesIO(file_stream))
        if image.format not in ['JPEG', 'PNG', 'WEBP']:
            raise ValueError("Unsupported image format")
        return image
    except Exception as e:
        logger.error(f"Image validation failed: {e}")
        raise ValueError("Invalid image file")


@app.route('/api/search', methods=['POST'])
def handle_search():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        # Read and validate image
        image_file = request.files['image'].read()
        image = validate_image(image_file)

        # Process image with CLIP
        image_input = preprocess(image).unsqueeze(0).to(device)
        with torch.no_grad():
            query_embedding = model.encode_image(image_input).cpu().numpy()

        # Normalize query embedding
        faiss.normalize_L2(query_embedding)

        # Perform similarity search
        scores, indices = index.search(query_embedding, 5)

        # Format results
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < 0 or idx >= len(meta_df):  # Handle invalid indices
                continue
            result = meta_df.iloc[idx]
            results.append({
                'name': result['name'],
                'path': result['relative_path'],
                'score': float(score)
            })

        return jsonify(results[:3])  # Return top 3 results

    except ValueError as e:
        logger.warning(f"Client error: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)