#!/usr/bin/env python3

import sys
import os

from flask import Flask, render_template, request, send_from_directory

app = Flask("dalli-click")
files = []

@app.route("/img/<filename>")
def custom_static(filename):
    return send_from_directory(app.config["CUSTOM_STATIC_PATH"], filename)

@app.route("/")
def index():
    global files
    idx = int(request.args.get("image", 0))
    if idx >= 0 and idx < len(files):
        return render_template("index.html", img=files[idx], pageno=idx + 1)
    else:
        return render_template("ende.html")

def main():
    global files
    
    if len(sys.argv) < 2:
        print("Please specify a directory with images")
        exit(1)
    
    app.config["CUSTOM_STATIC_PATH"] = sys.argv[1]
    
    for filename in sorted(os.listdir(sys.argv[1])):
        if os.path.isfile(os.path.join(sys.argv[1], filename)):
            files.append(filename)
    
    app.run()

if __name__ == "__main__":
    main()
