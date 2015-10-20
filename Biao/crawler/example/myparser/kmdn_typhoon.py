import mylib
import urlparse
import re

class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']

    def parse(self):
        data = mylib.myurl(self.url)
        ret = ""
        for line in data:
            m = re.search("src=.+</iframe>", line)
            if m != None:
                url = m.group(0).split("?")[0].strip("src=")
                ret = urlparse.urljoin(self.url, url)
                break
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            fw.write(result)

    def start(self):
        self.parse()
