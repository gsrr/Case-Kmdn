import mylib
import re
import urlparse
import kmdn_news_content
import copy


debug_flag = 0
Header = ['url', 'content', 'title', 'author', 'date']
Header_cnt = 0

def newsContent(url):
    nc = kmdn_news_content.Parser({'url' : url})
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
                #cxt.ret.append(newsContent(urlparse.urljoin(cxt.url,  "../" + url)))
                cxt.ret['url'] = urlparse.urljoin(cxt.url,  "../" + url)
                content_data = newsContent(urlparse.urljoin(cxt.url,  "../" + url))
                cxt.ret.update(content_data)
                cxt.ret['title'] = lineArr[1].rstrip("<")
            cxt.changeState("department")
            

class DepartState(State):
    def do(self, paras):
        line = paras['line']
        cxt = paras['context']
        if "lblDepartment" in line:
            m = re.search(">.+<", line)
            if m != None:             
                #cxt.ret.append(m.group(0)[1:-1])
                cxt.ret['author'] = m.group(0)[1:-1]
            cxt.changeState("date")

class ParseDate(State):
    def do(self, paras):
        line = paras['line']
        cxt = paras['context']
        if "lblReleaseDate" in line:
            m = re.search(">.+<", line)
            if m != None:
                #cxt.ret.append(m.group(0)[1:-1])
                cxt.ret['date'] = m.group(0)[1:-1]
            cxt.ret_all.append(copy.deepcopy(cxt.ret))
            cxt.ret = {}
            cxt.changeState("link")

class End(State):
    def do(self, paras):
        global debug_flag
        debug_flag = 1
        pass

class Context:
    def __init__(self, url):
        self.state_map = {
            'link' : LinkState(),
            'department' : DepartState(),
            'date' : ParseDate(),
            'end' : End(),
        }
        self.url = url
        self.state = self.state_map['link']
        self.ret = {}
        self.ret_all = []

    def changeState(self, state):
        self.state = self.state_map[state]

    def do(self,line):
        paras = {
            'line' : line,
            'context' : self,
        }
        self.state.do(paras)

    def result(self):
        return self.ret_all

class Parser:
    def __init__(self, paras):
        self.url = paras['url']

    def parse(self, write=True):
        global debug_flag
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
                fw.write(Header[Header_cnt] + ":" + item + "\n")
            else:
                self._write(item, fw)

    def write(self, result):
        with open("result/kmdn_news.result", "w") as fw:
            for item in result:
                fw.write("--start--\n")
                for key in item.keys():
                    fw.write(key + "=" + item[key] + "\n")
                fw.write("--end--\n\n")

    def start(self):
        self.parse()
