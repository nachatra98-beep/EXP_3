import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CommunityBanner({ onLearnMore }) {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-100/90 rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        
        {/* Left Students Photo */}
        <div className="w-full md:w-5/12 flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-md border border-white max-w-md w-full">
            <img
              src="/students-community.png"
              alt="CIT Students Studying Together"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80";
              }}
            />
          </div>
        </div>

        {/* Right Community Content */}
        <div className="w-full md:w-7/12 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cit-navy tracking-tight font-serif">
            Join Our Community
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            Be a part of a vibrant campus life with clubs, events and opportunities.
          </p>
          <div className="pt-1">
            <button
              onClick={onLearnMore}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-cit-navy border border-slate-300 rounded-full font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all group"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
