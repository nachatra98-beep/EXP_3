from django.urls import path
from . import views

urlpatterns = [
    # Public Site Endpoints
    path('site/overview/', views.site_overview, name='site_overview'),
    path('site/courses/', views.courses_list, name='courses_list'),
    path('site/courses/<str:code>/', views.course_detail, name='course_detail'),
    path('site/faculty/', views.faculty_list, name='faculty_list'),
    path('site/facilities/', views.facilities_list, name='facilities_list'),
    path('site/events/', views.events_news_list, name='events_news_list'),
    path('contact/', views.contact_submit, name='contact_submit'),

    # Chat Endpoints
    path('chat/config/', views.chat_config, name='chat_config'),
    path('chat/conversations/', views.conversations_endpoint, name='conversations_endpoint'),
    path('chat/conversations/<uuid:conversation_id>/', views.conversation_detail, name='conversation_detail'),
    path('chat/conversations/<uuid:conversation_id>/messages/', views.conversation_messages, name='conversation_messages'),
    path('chat/messages/<uuid:message_id>/rating/', views.rate_message, name='rate_message'),

    # Admin & Knowledge Endpoints
    path('admin/analytics/', views.admin_analytics, name='admin_analytics'),
    path('admin/knowledge/', views.knowledge_base_manage, name='knowledge_base_manage'),
    path('admin/knowledge/<int:pk>/', views.knowledge_base_detail, name='knowledge_base_detail'),
    path('admin/unanswered/', views.unanswered_questions, name='unanswered_questions'),

    # Auth Endpoints
    path('auth/register/', views.user_register, name='user_register'),
    path('auth/login/', views.user_login, name='user_login'),
    path('auth/me/', views.current_user, name='current_user'),
]
