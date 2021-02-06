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
#connex_app.run(port=8081)

# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)

@app.route("/")
def index():
    memes = Meme.query.all()
    return render_template("index.html", memes=memes)

@app.route("/submit", methods=["GET","POST"])
def submit():
    if request.method == "POST":
        try:
            owner = request.form.get("username")
            caption = request.form.get("caption")
            url = request.form.get("image-link")

            # Post the details to the database
            meme = Meme(owner=owner, caption=caption, url=url)
            db.session.add(meme)
            db.session.commit()

        except:
            # Return custom error page later
            return "An error occured"

    return redirect(url_for("index"))
