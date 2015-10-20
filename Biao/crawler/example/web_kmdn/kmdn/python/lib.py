def paraSplit(line):
    arr = line.split("=")
    return (arr[0],arr[1])
    
    
def readParas():    
    paras = {'host':'127.0.0.1'}
    with open("paras", "r") as fr:
        lines = fr.readlines()
        for line in lines:
            line = line.strip()
            key, value = paraSplit(line)
            paras[key] = value
    
    return paras