from django.contrib import admin
from .models import (
    Department, Course, FacultyMember, CampusFacility, EventNews,
    KnowledgeEntry, KnowledgeChunk, Conversation, Message,
    UnansweredQuestion, ChatbotSettings, ContactSubmission
)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'head_of_department')
    search_fields = ('name', 'code')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'degree_level', 'annual_tuition_fee', 'seats', 'is_active')
    list_filter = ('degree_level', 'is_active', 'department')
    search_fields = ('title', 'code')

@admin.register(FacultyMember)
class FacultyMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'department', 'experience_years', 'email')
    list_filter = ('department', 'designation')
    search_fields = ('name', 'specialization')

@admin.register(CampusFacility)
class CampusFacilityAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'short_description')

@admin.register(EventNews)
class EventNewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'item_type', 'date_str', 'is_featured')
    list_filter = ('item_type', 'is_featured')
    search_fields = ('title', 'summary')

class KnowledgeChunkInline(admin.TabularInline):
    model = KnowledgeChunk
    extra = 1

@admin.register(KnowledgeEntry)
class KnowledgeEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'source_url', 'is_active', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'text')
    inlines = [KnowledgeChunkInline]

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'user', 'session_key', 'created_at', 'is_deleted')
    list_filter = ('is_deleted', 'created_at')
    search_fields = ('title', 'session_key')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation', 'role', 'content_snippet', 'rating', 'latency_ms', 'created_at')
    list_filter = ('role', 'rating')
    search_fields = ('content',)

    def content_snippet(self, obj):
        return obj.content[:50]

@admin.register(UnansweredQuestion)
class UnansweredQuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'resolved', 'created_at')
    list_filter = ('resolved',)
    search_fields = ('question_text',)

@admin.register(ChatbotSettings)
class ChatbotSettingsAdmin(admin.ModelAdmin):
    list_display = ('assistant_name', 'model_name', 'relevance_threshold', 'daily_cap')

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')
