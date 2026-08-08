import React, { useState, useEffect } from 'react';
import { AIMSLogo } from './AIMSLogo';
import {
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  Globe,
  Search,
  Calendar,
  User,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  Scan,
  HeartPulse,
  Award,
  Clock,
  Briefcase,
  HeartHandshake,
  Microscope,
  Heart,
  FileText,
  BookOpen,
  FileSpreadsheet,
  Phone,
  Users,
  UserCheck
} from 'lucide-react';
import { getStoredSiteSettings, getStoredDepartments, DIAGNOSTICS_DATA } from '../data/hospitalData';
import { Department } from '../types';

interface NavbarProps {
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onOpenTriage: () => void;
  onOpenResearch: (tab?: 'overview' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact') => void;
  onOpenEmployees?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPortal,
  onOpenAdmin,
  onOpenTriage,
  onOpenResearch,
  onOpenEmployees,
  onNavigateSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedBranch, setSelectedBranch] = useState('Central Campus');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuTab, setMegaMenuTab] = useState<'departments' | 'diagnostics'>('departments');
  const [siteSettings, setSiteSettings] = useState(() => getStoredSiteSettings());
  const [departments, setDepartments] = useState<Department[]>(() => getStoredDepartments());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteSettings(getStoredSiteSettings());
      setDepartments(getStoredDepartments());
    };
    window.addEventListener('aims_settings_updated', handleUpdate);
    window.addEventListener('aims_departments_updated', handleUpdate);
    return () => {
      window.removeEventListener('aims_settings_updated', handleUpdate);
      window.removeEventListener('aims_departments_updated', handleUpdate);
    };
  }, []);

  const languages = ['English', 'Urdu (اردو)', 'Sindhi (سنڌي)'];

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Welcome Tagline */}
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            <span>Asian Institute of Medical Sciences • Dedicated 24/7 Super-Specialty Healthcare</span>
          </div>

          {/* WhatsApp & Language Selector */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-md border border-emerald-800/60 text-[11px] font-bold">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp:</span>
              <a
                href="https://wa.me/923163355355"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline decoration-emerald-500/50"
              >
                +92 316 3355355
              </a>
              <span className="opacity-40">|</span>
              <a
                href="https://wa.me/923343355356"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline decoration-emerald-500/50"
              >
                +92 334 3355356
              </a>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-800 text-slate-100 text-xs rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                id="top-language-select"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="flex items-center justify-between min-h-[7rem] py-3.5">
          {/* Logo */}
          <div className="flex items-center cursor-pointer py-1" onClick={() => handleNavClick('hero')}>
            <AIMSLogo size="md" variant="full" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-extrabold text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
              id="nav-home-button"
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
              id="nav-about-button"
            >
              <span>About Us</span>
            </button>

            {/* Mega Menu Trigger */}
            <div className="relative group" onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
              <button
                onClick={() => handleNavClick('departments')}
                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
                id="nav-departments-button"
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-700" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-3 mb-4">
                    <button
                      onClick={() => setMegaMenuTab('departments')}
                      className={`text-sm font-bold pb-1 transition-all ${
                        megaMenuTab === 'departments'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Super Specialties (25+)
                    </button>
                    <button
                      onClick={() => setMegaMenuTab('diagnostics')}
                      className={`text-sm font-bold pb-1 transition-all ${
                        megaMenuTab === 'diagnostics'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Diagnostics & 128-Slice CT
                    </button>
                  </div>

                  {megaMenuTab === 'departments' ? (
                    <div className="grid grid-cols-3 gap-3">
                      {departments.slice(0, 9).map((dept) => (
                        <div
                          key={dept.id}
                          onClick={() => {
                            handleNavClick('departments');
                            setIsMegaMenuOpen(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 group/item"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                              <Stethoscope className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors">
                                {dept.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{dept.shortDesc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {DIAGNOSTICS_DATA.map((diag) => (
                        <div
                          key={diag.id}
                          onClick={() => {
                            if (diag.isFeaturedCTScan) {
                              handleNavClick('ct-scan');
                            } else {
                              handleNavClick('diagnostics');
                            }
                            setIsMegaMenuOpen(false);
                          }}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 transition-all cursor-pointer group/diag"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                              <Scan className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900 group-hover/diag:text-blue-700">
                                  {diag.name}
                                </h4>
                                {diag.badge && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                                    {diag.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5">{diag.shortDesc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-600 font-medium">Need immediate clinical triage advice?</span>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onOpenTriage();
                      }}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Try AI Health Assistant</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('doctors')}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
              id="nav-doctors-button"
            >
              <span>Doctors</span>
            </button>

            <button
              onClick={() => {
                if (onOpenEmployees) onOpenEmployees();
              }}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl border border-blue-500 transition-all shadow-md flex items-center gap-1.5 font-extrabold cursor-pointer"
              id="nav-employees-button"
            >
              <Users className="w-4 h-4 text-blue-100 shrink-0" />
              <span>Employees</span>
            </button>

            {/* Research Menu & Modal Trigger */}
            <div className="relative group">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResearch('overview');
                }}
                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
                id="nav-research-button"
              >
                <Microscope className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Research</span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-700" />
              </button>

              {/* Research Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <div className="text-[10px] font-black uppercase text-slate-400 px-3 py-1 tracking-wider">
                  AIMS Research & Development
                </div>
                <button
                  onClick={() => onOpenResearch('overview')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Microscope className="w-3.5 h-3.5 text-blue-600" />
                  <span>Research Overview</span>
                </button>
                <button
                  onClick={() => onOpenResearch('policies')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Research Policies</span>
                </button>
                <button
                  onClick={() => onOpenResearch('irb')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Institutional Review Board (IRB)</span>
                </button>
                <button
                  onClick={() => onOpenResearch('sops')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>IRB SOPs</span>
                </button>
                <button
                  onClick={() => onOpenResearch('forms')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                  <span>IRB Application Forms</span>
                </button>
                <button
                  onClick={() => onOpenResearch('publications')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>Publications & Library</span>
                </button>
                <button
                  onClick={() => onOpenResearch('contact')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors flex items-center gap-2 border-t border-slate-100 mt-1 pt-2"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Research Office Contacts</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('packages')}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200/90 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 font-extrabold"
              id="nav-packages-button"
            >
              <span>Health Packages</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenTriage}
              className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-slate-200"
              title="AI Health Assistant & Triage"
              id="nav-ai-triage-button"
            >
              <HeartPulse className="w-5 h-5 text-blue-600" />
            </button>

            <button
              onClick={onOpenPortal}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-full transition-colors border border-slate-200 flex items-center gap-1.5"
              id="nav-patient-portal-button"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>Patient Portal</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 hover:scale-[1.02]"
              id="nav-book-appointment-button"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenPortal}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <User className="w-4 h-4 text-cyan-600" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('hero')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              About AIMS
            </button>
            <button
              onClick={() => handleNavClick('departments')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Departments
            </button>
            <button
              onClick={() => handleNavClick('ct-scan')}
              className="p-2.5 text-left text-sm font-semibold text-cyan-700 font-bold rounded-lg hover:bg-cyan-50"
            >
              128-Slice CT Scan
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Doctors Catalog
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenEmployees) onOpenEmployees();
              }}
              className="p-2.5 text-left text-sm font-bold text-blue-700 rounded-lg bg-blue-50 flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span>Employees Directory</span>
            </button>
            <button
              onClick={() => handleNavClick('packages')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Health Checkups
            </button>
            <button
              onClick={() => handleNavClick('network')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Hospital Network
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Careers
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResearch('overview');
              }}
              className="p-2.5 text-left text-sm font-black text-cyan-700 bg-cyan-50 rounded-lg hover:bg-cyan-100 flex items-center gap-2 border border-cyan-200"
            >
              <Microscope className="w-4 h-4 text-cyan-600" />
              <span>Research Division</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTriage();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              <span>AI Health Assistant & Triage</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-xs font-extrabold text-white bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Instant Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
