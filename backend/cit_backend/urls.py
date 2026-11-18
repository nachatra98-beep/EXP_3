from django.contrib import admin
from django.urls import path, include, re_path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^(?P<path>.*)$', views.serve_react_app, name='serve_react_app'),
]
