from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Department, Course, FacultyMember, CampusFacility, EventNews,
    KnowledgeEntry, KnowledgeChunk, Conversation, Message,
    UnansweredQuestion, ChatbotSettings, ContactSubmission
)

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'

class FacultyMemberSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = FacultyMember
        fields = '__all__'

class CampusFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusFacility
        fields = '__all__'

class EventNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventNews
        fields = '__all__'

class KnowledgeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeEntry
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'role', 'content', 'source_urls', 'rating', 'tokens_used', 'latency_ms', 'created_at']
        read_only_fields = ['id', 'tokens_used', 'latency_ms', 'created_at']

class ConversationSerializer(serializers.ModelSerializer):
    messages_count = serializers.IntegerField(source='messages.count', read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'session_key', 'title', 'created_at', 'updated_at', 'messages_count', 'last_message']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        msg = obj.messages.order_by('-created_at').first()
        if msg:
            return {
                'role': msg.role,
                'content': msg.content[:80] + '...' if len(msg.content) > 80 else msg.content,
                'created_at': msg.created_at
            }
        return None

class ChatbotSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotSettings
        fields = '__all__'

class UnansweredQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnansweredQuestion
        fields = '__all__'

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
