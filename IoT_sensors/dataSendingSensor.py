import requests
import time
import random
import uuid

sensor1Id = uuid.uuid4()
sensor2Id = uuid.uuid4()
sensor3Id = uuid.uuid4()
location1= "1st location"
location2= "2nd location"
location3= "3rd location"
unity = "L"
t = 2
value1 = 2000000
value2 = 2000000
value3 = 2000000
url = 'https://api.acquachain.xyz/data'


# Send POST request with FORM data using the data parameter

while True:
  data = {"Id": str(sensor1Id),
          "Location" : location1,
          "Unit" : unity,
          "Value": value1}
  #response = requests.post(url, data=data)
  #print(response.text)
  print("v1 :" + str(value1))
  value1 += random.randint(1900, 2150)
  time.sleep(t)


  
  data = {"Id": str(sensor2Id),
          "Location" : location2,
          "Unit" : unity,
          "Value": value2}
  #response = requests.post(url, data=data)
  #print(response.text)
  print("v2 :" + str(value2))
  value2 += random.randint(1900, 2150)
  time.sleep(t)


  data = {"Id": str(sensor3Id),
          "Location" : location3,
          "Unit" : unity,
          "Value": value3}
  #response = requests.post(url, data=data)
  #print(response.text)
  print("v3 :" + str(value3))
  value3 += random.randint(1900, 2150)
  time.sleep(t)
# Print the response

