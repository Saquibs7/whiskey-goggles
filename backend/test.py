# test.py
import requests
import time

# Wait for server to initialize
time.sleep(5)

url = "http://127.0.0.1:5002/api/search"

try:
    with open('sample2.jpg', 'rb') as f:
        response = requests.post(url, files={'image': f}, timeout=10)

    print(f"Status Code: {response.status_code}")
    print("Response:", response.json())
except Exception as e:
    print(f"Test failed: {str(e)}")