#-*- coding: utf-8 -*-
import json,httplib
import sys
import traceback

App_id = "mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT"
Api_key = "2iECCPZtci4c8MER1Jy14FwOw3AmKUlbq3a7Cgrr"

classMap = {
    "kmdn_news" : "/1/classes/NewsInfo",
    "kmdn_weather" : "/1/classes/WeatherInfo",
}

def queryData(name, id_name):
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('GET', classMap[name], '', {
        "X-Parse-Application-Id": App_id,
        "X-Parse-REST-API-Key": Api_key,
    })
    data = json.loads(connection.getresponse().read())
    cont_list = []
    for line in data['results']:
        cont_list.append(line[id_name])
    return cont_list

def insertData(name, data, titles):
    data["title"] = data["title"].decode("utf-8")
    if data["title"] in titles:
        return {'status' : 1, 'msg': "Already exist"}
    connection = httplib.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('POST', classMap[name], json.dumps(data), 
    {
        "X-Parse-Application-Id": App_id,
        "X-Parse-REST-API-Key": Api_key,
        "Content-Type": "application/json"
    })
    results = json.loads(connection.getresponse().read())
    print results


def main(name):
    try:
        cont_list = queryData(name, "title")
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
                    print insertData(name, data, cont_list)
                else:
                    cnt += 1
    except:
        print traceback.format_exc()


if __name__ == "__main__":
    #main("kmdn_news")
    #main("kmdn_weather")
    main(sys.argv[1])
