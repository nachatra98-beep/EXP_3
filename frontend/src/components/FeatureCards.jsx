import React from 'react';
import { GraduationCap, Lightbulb, Users, Trophy } from 'lucide-react';

export default function FeatureCards({ onCardClick }) {
  const features = [
    {
      id: 'education',
      title: 'Quality Education',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      desc: 'Accredited curriculum with hands-on technical labs and global industry alignment.'
    },
    {
      id: 'innovation',
      title: 'Innovation Hub',
      icon: Lightbulb,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      desc: '15,000 sq.ft CIT Catalyst center with Nvidia DGX supercomputing and startup incubation.'
    },
    {
      id: 'faculty',
      title: 'Expert Faculty',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      desc: 'Distinguished doctorates from IITs, IISc & NITs with deep research pedigree.'
    },
    {
      id: 'future',
      title: 'Bright Future',
      icon: Trophy,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      desc: '96.4% placements with marquee global offers up to ₹44.5 LPA at Microsoft.'
    }
  ];

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              onClick={() => onCardClick && onCardClick(feat.id)}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md border border-slate-100 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feat.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                <Icon className={`w-7 h-7 ${feat.color}`} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
