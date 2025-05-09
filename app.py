from flask import Flask, request, jsonify,send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from tkinter import filedialog
from threading import Thread
from copy import deepcopy
import tkinter as tk
import webbrowser
import shutil
import json
import time
import os

init_load=False
app = Flask(__name__)
cors=CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
default={
    "dir":"",
    "list":[],
    "presets":[
       
    ],
    "cat":[
 { "name": "*Uncategorized", "icon": "https://cdn.creazilla.com/emojis/57222/question-mark-emoji-clipart-lg.png" },
		{ "name": "Alto", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c4ff33f3b.png" },
		{ "name": "Baizhi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c39f41dda.png" },
		{ "name": "Brant", "icon": "https://images.gamebanana.com/img/ico/ModCategory/67c981a895579.png" },
		{ "name": "Calcharo", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c5f44ca4e.png" },
		{ "name": "Camellya", "icon": "https://images.gamebanana.com/img/ico/ModCategory/675b7f303af84.png" },
		{ "name": "Cantarella", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a36c23457.png" },
		{ "name": "Carlotta", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a3cf60524.png" },
		{ "name": "Changli", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c68095b05.png" },
		{ "name": "Chixia", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c25a55aad.png" },
		{ "name": "Danjin", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c49eef2b5.png" },
		{ "name": "Encore", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c41aafe7c.png" },
		{ "name": "Jianxin", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c6300cb95.png" },
		{ "name": "Jinhsi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c65ae3201.png" },
		{ "name": "Jiyan", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c4cec9dfe.png" },
		{ "name": "Lingyang", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c56786bfb.png" },
		{ "name": "Lumi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/675b1120b010b.png" },
		{ "name": "Mortefi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c52684f89.png" },
		{ "name": "Pheobe", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a40cb85a4.png" },
		{ "name": "Roccia", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a44645b98.png" },
		{ "name": "Rover(F)", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c35cd412e.png" },
		{ "name": "Rover(M)", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c30d33704.png" },
		{ "name": "Sanhua", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c3d32a078.png" },
		{ "name": "Shorekeeper", "icon": "https://images.gamebanana.com/img/ico/ModCategory/66f8c47b49ee8.png" },
		{ "name": "Taoqi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c451a74aa.png" },
		{ "name": "Verina", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c2db4c218.png" },
		{ "name": "Xiangli Yao", "icon": "https://images.gamebanana.com/img/ico/ModCategory/66bddde6d44ed.png" },
		{ "name": "Yangyang", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c230d99e1.png" },
		{ "name": "Yinlin", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c5b7aea39.png" },
		{ "name": "Youhu", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a47de960d.png" },
		{ "name": "Yuanwu", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6683c591329e5.png" },
		{ "name": "Zani", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6812a2f8ddacc.png" },
		{ "name": "Zhezhi", "icon": "https://images.gamebanana.com/img/ico/ModCategory/66bdde0a65151.png" },
		{ "name": "\\NPCs", "icon": "https://images.gamebanana.com/img/ico/ModCategory/66e0d90771ac5.png" },
		{ "name": "\\Other", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6692c90cba314.png" },
		{ "name": "\\UI", "icon": "https://images.gamebanana.com/img/ico/ModCategory/6692c913ddf00.png" }
]

}
data=deepcopy(default)
running = True
logs = []   

def log(message):
    #log activity
    logs.append(message)
    print(message)

def save_log():
    # Save logs to a file
    global logs
    with open('log.txt', 'w') as f:
        for message in logs:
            f.write(message + '\n')
    # Clear the logs after saving
    logs= []  

def ask_dir():  
    # Open prompt for directory
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True) 
    directory_path = filedialog.askdirectory(parent=root)
    root.attributes('-topmost', False)
    root.destroy()
    if directory_path:
        data["dir"]=directory_path
        log("Ask mod dir: "+directory_path)
    else:
        pass

def ask_file():
    # Open prompt for file (preview image)
    root=tk.Tk()
    root.withdraw()
    root.attributes('-topmost',True)
    file_path=filedialog.askopenfilename(parent=root)
    root.attributes('-topmost',False)
    root.destroy()
    return file_path

def custom_sort_key(s):
    if s.startswith('DISABLED_') and len(s) > 9:       
        marker    = s[9]            
        remainder = s[10:]           
    else:
        marker=s[0]
        remainder=s[1:] 
    #Remove 'DISABLED_' from the start of the string if it exists, to treat it like normal
    #Treat uppercase and lowercase letters equally when comparing to other letters, but keep lowercase before uppercase
    return (
            marker.lower(),
            marker.isupper(),
            remainder.casefold()
        )

def cat_sort_key(s):
    s=s["name"]
    prefix="2"
    # * => Important
    # \ => Unimportant
    if s.startswith('*'):
        prefix    = "1"          
        marker    = s[1]           
        remainder = s[2:]
    elif s.startswith("\\"):
        prefix    ="3"
        marker    = s[1]           
        remainder = s[2:]       
    else:
        marker=s[0]
        remainder=s[1:]
    return (
            prefix,
            marker.lower(),
            marker.isupper(),
            remainder.casefold()
        )

def check_appdata():
    # Check if the mod directory exists in the appdata folder
    log("Check %APPDATA%/XXMI Launcher/WWMI/Mods")
    if(os.path.isdir(os.path.join(os.getenv('APPDATA'), 'XXMI Launcher',"WWMI","Mods"))):
        data["dir"]=os.path.join(os.getenv('APPDATA'), 'XXMI Launcher',"WWMI","Mods")
        log("Set mod dir: "+data["dir"])
        return True
    ask_dir()
    return False

def refresh_dir(subdir=""):
    # Refresh the directory content and update the list of mods
    if not data["dir"]:
        check_appdata()
    try:
        temp=sorted(os.listdir(os.path.join(data["dir"],subdir)), key=custom_sort_key)
        new=[]
        for i in range(len(temp)):
           cat="*Uncategorized"
           e=temp[i]
          
           desc="No description"
           link=""
           for ele in data["list"]:
               if(e==ele["name"]):
                   cat=ele["cat"]
                   desc=ele["desc"]
                   link=ele["link"]
                   break
            #try to auto detect category
           if cat=="*Uncategorized":
               temp2=deepcopy(data["cat"])
               for i in temp2:
                   prefix=""
                   if(i["name"][0]=="*" or i["name"][0]=="\\"):
                       prefix=i["name"][0]
                       i["name"]=i["name"][1:]
                   if i["name"].lower() in e.lower() and i["name"]!="Uncategorized":
                       cat=prefix+i["name"]
                       break
           new.append({
               "name":e,
               "isdir": os.path.isdir(os.path.join(data["dir"],subdir,e)),
               "cat":cat,
               "desc":desc,
               "link":link
           })
        if(subdir==""):
            data["list"]=new
        log("Refresh dir "+subdir)
        return new
        
    except:
        #print(e)
        ask_dir()   

def save_congif():
    # Save the current configuration to a JSON file
    try:
        #print(data["list"])
        with open('config.json', 'w') as file:
            json.dump(data,file)
        log("Save config")
        return True
    except:
        #print("errrr")
        return False

def reset():
    # Reset the configuration to default values
    global data
    data=deepcopy(default)
    log("Data reset")
    check_appdata()
    refresh_dir()
    save_congif()

try:
    # Load the configuration from a JSON file if it exists
    with open('config.json', 'r') as file:
        file = json.load(file)
        data["dir"] = file["dir"]
        data["cat"]=file["cat"]
        data["list"]=file["list"]
        if(file["presets"]):
            data["presets"]=file["presets"]
except:
    log("No config file found, using default values")
    init_load=True

# Sort the categories
data["cat"]=sorted(data["cat"],key=cat_sort_key)

if not data["dir"]:
    check_appdata()
else:
    refresh_dir()

save_congif()

@app.route("/") # Serve the index.html file
@cross_origin()
def index():
    return send_from_directory('','index.html')

@app.route("/assets/<file>") # Serve static files from the assets directory
@cross_origin()
def static_files(file):
    return send_from_directory("","assets/"+file)

@app.route('/list', methods=['GET']) # List the content of the mod directory
@cross_origin()
def list_content():
    global init_load
    refresh_dir()
    ret=deepcopy(data)
    ret["tutor"]=init_load
    ret["user"]=""
    if(init_load):
        ret["user"]=os.getlogin()
    init_load=False
    return jsonify(ret)

@app.route('/getdir', methods=['POST']) # List the content of a specific directory                                      FIX THIS   
@cross_origin()
def list_dir_content():
    data_get=request.get_json(force=True)
    paths=data_get["paths"]
    curdir=os.path.join(data["dir"],*paths)
    return {"curdir":curdir,"list":refresh_dir(os.path.join(*paths))}

@app.route("/refresh", methods=['GET']) # Refresh the content of the current directory                                  FIX THIS
@cross_origin()
def refresh_content():
    log("Refresh")
    refresh_dir()
    return jsonify({"status":"ok","list":data["list"]})

@app.route("/reset", methods=['GET']) # Reset the configuration to default values
@cross_origin()
def reset_content():
    log("Initiate reset")
    reset()
    return jsonify(data)

@app.route("/modifypresets", methods=['POST']) # Modify the presets in the configuration
@cross_origin()
def modify_content():
    data_get=request.get_json(force=True)
    data["presets"]=data_get["presets"]
    if save_congif():
        log("Save preset")
        return jsonify({"status":"ok"})
    else:
        return jsonify({"status":"err"})
    
@app.route("/askdir", methods=['GET']) # Ask the user to select a directory
@cross_origin()
def dir_content():
    log("Change cwd")
    ask_dir()
    refresh_dir()
    save_congif()
    return jsonify({"status":"ok","dir":data["dir"],"list":data["list"]})

@app.route("/applypreset/<i>", methods=['GET']) # Apply a preset to the mod directory
@cross_origin()
def apply_content(i):
    try:
        log("Apply preset")
        preset=data["presets"][int(i)]["data"]
        for dt in preset:
            if dt["bool"]:
                try:
                   os.rename(os.path.join(data["dir"],"DISABLED_"+dt["name"]),os.path.join(data["dir"],secure_filename(dt["name"]))) 
                except:
                    pass
            else:
                try:
                   os.rename(os.path.join(data["dir"],dt["name"]),os.path.join(data["dir"],secure_filename("DISABLED_"+dt["name"]))) 
                except:
                    pass
        refresh_dir()
        return jsonify({"status":"ok","list":data["list"]})
    except:
        log("Apply preset err")
        pass
    return jsonify({"status":"err"})

@app.route('/rename', methods=['POST']) # Rename a file or directory
@cross_origin()
def rename_content():
    global data
    data_get=request.get_json(force=True)
    try:
        os.rename(os.path.join(*data_get["from"]),os.path.join(*data_get["to"]))
        frm=data_get["from"][-1]
        to=data_get["to"][-1]
        log("Rename "+frm+" to "+to)
        for i in range(len(data["list"])):
            if data["list"][i]["name"]==frm:
                data["list"][i]["name"]=to
                save_congif()
                break
        return jsonify({"status":"ok","name":os.path.join(*data_get["to"])})
    except:
        return jsonify({"status":"err"})
    
@app.route('/changecat', methods=['POST']) # Change the category of a file or directory                                 TRY TO SHIFT TO /set/<type>
@cross_origin()
def change_cat_content():
    data_get=request.get_json(force=True)
    name=data_get["name"]
    cat=data_get["cat"]
    log("Change "+name+" category to "+cat)
    for i in data["list"]:
        if name==i["name"]:
            i["cat"]=cat
            break
    return jsonify({"status":"ok"})

@app.route("/open",methods=["POST"]) # Open a file or directory in the file explorer
@cross_origin()
def open_path():
    data_get=request.get_json(force=True)
    paths=data_get["paths"]
    path=os.path.join(data["dir"],*paths).replace("/","\\").replace("\\","\\\\")
    log("Open "+path)
    os.startfile(repr(path)[1:-1])
    
    return jsonify({"status":"ok"})

@app.route("/files/<path>") # Get the preview image of a file
@cross_origin()
def get_files(path):
    path=path.replace("%20"," ")
    exts=["png","jpg","jpeg","webp","gif"]
    path=os.path.join(data["dir"],path)
    ext="png"
    path=path.replace("\\","/")
    if(not os.path.isdir(path)):
        return jsonify({"status":"err"})
    files_list=os.listdir(path)
    for i in exts:
        ext=i
        if ("preview."+ext )in files_list:
            break
    return send_from_directory(path,'preview.'+ext)

@app.route("/set/<type>",methods=["POST"]) # Set a property of a file or directory (description or link)
@cross_origin()
def set_link(type):
    global data
    data_get=request.get_json(force=True)
    name=data_get["name"]
    dt=data_get[type]
    log("Set "+name+" "+type+" to "+dt)
    for i in range(len(data["list"])):
        ele=data["list"][i]
        if(ele["name"]==name):
            data["list"][i][type]=dt
            save_congif()
            break
    return jsonify({"status":"ok"})

@app.route('/savepreview', methods=['POST']) # Save the preview image to the specified directory
@cross_origin()
def change_preview_content():
    data_get=request.get_json(force=True)
    try:
        frm=ask_file()
        if(frm):
            to=data_get["to"]
            log("Save preview "+frm+" to "+to)
            to.append("preview."+frm.split(".")[-1])
            shutil.copyfile(frm, os.path.join(*to))
        return jsonify({"status":"ok"})

    except:
        pass
    return jsonify({"status":"err"})

@app.route('/disabledquit', methods=['GET']) # DISABLED, used to stop the server
@cross_origin()
def quit_app():
    global running
    running = False
    log("Quit")
    save_log()
    return jsonify({"status":"ok"})

def run_flask():
    from waitress import serve
    print("Server started at ", "http://127.0.0.1:2110/")
    serve(app, port=2110)

if __name__ == '__main__':
    # Start the Flask app in a separate thread
    flask_thread = Thread(target=run_flask,daemon=True)
    flask_thread.start()
    webbrowser.open("http://127.0.0.1:2110/", new=0, autoraise=True)
    try:
        while running:
            time.sleep(5)
            save_log()
        raise KeyboardInterrupt
    
    except KeyboardInterrupt:
        exit(0)
    
    