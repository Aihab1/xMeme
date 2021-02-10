#!/bin/bash


cd src


# Setup DB or any other environment variables you want to setup.
python build_database.py

# Running our servers on port:8081 (application.py) and port:8080 (swaggerapp.py)
python application.py & python swaggerapp.py &
