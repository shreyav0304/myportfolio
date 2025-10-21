"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()

# Wrap with WhiteNoise for static files on Vercel
from whitenoise import WhiteNoise
BASE_DIR = Path(__file__).resolve().parent.parent
# Serve files from STATIC_ROOT at the /static/ URL prefix
application = WhiteNoise(
	application,
	root=str(BASE_DIR / 'staticfiles_build'),
	prefix='static/'
)

app = application