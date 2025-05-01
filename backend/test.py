import requests

url = "http://127.0.0.1:5000/api/search"
files = {'image': open('sample2.jpg', 'rb')}
response = requests.post(url, files=files)

print(response.status_code)
print(response.json())
