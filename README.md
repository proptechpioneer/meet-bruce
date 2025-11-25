# Bruce Pre-Marketing Site

A minimal Django application for collecting early user signups before the main Bruce platform launches.

## Features

- 📝 Early user registration with name, email, and postcode
- 💾 PostgreSQL database for persistent storage
- 🎨 Typewriter animation matching main Bruce branding
- 📱 Fully responsive design
- 🔒 CSRF protection and secure form handling

## Local Development

1. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create a superuser (to access admin panel):
```bash
python manage.py createsuperuser
```

5. Collect static files:
```bash
python manage.py collectstatic
```

6. Run the development server:
```bash
python manage.py runserver
```

Visit http://127.0.0.1:8000/ to see the site.

## Railway Deployment

### Step 1: Create a New Project on Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your bruce-premarketing repository

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable

### Step 3: Configure Environment Variables

Add these environment variables in Railway:

```
SECRET_KEY=your-secret-key-here-generate-a-random-string
DEBUG=False
```

To generate a SECRET_KEY, run:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 4: Configure Custom Domain

1. In Railway project settings, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter `www.meet-bruce.com`
4. Railway will provide DNS records to add to your domain registrar
5. Add the CNAME record to your domain's DNS settings

### Step 5: Deploy

Railway will automatically deploy when you push to your repository.

The deployment will:
1. Install dependencies from `requirements.txt`
2. Run database migrations
3. Collect static files
4. Start the Gunicorn server

### Step 6: Access Admin Panel

Visit `https://www.meet-bruce.com/admin/` and log in with the superuser credentials.

To create a superuser on Railway:
1. Go to your project in Railway
2. Click on the service
3. Go to "Settings" → "Connect"
4. Run: `python manage.py createsuperuser`

## Database Migration to Main App

When the main Bruce app is ready, you can migrate the early signup data:

### Option 1: Export and Import
```bash
# Export from pre-marketing database
python manage.py dumpdata signup.EarlySignup > early_signups.json

# Import into main app database
python manage.py loaddata early_signups.json
```

### Option 2: Use the Same Database
Configure the main Django app to use the same PostgreSQL database and query the `signup_earlysignup` table.

### Option 3: SQL Migration
```sql
-- Copy data from early signup table to main users table
INSERT INTO main_users (name, email, created_at)
SELECT name, email, created_at
FROM signup_earlysignup
WHERE email NOT IN (SELECT email FROM main_users);
```

## File Structure

```
bruce-premarketing/
├── manage.py
├── requirements.txt
├── Procfile
├── railway.json
├── premarketing/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── signup/
│   ├── __init__.py
│   ├── models.py (EarlySignup model)
│   ├── views.py (index, signup_view)
│   ├── urls.py
│   ├── admin.py
│   └── apps.py
├── templates/
│   ├── index.html (landing page with typewriter)
│   └── signup.html (registration form)
└── static/
    ├── images/
    │   ├── logo.png
    │   └── icon.png
    └── js/
        └── script.js (typewriter animation)
```

## Managing Signups

Access the admin panel to view and export signups:
- URL: `https://www.meet-bruce.com/admin/`
- Model: Early Signups
- Export as CSV available in admin

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes (auto-set by Railway) |
| `SECRET_KEY` | Django secret key | Yes |
| `DEBUG` | Debug mode (set to `False` in production) | No (defaults to False) |

## Security Notes

- CSRF protection enabled on all forms
- Secret key stored in environment variables
- Debug mode disabled in production
- Whitenoise serves static files securely
- PostgreSQL for production database
- HTTPS enforced on Railway

## Support

For issues or questions, contact the Bruce development team.
