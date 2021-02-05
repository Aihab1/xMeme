from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Meme(db.Model):
    __tablename__ = "memes"
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String, nullable=False)
    caption = db.Column(db.String, nullable=True)
    url = db.Column(db.String, nullable=False)