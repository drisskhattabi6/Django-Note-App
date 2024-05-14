from django.urls import path
from . import views
from django.contrib.auth import views as auth_views 

urlpatterns = [
    path('', views.homepage, name='homepage'),

    path('about/', views.about, name='about'),
    path('login/', views.loginPage, name='login'),
    path('register/', views.registerPage, name='register'),
    path('logout/', views.logout_view, name='logout'),

    ###################################

    path('password_reset/',
         auth_views.PasswordResetView.as_view(template_name="note/registration/password_reset_form.html"),name='password_reset'),
    path('password_reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name="note/registration/password_reset_done.html"),name='password_reset_done'),
    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name="note/registration/password_reset_confirm.html"),name='password_reset_confirm'),
    path('reset/done/',
         auth_views.PasswordResetCompleteView.as_view(template_name="note/registration/password_reset_complete.html"),name='password_reset_complete'),
]


from django.conf.urls import handler404, handler500

handler404 = views.custom_404
handler500 = views.custom_500
