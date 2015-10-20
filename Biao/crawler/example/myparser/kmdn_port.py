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
            line = line.decode("big5")
            line = line.encode("utf=8")
            if "<table" in line:
                ret += line
                flag = True
            if flag:
                ret += line
            
            if "</table>" in line:
                break
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            fw.write(result)

    def start(self):
        self.parse()
