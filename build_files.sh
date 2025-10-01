#!/bin/bash

# Exit on error
set -o errexit

# Ensure pip is installed and upgraded
python3.9 -m ensurepip
python3.9 -m pip install --upgrade pip

# Install project dependencies
python3.9 -m pip install -r requirements.txt

# Run collectstatic
python3.9 -m manage.py collectstatic --noinput