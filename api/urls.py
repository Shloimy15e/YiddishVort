"""
This is the urls.py file for the api.
"""

from django.urls import path
from .views import UserLoginView
from .views import UserLogoutView

urlpatterns = [
    path('auth/login/', UserLoginView.as_view(), name='login'),
    path('auth/logout/', UserLogoutView.as_view(), name='logout'),
]
