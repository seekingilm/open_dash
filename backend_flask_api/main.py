from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from time import sleep
import requests

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/data", methods=["GET", "POST"])
@cross_origin()
def data():
    if request.method == "POST":
        data = make_abuse_countries(request.json)
        return data

    return "200"

@app.route("/pie", methods=["GET", "POST"])
@cross_origin()
def pie():
    if request.method == "POST":
        data = make_pie_data(request.json)
        return data

    return "200"

@app.route("/table", methods=["GET", "POST"])
@cross_origin()
def table():
    if request.method == "POST":
        data = make_table_data(request.json)
        return data
    return "200"



def make_abuse_countries(excel_data):
    if type(excel_data) is not list:
        return '205'

    ip_list = extract_values(excel_data, "IPV4") 
    urls = extract_values(excel_data, "FQDN") 

    dates = []
    countries = []
    country_name = []
    abuse = []
    key = "2e4dde3f009ff333f0599006f784841f53991c7b9323cfa47900c8497bc1e84e775d7cfc81913e43"

    fused_lists = []

    for a in range(0, len(ip_list)):
        ip_list[a] = ip_list[a].replace("[.]", ".")

        url = "https://api.abuseipdb.com/api/v2/check"
        querystring = {"ipAddress": ip_list[a], "maxAgeInDays": "90"}
        headers = {"Accept": "application/json", "Key": key}

        sleep(1)
        response = requests.request(
            method="GET", url=url, headers=headers, params=querystring
        )

        response_dict = json.loads(response.text)
        print(response_dict)
       
        try:
            fused_lists.append(
                {"country": response_dict["data"]["countryCode"], "abuse": response_dict["data"]["abuseConfidenceScore"],}
            )
        except Exception:
           print('Failed to add item to the return list') 

    return fused_lists

def make_pie_data(excel_data): #use this in case you need for API.
    if type(excel_data) is not list:
        print(f'Type of list is {type(excel_data)}')
        print(f'The excel data is {excel_data}')
        return '206'

    ip_list = extract_values(excel_data, "IPV4") 

    dates = []
    countries = []
    country_name = []
    abuse = []
    key = "2e4dde3f009ff333f0599006f784841f53991c7b9323cfa47900c8497bc1e84e775d7cfc81913e43"

    fused_lists = []

    for a in range(0, len(ip_list)):
        ip_list[a] = ip_list[a].replace("[.]", ".")

        url = "https://api.abuseipdb.com/api/v2/check"
        querystring = {"ipAddress": ip_list[a], "maxAgeInDays": "90"}
        headers = {"Accept": "application/json", "Key": key}

        sleep(1)
        response = requests.request(
            method="GET", url=url, headers=headers, params=querystring
        )

        response_dict = json.loads(response.text)
        print(response_dict)
       
        try:
            fused_lists.append(
                {"id": response_dict["data"]["usageType"], "value": response_dict["data"]["abuseConfidenceScore"],}
            )
        except Exception:
           print('Failed to add item to the return list in pie') 

    return fused_lists

def make_table_data(excel_data):
    if type(excel_data) is not list:
        return '206'

    ip_list = extract_values(excel_data, "IPV4") 
    
    dates = []
    countries = []
    country_name = []
    abuse = []
    key = "2e4dde3f009ff333f0599006f784841f53991c7b9323cfa47900c8497bc1e84e775d7cfc81913e43"

    fused_lists = []

    for a in range(0, len(ip_list)):
        ip_list[a] = ip_list[a].replace("[.]", ".")

        url = "https://api.abuseipdb.com/api/v2/check"
        querystring = {"ipAddress": ip_list[a], "maxAgeInDays": "90"}
        headers = {"Accept": "application/json", "Key": key}

        

        sleep(1)
        response = requests.request(
            method="GET", url=url, headers=headers, params=querystring
        )

        response_dict = json.loads(response.text)
        print(response_dict)
       
        try:
            fused_lists.append(
                {"id": response_dict["data"]["ipAddress"],"ip": response_dict["data"]["ipAddress"],"total": response_dict["data"]["totalReports"],  "abuse": response_dict["data"]["abuseConfidenceScore"], "category":  response_dict["data"]["usageType"],"country":  response_dict["data"]["countryCode"]},
            )
        except Exception:
           print('Failed to add item to the return list in pie') 

    return fused_lists


def extract_values(obj_list, key):
    return_list = []

    if type(obj_list) is list:
        for item in obj_list:
            if key in item:
                return_list.append(item[key])

        return return_list

def clean_urls(urls):
    for i in range(len(urls)):
            if type(urls[i]) == str:
                urls[i] = urls[i].replace("[.]", ".")
    return urls
