from flask import render_template
from config import *

# Read the swagger.yml file to configure the endpoints
connex_app.add_api('swagger.yml')

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=8081)
