from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.views.generic import FormView
# Create your views here.
class UserRegistrationFormView(FormView):
      template_name = 'users/user-auth.html'
      form_class = UserCreationForm
      success_url = '/login'
      def form_valid(self, form):
            form.save()
            return super().form_valid(form)
      def form_invalid(self, form):
            return render(self.request, self.template_name, {'form': form, 'error': 'Invalid data'})