from flask import (
    make_response,
    abort,
)
from config import db
from models import (
    Meme,
    MemeSchema,
)

# GET all memes
def read_all():
    """
    This function responds to a request for /memes
    with the complete lists of memes

    :return:        json string of list of memes
    """
    # Create the list of memes from our data
    memes = Meme.query \
        .order_by(Meme.id) \
        .all()

    # Serialize the data for the response
    meme_schema = MemeSchema(many=True)
    return meme_schema.dump(memes)

# GET one meme by ID
def read_one(id):
    """
    This function responds to a request for /memes/{id}
    with one matching meme from memes

    :param id:   ID of meme to find
    :return:            meme matching ID
    """
    # Get the meme requested
    meme = Meme.query \
        .filter(Meme.id == id) \
        .one_or_none()

    # Did we find a meme?
    if meme is not None:

        # Serialize the data for the response
        meme_schema = MemeSchema()
        return meme_schema.dump(meme)

    # Otherwise, didn't find that meme
    else:
        abort(404, 'Meme not found for Id: {id}'.format(id=id))

# POST meme
def create(meme):
    """
    This function creates a new meme in the memes structure
    based on the passed-in meme data

    :param meme:  meme to create in memes structure
    :return:        201 on success, 409 on meme exists
    """
    name = meme.get('name')
    caption = meme.get('caption')
    url = meme.get('url')

    existing_meme = Meme.query \
        .filter(Meme.name == name) \
        .filter(Meme.caption == caption) \
        .filter(Meme.url == url) \
        .one_or_none()

    # Can we insert this meme?
    if existing_meme is None:

        # Create a meme instance using the schema and the passed-in meme
        schema = MemeSchema()
        new_meme = schema.load(meme, session=db.session)

        # Add the meme to the database
        db.session.add(new_meme)
        db.session.commit()

        # Serialize and return the newly created meme in the response
        response = {'id': new_meme.id}
        return schema.dump(response), 201

    # Otherwise, meme exists already
    else:
        abort(409, f'Meme by {name} with caption: {caption} and image url: {url} exists already')

def update(id, meme):
    """
    This function updates an existing meme in the memes structure
    Throws an error if a meme with the details we want to update to
    already exists in the database.
    :param id:   Id of the meme to update in the memes structure
    :param meme:      meme to update
    :return:            updated meme structure
    """

    # Get the meme requested from the db into session
    updated_meme = Meme.query.filter(
        Meme.id == id
    ).one_or_none()

    #Check if the meme doesn't exist
    if updated_meme is None:
        abort(
            404,
            "Meme not found for Id: {id}".format(id=id),
        )

    # Try to find an existing meme with the same data as the updated one
    name = updated_meme.name
    caption = meme.get('caption')
    url = meme.get('url')

    if caption is None and url is None:
        return "No content provided", 204

    if caption is None:
        caption = updated_meme.caption

    if url is None:
        url = updated_meme.url

    existing_meme = (
        Meme.query.filter(Meme.name == name)
        .filter(Meme.caption == caption)
        .filter(Meme.url == url)
        .one_or_none()
    )

    # Would our update create a duplicate of another meme already existing?
    if (
        existing_meme is not None and existing_meme.id != id
    ):
        abort(
            409,
            "Meme by {name} with caption: {caption} and url: {url} exists already".format(
                name=name, caption=caption, url=url
            ),
        )

    # Otherwise go ahead and update!
    else:

        # Update only the caption and the url of meme and NOT the name (Old name is used)
        valid_meme = {
            "name": name,
            "caption": caption,
            "url": url
        }

        # turn the passed in meme into a db object
        schema = MemeSchema()
        update = schema.load(valid_meme, session=db.session)

        # Set the id to the meme we want to update
        update.id = updated_meme.id

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()

        # return updated meme in the response
        data = schema.dump(update)

        return data, 200