import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Send, ThumbsUp, ThumbsDown, RotateCcw, Plus, Trash2, 
  Edit2, Check, X, Search, MessageSquare, Bot, AlertCircle, 
  ExternalLink, Sparkles, ChevronLeft, ChevronRight, Menu, Info,
  GraduationCap, Calendar, HelpCircle
} from 'lucide-react';
import { 
  fetchConversations, createConversation, fetchConversationDetail,
  sendMessage, rateMessage, renameConversation, deleteConversation,
  clearAllConversations
} from '../api';

export default function ChatbotInterface({ onBackToHome, initialPrompt = '' }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastUserPrompt, setLastUserPrompt] = useState('');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await fetchConversations();
      if (Array.isArray(data) && data.length > 0) {
        setConversations(data);
        if (!activeConversationId) {
          selectConversation(data[0].id);
        }
      } else {
        // If no conversations, initialize one
        startNewChat();
      }
    } catch (err) {
      console.error("Failed to load conversations", err);
    }
  };

  const selectConversation = async (id) => {
    setActiveConversationId(id);
    setErrorMessage(null);
    try {
      const data = await fetchConversationDetail(id);
      if (data && data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to fetch messages for", id, err);
    }
  };

  const startNewChat = async () => {
    try {
      const newConv = await createConversation("New Chat");
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      setMessages([]);
      setErrorMessage(null);
      if (window.innerWidth < 768) setSidebarOpen(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      console.error("Error creating chat", err);
    }
  };

  // If initialPrompt was passed, send it automatically
  useEffect(() => {
    if (initialPrompt && activeConversationId && messages.length === 0) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, activeConversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    if (!activeConversationId) {
      const newConv = await createConversation("New Chat");
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      await executeSendMessage(newConv.id, text);
    } else {
      await executeSendMessage(activeConversationId, text);
    }
  };

  const executeSendMessage = async (convId, text) => {
    setInputText('');
    setErrorMessage(null);
    setLastUserPrompt(text);

    // Optimistically add user message
    const tempUserMsg = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: text,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const result = await sendMessage(convId, text);
      if (result && result.assistant_message) {
        setMessages(prev => {
          // Replace temp with verified messages
          const filtered = prev.filter(m => m.id !== tempUserMsg.id);
          return [...filtered, result.user_message, result.assistant_message];
        });
        // Refresh conversations to update title if it changed
        const updatedList = await fetchConversations();
        setConversations(updatedList);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to send message", err);
      setErrorMessage("Could not connect to CIT Buddy servers. Please verify your connection or click Retry.");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleRetry = () => {
    if (lastUserPrompt) {
      handleSend(lastUserPrompt);
    }
  };

  const handleRate = async (msgId, ratingVal) => {
    try {
      await rateMessage(msgId, ratingVal);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, rating: ratingVal } : m));
    } catch (err) {
      console.error("Rating error", err);
    }
  };

  const handleRename = async (id) => {
    if (!editTitleText.trim()) return;
    try {
      await renameConversation(id, editTitleText.trim());
      setConversations(prev => prev.map(c => c.id === id ? { ...c, title: editTitleText.trim() } : c));
      setEditingTitleId(null);
    } catch (err) {
      console.error("Rename error", err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to permanently delete this chat?")) return;
    try {
      await deleteConversation(id);
      const remaining = conversations.filter(c => c.id !== id);
      setConversations(remaining);
      if (activeConversationId === id) {
        if (remaining.length > 0) {
          selectConversation(remaining[0].id);
        } else {
          startNewChat();
        }
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Clear all conversations permanently? This cannot be undone.")) return;
    try {
      await clearAllConversations();
      setConversations([]);
      setMessages([]);
      startNewChat();
    } catch (err) {
      console.error("Clear all error", err);
    }
  };

  // 4 Suggestion Pills matching the exact image
  const suggestionPills = [
    { label: 'Courses & Admissions', icon: GraduationCap, query: 'What undergraduate and postgraduate courses does CIT offer, and what are the admission requirements?' },
    { label: 'College Events', icon: Calendar, query: 'Tell me about upcoming college events, hackathons like INNOVATIA 2026, and cultural fests at CIT.' },
    { label: 'Campus Facilities', icon: Info, query: 'What facilities are available on campus? Tell me about the innovation hub, library, labs, and sports arena.' },
    { label: 'General Queries', icon: HelpCircle, query: 'What is CIT, what accreditations does it hold, and where is the campus located?' }
  ];

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 1. Header (Identical to Right Image) */}
      <header className="bg-cit-navy text-white h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 shadow-md z-30">
        
        {/* Left Logo & Name */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors md:mr-1"
            title="Toggle Chat History"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
            <img 
              src="/cit-logo-crest.png" 
              alt="CIT Crest" 
              className="max-h-10 object-contain filter drop-shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-tight font-serif">CIT</span>
            <span className="text-[10px] tracking-wider text-slate-300 font-medium uppercase hidden sm:inline">College of Innovative Technology</span>
          </div>
        </div>

        {/* Right "Back to Home" Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-1.5 px-4 py-1.5 text-white hover:text-slate-200 hover:bg-white/10 rounded-full text-xs sm:text-sm font-semibold transition-all group"
        >
          <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Back to Home</span>
        </button>

      </header>

      {/* 2. Main Body with Collapsible Sidebar & Chat Canvas */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (Conversation History - SRS FR-9, FR-38 to FR-43) */}
        <aside className={`
          absolute md:static top-0 left-0 bottom-0 z-20 w-72 sm:w-80 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 shadow-xl md:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
        `}>
          
          {/* Top Actions: New Chat */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={startNewChat}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-cit-navy hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden ml-2 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Conversations */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Saved Conversations ({filteredConversations.length})
            </div>

            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = activeConversationId === conv.id;
                const isEditing = editingTitleId === conv.id;

                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      if (!isEditing) {
                        selectConversation(conv.id);
                        if (window.innerWidth < 768) setSidebarOpen(false);
                      }
                    }}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-blue-50/90 text-blue-900 font-semibold border border-blue-100' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate flex-1">
                      <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      
                      {isEditing ? (
                        <input
                          type="text"
                          value={editTitleText}
                          onChange={(e) => setEditTitleText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRename(conv.id)}
                          className="w-full px-1.5 py-0.5 bg-white border border-blue-400 rounded text-xs focus:outline-none"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="truncate">{conv.title}</span>
                      )}
                    </div>

                    {/* Actions: Edit, Delete */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      {isEditing ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRename(conv.id); }}
                          className="p-1 hover:text-emerald-600"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTitleId(conv.id);
                            setEditTitleText(conv.title);
                          }}
                          className="p-1 text-slate-400 hover:text-blue-600"
                          title="Rename"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => handleDelete(conv.id, e)}
                        className="p-1 text-slate-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Clear All History */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Visitor Session</span>
            <button
              onClick={handleClearAll}
              className="text-red-500 hover:text-red-700 hover:underline font-medium text-[11px]"
            >
              Clear All History
            </button>
          </div>
        </aside>

        {/* Overlay backdrop for mobile */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/40 z-10"
          ></div>
        )}

        {/* 3. Right Chat Canvas (Matching the exact design in the image) */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-[#eaf2fb] via-[#f1f6fd] to-[#dce9f8] relative overflow-hidden">
          
          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 relative z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* If no messages yet: show the EXACT layout from the uploaded right image! */}
              {messages.length === 0 ? (
                <div className="pt-4 pb-8 flex flex-col items-center animate-fadeIn">
                  
                  {/* Top: Cheerful Robot Mascot + Speech Bubble */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-6">
                    
                    {/* Waving Robot Mascot */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0 animate-float-mascot">
                      <img
                        src="/robot-mascot.png"
                        alt="CIT Buddy Mascot Waving"
                        className="w-full h-full object-contain filter drop-shadow-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/robot-with-bubble.png";
                        }}
                      />
                    </div>

                    {/* Speech Bubble: "Hello! How can I help you today?" */}
                    <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-blue-100/80 max-w-sm text-center sm:text-left">
                      {/* Triangle Pointer to Robot on desktop */}
                      <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                      
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-serif tracking-tight leading-tight mb-1">
                        Hello!
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg font-serif italic">
                        How can I help you today?
                      </p>
                    </div>

                  </div>

                  {/* Suggestion Card: "You can ask me about:" */}
                  <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-sm border border-blue-200/60 mt-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4 tracking-tight">
                      You can ask me about:
                    </h4>

                    {/* 4 Pills in a 2x2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestionPills.map((pill, idx) => {
                        const Icon = pill.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSend(pill.query)}
                            className="flex items-center space-x-3 p-3.5 bg-slate-50 hover:bg-blue-50/80 text-slate-700 hover:text-blue-900 border border-slate-200/80 hover:border-blue-300 rounded-2xl text-xs sm:text-sm font-semibold text-left transition-all duration-200 group shadow-2xs hover:shadow-sm"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs group-hover:scale-110 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="flex-1">{pill.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] text-slate-500 max-w-md text-center">
                    CIT Buddy answers using official CIT records. Out-of-scope queries will be politely declined.
                  </div>

                </div>
              ) : (
                /* Thread of user and assistant messages */
                <div className="space-y-4 pt-2">
                  {messages.map((msg, index) => {
                    const isUser = msg.role === 'user';

                    return (
                      <div
                        key={msg.id || index}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
                      >
                        <div className="flex items-start max-w-[85%] sm:max-w-[78%] space-x-2">
                          
                          {/* Assistant Avatar */}
                          {!isUser && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-1">
                              <Bot className="w-5 h-5" />
                            </div>
                          )}

                          {/* Message Content Bubble */}
                          <div className={`
                            rounded-3xl px-5 py-3.5 text-sm sm:text-base leading-relaxed shadow-sm
                            ${isUser 
                              ? 'bg-cit-navy text-white rounded-tr-none' 
                              : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80'
                            }
                          `}>
                            {/* Render text with paragraph breaks */}
                            <div className="whitespace-pre-line">
                              {msg.content}
                            </div>

                            {/* Citations / Source links (FR-26) */}
                            {msg.source_urls && msg.source_urls.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">Official Sources:</span>
                                {msg.source_urls.map((url, i) => (
                                  <a
                                    key={i}
                                    href={url}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      alert(`Source documentation reference: ${url}`);
                                    }}
                                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-medium transition-colors"
                                  >
                                    <span>CIT {url.replace('/', '') || 'Portal'}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Footer: Timestamp, Rating buttons */}
                            <div className={`flex items-center justify-between text-[10px] mt-2 pt-1 ${isUser ? 'text-slate-300' : 'text-slate-400'}`}>
                              <span>
                                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                              </span>

                              {/* Thumbs Up / Down (FR-17) */}
                              {!isUser && (
                                <div className="flex items-center space-x-2 ml-4">
                                  <button
                                    onClick={() => handleRate(msg.id, msg.rating === 'up' ? null : 'up')}
                                    className={`p-1 rounded hover:bg-slate-100 transition-colors ${msg.rating === 'up' ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}
                                    title="Helpful"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleRate(msg.id, msg.rating === 'down' ? null : 'down')}
                                    className={`p-1 rounded hover:bg-slate-100 transition-colors ${msg.rating === 'down' ? 'text-red-500 font-bold' : 'text-slate-400'}`}
                                    title="Not helpful"
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator while LLM generates (FR-12) */}
                  {isLoading && (
                    <div className="flex items-start space-x-2 animate-fadeIn">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-1">
                        <Bot className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="bg-white rounded-3xl rounded-tl-none px-5 py-4 border border-slate-200/80 shadow-sm flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        <span className="text-xs text-slate-500 ml-2 font-medium">CIT Buddy is typing...</span>
                      </div>
                    </div>
                  )}

                  {/* Friendly Error with Retry (FR-15) */}
                  {errorMessage && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                      <button
                        onClick={handleRetry}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

            </div>
          </div>

          {/* 4. Bottom Decorative Layered Waves & Fixed Input Area */}
          <div className="relative z-20 pb-4 pt-2 px-4 sm:px-6">
            
            {/* Layered Decorative Wave SVG Background */}
            <div className="absolute inset-0 -top-12 pointer-events-none opacity-40 overflow-hidden">
              <svg className="w-full h-24 text-blue-200 fill-current" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
              </svg>
            </div>

            {/* Input Bar Pill (Identical to Right Image) */}
            <div className="max-w-3xl mx-auto relative">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center bg-white rounded-full p-1.5 shadow-xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all"
              >
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={1000}
                  placeholder="Type your question here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-5 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className={`
                    flex items-center space-x-1.5 px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all
                    ${isLoading || !inputText.trim() 
                      ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                      : 'bg-cit-navy hover:bg-slate-900 shadow-md active:scale-95'
                    }
                  `}
                >
                  <Send className="w-4 h-4 transform -rotate-12" />
                  <span>Send</span>
                </button>
              </form>

              {/* Character limit notice */}
              {inputText.length > 800 && (
                <div className="text-[10px] text-right text-slate-400 pr-4 pt-1">
                  {inputText.length}/1000 characters
                </div>
              )}
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
