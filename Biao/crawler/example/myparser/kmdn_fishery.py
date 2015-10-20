import mylib
import urlparse

class Parser:
    def __init__(self, paras):
        self.url = paras['url']
        self.title = paras['title']
        self.url_obj = urlparse.urlparse(self.url)
        self.host = self.url_obj.scheme + "://" + self.url_obj.netloc

    def parse(self):
        data = mylib.myurl(self.url)
        ret = ""
        flag = False
        for line in data:
            if "<center>" in line or flag == True:
                ret += line
                flag = True
            if "</center>" in line:
                ret += line
                break
        self.write(ret)

    def write(self, result):
        with open("result/%s.result"%(self.title), "w") as fw:
            fw.write(result.replace("src='", "src='" + self.host))

    def start(self):
        self.parse()
