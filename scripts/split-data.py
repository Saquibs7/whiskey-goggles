import os
import shutil
import random
from pathlib import Path

# Paths
ROOT_DIR = Path(__file__).resolve().parent.parent
ALL_DIR = ROOT_DIR / 'data' / 'all'
TRAIN_DIR = ROOT_DIR / 'data' / 'train'
VAL_DIR = ROOT_DIR / 'data' / 'val'
VAL_RATIO = 0.2  # 20% validation split

# Clean old train/val directories
for split_dir in [TRAIN_DIR, VAL_DIR]:
    if split_dir.exists():
        shutil.rmtree(split_dir)
    split_dir.mkdir(parents=True)

# Go through each class folder in data/all
for class_folder in ALL_DIR.iterdir():
    if not class_folder.is_dir():
        continue

    images = list(class_folder.glob('*'))
    if not images:
        continue

    random.shuffle(images)
    val_count = max(1, int(len(images) * VAL_RATIO))

    train_images = images[val_count:]
    val_images = images[:val_count]

    # Create corresponding class folders
    train_class_dir = TRAIN_DIR / class_folder.name
    val_class_dir = VAL_DIR / class_folder.name
    train_class_dir.mkdir(parents=True, exist_ok=True)
    val_class_dir.mkdir(parents=True, exist_ok=True)

    # Copy images
    for img in train_images:
        shutil.copy(img, train_class_dir / img.name)
    for img in val_images:
        shutil.copy(img, val_class_dir / img.name)

print(f"✅ Dataset split complete: {len(list(ALL_DIR.iterdir()))} classes split into train/ and val/")
