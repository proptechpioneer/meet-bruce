from django.db import models
from django.utils import timezone


class EarlySignup(models.Model):
    """Model to store early user signups for pre-marketing campaign."""
    
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    postcode = models.CharField(max_length=20, blank=True)
    gdpr_consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Early Signup'
        verbose_name_plural = 'Early Signups'
    
    def __str__(self):
        return f"{self.name} ({self.email})"
