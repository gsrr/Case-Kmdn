
import json,httplib

def readFile():
    data = ""
    with open("../result/kmdn_radar.result", "r") as fr:
        data = fr.readline()
    
    return data.strip()

data = readFile()
print data
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/Kmdn', json.dumps({
    "type": "image",
    "name": "radar",
    "data": data
}), 
{
    "X-Parse-Application-Id": "",
    "X-Parse-REST-API-Key": "",
    "Content-Type": "application/json"
})
results = json.loads(connection.getresponse().read())
print results
