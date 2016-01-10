#-*- coding: utf-8 -*-
import json,httplib
import sys
import traceback

App_id = "mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT"
Api_key = "2iECCPZtci4c8MER1Jy14FwOw3AmKUlbq3a7Cgrr"

classMap = {
    "kmdn_news" : "/1/classes/NewsInfo",
    "kmdn_weather" : "/1/classes/WeatherInfo",
    "kmdn_radar" : "/1/classes/RadarInfo",
    "kmdn_uv" : "/1/classes/UVInfo",
}

class Parse:
    def __init__(self, className):
        self.connection = httplib.HTTPSConnection('api.parse.com', 443)
        self.connection.connect()
        self.name = className 
        self.parseId = {
            "X-Parse-Application-Id": App_id,
            "X-Parse-REST-API-Key": Api_key,
        }

    def query(self):
        self.connection.request('GET', classMap[self.name], '', self.parseId)
        data = json.loads(self.connection.getresponse().read())
        return data['results']

    def delete(self):
        data = self.query()
        for item in data:
            path = classMap[self.name] + "/" + item['objectId']
            self.connection.request("DELETE", path, '', self.parseId)
            result = json.loads(self.connection.getresponse().read())
    
    def insert(self, data):
        self.connection.request('POST', classMap[self.name], json.dumps(data), 
        {
            "X-Parse-Application-Id": App_id,
            "X-Parse-REST-API-Key": Api_key,
            "Content-Type": "application/json"
        })
        results = json.loads(self.connection.getresponse().read())
        return str(results)

def main(name):
    try:
        parse = Parse(name)
        parse.delete()
        with open("result//" + name + ".result" , "r") as fr:
            lines = fr.readlines()
            cnt = 0
            data = None
            while cnt < len(lines):
                if "--start--" in lines[cnt]:
                    data = {}
                    cnt += 1
                    while "--end--" not in lines[cnt]:
                        line = lines[cnt].strip()
                        arrline = line.split("=",1)
                        key = arrline[0]
                        value = arrline[1]
                        data[key] = value
                        cnt += 1
                    print "upload data:" + parse.insert(data)
                else:
                    cnt += 1
    except:
        print traceback.format_exc()


if __name__ == "__main__":
    main("kmdn_news")
    #main("kmdn_weather")
    #main(sys.argv[1])
