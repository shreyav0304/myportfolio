#!/bin/bash

# Exit on error
set -o errexit

# Ensure pip is installed and upgraded
python3.11 -m pip install --upgrade pip

# Install dependencies
python3.11 -m pip install -r requirements.txt

# Run collectstatic
python3.11 -m manage.py collectstatic --noinput