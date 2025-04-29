import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Get the root directory (one level up from current script)
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Construct absolute paths
input_csv = os.path.join(ROOT_DIR, 'data', 'whisky_data_cleaned.csv')
output_csv = os.path.join(ROOT_DIR, 'data', 'whisky_data_encoded.csv')

# Load and encode
df = pd.read_csv(input_csv)

le_spirit = LabelEncoder()
df['spirit_type_encoded'] = le_spirit.fit_transform(df['spirit_type'])

le_brand = LabelEncoder()
df['brand_id_encoded'] = le_brand.fit_transform(df['brand_id'].astype(str))

df.to_csv(output_csv, index=False)
