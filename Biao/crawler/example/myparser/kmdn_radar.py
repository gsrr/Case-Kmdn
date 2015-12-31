import mylib
import urlparse

class Parser:
    def __init__(self, paras):
        self.url = paras['url']

    def parse(self):
        data = mylib.myurl(self.url)
        data[0] = data[0].split("=")[1].strip()
        data[-1] = data[-1].strip(";")
        data_str = "".join(data)
        data_image =  data[1].split(":")[0].strip("\"")
        ret =  urlparse.urljoin(self.url, data_image)
        self.write(ret)

    def write(self, result):
        with open("result/kmdn_radar.result", "w") as fw:
            fw.write("--start--\n")
            fw.write("title=" + result + "\n")
            fw.write("--end--\n")

    def start(self):
        self.parse()
