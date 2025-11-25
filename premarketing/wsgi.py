"""
WSGI config for Bruce pre-marketing site.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'premarketing.settings')

application = get_wsgi_application()
