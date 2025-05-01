import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Get the absolute path to your project root
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Load the CSV file using the correct path
csv_file = os.path.join(ROOT_DIR, 'data', 'whisky_data_encoded.csv')
df = pd.read_csv(csv_file)

# Basic Info
print(df.info())
print(df.describe())

# Missing values
print(df.isnull().sum())

# Plot distributions
sns.histplot(df['avg_msrp'], kde=True)
plt.title('Distribution of MSRP')
plt.show()

sns.boxplot(data=df, x='spirit_type_encoded', y='shelf_price')
plt.title('Shelf Price by Spirit Type')
plt.show()

# Correlation heatmap
sns.heatmap(df.corr(numeric_only=True), annot=True, fmt='.2f')
plt.title('Correlation Heatmap')
plt.show()
