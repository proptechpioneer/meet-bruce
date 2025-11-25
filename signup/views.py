from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
import logging
from .models import EarlySignup

logger = logging.getLogger(__name__)


def index(request):
    """Landing page with typewriter animation."""
    return render(request, 'index.html')


@require_http_methods(["GET", "POST"])
def signup_view(request):
    """Handle early signup form submission."""
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        postcode = request.POST.get('postcode', '').strip()
        gdpr_consent = request.POST.get('gdpr_consent') == 'on'
        
        # Basic validation
        if not name or not email:
            messages.error(request, 'Name and email are required.')
            return render(request, 'signup.html')
        
        # GDPR consent validation
        if not gdpr_consent:
            messages.error(request, 'You must agree to the data processing terms to register.')
            return render(request, 'signup.html')
        
        # Check if email already exists
        if EarlySignup.objects.filter(email=email).exists():
            messages.warning(request, 'This email is already registered.')
            return render(request, 'signup.html')
        
        # Save to database
        try:
            EarlySignup.objects.create(
                name=name,
                email=email,
                postcode=postcode,
                gdpr_consent=gdpr_consent
            )
            messages.success(request, 'Thank you for registering your interest! We\'ll be in touch soon.')
            return render(request, 'signup.html', {'success': True})
        except Exception as e:
            messages.error(request, 'An error occurred. Please try again.')
            return render(request, 'signup.html')
    
    return render(request, 'signup.html')


def honeypot_admin(request):
    """Honeypot for fake admin page - logs attempted intrusions."""
    ip_address = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR', 'Unknown'))
    user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
    
    logger.warning(
        f"Honeypot triggered - IP: {ip_address}, User-Agent: {user_agent}, "
        f"Path: {request.path}, Method: {request.method}"
    )
    
    # Return a fake admin login page to waste attacker's time
    return HttpResponse(
        """
        <!DOCTYPE html>
        <html>
        <head><title>Log in | Django site admin</title></head>
        <body>
        <h1>Django administration</h1>
        <p>Please enter your username and password.</p>
        <form method="post" action="">
            <input type="text" name="username" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <button type="submit">Log in</button>
        </form>
        </body>
        </html>
        """,
        status=200
    )
