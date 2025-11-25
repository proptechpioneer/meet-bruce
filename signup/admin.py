from django.contrib import admin
from .models import EarlySignup


@admin.register(EarlySignup)
class EarlySignupAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'postcode', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'postcode')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
