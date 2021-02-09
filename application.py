# This file imports our configured application and runs it at port:8081
from flask import render_template
from config import *

# Read the swagger.yml file to configure the endpoints
connex_app.add_api('swagger.yml')

# Defining routes for html templating
@app.route("/")
def index():
    return render_template("index.html")

# Running the application
if __name__ == '__main__':
    app.run(port=8081)
