#!/bin/bash

# Exit on error
set -o errexit

# 1. Use ensurepip to install pip if it is missing
python3.9 -m ensurepip

# 2. Upgrade pip to the latest version
python3.9 -m pip install --upgrade pip

# 3. Install project dependencies
python3.9 -m pip install -r requirements.txt

# 4. Run collectstatic
python3.9 manage.py collectstatic --noinput