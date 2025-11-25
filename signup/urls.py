from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('lander/', views.index, name='lander'),  # Main landing page
    path('signup/', views.signup_view, name='signup'),
]
