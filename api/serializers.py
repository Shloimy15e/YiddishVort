from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserLoginSerializer(serializers.ModelSerializer):
    """
    A serializer for user login.
    """
    class Meta:
        model = User
        fields = ['username', 'password']
