from flask_sqlalchemy import SQLAlchemy
from config import db
from marshmallow_sqlalchemy import ModelSchema

db = SQLAlchemy()

class Meme(db.Model):
    __tablename__ = "memes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    caption = db.Column(db.String, nullable=True)
    url = db.Column(db.String, nullable=False)

class MemeSchema(ModelSchema):
    class Meta:
        model = Meme
        sqla_session = db.session


