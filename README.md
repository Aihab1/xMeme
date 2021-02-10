# xMeme

xMeme is a RESTful meme sharing web application built specifically for the Crio Winter of Doing program. It uses connexion on top of Flask for the backend. Frontend comprises of HTML, (S)CSS and Javascript (flask templating) along with AJAX to communicate with the server side when a user interacts with the frontend.

## Installation

These are the instructions to install all the required dependencies for the project:

* [Python](https://www.python.org/getit/)
* [Pip](https://pip.pypa.io/en/stable/quickstart/)

Install all the other dependencies by running this command in the terminal

```bash
pip install -r requirements.txt
```

## API Documentation
xMeme API supports the following endpoints:

`GET` **/memes**
- Read the 100 latest memes

> Requires no parameters. Example request using cURL:
```
curl --location --request GET 'https://x-meme.herokuapp.com/memes'
```

> Successful (200) response is of the form:
```
[
  {
    "id": 0,
    "name": "some string",
    "caption": "some other string",
    "url": "url string"
  }
]
```

`POST` **/memes**
- Create a meme

> Requires an object with name, caption and url attributes. The name and url fields should not be null.
Example request using cURL:
```
curl --location --request POST 'https://x-meme.herokuapp.com/memes' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "some string",
  "caption": "some other string",
  "url": "url string"
}'
```
> A successful (201) response is of the form:
```
{
  "id": 0
}
```

`GET` **/memes/{id}**
- Read a meme

> Requires an id (integer) as parameter. Example request using cURL
```
curl --location --request GET 'https://x-meme.herokuapp.com/memes/2'
```

> Successful (200) response is of the form:
```
{
  "id": 2,
  "name": "some string",
  "caption": "some other string",
  "url": "url string"
}
```

`PATCH` **/memes/{id}**
- Update a meme's caption, url or both

> Requires id (integer) as well as an object with caption and url attributes. Any other attribute will be ignored. Example request using cURL:
```
curl --location --request PATCH 'https://x-meme.herokuapp.com/memes/7' \
--header 'Content-Type: application/json' \
--data-raw '{
  "caption": "updated caption string",
  "url": "updated url string"
}'
```
> A successful (200) response is of the form:
```
{
  "id": 7,
  "name": "owner of the meme string",
  "caption": "updated caption string",
  "url": "updated url string"
}
```

## Website Images
Find images from the website below

![Screenshot_1](https://user-images.githubusercontent.com/55903466/107414839-91990f80-6b38-11eb-8a53-6659bf0248b6.jpg)
![Screenshot_3](https://user-images.githubusercontent.com/55903466/107414855-965dc380-6b38-11eb-9845-f20168808e7d.jpg)
![Screenshot_2](https://user-images.githubusercontent.com/55903466/107414847-94940000-6b38-11eb-981e-66ce63f857a8.jpg)

## Links
View the website on [Heroku](https://x-meme.herokuapp.com).