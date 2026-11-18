import React from 'react';
import { Heart, ExternalLink, Globe } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-cit-navy text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: CIT Brand & Address */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
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

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Autonomous institution affiliated with State Technological University. NAAC 'A++' Grade. Inspiring next-generation leaders in computer sciences, technology, and applied computing.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div>Tech Enclave Road, Cyber Innovation Corridor, Pin - 560100</div>
              <div>Admissions Desk: +91 44 2855 1000 | admissions@cit.edu.in</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              <button onClick={() => onNavigate('home')} className="text-left hover:text-white transition-colors">
                Home
              </button>
              <button onClick={() => onNavigate('student-life')} className="text-left hover:text-white transition-colors">
                Student Life
              </button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-white transition-colors">
                About
              </button>
              <button onClick={() => onNavigate('contact')} className="text-left hover:text-white transition-colors">
                Contact
              </button>
              <button onClick={() => onNavigate('admissions')} className="text-left hover:text-white transition-colors">
                Admissions
              </button>
              <button onClick={() => onNavigate('faq')} className="text-left hover:text-white transition-colors">
                FAQ
              </button>
              <button onClick={() => onNavigate('placements')} className="text-left hover:text-white transition-colors">
                Placements
              </button>
              <button onClick={() => onNavigate('chat')} className="text-left text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                CIT Buddy Chat
              </button>
            </div>
          </div>

          {/* Col 3: Follow Us */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3 text-slate-300">
              {/* Facebook */}
              <a href="#facebook" title="Facebook" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#instagram" title="Instagram" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Youtube */}
              <a href="#youtube" title="YouTube" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#linkedin" title="LinkedIn" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[11px] text-slate-300 font-medium">
                Autonomous Status Validated
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © 2025 CIT. All Rights Reserved. &nbsp;|&nbsp; Building a Smarter Tomorrow
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => onNavigate('privacy')}>Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => onNavigate('terms')}>Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => onNavigate('accreditation')}>AICTE & NBA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
