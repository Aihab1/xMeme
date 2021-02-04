import os

from flask import Flask, session, render_template, request, redirect, url_for, jsonify
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for database_url in environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["GET","POST"])
def submit():
    if request.method == "POST":
        try:
            username = request.form.get("username")
            caption = request.form.get("caption")
            imageLink = request.form.get("image-link")
            # Post the details to database
        except:
            # Return custom error page later
            return "An error occured"

    return redirect(url_for("index"))
