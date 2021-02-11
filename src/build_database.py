import os
import sqlalchemy
from sqlalchemy.orm import scoped_session, sessionmaker
from config import db, basedir
from backend.models import Meme

# Delete database file if it exists currently
if os.path.exists(os.path.join(basedir, 'database', 'memes.db')):
    os.remove(os.path.join(basedir, 'database', 'memes.db'))

engine = sqlalchemy.create_engine('sqlite:///' + os.path.join(basedir, 'database', 'memes.db'))
session = scoped_session(sessionmaker(bind=engine))

# Create the database
Meme.metadata.create_all(engine)

# Commit the changes
db.session.commit()