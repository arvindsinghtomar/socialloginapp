#!/usr/bin/python3
print("Content-type:text/html\r\n\r\n")

#Import the modules
import requests

try:
	r = requests.get("http://192.168.200.65:8000/auth/twitter/")
	print (r.text)
except Exception as e:
	print ("<h1>Exception in get reponse </h1>"+str(e))
