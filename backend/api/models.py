from django.db import models
from django.contrib.auth.models import User
import uuid

class Department(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=150)
    description = models.TextField()
    head_of_department = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default='laptop')

    def __str__(self):
        return self.name

class Course(models.Model):
    DEGREE_CHOICES = (
        ('UG', 'Undergraduate'),
        ('PG', 'Postgraduate'),
    )
    code = models.CharField(max_length=20, unique=True) # e.g. BCA, BSC_CS, BCOM_CA, MCA, MSC_DA
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=150)
    degree_level = models.CharField(max_length=2, choices=DEGREE_CHOICES, default='UG')
    duration = models.CharField(max_length=50, default='3 Years (6 Semesters)')
    seats = models.IntegerField(default=120)
    annual_tuition_fee = models.CharField(max_length=50, default='₹85,000 / Year')
    eligibility = models.TextField()
    description = models.TextField()
    highlights = models.JSONField(default=list)
    career_opportunities = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} - {self.title}"

class FacultyMember(models.Model):
    name = models.CharField(max_length=120)
    designation = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='faculty')
    qualification = models.CharField(max_length=150)
    specialization = models.CharField(max_length=200)
    experience_years = models.IntegerField(default=10)
    email = models.EmailField()

    def __str__(self):
        return f"{self.name} ({self.designation})"

class CampusFacility(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=80)
    short_description = models.TextField()
    details = models.TextField()
    icon = models.CharField(max_length=50, default='building')

    def __str__(self):
        return self.title

class EventNews(models.Model):
    TYPE_CHOICES = (
        ('EVENT', 'Event'),
        ('NEWS', 'News'),
    )
    item_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='EVENT')
    title = models.CharField(max_length=200)
    date_str = models.CharField(max_length=100)
    venue = models.CharField(max_length=150, blank=True)
    summary = models.TextField()
    content = models.TextField()
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class KnowledgeEntry(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    text = models.TextField()
    source_url = models.CharField(max_length=200, default='/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"

class KnowledgeChunk(models.Model):
    entry = models.ForeignKey(KnowledgeEntry, on_delete=models.CASCADE, related_name='chunks')
    chunk_text = models.TextField()
    position = models.IntegerField(default=0)

    def __str__(self):
        return f"Chunk {self.position} of {self.entry.title}"

class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_key = models.CharField(max_length=100, db_index=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='conversations')
    title = models.CharField(max_length=255, default='New Conversation')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.title} ({str(self.id)[:8]})"

class Message(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    content = models.TextField()
    source_urls = models.JSONField(default=list, blank=True)
    rating = models.CharField(max_length=10, null=True, blank=True) # 'up', 'down'
    tokens_used = models.IntegerField(default=0)
    latency_ms = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] {self.content[:30]}..."

class UnansweredQuestion(models.Model):
    message = models.ForeignKey(Message, on_delete=models.SET_NULL, null=True, blank=True)
    question_text = models.TextField()
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text[:50]

class ChatbotSettings(models.Model):
    assistant_name = models.CharField(max_length=50, default='CIT Buddy')
    welcome_message = models.TextField(default='Hello! How can I help you today?')
    suggested_questions = models.JSONField(default=list)
    fallback_message = models.TextField(
        default="I apologize, but I do not have that specific information in the official CIT records. Please contact the CIT Admissions Office at +91 44 2855 1000 or admissions@cit.edu.in for assistance!"
    )
    model_name = models.CharField(max_length=50, default='gemini-3.5-flash')
    relevance_threshold = models.FloatField(default=0.25)
    daily_cap = models.IntegerField(default=5000)

    def __str__(self):
        return f"Chatbot Settings ({self.assistant_name})"

class ContactSubmission(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact from {self.name} - {self.subject}"
