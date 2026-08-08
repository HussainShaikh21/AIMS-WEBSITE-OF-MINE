import React, { useState } from 'react';
import { Quote, Building2, BedDouble, ShieldCheck, Award, HeartHandshake, Stethoscope, UserCheck } from 'lucide-react';

interface DirectorsMessageSectionProps {
  onOpenBooking?: () => void;
}

export const DirectorsMessageSection: React.FC<DirectorsMessageSectionProps> = ({ onOpenBooking }) => {
  const [activeLeader, setActiveLeader] = useState<'director' | 'ceo'>('director');

  const leaders = {
    director: {
      name: 'Prof. Dr. Sadik Memon',
      designation: 'Executive Director & Chief Medical Officer',
      shortTitle: 'Director',
      initials: 'SM',
      badge: 'National Faculty',
      quote: 'At AIMS Hospital, clinical excellence and patient care stand at the core of our mission. Our 125-bed hospital is equipped with state-of-the-art 128-Slice CT imaging, Level-4 NICU, and 24/7 emergency ICUs to serve Hyderabad and Sindh with compassionate medical leadership.',
      roleDetails: 'Senior Consultant Gastroenterologist & Medical Director'
    },
    ceo: {
      name: 'Muhammad Farhan Abbasi',
      designation: 'Chief Executive Officer (CEO)',
      shortTitle: 'CEO',
      initials: 'FA',
      badge: 'Chief Executive',
      quote: 'As CEO of Asian Institute of Medical Sciences (AIMS), my vision is to ensure operational brilliance and world-class healthcare accessibility. With our 125 inpatient beds, modern operation theaters, and digital patient portal, we deliver transparent, patient-centric healthcare.',
      roleDetails: 'Chief Executive Officer & Strategic Operations'
    }
  };

  const currentLeader = leaders[activeLeader];

  return (
    <section id="leadership" className="py-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header with Profile Toggle Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-widest bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 mb-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>AIMS Executive Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Leadership Messages & Hospital Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              AIMS Hospital • 125-Bedded Multi-Specialty Hospital Facility in Hyderabad
            </p>
          </div>

          {/* Profile Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveLeader('director')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeLeader === 'director'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Director (Prof. Dr. Sadik Memon)</span>
            </button>
            <button
              onClick={() => setActiveLeader('ceo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeLeader === 'ceo'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>CEO (Muhammad Farhan Abbasi)</span>
            </button>
          </div>
        </div>

        {/* Selected Leader Active Message Feature */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-30"></div>
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-2xl group">
                <div className="relative aspect-[3/4] sm:h-[450px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex flex-col items-center justify-center p-6 text-center border-b border-cyan-500/30">
                  <div className="w-28 h-28 rounded-3xl bg-slate-900/90 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-2xl text-cyan-400 mb-4">
                    {activeLeader === 'director' ? <Stethoscope className="w-12 h-12 mb-1" /> : <Building2 className="w-12 h-12 mb-1" />}
                    <span className="text-xl font-black text-white tracking-widest">{currentLeader.initials}</span>
                  </div>
                  
                  {/* Designation Badge Overlay */}
                  <div className="bg-white/95 text-slate-900 border border-slate-300 shadow-xl px-4 py-2 rounded-xl text-center backdrop-blur-sm">
                    <div className="text-xs font-black tracking-tight uppercase leading-none text-slate-900">{currentLeader.name}</div>
                    <div className="text-[10px] font-bold text-slate-600 leading-tight mt-0.5">{currentLeader.designation}</div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="inline-flex items-center gap-1.5 bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                    <Award className="w-3.5 h-3.5" /> {currentLeader.shortTitle} Profile
                  </div>
                  <h3 className="text-xl font-black text-white">{currentLeader.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">{currentLeader.designation}</p>
                  <p className="text-[11px] text-slate-300 mt-1">AIMS Hospital • 125 Inpatient Beds Facility</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Profile Message & Fast Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Official {currentLeader.shortTitle} Statement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                "Leading AIMS Hospital's 125-Bedded Healthcare Mission in Sindh"
              </h3>
            </div>

            <div className="relative bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 shadow-inner">
              <Quote className="w-8 h-8 text-cyan-400/40 absolute -top-3 -left-2 rotate-180" />
              <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic pl-3">
                "{currentLeader.quote}"
              </blockquote>
            </div>

            {/* Key Facility Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">125 Beds</span>
                  <span className="text-[10px] text-slate-400">Total Capacity</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">24/7 Emergency</span>
                  <span className="text-[10px] text-slate-400">ICU & NICU</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white truncate max-w-[120px]">{currentLeader.name}</span>
                  <span className="text-[10px] text-slate-400">{currentLeader.shortTitle}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {onOpenBooking && (
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Book Consultation / Appointment</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Both Profiles Side-by-Side Dual Banner Card Footer */}
        <div className="pt-8 border-t border-slate-800">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 text-center">
            AIMS Hospital Executive Leadership Board
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* Director Card */}
            <div 
              onClick={() => setActiveLeader('director')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                activeLeader === 'director' 
                  ? 'bg-slate-800/90 border-cyan-500 shadow-lg' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950 flex flex-col items-center justify-center shrink-0 border border-cyan-500/50 text-cyan-400 shadow-md">
                <Stethoscope className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-black tracking-widest text-white">SM</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide block">Executive Director</span>
                <h5 className="text-sm font-extrabold text-white">{leaders.director.name}</h5>
                <p className="text-[11px] text-slate-400 line-clamp-1">{leaders.director.roleDetails}</p>
                <span className="inline-block text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded mt-1">125 Beds Hospital Director</span>
              </div>
            </div>

            {/* CEO Card */}
            <div 
              onClick={() => setActiveLeader('ceo')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                activeLeader === 'ceo' 
                  ? 'bg-slate-800/90 border-cyan-500 shadow-lg' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col items-center justify-center shrink-0 border border-blue-500/50 text-blue-400 shadow-md">
                <Building2 className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-black tracking-widest text-white">FA</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide block">Chief Executive Officer</span>
                <h5 className="text-sm font-extrabold text-white">{leaders.ceo.name}</h5>
                <p className="text-[11px] text-slate-400 line-clamp-1">{leaders.ceo.roleDetails}</p>
                <span className="inline-block text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded mt-1">125 Beds Hospital CEO</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

