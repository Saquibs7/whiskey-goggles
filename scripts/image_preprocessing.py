import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
import numpy as np
from tqdm import tqdm

# Directories
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
train_dir = os.path.join(ROOT_DIR, 'data', 'train')
val_dir = os.path.join(ROOT_DIR, 'data', 'val')

# Initialize ImageDataGenerator with augmentation for training
train_datagen = ImageDataGenerator(
    rescale=1./255,  # Normalize pixel values
    rotation_range=30,  # Rotate image by up to 30 degrees
    width_shift_range=0.2,  # Shift image horizontally by 20%
    height_shift_range=0.2,  # Shift image vertically by 20%
    shear_range=0.2,  # Apply shearing transformations
    zoom_range=0.2,  # Apply zoom transformations
    horizontal_flip=True,  # Flip images horizontally
    fill_mode='nearest'  # Fill missing pixels with nearest value
)

# For validation, just rescale (no augmentation)
val_datagen = ImageDataGenerator(rescale=1./255)

# Flow data from the directories
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),  # Resize images to 224x224
    batch_size=32,
    class_mode='categorical',  # Assuming the classes are encoded in one-hot format
    shuffle=True
)

val_generator = val_datagen.flow_from_directory(
    val_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    shuffle=False
)
