FROM python:3.6.1-alpine
WORKDIR /project
ADD . /project
RUN \
 apk add --no-cache python3 postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir
CMD ["python3","src/application.py"]
