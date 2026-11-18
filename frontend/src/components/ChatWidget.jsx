import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

export default function ChatWidget({ onOpenChat }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* "Chat with us!" Speech Bubble */}
      <div 
        onClick={onOpenChat}
        className="mb-2 mr-1 bg-white text-slate-800 text-xs font-bold py-1.5 px-3.5 rounded-full shadow-lg border border-slate-200 cursor-pointer flex items-center space-x-1.5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>Chat with us!</span>
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 transform rotate-45"></div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onOpenChat}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full shadow-xl flex items-center justify-center p-2.5 transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-blue-300"
        title="Open CIT Buddy AI Chatbot"
      >
        {/* Robot Icon */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Bot className="w-8 h-8 text-white filter drop-shadow group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        </div>
      </button>

    </div>
  );
}
