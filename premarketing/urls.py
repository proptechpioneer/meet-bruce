"""
URL configuration for Bruce pre-marketing site.
"""
from django.contrib import admin
from django.urls import path, include
from signup.views import honeypot_admin

urlpatterns = [
    path('centralmanagementserver/', admin.site.urls),  # Real admin
    path('admin/', honeypot_admin),  # Honeypot - fake admin
    path('', include('signup.urls')),
]
