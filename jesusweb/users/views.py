from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from .models import Admin_dash


# Admin credentials
admin_name = "Jesus"
admin_password = "Jesusisking"

def signup(request):
    if request.method == 'POST':
        name = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        country = request.POST.get("country")
        age = request.POST.get("userage")

        if not all([name, password, email, country, age]):
            messages.error(request, "All fields are required")
            return redirect('signup')
            
        if User.objects.filter(username=name).exists():
            messages.error(request, "Username already exists")
            return redirect('signup')
            
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists")
            return redirect('signup')

        
        return redirect('https://www.whatsapp.com/channel/0029VajdkyhCsU9XUmITrI20')  # This will redirect to login page

    return render(request, 'signup.html')

def home(request):
    # Get image posts (posts with image_head)
    image_posts = Admin_dash.objects.exclude(image_head='').order_by('-post_date')
    
    # Get video posts (posts with video_head)
    video_posts = Admin_dash.objects.exclude(video_head='').order_by('-post_date')
    
    return render(request, 'index.html', {
        'image_posts': image_posts,
        'video_posts': video_posts
    })


def prayers(request):    
    return render(request, 'prayers.html')

def login(request):
    if request.method == "POST":
        name = request.POST.get("username")
        password = request.POST.get("password")

        if name == admin_name and password == admin_password:
            return redirect('/admin/')
        
        user = authenticate(request, username=name, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password")
            return redirect('login')
        
    return render(request, 'login.html')




    

#for the single post:
def post_single(request, post):
    post = get_object_or_404(Admin_dash, slug=post)
    return render(request, 'post.html', {'post':post})


from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Admin_dash
import json

@require_POST
def like_post(request, post_id):
    try:
        post = Admin_dash.objects.get(id=post_id)

        # Track likes via session for anonymous users
        liked_posts = request.session.get('liked_posts', [])
        if post_id in liked_posts:
            return JsonResponse({'status': 'error', 'message': 'Already liked'}, status=400)

        post.likes += 1
        post.save()

        liked_posts.append(post_id)
        request.session['liked_posts'] = liked_posts
        request.session.modified = True

        return JsonResponse({'status': 'success', 'likes': post.likes})

    except Admin_dash.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Post not found'}, status=404)


def get_likes(request, post_id):
    try:
        post = Admin_dash.objects.get(id=post_id)
        return JsonResponse({'status': 'success', 'likes': post.likes})
    except Admin_dash.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Post not found'}, status=404)
