// API communication service with Django backend
const API_BASE = '/api';

// Retrieve or generate guest session key
export function getSessionKey() {
  let key = localStorage.getItem('cit_session_key');
  if (!key) {
    key = 'guest-' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    localStorage.setItem('cit_session_key', key);
  }
  return key;
}

export async function fetchSiteOverview() {
  const res = await fetch(`${API_BASE}/site/overview/`);
  return res.json();
}

export async function fetchCourses(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/site/courses/?${query}`);
  return res.json();
}

export async function fetchFaculty() {
  const res = await fetch(`${API_BASE}/site/faculty/`);
  return res.json();
}

export async function fetchFacilities() {
  const res = await fetch(`${API_BASE}/site/facilities/`);
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/site/events/`);
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Chat API
export async function fetchChatConfig() {
  const res = await fetch(`${API_BASE}/chat/config/`);
  return res.json();
}

export async function fetchConversations() {
  const res = await fetch(`${API_BASE}/chat/conversations/`, {
    headers: { 'X-Session-Key': getSessionKey() },
  });
  return res.json();
}

export async function createConversation(title = 'New Chat') {
  const res = await fetch(`${API_BASE}/chat/conversations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Key': getSessionKey(),
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function fetchConversationDetail(id) {
  const res = await fetch(`${API_BASE}/chat/conversations/${id}/`, {
    headers: { 'X-Session-Key': getSessionKey() },
  });
  return res.json();
}

export async function sendMessage(conversationId, content) {
  const res = await fetch(`${API_BASE}/chat/conversations/${conversationId}/messages/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Key': getSessionKey(),
    },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function rateMessage(messageId, rating) {
  const res = await fetch(`${API_BASE}/chat/messages/${messageId}/rating/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  return res.json();
}

export async function renameConversation(id, title) {
  const res = await fetch(`${API_BASE}/chat/conversations/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteConversation(id) {
  const res = await fetch(`${API_BASE}/chat/conversations/${id}/`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function clearAllConversations() {
  const res = await fetch(`${API_BASE}/chat/conversations/`, {
    method: 'DELETE',
    headers: { 'X-Session-Key': getSessionKey() },
  });
  return res.json();
}

// Admin API
export async function fetchAdminAnalytics() {
  const res = await fetch(`${API_BASE}/admin/analytics/`);
  return res.json();
}

export async function fetchKnowledgeEntries() {
  const res = await fetch(`${API_BASE}/admin/knowledge/`);
  return res.json();
}

export async function saveKnowledgeEntry(entry) {
  const method = entry.id ? 'PUT' : 'POST';
  const url = entry.id ? `${API_BASE}/admin/knowledge/${entry.id}/` : `${API_BASE}/admin/knowledge/`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return res.json();
}

export async function deleteKnowledgeEntry(id) {
  const res = await fetch(`${API_BASE}/admin/knowledge/${id}/`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchUnansweredQuestions() {
  const res = await fetch(`${API_BASE}/admin/unanswered/`);
  return res.json();
}

// Auth API
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Key': getSessionKey(),
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Key': getSessionKey(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function checkCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me/`);
  return res.json();
}
