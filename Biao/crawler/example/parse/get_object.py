
import json,httplib


def getid():
    with open("id" , "r") as fr:
        appid = fr.readline().split("=")[1].strip()
        restid = fr.readline().split("=")[1].strip()
        return appid, restid


appid,restid = getid()
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/classes/Kmdn', '',
{
    "X-Parse-Application-Id": appid,
    "X-Parse-REST-API-Key": restid,
    "Content-Type": "application/json"
})
results = json.loads(connection.getresponse().read())
print results
