import React, { useState } from 'react';
import { Search, ChevronDown, User, Shield, BookOpen, GraduationCap, Building, Phone, Menu, X } from 'lucide-react';

export default function Navbar({ onNavigate, activePage = 'home', onOpenAdmin, onOpenAuth, currentUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <header className="bg-cit-navy text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* CIT Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img 
                src="/cit-logo-crest.png" 
                alt="CIT Crest" 
                className="max-h-12 object-contain filter drop-shadow"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white leading-tight font-serif">CIT</span>
              <span className="text-xs tracking-wider text-slate-300 font-medium uppercase">College of Innovative Technology</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            
            {/* Home Pill */}
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activePage === 'home'
                  ? 'bg-white text-cit-navy shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* About Link */}
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activePage === 'about'
                  ? 'bg-white text-cit-navy shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </button>

            {/* Academics Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('academics')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <span>Academics</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </button>

              {dropdownOpen === 'academics' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 font-semibold text-xs text-slate-400 uppercase tracking-wider">
                    Academic Offerings
                  </div>
                  <button
                    onClick={() => { onNavigate('programs', { filter: 'BCA' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>BCA (Computer Applications)</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('programs', { filter: 'B.Sc' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>B.Sc (Computer Science)</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('programs', { filter: 'B.Com' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>B.Com (FinTech & CA)</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('programs', { filter: 'MCA' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span>MCA (Cloud & AI)</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('programs', { filter: 'M.Sc' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    <span>M.Sc (Data Science & AI)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Admissions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('admissions')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <span>Admissions</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </button>

              {dropdownOpen === 'admissions' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => { onNavigate('admissions'); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 font-medium"
                  >
                    Admission Process 2026-27
                  </button>
                  <button
                    onClick={() => { onNavigate('admissions', { tab: 'fees' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700"
                  >
                    Fee Structure
                  </button>
                  <button
                    onClick={() => { onNavigate('admissions', { tab: 'scholarships' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700"
                  >
                    Scholarships & Grants
                  </button>
                </div>
              )}
            </div>

            {/* Student Life Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('studentlife')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <span>Student Life</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </button>

              {dropdownOpen === 'studentlife' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => { onNavigate('student-life', { section: 'campus' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700"
                  >
                    Campus Facilities
                  </button>
                  <button
                    onClick={() => { onNavigate('student-life', { section: 'hostel' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700"
                  >
                    Hostels & Dining
                  </button>
                  <button
                    onClick={() => { onNavigate('student-life', { section: 'clubs' }); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700"
                  >
                    Clubs & INNOVATIA Hackathon
                  </button>
                  <button
                    onClick={() => { onNavigate('placements'); setDropdownOpen(null); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-slate-700 font-medium"
                  >
                    Placements & Recruiter Records
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activePage === 'contact'
                  ? 'bg-white text-cit-navy shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Header Controls (Search, Chat, Admin, Auth) */}
          <div className="flex items-center space-x-3">
            
            {/* Search Button */}
            <button 
              onClick={() => onNavigate('search')}
              className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Search CIT Portal"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Go to Dedicated Chat screen */}
            <button
              onClick={() => onNavigate('chat')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CIT Buddy Chat</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Staff / Admin Management Area"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-full text-xs font-medium transition-colors border border-slate-700"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser ? currentUser.first_name || currentUser.username : 'Account'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cit-dark border-t border-slate-800 py-4 px-2 space-y-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              About CIT
            </button>
            <button
              onClick={() => { onNavigate('programs'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Academic Programs & Courses
            </button>
            <button
              onClick={() => { onNavigate('admissions'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Admissions & Scholarships
            </button>
            <button
              onClick={() => { onNavigate('student-life'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Campus Facilities & Hostels
            </button>
            <button
              onClick={() => { onNavigate('placements'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Placements Record
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 font-medium"
            >
              Contact Us
            </button>
            <div className="pt-2 border-t border-slate-800 flex justify-around">
              <button
                onClick={() => { onNavigate('chat'); setMobileMenuOpen(false); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Open CIT Chatbot
              </button>
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
              >
                Admin Area
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
