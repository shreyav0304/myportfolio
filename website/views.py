from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import FileResponse, Http404
from django.core.mail import send_mail
from django.conf import settings
import os

def index(request):
    """Renders the main homepage."""
    return render(request, 'index.html')

def download_resume(request):
    """Handles the resume file download."""
    file_path = os.path.join(settings.BASE_DIR, 'website', 'static', 'files', 'My Resume.pdf')

    try:
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='My Resume.pdf')
    except FileNotFoundError:
        raise Http404()

def contact_view(request):
    """Handles the contact form submission."""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # Send the email
        send_mail(
            f'Contact Form Submission from {name}',
            message,
            email,
            [settings.EMAIL_HOST_USER], # Send to your own email configured in settings.py
            fail_silently=False,
        )
        
        # Add a success message and redirect to the homepage
        messages.success(request, 'Thank you! Your message has been sent successfully.')
        return redirect('index')

    # If it's a GET request, just go to the homepage
    return redirect('index')