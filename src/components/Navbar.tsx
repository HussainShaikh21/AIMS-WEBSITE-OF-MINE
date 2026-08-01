import React, { useState } from 'react';
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
  HeartHandshake
} from 'lucide-react';
import { DEPARTMENTS_DATA, DIAGNOSTICS_DATA } from '../data/hospitalData';

interface NavbarProps {
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenPatientPortal: () => void;
  onOpenAdminPanel: () => void;
  onOpenTriage: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPatientPortal,
  onOpenAdminPanel,
  onOpenTriage,
  activeSection,
  setActiveSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedBranch, setSelectedBranch] = useState('Central Campus');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuTab, setMegaMenuTab] = useState<'departments' | 'diagnostics'>('departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const languages = ['English', 'Hindi (हिंदी)', 'Gujarati (ગુજરાતી)', 'Marathi (मराठी)', 'Spanish'];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Emergency & Contact */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="tel:1066"
              className="flex items-center gap-1.5 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              id="top-emergency-hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>EMERGENCY: 1066 / +91 1800 246 7990</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 opacity-80">
              <MapPin className="w-3.5 h-3.5" />
              <span>New Delhi, India (Main Campus)</span>
            </span>
            <a
              href="https://wa.me/919820145990"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
              id="top-whatsapp-link"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: +91 98201 45990</span>
            </a>
          </div>

          {/* Branch & Language Selector & Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-slate-800 text-slate-100 text-xs rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                id="top-branch-select"
              >
                <option value="Central Campus">AIMS Main Campus</option>
                <option value="North Metro">AIMS Heart & Neuro</option>
                <option value="South Suburbs">AIMS Women & Children</option>
              </select>
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

            <span className="opacity-30">|</span>

            <button
              onClick={onOpenAdminPanel}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors"
              title="Hospital Staff & Doctor Admin Portal"
              id="top-admin-button"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer py-1" onClick={() => handleNavClick('hero')}>
            <AIMSLogo size="md" variant="full" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('hero')}
              className={`transition-colors ${
                activeSection === 'hero' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors ${
                activeSection === 'about' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              About Us
            </button>

            {/* Mega Menu Trigger */}
            <div className="relative group" onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
              <button
                onClick={() => handleNavClick('departments')}
                className={`flex items-center gap-1 transition-colors ${
                  activeSection === 'departments' || activeSection === 'diagnostics'
                    ? 'text-blue-600 font-bold'
                    : 'hover:text-blue-600'
                }`}
              >
                <span>Departments</span>
                <ChevronDown className="w-4 h-4" />
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
                      {DEPARTMENTS_DATA.slice(0, 9).map((dept) => (
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
              className={`transition-colors ${
                activeSection === 'doctors' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => handleNavClick('diagnostics')}
              className={`transition-colors ${
                activeSection === 'diagnostics' || activeSection === 'ct-scan'
                  ? 'text-blue-600 font-bold'
                  : 'hover:text-blue-600'
              }`}
            >
              Diagnostics
            </button>
            <button
              onClick={() => handleNavClick('packages')}
              className={`transition-colors ${
                activeSection === 'packages' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Health Packages
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
              onClick={onOpenPatientPortal}
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
              onClick={onOpenPatientPortal}
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
              onClick={() => handleNavClick('diagnostics')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Diagnostics
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
              onClick={() => handleNavClick('donation')}
              className="p-2.5 text-left text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
            >
              AIMS Foundation
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
