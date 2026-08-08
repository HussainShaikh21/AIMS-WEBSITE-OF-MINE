import React, { useState } from 'react';
import { Award, ShieldCheck, Heart, Eye, Target, Calendar, CheckCircle, ChevronRight, Sparkles, Stethoscope, Building2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'director' | 'timeline'>('director');

  const milestones = [
    { year: '2004', title: 'Foundation of AIMS Hospital', desc: 'Established as a premier 125-bed multi-specialty healthcare institution in Hyderabad with 24/7 cardiac emergency.' },
    { year: '2012', title: 'NABH & JCI Accreditation', desc: 'Achieved international healthcare accreditation standards and Level 4 NICU commissioning.' },
    { year: '2019', title: 'Robotic Surgery & 128-Slice CT Installation', desc: 'Integrated MAKO robotic joint replacement and ultra-fast 128-slice cardiac CT scan.' },
    { year: '2024', title: 'AI Diagnostics & Comprehensive Cancer Pavilion', desc: 'Launched AI-assisted radiology triage and 500-bed super-specialty campus.' }
  ];

  return (
    <section id="about" className="py-16 bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            About AIMS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Asian Institute of Medical Sciences (AIMS)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Asian Institute of Medical Sciences (AIMS) is a premier super-specialty healthcare institution dedicated to patient-first clinical outcomes, cutting-edge surgical robotics, and ultra-fast precision diagnostics.
          </p>
        </div>

        {/* 4 Key Pillars */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">JCI & NABH Certified</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adhering strictly to global patient safety protocols, zero hospital infection goals, and rigorous audit standards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Top Specialist Doctors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over 150 international consultants holding DM, MCh, FRCS, and fellowship credentials from leading global institutes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Next-Gen Technology</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with 128-slice CT angiography, 3T silent MRI, MAKO joint robotics, and bi-plane cardiac cath labs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Affordable & Cashless</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empathy-driven care with transparent pricing, 40+ cashless insurance TPA partners, and charity fund support.
            </p>
          </div>
        </div>

        {/* Tabbed Interactive Section: Mission / Vision / Director Message / Timeline */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-10 shadow-xl overflow-hidden relative">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'mission'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Our Mission & Vision
            </button>
            <button
              onClick={() => setActiveTab('director')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'director'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Director’s Message
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Hospital Milestones
            </button>
          </div>

          {activeTab === 'mission' && (
            <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Target className="w-5 h-5" />
                  <span>OUR MISSION</span>
                </div>
                <h3 className="text-2xl font-black text-white">To Deliver Ethically Superior, Precision Healthcare Available to All.</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  We bridge the gap between world-class medical innovation and human compassion, ensuring every patient receives accurate diagnostics, evidence-based treatments, and emotional dignity.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Zero compromise on patient safety and sterile clinical environments.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Rapid emergency response with sub-30 minute stroke & cardiac door-to-needle times.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <Eye className="w-5 h-5" />
                  <span>OUR VISION</span>
                </div>
                <h4 className="text-lg font-bold text-white">To Be Recognized as a Global Center of Excellence for Complex Medical Sciences.</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  We strive to lead clinical research, robotic surgery education, and AI-integrated preventive diagnostics across Asia and international markets.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'director' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Dual Executive Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Director Card */}
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950 flex flex-col items-center justify-center border border-cyan-500/50 shrink-0 shadow-inner text-cyan-400">
                      <Stethoscope className="w-7 h-7 mb-1" />
                      <span className="text-xs font-black tracking-widest text-white">SM</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                        Executive Director
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1">Prof. Dr. Sadik Memon</h4>
                      <p className="text-xs text-slate-300 font-medium">Executive Director & Chief Medical Officer</p>
                      <p className="text-[11px] text-cyan-300 font-semibold mt-0.5">125-Bedded Hospital Facility</p>
                    </div>
                  </div>
                  <blockquote className="text-xs text-slate-300 italic border-l-2 border-cyan-500 pl-3 py-1 bg-slate-900/60 rounded-r-lg">
                    "At AIMS Hospital, our 125-bed multi-specialty institution provides 24/7 cardiac emergency, 128-slice CT imaging, and ethical patient care for the people of Hyderabad & Sindh."
                  </blockquote>
                </div>

                {/* CEO Card */}
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col items-center justify-center border border-blue-500/50 shrink-0 shadow-inner text-blue-400">
                      <Building2 className="w-7 h-7 mb-1" />
                      <span className="text-xs font-black tracking-widest text-white">FA</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                        Chief Executive Officer
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1">Muhammad Farhan Abbasi</h4>
                      <p className="text-xs text-slate-300 font-medium">Chief Executive Officer (CEO)</p>
                      <p className="text-[11px] text-cyan-300 font-semibold mt-0.5">125-Bedded Hospital Facility</p>
                    </div>
                  </div>
                  <blockquote className="text-xs text-slate-300 italic border-l-2 border-cyan-500 pl-3 py-1 bg-slate-900/60 rounded-r-lg">
                    "As CEO, I am committed to advancing operational excellence across our 125 inpatient beds, modular ICUs, and cutting-edge medical technologies."
                  </blockquote>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-white mb-4">Journey of Excellence</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {milestones.map((m, idx) => (
                  <div key={idx} className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                    <span className="text-lg font-black text-cyan-400">{m.year}</span>
                    <h4 className="text-xs font-bold text-white mt-1">{m.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
