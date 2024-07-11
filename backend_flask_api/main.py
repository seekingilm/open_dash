from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import requests


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

post_json = {}


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/data", methods=["GET", "POST"])
@cross_origin()
def data():
    if request.method == "POST":
        data = request.json
        extract(data)
        print(post_json)

    return '200'


def extract(excel_data):
    ip_list = extract_values(excel_data, "IPV4")
    urls = extract_values(excel_data, "FQDN")

    dates = []
    countries = []
    country_name = []
    abuse = []
    key = "9caf023f75484c2315dc7cac2fa8f980e2728d1a0f69ccdc679f722c694185349e82b4be5e20c76c"

    url = "https://api.abuseipdb.com/api/v2/check"
    querystring = {"ipAddress": "118.25.6.39", "maxAgeInDays": "90"}
    headers = {"Accept": "application/json", "Key": key}

    response = requests.request(
        method="GET", url=url, headers=headers, params=querystring
    )
    decodedResponse = json.loads(response.text)

    for a in range(0, len(ip_list)):
        ip_list[a] = ip_list[a].replace("[.]", ".")

        url = "https://api.abuseipdb.com/api/v2/check"
        querystring = {"ipAddress": ip_list[a], "maxAgeInDays": "90"}
        headers = {"Accept": "application/json", "Key": key}

        response = requests.request(
            method="GET", url=url, headers=headers, params=querystring
        )
        response_dict = json.loads(response.text)

        try:
            countries.append(response_dict["data"]["countryCode"])
        except:
            nothing()

        try:
            dates.append(response_dict["data"]["lastReportedAt"])
        except:
            nothing()

        try:
            country_name.append(response_dict["data"]["countryName"])
        except:
            nothing()

        try:
            abuse.append(response_dict["data"]["abuseConfidenceScore"])
        except:
            nothing()

    for i in range(len(urls)):
        if type(urls[i]) == str:
            urls[i] = urls[i].replace("[.]", ".")

    fused_lists = {}
    fused_lists["countries"] = countries
    fused_lists["country_name"] = country_name
    fused_lists["dates"] = dates
    fused_lists["abuse"] = abuse

    post_json = fused_lists;
    #FIGURE OUT A GOOD WAY OF STORING THIS INFO

    print("Success: data.json is now in your publics folder")
    return fused_lists

def extract_values(obj_list, key):
    return [obj[key] for obj in obj_list if key in obj]

def nothing():
    return 0
