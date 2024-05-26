"""
This module contains the all user related forms.
Including:
    UserRegistrationForm
    UserLoginForm
    UserUpdateForm
    ProfileUpdateForm
"""

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.core.validators import MinLengthValidator
from django import forms

User = get_user_model()


class UserRegistrationForm(forms.Form):
    """
    This is a form for user registration.
    """

    username = forms.CharField(
        label="Username",
        max_length=30,
        required=True,
        help_text="Username must be unique and Alphanumeric",
    )
    email = forms.EmailField(
        label="Email",
        required=False,
        validators=[validate_email],
    )
    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
        help_text="Password must be at least 8 characters long, and be unique",
        validators=[MinLengthValidator(8)],
    )
    password2 = forms.CharField(
        label="Confirm Password",
        widget=forms.PasswordInput,
        help_text="Enter the same password as before, for verification",
    )

    def clean_username(self):
        """
        Check if the username is alphanumeric and unique.
        """
        username = self.cleaned_data["username"]
        if username is None:
            raise ValidationError("Username is required")
        if not username.isalnum():
            raise ValidationError("Username must be alphanumeric")
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Username already exists")
        return username

    def clean_email(self):
        """
        Check if the email is unique.
        """
        email = self.cleaned_data["email"]
        if email and User.objects.filter(email=email).exists():
            raise forms.ValidationError("The provided email is already in use. Please try a different email or recover your existing account.")

    def clean(self):
        """
        Check if the two passwords match and are at least 8 characters long
        and are not only letters or only numbers or too similar to username.
        """
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        username = self.cleaned_data.get("username")

        if password1 is None:
            raise ValidationError("Password is required")
        if password2 is None:
            raise ValidationError("Confirm password is required")
        if password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        if password1.isdigit():
            raise forms.ValidationError("Password must contain at least one letter")
        if password1.isalpha():
            raise forms.ValidationError("Password must contain at least one number")
        if username and password1.lower() in username.lower():
            raise forms.ValidationError("Password must not be too similar to username")

    def save(self):
        """
        If form is vald save the user to the database.
        """
        username = self.cleaned_data.get("username")
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password1")
        return User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

class UserLoginForm(forms.Form):
    """
    This is a form for user login.
    """
    username = forms.CharField(
        label="Username",
        max_length=30,
        required=True,
        help_text="Enter your username",
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
        help_text="Enter your password",
    )