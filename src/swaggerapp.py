# This file configures and runs our swagger application at port:8080
from flask import Flask, render_template, redirect, url_for
from flask_cors import CORS

# Creating the flask app instance
swaggerapp = Flask(__name__)
CORS(swaggerapp)

# Defining the required routes
@swaggerapp.route('/')
def get_index():
    return redirect(url_for('get_docs'))

@swaggerapp.route('/swagger-ui/')
def get_docs():
    return render_template('swaggerui.html')

# Running the swagger application
if __name__ == '__main__':
    swaggerapp.run(port=8080)