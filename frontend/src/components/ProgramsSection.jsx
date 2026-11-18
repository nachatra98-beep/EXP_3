import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Users, IndianRupee, Sparkles } from 'lucide-react';

export default function ProgramsSection({ courses = [], onSelectCourse, onAskChatbot }) {
  const [activeCode, setActiveCode] = useState('BCA');

  // Fallback defaults if backend is still loading
  const defaultCourses = [
    {
      code: 'BCA',
      title: 'Bachelor of Computer Applications',
      degree_level: 'UG',
      duration: '3 Years (6 Semesters)',
      seats: 180,
      annual_tuition_fee: '₹85,000 / Year',
      eligibility: '10+2 with Mathematics/Computer Science, min 55% aggregate marks.',
      description: 'Premier undergraduate program for software engineering, full stack web development, cloud computing on AWS, and mobile application engineering.',
      highlights: ['Full Stack React & Node.js Lab', 'Cloud Computing on AWS/GCP', '3 Industry Internships', '98% Placement Record'],
      career_opportunities: ['Software Developer', 'Full Stack Engineer', 'Cloud Associate', 'QA Automation Engineer']
    },
    {
      code: 'B.Sc',
      title: 'B.Sc in Computer Science',
      degree_level: 'UG',
      duration: '3 Years (6 Semesters)',
      seats: 120,
      annual_tuition_fee: '₹75,000 / Year',
      eligibility: '10+2 with Physics, Mathematics & Chemistry/CS with min 60%.',
      description: 'Foundational computer science focusing on algorithms, discrete mathematics, distributed networks, and operating systems.',
      highlights: ['Algorithms & Data Structures Studio', 'Systems Programming in C++ & Rust', 'Open Source Contribution Track', 'Research Publication Mentorship'],
      career_opportunities: ['Systems Engineer', 'Algorithm Analyst', 'Embedded Systems Developer', 'Research Scholar']
    },
    {
      code: 'B.Com',
      title: 'B.Com in Computer Applications & FinTech',
      degree_level: 'UG',
      duration: '3 Years (6 Semesters)',
      seats: 120,
      annual_tuition_fee: '₹65,000 / Year',
      eligibility: '10+2 Commerce or Science stream with at least 50% marks.',
      description: 'Combines corporate financial analysis and investment banking with algorithmic trading, Python financial modeling, and SAP ERP.',
      highlights: ['Bloomberg Simulation Lab', 'SAP ERP & Tally Certification', 'Financial Data Analytics with Python', 'Banking Sector Placements'],
      career_opportunities: ['Financial Analyst', 'FinTech Specialist', 'ERP Consultant', 'Investment Associate']
    },
    {
      code: 'MCA',
      title: 'Master of Computer Applications',
      degree_level: 'PG',
      duration: '2 Years (4 Semesters)',
      seats: 120,
      annual_tuition_fee: '₹1,10,000 / Year',
      eligibility: 'Any Graduate with Mathematics at 10+2 or Degree level with min 50%.',
      description: 'Advanced postgraduate engineering in enterprise microservices, DevOps & Kubernetes, cybersecurity, and AI-driven cloud systems.',
      highlights: ['6-Month Paid Corporate Internship', 'DevOps & Kubernetes Infrastructure Lab', 'Advanced Machine Learning Track', 'Average Salary ₹9.2 LPA'],
      career_opportunities: ['Enterprise Architect', 'DevOps Engineer', 'Senior Backend Engineer', 'Solutions Architect']
    },
    {
      code: 'M.Sc',
      title: 'M.Sc in Data Science & Artificial Intelligence',
      degree_level: 'PG',
      duration: '2 Years (4 Semesters)',
      seats: 60,
      annual_tuition_fee: '₹95,000 / Year',
      eligibility: 'B.Sc (CS/Math/Stats), BCA or B.Tech with min 55% marks.',
      description: 'Cutting-edge specialization in Deep Learning, Large Language Models, Generative AI, Big Data analytics, and Computer Vision.',
      highlights: ['Nvidia DGX Supercomputing Cluster', 'Industry Sponsored Research Grants', 'Kaggle Grandmaster Mentorship', 'Highest Package ₹32 LPA'],
      career_opportunities: ['Machine Learning Scientist', 'AI Research Engineer', 'Data Scientist', 'Quantitative Modeler']
    }
  ];

  const programList = courses.length > 0 ? courses : defaultCourses;
  const currentProgram = programList.find(c => c.code === activeCode) || programList[0];

  const filterTabs = ['BCA', 'B.Sc', 'B.Com', 'MCA', 'M.Sc'];

  return (
    <section className="py-12 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header and Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-cit-navy tracking-tight font-serif">
            Our Programs
          </h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Explore a wide range of undergraduate and postgraduate programs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((code) => {
            const isActive = activeCode === code;
            return (
              <button
                key={code}
                onClick={() => setActiveCode(code)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cit-navy text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {code}
              </button>
            );
          })}

          <button
            onClick={() => onSelectCourse && onSelectCourse('all')}
            className="px-4 py-2 rounded-full text-sm font-semibold text-cit-navy hover:text-blue-600 border border-slate-200 hover:border-blue-200 flex items-center space-x-1 transition-all"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Program Content Grid */}
      <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Program Details */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wide">
              {currentProgram.degree_level === 'UG' ? 'Undergraduate Degree' : 'Postgraduate Degree'}
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
              NBA Accredited
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            {currentProgram.title} ({currentProgram.code})
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {currentProgram.description}
          </p>

          {/* Key Facts Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block">Duration</span>
                <span className="font-semibold text-slate-700">{currentProgram.duration}</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block">Annual Tuition</span>
                <span className="font-semibold text-slate-700">{currentProgram.annual_tuition_fee}</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block">Annual Intake</span>
                <span className="font-semibold text-slate-700">{currentProgram.seats} Seats</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {currentProgram.highlights && (
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Program Highlights</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProgram.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onSelectCourse && onSelectCourse(currentProgram.code)}
              className="px-5 py-2.5 bg-cit-navy hover:bg-slate-900 text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              Curriculum & Syllabus Details
            </button>
            <button
              onClick={() => onAskChatbot && onAskChatbot(`Tell me about ${currentProgram.code} admission requirements and fees at CIT`)}
              className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ask CIT Buddy about this Course</span>
            </button>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xs p-4 flex items-center justify-center">
            <img
              src="/programs-illustration.png"
              alt="Books, Graduation Cap and Laptop"
              className="w-full h-auto object-contain filter drop-shadow-md transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80";
              }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              Admissions 2026-27 Open
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
