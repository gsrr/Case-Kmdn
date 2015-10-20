import mylib
import re
import urlparse
import kmdn_gov_sub_content


def newsContent(url):
    #print url.replace("amp;", "")
    nc = kmdn_gov_sub_content.Parser({'url' : url.replace("amp;", "")})
    nc.start()    
    return nc.result()

class State:
    def __init__(self):
        pass

    def do(self):
        pass

class LinkState(State):
    def do(self, paras):
        line = paras['line']
        cxt = paras['context']
        if "linkTitle" in line:
            m = re.search("href=.+<", line)
            if m != None:
                line = m.group(0)
                lineArr = line.split("\">")
                url = lineArr[0].lstrip("href=\"")
                cxt.ret.append(newsContent(urlparse.urljoin(cxt.url,  "../../" + url)))
                cxt.ret.append(lineArr[1].rstrip("<"))
            cxt.changeState("date")
            
class ParseDate(State):
    def do(self, paras):
        line = paras['line']
        cxt = paras['context']
        if "lblReleaseDate" in line:
            m = re.search(">.+<", line)
            if m != None:
                cxt.ret.append(m.group(0)[1:-1])
                cxt.ret.append("\n")
            cxt.changeState("link")


class End(State):
    def do(self, paras):
        pass

class Context:
    def __init__(self, url):
        self.state_map = {
            'link' : LinkState(),
            'date' : ParseDate(),
            'end' : End(),
        }
        self.url = url
        self.state = self.state_map['link']
        self.ret = []

    def changeState(self, state):
        self.state = self.state_map[state]

    def do(self,line):
        paras = {
            'line' : line,
            'context' : self,
        }
        self.state.do(paras)

    def result(self):
        return self.ret

class Parser:
    def __init__(self, paras):
        self.url = paras['url']

    def parse(self, write=True):
        cxt = Context(self.url)
        data = mylib.myurl(self.url)
        for line in data:
            cxt.do(line)
        
        if write:
            self.write(cxt.result())
        else:
            return cxt.result()

    def _write(self, result, fw):
        for item in result:
            if type(item) == str:
                fw.write(item + '@@__@@')
            else:
                self.write(item, fw)

    def write(self, result):
        with open("result/kmdn_news.result", "w") as fw:
            for item in result:
                if type(item) == str:
                    fw.write(item + '@@__@@')
                else:
                    self._write(item, fw)

    def start(self):
        self.parse()
