import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white pt-10 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 tracking-tight font-medium">
                Welcome to
              </h2>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-cit-navy tracking-tight font-serif leading-none">
                CIT
              </h1>
            </div>

            {/* Motto */}
            <p className="text-xl sm:text-2xl text-slate-700 font-serif italic tracking-wide">
              Learn • Innovate • Grow
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              A premier institution dedicated to academic excellence, innovation and holistic development.
            </p>

            {/* Explore More CTA Button */}
            <div className="pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-cit-navy hover:bg-slate-900 text-white rounded-full font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all group"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Building Image Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-blue-100 group">
              <img
                src="/campus-building.png"
                alt="CIT Campus Building Facade"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?w=900&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cit-navy/40 via-transparent to-transparent opacity-60"></div>
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/40 flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <div className="text-xs font-bold text-cit-navy">55-Acre Smart Campus</div>
                  <div className="text-[10px] text-slate-500">Autonomous & NAAC A++ Grade</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
