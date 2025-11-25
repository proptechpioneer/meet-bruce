"""
ASGI config for Bruce pre-marketing site.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'premarketing.settings')

application = get_asgi_application()
