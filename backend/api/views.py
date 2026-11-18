import json
import time
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Count, Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import (
    Department, Course, FacultyMember, CampusFacility, EventNews,
    KnowledgeEntry, KnowledgeChunk, Conversation, Message,
    UnansweredQuestion, ChatbotSettings, ContactSubmission
)
from .serializers import (
    DepartmentSerializer, CourseSerializer, FacultyMemberSerializer,
    CampusFacilitySerializer, EventNewsSerializer, KnowledgeEntrySerializer,
    ConversationSerializer, MessageSerializer, ChatbotSettingsSerializer,
    UnansweredQuestionSerializer, ContactSubmissionSerializer, UserSerializer
)
from .gemini_service import call_gemini_api

# ----------------- Public Site Views -----------------

@api_view(['GET'])
@permission_classes([AllowAny])
def site_overview(request):
    """Aggregated site stats and featured content for rapid landing page load."""
    departments = Department.objects.all()
    courses = Course.objects.filter(is_active=True)
    events = EventNews.objects.filter(is_featured=True)[:6]
    facilities = CampusFacility.objects.all()[:6]

    return Response({
        'college_name': 'CIT - College of Innovative Technology',
        'motto': 'Learn • Innovate • Grow',
        'tagline': 'A premier institution dedicated to academic excellence, innovation and holistic development.',
        'established': 2004,
        'accreditation': "NAAC 'A++' Grade | AICTE Approved | NBA Accredited",
        'stats': {
            'placement_rate': '96.4%',
            'highest_package': '₹44.5 LPA',
            'average_package': '₹7.8 LPA',
            'recruiters_count': '180+',
            'students_count': '4,500+',
            'faculty_count': '250+',
            'campus_acres': '55 Acres',
            'startups_incubated': '14+'
        },
        'departments': DepartmentSerializer(departments, many=True).data,
        'courses': CourseSerializer(courses, many=True).data,
        'events': EventNewsSerializer(events, many=True).data,
        'facilities': CampusFacilitySerializer(facilities, many=True).data
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def courses_list(request):
    degree = request.GET.get('level')
    dept = request.GET.get('dept')
    search = request.GET.get('search')
    
    qs = Course.objects.filter(is_active=True)
    if degree:
        qs = qs.filter(degree_level__iexact=degree)
    if dept:
        qs = qs.filter(department__code__iexact=dept)
    if search:
        qs = qs.filter(Q(title__icontains=search) | Q(code__icontains=search) | Q(description__icontains=search))
    
    serializer = CourseSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def course_detail(request, code):
    try:
        course = Course.objects.get(code__iexact=code)
        return Response(CourseSerializer(course).data)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def faculty_list(request):
    qs = FacultyMember.objects.select_related('department').all()
    serializer = FacultyMemberSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def facilities_list(request):
    qs = CampusFacility.objects.all()
    serializer = CampusFacilitySerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def events_news_list(request):
    item_type = request.GET.get('type')
    qs = EventNews.objects.all().order_by('-id')
    if item_type:
        qs = qs.filter(item_type__iexact=item_type)
    serializer = EventNewsSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_submit(request):
    serializer = ContactSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Thank you! Your message has been received by the CIT Office. We will respond within 24 hours.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ----------------- Chatbot Endpoints -----------------

@api_view(['GET'])
@permission_classes([AllowAny])
def chat_config(request):
    settings_obj = ChatbotSettings.objects.first()
    if not settings_obj:
        settings_obj = ChatbotSettings.objects.create()
    return Response({
        'assistant_name': settings_obj.assistant_name,
        'welcome_message': settings_obj.welcome_message,
        'suggested_questions': settings_obj.suggested_questions or [
            'Courses & Admissions',
            'College Events',
            'Campus Facilities',
            'General Queries'
        ],
        'model_name': settings_obj.model_name
    })

def get_session_key(request):
    key = request.headers.get('X-Session-Key') or request.GET.get('session_key')
    if not key:
        key = request.session.session_key
        if not key:
            request.session.create()
            key = request.session.session_key
    return key or 'guest-default-session'

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([AllowAny])
def conversations_endpoint(request):
    session_key = get_session_key(request)
    user = request.user if request.user.is_authenticated else None

    if request.method == 'GET':
        if user:
            qs = Conversation.objects.filter(user=user, is_deleted=False)
        else:
            qs = Conversation.objects.filter(session_key=session_key, is_deleted=False)
        serializer = ConversationSerializer(qs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        title = request.data.get('title', 'New Chat')
        conv = Conversation.objects.create(
            session_key=session_key,
            user=user,
            title=title
        )
        return Response(ConversationSerializer(conv).data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        if user:
            Conversation.objects.filter(user=user).update(is_deleted=True)
        else:
            Conversation.objects.filter(session_key=session_key).update(is_deleted=True)
        return Response({'success': True, 'message': 'All chat history deleted.'})

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def conversation_detail(request, conversation_id):
    try:
        conv = Conversation.objects.get(id=conversation_id, is_deleted=False)
    except Conversation.DoesNotExist:
        return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        messages = conv.messages.all().order_by('created_at')
        return Response({
            'conversation': ConversationSerializer(conv).data,
            'messages': MessageSerializer(messages, many=True).data
        })

    elif request.method == 'PATCH':
        new_title = request.data.get('title')
        if new_title:
            conv.title = new_title.strip()[:200]
            conv.save()
        return Response(ConversationSerializer(conv).data)

    elif request.method == 'DELETE':
        conv.is_deleted = True
        conv.save()
        return Response({'success': True, 'message': 'Conversation deleted.'})

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def conversation_messages(request, conversation_id):
    try:
        conv = Conversation.objects.get(id=conversation_id, is_deleted=False)
    except Conversation.DoesNotExist:
        session_key = get_session_key(request)
        user = request.user if request.user.is_authenticated else None
        conv = Conversation.objects.create(
            id=conversation_id,
            session_key=session_key,
            user=user,
            title='New Chat'
        )

    if request.method == 'GET':
        messages = conv.messages.all().order_by('created_at')
        return Response(MessageSerializer(messages, many=True).data)

    elif request.method == 'POST':
        content = request.data.get('content', '').strip()
        if not content:
            return Response({'error': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        if len(content) > 1000:
            content = content[:1000]

        # 1. Save User Message
        user_msg = Message.objects.create(
            conversation=conv,
            role='user',
            content=content
        )

        # Update title if it's new
        if conv.messages.count() <= 2 and (conv.title == 'New Chat' or conv.title == 'New Conversation'):
            generated_title = content[:35].strip()
            if len(content) > 35:
                generated_title += '...'
            conv.title = generated_title
            conv.save()

        # 2. Get recent history
        recent_history = list(conv.messages.exclude(id=user_msg.id).order_by('-created_at')[:10])
        recent_history.reverse()

        # 3. Call Gemini RAG Service
        ai_result = call_gemini_api(
            user_message=content,
            history_messages=recent_history,
            session_key=conv.session_key
        )

        # 4. Save Assistant Message
        assistant_msg = Message.objects.create(
            conversation=conv,
            role='assistant',
            content=ai_result['content'],
            source_urls=ai_result.get('source_urls', []),
            tokens_used=ai_result.get('tokens_used', 0),
            latency_ms=ai_result.get('latency_ms', 0)
        )

        conv.save()

        return Response({
            'user_message': MessageSerializer(user_msg).data,
            'assistant_message': MessageSerializer(assistant_msg).data,
            'conversation_id': str(conv.id)
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def rate_message(request, message_id):
    try:
        msg = Message.objects.get(id=message_id)
        rating_val = request.data.get('rating')
        if rating_val in ['up', 'down', None]:
            msg.rating = rating_val
            msg.save()
            return Response({'success': True, 'rating': msg.rating})
        return Response({'error': 'Invalid rating value'}, status=status.HTTP_400_BAD_REQUEST)
    except Message.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

# ----------------- Admin & Knowledge Base -----------------

@api_view(['GET'])
@permission_classes([AllowAny])
def admin_analytics(request):
    total_convs = Conversation.objects.filter(is_deleted=False).count()
    total_msgs = Message.objects.count()
    assistant_msgs = Message.objects.filter(role='assistant')
    
    avg_latency = assistant_msgs.aggregate(Avg('latency_ms'))['latency_ms__avg'] or 0
    
    up_votes = Message.objects.filter(rating='up').count()
    down_votes = Message.objects.filter(rating='down').count()
    total_votes = up_votes + down_votes
    satisfaction_rate = round((up_votes / total_votes * 100), 1) if total_votes > 0 else 100.0

    unanswered_count = UnansweredQuestion.objects.filter(resolved=False).count()
    kb_entries_count = KnowledgeEntry.objects.count()

    recent_messages = Message.objects.filter(role='user').order_by('-created_at')[:8]

    return Response({
        'total_conversations': total_convs,
        'total_messages': total_msgs,
        'average_latency_ms': int(avg_latency),
        'thumbs_up': up_votes,
        'thumbs_down': down_votes,
        'satisfaction_rate': f"{satisfaction_rate}%",
        'unanswered_count': unanswered_count,
        'kb_entries_count': kb_entries_count,
        'recent_queries': [
            {'id': str(m.id), 'text': m.content, 'created_at': m.created_at} for m in recent_messages
        ]
    })

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def knowledge_base_manage(request):
    if request.method == 'GET':
        entries = KnowledgeEntry.objects.all().order_by('-updated_at')
        return Response(KnowledgeEntrySerializer(entries, many=True).data)
    elif request.method == 'POST':
        serializer = KnowledgeEntrySerializer(data=request.data)
        if serializer.is_valid():
            entry = serializer.save()
            paragraphs = [p.strip() for p in entry.text.split('\n\n') if p.strip()]
            for pos, para in enumerate(paragraphs):
                KnowledgeChunk.objects.create(entry=entry, chunk_text=para, position=pos)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def knowledge_base_detail(request, pk):
    try:
        entry = KnowledgeEntry.objects.get(pk=pk)
    except KnowledgeEntry.DoesNotExist:
        return Response({'error': 'Knowledge entry not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(KnowledgeEntrySerializer(entry).data)
    elif request.method == 'PUT':
        serializer = KnowledgeEntrySerializer(entry, data=request.data, partial=True)
        if serializer.is_valid():
            entry = serializer.save()
            KnowledgeChunk.objects.filter(entry=entry).delete()
            paragraphs = [p.strip() for p in entry.text.split('\n\n') if p.strip()]
            for pos, para in enumerate(paragraphs):
                KnowledgeChunk.objects.create(entry=entry, chunk_text=para, position=pos)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        entry.delete()
        return Response({'success': True, 'message': 'Entry deleted'})

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def unanswered_questions(request):
    if request.method == 'GET':
        qs = UnansweredQuestion.objects.all().order_by('-created_at')[:50]
        return Response(UnansweredQuestionSerializer(qs, many=True).data)
    elif request.method == 'POST':
        q_id = request.data.get('id')
        try:
            item = UnansweredQuestion.objects.get(id=q_id)
            item.resolved = True
            item.save()
            return Response({'success': True})
        except UnansweredQuestion.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

# ----------------- Simple Auth -----------------

@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name', '')

    if not username or not email or not password:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password, first_name=name)
    
    session_key = get_session_key(request)
    Conversation.objects.filter(session_key=session_key, user__isnull=True).update(user=user)

    return Response({
        'success': True,
        'user': UserSerializer(user).data,
        'message': 'Account created successfully!'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        session_key = get_session_key(request)
        Conversation.objects.filter(session_key=session_key, user__isnull=True).update(user=user)
        return Response({
            'success': True,
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([AllowAny])
def current_user(request):
    if request.user.is_authenticated:
        return Response({'authenticated': True, 'user': UserSerializer(request.user).data})
    return Response({'authenticated': False, 'user': None})

# ----------------- Serve Frontend SPA -----------------
import mimetypes
from django.http import HttpResponse, FileResponse
from django.conf import settings

def serve_react_app(request, path=""):
    dist_dir = settings.BASE_DIR.parent / 'frontend' / 'dist'
    file_path = dist_dir / path
    
    if path and file_path.exists() and file_path.is_file():
        content_type, _ = mimetypes.guess_type(str(file_path))
        return FileResponse(open(file_path, 'rb'), content_type=content_type or 'application/octet-stream')
    
    index_file = dist_dir / 'index.html'
    if index_file.exists():
        return HttpResponse(open(index_file, 'r', encoding='utf-8').read(), content_type='text/html')
    return HttpResponse("Frontend dist not found. Run npm run build in frontend directory.", status=404)

