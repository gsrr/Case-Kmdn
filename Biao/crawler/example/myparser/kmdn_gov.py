import mylib
import urlparse
import re
import kmdn_gov_sub
import time
import random


class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']
        self.url_parse = urlparse.urlparse(self.url)
        self.host = self.url_parse.scheme + "://" + self.url_parse.netloc

    def parse(self):
        data = mylib.myurl(self.url)
        flag = False
        url_map = {}
        for line in data:
            if "News_NewsList" in line:
                title = re.search("target=\"\">.+</a>", line)
                key = title.group(0).split(">")[1].rstrip("</a>")
                m = re.search("href=\".+\"", line)
                if m != None:
                    target_url = self.host + m.group(0).split()[0].lstrip("href=\"").rstrip("\"")
                    url_map[key] = [target_url.replace("amp;","")]
        for key in url_map.keys():
            kgs = kmdn_gov_sub.Parser({"url" : url_map[key][0]})
            time.sleep(random.randint(3,5))
            url_map[key].append(kgs.parse(False))

        self.write(url_map)
    
    def _write(self, key, result, fw):
        for item in result:
            if type(item) == str:
                if item == "\n":
                    fw.write(item + key + '@@_@@')
                else:
                    fw.write(item + '@@__@@')
            else:
                self._write(key, item, fw)

    def write(self, result):
        with open("result/%s.result"%self.title, "w") as fw:
            for key in result.keys():
                fw.write(key + '@@__@@')
                self._write(key, result[key], fw)
                fw.write('\n')


    def start(self):
        self.parse()
