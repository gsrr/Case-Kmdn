# -*- coding: utf-8 -*- # 
import mylib
import urlparse
from HTMLParser import HTMLParser
import xml.etree.ElementTree as ET

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print "Encountered a start tag:", tag, attrs
    def handle_endtag(self, tag):
        print "Encountered an end tag :", tag
    def handle_data(self, data):
        print "Encountered some data  :", data
        data = "aaaaaaaaa"

class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']

    def parse(self):
        data = mylib.myurl(self.url)
        ret_list = []
        inflag = False
        ret = ""
        for line in data:
            '''
            if "rowspan=\"2\"" in line:
                pass
                #print line.split(">")[1].split("<")[0].decode("utf8")
            '''
            if "<tbody><tr>" in line:
                inflag = True
                ret += line
            if "row 1 start" in line or "</table>" in line:
                ret += line
                ret_list.append(ret)
                ret = ''
            elif inflag:
                    ret += line
        head = ret_list[0].split("<tbody>")[2]
        kmdn_data = ret_list[-3].replace("../../", "http://www.cwb.gov.tw//V7/")
        ret = [head, kmdn_data]
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            fw.write(result[0] + '\n')
            fw.write(result[1] + '\n')

    def start(self):
        self.parse()
