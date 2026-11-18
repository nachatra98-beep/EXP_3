import React, { useState, useEffect } from 'react';
import { 
  X, Check, AlertCircle, BookOpen, Clock, Users, IndianRupee, 
  Building, Phone, Mail, Award, TrendingUp, Shield, Plus, Trash2, 
  Edit3, CheckCircle, RefreshCw
} from 'lucide-react';
import { 
  submitContact, fetchAdminAnalytics, fetchKnowledgeEntries, 
  saveKnowledgeEntry, deleteKnowledgeEntry, fetchUnansweredQuestions,
  loginUser, registerUser 
} from '../api';

// 1. Course Detail Modal
export function CourseDetailModal({ course, onClose, onAskChatbot }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-cit-navy text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              {course.degree_level === 'UG' ? 'Undergraduate Degree' : 'Postgraduate Degree'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif mt-1">
              {course.title} ({course.code})
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
            <p className="text-slate-700 leading-relaxed">{course.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-400 block">Duration</span>
              <span className="font-bold text-slate-800">{course.duration}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Tuition Fee</span>
              <span className="font-bold text-emerald-700">{course.annual_tuition_fee}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Approved Intake</span>
              <span className="font-bold text-blue-800">{course.seats} Seats</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Eligibility Criteria</h4>
            <p className="text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
              {course.eligibility}
            </p>
          </div>

          {course.highlights && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {course.highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.career_opportunities && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Career Opportunities</h4>
              <div className="flex flex-wrap gap-2">
                {course.career_opportunities.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onAskChatbot(`What are the placement opportunities and fees for ${course.code} at CIT?`);
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Ask CIT Buddy about this Course →
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cit-navy text-white rounded-full text-xs font-bold hover:bg-slate-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

// 2. Contact & Admission Enquiry Modal
export function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
    } catch (err) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-cit-navy text-white px-6 py-5 flex items-center justify-between">
          <h3 className="text-xl font-bold font-serif">Contact CIT Admissions</h3>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Message Received!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out to the College of Innovative Technology. An admissions counsellor will contact you within 24 hours.
            </p>
            <button onClick={onClose} className="mt-4 px-6 py-2 bg-cit-navy text-white rounded-full text-xs font-bold">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98401 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Admission Enquiry">Admission Enquiry (BCA / B.Sc / MCA / M.Sc)</option>
                <option value="Fee & Scholarship Question">Fee & Scholarship Question</option>
                <option value="Hostel Accommodation">Hostel Accommodation</option>
                <option value="Campus Tour Request">Campus Tour Request</option>
                <option value="General Query">General Query</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Message / Query</label>
              <textarea
                required
                rows={3}
                placeholder="Ask your question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-full font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-cit-navy hover:bg-slate-900 text-white rounded-full font-bold shadow-sm"
              >
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

// 3. Admin / Staff Portal Modal (SRS Section 3.7 & FR-51 to FR-56)
export function AdminModal({ onClose }) {
  const [tab, setTab] = useState('analytics'); // analytics, kb, unanswered
  const [analytics, setAnalytics] = useState(null);
  const [kbEntries, setKbEntries] = useState([]);
  const [unanswered, setUnanswered] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const a = await fetchAdminAnalytics();
      setAnalytics(a);
      const kb = await fetchKnowledgeEntries();
      setKbEntries(kb);
      const un = await fetchUnansweredQuestions();
      setUnanswered(un);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveKB = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveKnowledgeEntry(editingEntry);
      setEditingEntry(null);
      loadData();
    } catch (err) {
      alert("Error saving knowledge base entry.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteKB = async (id) => {
    if (!confirm("Delete this Knowledge Base entry?")) return;
    try {
      await deleteKnowledgeEntry(id);
      loadData();
    } catch (err) {
      alert("Error deleting entry");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-cit-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold font-serif">CIT Staff & Admin Portal</h3>
            <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-semibold">
              Gemini 3.5 Flash Powered
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-slate-100 px-6 pt-3 flex space-x-2 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setTab('analytics'); setEditingEntry(null); }}
            className={`px-4 py-2 rounded-t-xl transition-all ${tab === 'analytics' ? 'bg-white text-cit-navy border-t-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Chatbot Analytics & Metrics
          </button>
          <button
            onClick={() => setTab('kb')}
            className={`px-4 py-2 rounded-t-xl transition-all ${tab === 'kb' ? 'bg-white text-cit-navy border-t-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Knowledge Base Entries ({kbEntries.length})
          </button>
          <button
            onClick={() => { setTab('unanswered'); setEditingEntry(null); }}
            className={`px-4 py-2 rounded-t-xl transition-all ${tab === 'unanswered' ? 'bg-white text-cit-navy border-t-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Unanswered Queries ({unanswered.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'analytics' && analytics && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block font-medium">Total Conversations</span>
                  <span className="text-2xl font-bold text-slate-800">{analytics.total_conversations}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block font-medium">Messages Exchanged</span>
                  <span className="text-2xl font-bold text-blue-700">{analytics.total_messages}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block font-medium">Avg Latency</span>
                  <span className="text-2xl font-bold text-purple-700">{analytics.average_latency_ms} ms</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block font-medium">User Satisfaction</span>
                  <span className="text-2xl font-bold text-emerald-700">{analytics.satisfaction_rate}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent User Queries</h4>
                <div className="space-y-2">
                  {analytics.recent_queries.map((q) => (
                    <div key={q.id} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 flex justify-between">
                      <span className="font-medium truncate mr-2">{q.text}</span>
                      <span className="text-slate-400 flex-shrink-0">
                        {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'kb' && (
            <div className="space-y-4">
              {editingEntry ? (
                <form onSubmit={handleSaveKB} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between font-bold text-sm text-slate-800 border-b pb-2">
                    <span>{editingEntry.id ? 'Edit Knowledge Entry' : 'Create New Knowledge Entry'}</span>
                    <button type="button" onClick={() => setEditingEntry(null)} className="text-slate-400 hover:text-slate-600">
                      Cancel
                    </button>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      required
                      type="text"
                      value={editingEntry.title}
                      onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Category</label>
                      <input
                        required
                        type="text"
                        value={editingEntry.category}
                        onChange={(e) => setEditingEntry({ ...editingEntry, category: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Source URL</label>
                      <input
                        type="text"
                        value={editingEntry.source_url}
                        onChange={(e) => setEditingEntry({ ...editingEntry, source_url: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Knowledge Content (Text used by LLM)</label>
                    <textarea
                      required
                      rows={6}
                      value={editingEntry.text}
                      onChange={(e) => setEditingEntry({ ...editingEntry, text: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white font-mono text-[11px]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold"
                  >
                    {isSaving ? 'Saving...' : 'Save Knowledge Entry'}
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      Approved facts fed into Gemini RAG retrieval.
                    </span>
                    <button
                      onClick={() => setEditingEntry({ title: '', category: 'Academics', text: '', source_url: '/academics', is_active: true })}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-cit-navy text-white rounded-xl text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Knowledge Entry</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {kbEntries.map((e) => (
                      <div key={e.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start text-xs">
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                              {e.category}
                            </span>
                            <span className="font-bold text-slate-800 text-sm">{e.title}</span>
                          </div>
                          <p className="text-slate-600 line-clamp-2">{e.text}</p>
                          <span className="text-[10px] text-slate-400">Ref: {e.source_url}</span>
                        </div>
                        <div className="flex space-x-1 flex-shrink-0">
                          <button
                            onClick={() => setEditingEntry(e)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKB(e.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {tab === 'unanswered' && (
            <div className="space-y-3">
              <span className="text-xs text-slate-500 block">
                Questions that couldn't be answered by knowledge base context (logged automatically for staff review).
              </span>
              {unanswered.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  No unanswered questions logged yet.
                </div>
              ) : (
                unanswered.map((u) => (
                  <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800">{u.question_text}</div>
                      <div className="text-[10px] text-slate-400">{new Date(u.created_at).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => {
                        setTab('kb');
                        setEditingEntry({
                          title: `Answer for: ${u.question_text.slice(0, 30)}`,
                          category: 'Admissions',
                          text: `Official details regarding: ${u.question_text}`,
                          source_url: '/admissions',
                          is_active: true
                        });
                      }}
                      className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold text-[11px]"
                    >
                      Convert to KB Entry
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-cit-navy text-white rounded-full text-xs font-bold">
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
}

// 4. User Auth Modal (Login / Register)
export function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '', name: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        const res = await loginUser(formData.username, formData.password);
        if (res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setError(res.error || "Login failed");
        }
      } else {
        const res = await registerUser(formData);
        if (res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setError(res.error || "Registration failed");
        }
      }
    } catch (err) {
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-cit-navy text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold font-serif">{isLogin ? 'Sign In to CIT' : 'Register CIT Account'}</h3>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-xs">
          {error && (
            <div className="p-2 bg-red-50 text-red-600 rounded-lg text-[11px] font-medium">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block font-semibold mb-1">Your Full Name</label>
              <input
                required
                type="text"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              required
              type="text"
              placeholder="e.g. rahul2026"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                required
                type="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-cit-navy hover:bg-slate-900 text-white rounded-full font-bold shadow-sm"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>

          <div className="text-center pt-2 text-[11px] text-slate-500">
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-blue-600 font-bold hover:underline"
            >
              {isLogin ? 'Register now' : 'Sign in here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
