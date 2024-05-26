from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer

# Create your views here.
class UserLoginView(APIView):
    """
    A view for user login using jwt tokens.
    """
    def post(self, request):
        """
        Handle user login.
        """
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({
                'error': 'Please provide username and password'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        user = authenticate(username=username, password=password)
        
        if user is None:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_400_BAD_REQUEST)

        serialized_user = UserLoginSerializer(user).data
        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token
        return Response({
            'access': str(access_token),
            'refresh': str(refresh_token),
            'user': serialized_user,
        }, status=status.HTTP_200_OK)
