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
Ensure the following are installed:
- Python 3.x
- pip
- TensorFlow
- OpenCV
- Pandas
- NumPy

### 🔧 Installation

```bash
git clone https://github.com/Saquibs7/whiskey-goggles.git
cd whiskey-goggles
pip install -r requirements.txt
