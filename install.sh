#!/bin/bash


# Update apt-install
sudo apt-get update

# Installing all the required dependencies
sudo apt-get install -y python3.7

sudo apt-get install -y python3-pip

pip3 install -r requirements.txt

sudo apt install -y docker.io