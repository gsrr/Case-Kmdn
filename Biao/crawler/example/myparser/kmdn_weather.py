import mylib
import re
from HTMLParser import HTMLParser


class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print "Encountered a start tag:", tag
    def handle_endtag(self, tag):
        print "Encountered an end tag :", tag
    def handle_data(self, data):
        print "Encountered some data  :", data

class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.queue = []

    def parse(self):
        data = mylib.myurl(self.url)
        s = 0
        for i in range(len(data)):
            if "BoxTable" in data[i]:
                s = i
                break

        data_clean = data[s:]
        for line in data_clean:
            print line

        self.write(data_clean)

    def write(self, result):
        with open("result/kmdn_weather.result", "w") as fw:
            fw.write("--start--\n")
            title = ""
            content = ""
            for item in result:
                searchObj = re.search(r'<tr><th>(.*?)</th>', item, re.M|re.I|re.S)
                if searchObj:
                    title = searchObj.group(1)
                content += item
            fw.write("title=" + title + "\n")
            fw.write("table=" + content + "\n")
            fw.write("--end--\n")

    def start(self):
        self.parse()
