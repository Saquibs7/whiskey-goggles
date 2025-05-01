import pandas as pd

# Load dataset
df = pd.read_csv('C:/Users/Saquib Hussain/Desktop/whisky-goggles/data/whisky_data.csv')

# Drop duplicates
df = df.drop_duplicates()

# Drop rows with missing critical values
df = df.dropna(subset=['name', 'abv', 'spirit_type', 'brand_id', 'avg_msrp', 'shelf_price'])

# Optional: Fill missing numeric values with median
df['total_score'] = df['total_score'].fillna(df['total_score'].median())

# Save cleaned dataset
df.to_csv('data/whisky_data_cleaned.csv', index=False)
