#!/bin/bash

# Update system packages
echo "Updating system packages..."
sudo apt update -y
sudo apt upgrade -y

# Install Python3 and pip
echo "Installing Python3 and pip..."
sudo apt install -y python3 python3-pip python3-venv

# Install Flask using pip
echo "Installing Flask..."
pip3 install Flask
