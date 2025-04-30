import os
import pandas as pd
import requests
from tqdm import tqdm
from urllib.parse import urlparse
from PIL import Image
import io

def normalize(name):
    """Safer normalization preserving key identifiers"""
    return (
        str(name)
        .strip()
        .lower()
        .replace(' ', '_')
        .replace('-', '_')  # Keep hyphens as underscores
        .replace('&', 'and')
        .replace("'", '')
        .replace('"', '')
        .replace('/', '_')
        .replace(':', '_')
        .replace('__', '_')[:64]  # Limit filename length
    )

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
csv_path = os.path.join(ROOT_DIR, 'data', 'whisky_data_encoded.csv')
image_dir = os.path.join(ROOT_DIR, 'data', 'images')
os.makedirs(image_dir, exist_ok=True)

# Load data with error handling
try:
    df = pd.read_csv(csv_path)
    df = df[df['image_url'].str.startswith(('http://', 'https://'), na=False)]
    df = df.dropna(subset=['name', 'brand_id'])  # Require brand info if needed; adjust as desired.
except Exception as e:
    raise SystemExit(f"🚨 Data loading failed: {e}")

metadata = []
failed_urls = []

for _, row in tqdm(df.iterrows(), total=len(df), desc="Downloading"):
    image_url = row['image_url']
    image_id = row['id']
    name = row['name']
    name_dir = normalize(name)
    name_dir_path = os.path.join(image_dir, name_dir)

    os.makedirs(name_dir_path, exist_ok=True)

    # Generate filename
    ext = os.path.splitext(urlparse(image_url).path)[1][:4].lower()
    ext = ext if ext in ['.jpg', '.jpeg', '.png'] else '.jpg'
    filename = f"{image_id}_{normalize(name)}{ext}"
    filepath = os.path.join(name_dir_path, filename)

    # Skip existing files
    if os.path.exists(filepath):
        metadata.append({
            "id": image_id,
            "name": name,
            "subdir": name_dir,
            "relative_path": os.path.relpath(filepath, ROOT_DIR),
            "text_prompt": f"A photo of {name} {row['spirit_type']} whisky"  # CLIP prompt
        })
        continue

    # Download with validation and retries
    for attempt in range(3):
        try:
            response = requests.get(image_url, timeout=15, stream=True)
            if response.status_code == 200:
                content = response.content

                # Validate image
                try:
                    Image.open(io.BytesIO(content)).verify()

                    # Save image
                    with open(filepath, 'wb') as f:
                        f.write(content)

                    metadata.append({
                        "id": image_id,
                        "name": name,
                        "subdir": name_dir,
                        "relative_path": os.path.relpath(filepath, ROOT_DIR),
                        "text_prompt": (
                            f"A photo of {name} {row['spirit_type']} whisky, "
                            f"{row['abv']}% ABV, {row['size']}ml bottle"
                        )
                    })
                    break
                except Exception as e:
                    print(f"🖼️ Corrupted image: {image_url} ({str(e)})")
                    failed_urls.append(image_url)
                    break
            else:
                print(f"⚠️ Attempt {attempt + 1}: HTTP {response.status_code} for {image_url}")
        except Exception as e:
            print(f"⚠️ Attempt {attempt + 1}: {str(e)}")
            if attempt == 2:
                failed_urls.append(image_url)

# Save metadata
if metadata:
    pd.DataFrame(metadata).to_csv(
        os.path.join(ROOT_DIR, 'data', 'clip_metadata.csv'),
        index=False,
        columns=["id", "name", "subdir", "relative_path", "text_prompt"]
    )
    print(f"✅ Success: {len(metadata)} images downloaded to:")
    print(f"   {os.path.relpath(image_dir, ROOT_DIR)}")

    if failed_urls:
        print(f"❌ Failed downloads ({len(failed_urls)}):")
        print("\n".join(failed_urls[:5]))
else:
    print("❌ Critical: No images downloaded")
