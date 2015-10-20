# -*- coding: utf-8 -*-
import mylib
import urlparse
import re


from HTMLParser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []

    def handle_data(self, d):
        self.fed.append(d)

    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']

    def parse(self):
        data = mylib.myurl(self.url)
        ret = []
        table = ""
        flag = False
        for line in data:
            if "資料來源" in line:
                ret.append(strip_tags(re.search("<span>.+</span>", line).group(0)))
            if re.search("[0-9]+/[0-9]+/[0-9]+", line):
                ret.append(re.search("[0-9]+/[0-9]+/[0-9]+", line).group(0))
            if "<table" in line:
                table += line
                flag = True
            if flag:
                table += line
            if "</table>" in line:
                ret.append(table)
                break
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            for item in result:
                fw.write(item + "\n")

    def start(self):
        self.parse()
