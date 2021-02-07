import os

from flask import Flask, session, render_template, request, redirect, url_for, jsonify
#from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import connexion
#import sqlite3

#Import custom table definitions
from models import *

basedir = os.path.abspath(os.path.dirname(__file__))

# Create the Connexion application instance
connex_app = connexion.App(__name__, specification_dir=basedir)

# Get the underlying Flask app instance
app = connex_app.app

# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'memes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Read the swagger.yml file to configure the endpoints
connex_app.add_api('swagger.yml')

# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=8081)
