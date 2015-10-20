#-*- coding: utf-8 -*- 
import urllib
import sys

def myurl(urlPath):
        data = []
        f = urllib.urlopen(urlPath)
        line = f.readline()
        while line:
            data.append(line.strip())
            line = f.readline()
        f.close()
        return data


def test():
    #data = myurl("http://www.kmdn.gov.tw/ch/News_NewsList.aspx")
    #data = myurl("http://www.kmdn.gov.tw/ch/News_NewsContent.aspx?NewsID=257767&PageType=0&Language=0&CategoryID=0&DepartmentID=&Keyword=")
    #data = myurl("http://www.cwb.gov.tw/V7/observe/real/46711.htm")
    #data = myurl("http://www.cwb.gov.tw/V7/observe/radar/")
    #data = myurl("http://www.cwb.gov.tw/V7/observe/UVI/UVI.htm")
    #data = myurl("http://www.cwb.gov.tw/V7/prevent/typhoon/ty.htm?")
    #data = myurl("http://www.cwb.gov.tw/V7/forecast/fishery/Tidal30days/902001.htm")
    #data = myurl("http://www.cwb.gov.tw/V7/forecast/taiwan/Kinmen_County.htm")
    #data = myurl("http://www.cwb.gov.tw//V7/forecast/week/week.htm")
    #data = myurl("http://www.kma.gov.tw/Main/MoreArrival.aspx")
    #data = myurl("http://port.kinmen.gov.tw/realtimeshow1.php")
    #data = myurl("http://118.163.250.193/UserSeach.aspx")
    data = myurl("http://thewall.tw/")
    for line in data:
        print line

            


if __name__ == "__main__":
    func = getattr(sys.modules[__name__], sys.argv[1]) 
    func()
    
