#!/usr/bin/env python
"""
One-time script to create a superuser in production.
Run this once, then delete it.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'premarketing.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = 'ash_admin'
email = 'ashley.osborne@prs-im.co.uk'
password = 'DuV@lGlobal123'  # CHANGE THIS!

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser {username} created successfully!')
else:
    print(f'Superuser {username} already exists.')
