from flask import Flask, render_template, redirect, url_for
from flask_cors import CORS

swaggerapp = Flask(__name__)
CORS(swaggerapp)

@swaggerapp.route('/')
def get_index():
    return redirect(url_for('get_docs'))

@swaggerapp.route('/swagger-ui/')
def get_docs():
    return render_template('swaggerui.html')

if __name__ == '__main__':
    swaggerapp.run(port=8080)