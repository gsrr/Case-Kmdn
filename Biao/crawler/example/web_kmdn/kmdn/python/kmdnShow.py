import lib
import sys

def kmdn_typhoon(path):
    kmdn_radar(path)

def kmdn_uv(path):
    kmdn_radar(path)
        
def kmdn_radar(path):
    with open(path , "r") as fr:
        line = fr.readline()
        print line.strip()

def kmdn_gov(path):
    with open(path , "r") as fr:
        lines = fr.readlines()
        print "<br/>".join(lines)
        
def kmdn_news(path):
    kmdn_gov(path) 
    
def kmdn_bus(path):
    kmdn_weather(path) 
    
def kmdn_port(path):
    kmdn_weather(path)       
 
def kmdn_usersearch(path):
    kmdn_weather(path)
        
def kmdn_depart(path):
    kmdn_weather(path)
        
def kmdn_arrival(path):
    kmdn_weather(path)
        
def kmdn_forecast(path):
    kmdn_weather(path)
        
def kmdn_fishery(path):
    kmdn_weather(path)
        
def kmdn_weather(path):
    with open(path , "r") as fr:
        lines = fr.readlines()
        print "".join(lines)

def main():
    paras = lib.readParas()
    func = getattr(sys.modules[__name__], "kmdn_" + paras['name'].lower())
    path = "data/kmdn_" + paras['name'].lower() + ".result"
    return func(path)


if __name__ == "__main__":
    main()
