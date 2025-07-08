from django.urls import path
from . import views
from .views import like_post, get_likes


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('prayers/', views.prayers, name='prayers'),
    path('users/<slug:post>/',views.post_single,name='post_single'),
    # ... your existing URLs ...
    path('like-post/<int:post_id>/', like_post, name='like_post'),
    path('get-likes/<int:post_id>/', get_likes, name='get_likes')
]