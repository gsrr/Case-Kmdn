import mylib
import urlparse

class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']

    def parse(self):
        data = mylib.myurl(self.url)
        ret = ""
        flag = False
        for line in data:
            if "<table" in line:
                ret += line
                flag = True
            if "</table>" in line:
                ret += line
                break
            if flag:
                ret += line
        print ret
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            fw.write(result)

    def start(self):
        self.parse()
