# backend/app.py
import os
import io
import logging
import gc
import platform
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import clip
import faiss
import pandas as pd
import threading

# Windows-specific memory management
if platform.system() == 'Windows':
    try:
        from ctypes import windll
        # Increase process memory allocation
        windll.kernel32.SetProcessWorkingSetSize(-1, 1024*1024*1024, 1024*1024*1024)
    except Exception as e:
        logging.warning(f"Windows memory management failed: {str(e)}")
else:  # Unix systems
    try:
        import resource
        resource.setrlimit(resource.RLIMIT_AS, (1024 * 1024 * 1024, 1024 * 1024 * 1024))
    except ImportError:
        pass

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
EMBEDDINGS_PATH = os.path.join(DATA_DIR, 'embeddings', 'baxus_embeddings.npy')
METADATA_PATH = os.path.join(DATA_DIR, 'embeddings', 'baxus_meta.csv')
WHISKEY_DATA_PATH = os.path.join(DATA_DIR, 'whisky_data.csv')

# Global variables with lazy loading
model = None
preprocess = None
index = None
meta_df = None
init_lock = threading.Lock()
initialized = False
device = "cpu"  # Force CPU mode for stability


def verify_paths():
    """Ensure all required data files exist"""
    missing = []
    for path in [EMBEDDINGS_PATH, METADATA_PATH, WHISKEY_DATA_PATH]:
        if not os.path.exists(path):
            missing.append(path)
    if missing:
        raise FileNotFoundError(f"Missing data files: {', '.join(missing)}")


def initialize_resources():
    global model, preprocess, index, meta_df, initialized

    with init_lock:
        if initialized:
            return

        logger.info("Initializing resources...")
        verify_paths()  # Check files before loading

        try:
            # 1. Load CLIP with FP16 optimization
            logger.info("Loading CLIP model...")
            model, preprocess = clip.load("ViT-B/32", device=device, jit=False)
            model = model.float()  # Use float32 for CPU stability
            logger.info(f"CLIP loaded on {device}")

            # 2. Load embeddings and convert to float32
            logger.info("Loading embeddings...")
            embeddings = np.load(EMBEDDINGS_PATH).astype(np.float32)
            faiss.normalize_L2(embeddings)
            logger.info(f"Embeddings loaded: {embeddings.shape}")

            # 3. Create FAISS index with proper configuration
            logger.info("Building FAISS index...")
            quantizer = faiss.IndexFlatIP(embeddings.shape[1])
            nlist = min(100, len(embeddings) // 100)
            index = faiss.IndexIVFFlat(quantizer, embeddings.shape[1], nlist)
            index.train(embeddings)  # Requires float32
            index.add(embeddings)
            index.nprobe = 5
            logger.info(f"FAISS index ready: {index.ntotal} vectors")

            # 4. Load and merge metadata
            logger.info("Loading metadata...")
            meta_df = pd.read_csv(
                METADATA_PATH,
                dtype={'id': 'int32', 'name': 'category', 'filename': 'category'}
            )
            whiskey_df = pd.read_csv(
                WHISKEY_DATA_PATH,
                dtype={
                    'id': 'int32',
                    'spirit_type': 'category',
                    'abv': 'float32',
                    'shelf_price': 'float32'
                }
            )

            # Merge dataframes
            meta_df = pd.merge(
                meta_df,
                whiskey_df[['id', 'spirit_type', 'abv', 'proof', 'size', 'shelf_price', 'popularity']],
                on='id',
                how='left'
            )

            # Clean up columns
            keep_columns = ['id', 'name', 'spirit_type', 'abv', 'proof', 'size', 'shelf_price', 'popularity']
            meta_df = meta_df[keep_columns]
            logger.info(f"Merged metadata shape: {meta_df.shape}")

            initialized = True
            logger.info("Resource initialization complete")

        except Exception as e:
            logger.error(f"Initialization failed: {str(e)}", exc_info=True)
            raise


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
    if not initialized:
        try:
            initialize_resources()
        except Exception as e:
            logger.error(f"Initialization failed: {str(e)}")
            return jsonify({'error': f'Service unavailable: {str(e)}'}), 503

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        # Process image
        image_file = request.files['image'].read()
        image = validate_image(image_file)
        image_input = preprocess(image).unsqueeze(0).to(device)

        # Generate embedding
        with torch.no_grad():
            query_embedding = model.encode_image(image_input).cpu().numpy().astype(np.float32)

        # FAISS search
        faiss.normalize_L2(query_embedding)
        scores, indices = index.search(query_embedding, 5)

        # Format results
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if 0 <= idx < len(meta_df):
                result = meta_df.iloc[idx]
                results.append({
                    'id': int(result['id']),
                    'whiskyName': str(result['name']),
                    'score': float(score),
                    'spiritType': str(result.get('spirit_type', '')),
                    'abv': f"{result.get('abv', 0):.1f}%",
                    'proof': str(result.get('proof', 'N/A')),
                    'size': str(result.get('size', 'N/A')),
                    'shelfPrice': float(result['shelf_price']) if not pd.isna(result['shelf_price']) else None,
                    'popularityScore': float(result['popularity']) if not pd.isna(result['popularity']) else None
                })

        return jsonify(results[:5])

    except ValueError as e:
        logger.warning(f"Client error: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Server error: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error'}), 500
    finally:
        gc.collect()


if __name__ == '__main__':
    port = os.environ.get('PORT', 5002)

    if os.environ.get('ENV') == 'production':
        from waitress import serve

        serve(app, host='0.0.0.0', port=port, threads=2)
    else:
        logger.info("Starting development server...")
        app.run(host='127.0.0.1', port=int(port), threaded=False)