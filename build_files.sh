#!/bin/bash

# Install dependencies
pip3 install -r requirements.txt

# Collect static files (with --noinput to skip database checks)
python3 manage.py collectstatic --noinput --no-default-ignore
