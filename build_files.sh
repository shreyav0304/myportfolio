#!/bin/bash

# Exit on error
set -o errexit

# Install dependencies using a more specific command
python3.9 -m pip install -r requirements.txt

# Run collectstatic
python3.9 manage.py collectstatic --noinput