import os

from flask import Flask, session, render_template, request, redirect, url_for, jsonify
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

#Import custom table definitions
from models import *

template_dir = os.path.abspath("../frontend/templates")
static_dir = os.path.abspath("../frontend/static")
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# Check for database_url in environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
# engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))

# Tell Flask what SQLAlchemy databas to use
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Link the Flask app with the database
db.init_app(app)

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
        #     # Return custom error page later
            return "An error occured"

    return redirect(url_for("index"))
