import React, { useState } from 'react';
import {
  Search,
  Calendar,
  ShieldAlert,
  PhoneCall,
  Activity,
  Award,
  Scan,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  HeartPulse,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { DOCTORS_DATA, DEPARTMENTS_DATA } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenTriage: () => void;
  onSelectDoctor: (docId: string) => void;
  onSelectDepartment: (deptId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenTriage,
  onSelectDoctor,
  onSelectDepartment,
  onNavigateSection
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: 'doctor' | 'dept'; id: string; name: string; subtitle: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const q = val.toLowerCase();

    const matchedDocs = DOCTORS_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.departmentName.toLowerCase().includes(q) ||
        d.specializations.some((s) => s.toLowerCase().includes(q))
    ).slice(0, 4).map((d) => ({
      type: 'doctor' as const,
      id: d.id,
      name: d.name,
      subtitle: `${d.title} (${d.departmentName})`
    }));

    const matchedDepts = DEPARTMENTS_DATA.filter(
      (dp) => dp.name.toLowerCase().includes(q) || dp.shortDesc.toLowerCase().includes(q)
    ).slice(0, 3).map((dp) => ({
      type: 'dept' as const,
      id: dp.id,
      name: dp.name,
      subtitle: dp.shortDesc
    }));

    setSearchResults([...matchedDocs, ...matchedDepts]);
  };

  return (
    <section id="hero" className="relative bg-slate-50 text-slate-900 overflow-hidden py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT: HERO */}
          <div className="lg:col-span-6 space-y-6 relative">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-100/50 rounded-full opacity-60 blur-3xl pointer-events-none"></div>

            {/* Eyebrow */}
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-blue-600"></span> Certified Excellence
            </span>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight">
              Advanced Medical Care <br />
              <span className="text-blue-600 italic font-serif">For You & Yours</span>
            </h1>

            {/* Lead Paragraph */}
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
              Experience world-class healthcare with India's leading specialists. Combining cutting-edge 128-slice CT imaging with compassionate care for over 25 years.
            </p>

            {/* Doctor & Specialty Instant Search Box */}
            <div className="relative max-w-xl">
              <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2">
                <div className="pl-3 text-blue-600">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search doctor by name, symptom (e.g. chest pain), or department..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none py-2"
                  id="hero-search-input"
                />
                <button
                  onClick={() => onNavigateSection('doctors')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap shadow-sm"
                >
                  Search
                </button>
              </div>

              {/* Search Results Dropdown */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearching(false);
                        setSearchQuery('');
                        if (item.type === 'doctor') {
                          onSelectDoctor(item.id);
                        } else {
                          onSelectDepartment(item.id);
                        }
                      }}
                      className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                              item.type === 'doctor'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {item.type === 'doctor' ? 'Doctor' : 'Department'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Interactive Action Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigateSection('doctors')}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Find a Doctor</p>
                  <p className="text-xs text-slate-500">150+ Top Specialists</p>
                </div>
              </div>

              <div
                onClick={onOpenTriage}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">AI Symptom Triage</p>
                  <p className="text-xs text-slate-500">24/7 Clinical Guidance</p>
                </div>
              </div>
            </div>

            {/* Primary CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="bg-blue-600 text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 hover:scale-[1.02]"
                id="hero-cta-book-appointment"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href="tel:1066"
                className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3.5 rounded-full text-sm font-bold border border-red-200 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-600 animate-pulse" />
                <span>Emergency: 1066</span>
              </a>
            </div>
          </div>

          {/* RIGHT CONTENT: VISUAL & DEPARTMENTS GRID */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Visual Header Image Banner */}
            <div
              onClick={() => onNavigateSection('ct-scan')}
              className="relative h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                alt="AIMS 128-Slice Radiology Wing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-1">Asian Institute of Medical Sciences (AIMS)</p>
                  <h3 className="text-2xl font-bold">Digital-First 128-Slice Radiology Wing</h3>
                  <p className="text-xs text-slate-200 mt-1">Non-invasive ultra-fast cardiac CT & 3T MRI diagnostics</p>
                </div>
                <div className="bg-blue-600 text-white p-2 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Department Grid Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => onNavigateSection('departments')}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer min-h-[120px]"
              >
                <div className="text-blue-500 font-bold italic text-2xl">01.</div>
                <div>
                  <h4 className="text-slate-800 font-bold text-base">Cardiology</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Advanced heart care, angioplasty & surgeries.</p>
                </div>
              </div>

              <div
                onClick={() => onNavigateSection('departments')}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer min-h-[120px]"
              >
                <div className="text-blue-500 font-bold italic text-2xl">02.</div>
                <div>
                  <h4 className="text-slate-800 font-bold text-base">Neurology</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Expert treatment for stroke & brain disorders.</p>
                </div>
              </div>

              <div
                onClick={() => onNavigateSection('diagnostics')}
                className="bg-slate-900 p-5 rounded-2xl flex flex-col justify-between text-white hover:bg-slate-800 transition-colors cursor-pointer min-h-[120px]"
              >
                <div className="text-blue-400 font-bold italic text-2xl">03.</div>
                <div>
                  <h4 className="font-bold text-base">Diagnostics</h4>
                  <p className="text-[11px] opacity-70 mt-1">128 CT, 3T MRI, 4D Ultrasound & Pathology.</p>
                </div>
              </div>

              <div
                onClick={() => onNavigateSection('departments')}
                className="bg-blue-600 p-5 rounded-2xl flex flex-col justify-between text-white hover:bg-blue-700 transition-colors cursor-pointer min-h-[120px]"
              >
                <div className="flex justify-end">
                  <ArrowRight className="w-6 h-6 opacity-70" />
                </div>
                <h4 className="font-bold text-base leading-tight">
                  Explore All 25+ <br />
                  Departments
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER STATS BAR */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl px-6 sm:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full md:w-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-800">150+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Specialist Doctors</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-800">1M+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Satisfied Patients</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-800">25+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Super Specialties</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-800">99.4%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Clinical Success</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-between md:justify-end">
            <div className="text-left md:text-right">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Quick Access</p>
              <p className="text-xs font-semibold text-slate-700">AIMS Patient Mobile App</p>
            </div>
            <button
              onClick={() => onNavigateSection('network')}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors border border-blue-200"
            >
              View Campuses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
