# 🥃 Whisky Goggles - Computer Vision for Whisky Bottle Identification

## 📖 Overview
**Whisky Goggles** is a computer vision system that scans whisky bottle labels and matches them to the **BAXUS** database of 500 bottles. It enables users to quickly identify bottles and record pricing information at liquor stores.

## 🎯 Objectives
- **Label Detection & Recognition:** Process images of whisky bottle labels and extract key visual features for identification.
- **Bottle Identification:** Match identified labels to corresponding bottles in the BAXUS dataset.
- **Accuracy:** Ensure high accuracy under varying conditions (lighting, angles, partial labels).
- **Confidence Scores:** Provide confidence levels for each match.

## 🛠 Technical Requirements

### Core Capabilities
- **Image Recognition:** Use feature matching, OCR, or deep learning techniques to recognize labels.
- **Output:** Structured data with identified bottle names and associated confidence scores.

## 📦 Deliverables
- ✅ Working label scanning and identification system
- ✅ Interactive demo for identifying bottles
- ✅ Clean GitHub repository with code, instructions, and documentation

---

## ⚙️ Project Setup & Installation

### ✅ Prerequisites
download dataset: https://docs.google.com/spreadsheets/d/1yXIJo5f00clyrFHlRyKuIwrNCQw_cNcoVbSvtKO_bTs/edit?gid=0#gid=0

Ensure the following are installed:
- pandas
- numpy
- opencv-python
- pillow
- tensorflow
- torch
- matplotlib
- scikit-learn
- requests
- easyocr
- keras
- git+https://github.com/openai/CLIP.git


### 🔧 Installation

```bash
git clone https://github.com/Saquibs7/whiskey-goggles.git
cd whiskey-goggles
pip install -r requirements.txt
```
## 📁 Data Setup & Preparation

### 📂 Dataset
- **Source:** Provided whisky bottle dataset  
- **File:** `data/whisky_data.csv`  
- **Includes:** ID, name, size, proof, spirit type, popularity, price, and other attributes

### 🧹 Data Cleaning
- Removed missing values and cleaned irrelevant entries  
- Label-encoded categorical variables (e.g., `spirit_type`)  
- **Script:** `scripts/data_preprocessing.py`

### 🖼 Image Downloading & and clip_metadata generating
- Downloaded whisky bottle images from URLs in the dataset  
- Generates CLIP text prompts automatically (e.g., "A photo of Macallan 12 Scotch whisky, 43% ABV, 750ml bottle").


### 📊 Exploratory Data Analysis (EDA)
- Analyzed feature distributions and checked for missing values  
- Created visualizations for understanding trends in data  
- **Script:** `scripts/eda.py`
## 🚀 What We Have Done So Far

### 🔍 Image Recognition & Feature Extraction
We have implemented the core functionality to process whisky bottle images and extract visual features using CLIP (Contrastive Language-Image Pre-training). The features are then used to create embeddings for each bottle label.

### 📊 Data Preprocessing & Embedding Generation
We preprocessed the data, cleaned it, and then used CLIP to generate embeddings for each whisky bottle in the dataset. These embeddings are stored in:

`data/embeddings/baxus_embeddings.npy`

### 🏗 FAISS Index for Efficient Search
A FAISS index was created to perform similarity searches. The embeddings are normalized, and we use FAISS's `IndexFlatIP` for fast, efficient nearest-neighbor search.

### 🔍 Querying the System
A script was developed to load a query image, extract its features using CLIP, and search for the most similar whisky bottle from the BAXUS dataset. The system returns the top matches along with confidence scores.


