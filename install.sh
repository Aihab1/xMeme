#!/bin/bash


# Update apt-install
sudo apt-get update

# Installing all the required dependencies
sudo apt-get install -y python3.7

sudo apt-get install -y python-pip

curl -O https://bootstrap.pypa.io/get-pip.py

pip install -r requirements.txt