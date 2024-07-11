import pandas as pd
import json
import requests

def main():
    extract()

def nothing():
    return 0

def extract():
    excel_data = pd.read_excel('dumb2.xlsx')

    ip_list = excel_data['IPV4'].tolist()
    dates = []
    countries = [] 
    country_name = []
    abuse = []
    urls = excel_data['FQDN'].tolist()
    key = '9caf023f75484c2315dc7cac2fa8f980e2728d1a0f69ccdc679f722c694185349e82b4be5e20c76c'

    url = 'https://api.abuseipdb.com/api/v2/check'
    querystring = { 'ipAddress': '118.25.6.39', 'maxAgeInDays': '90' }
    headers = { 'Accept': 'application/json', 'Key': key}

    response = requests.request(method='GET', url=url, headers=headers, params=querystring)
    decodedResponse = json.loads(response.text)

    for a in range(0, len(ip_list)):
        ip_list[a]= ip_list[a].replace("[.]", ".")

        url = 'https://api.abuseipdb.com/api/v2/check'
        querystring = { 'ipAddress': ip_list[a], 'maxAgeInDays': '90' }
        headers = { 'Accept': 'application/json', 'Key': key }

        response = requests.request(method='GET', url=url, headers=headers, params=querystring)
        response_dict = json.loads(response.text)

        try:
            countries.append(response_dict['data']['countryCode'])
        except:
            nothing()

        try:
            dates.append(response_dict['data']['lastReportedAt'])
        except:
            nothing()
        
        try:
            country_name.append(response_dict['data']['countryName'])
        except:
            nothing()
        
        try:
            abuse.append(response_dict['data']['abuseConfidenceScore'])
        except:
            nothing()
 
    for i in range(len(urls)):
        if(type(urls[i]) == str):
            urls[i] = urls[i].replace("[.]", ".")

    fused_lists = {}
    fused_lists['countries'] = countries
    fused_lists['country_name'] = country_name 
    fused_lists['dates'] = dates
    fused_lists['abuse'] = abuse

    with open('../public/data.json', 'w', encoding='utf-8') as f:
        json.dump(fused_lists, f, ensure_ascii=False, indent=4)

    print('Success: data.json is now in your publics folder')


main()
