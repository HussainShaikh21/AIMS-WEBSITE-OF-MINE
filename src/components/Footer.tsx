import React, { useState, useEffect } from 'react';
import { AIMSLogo } from './AIMSLogo';
import {
  HeartPulse,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  ArrowRight,
  Scan,
  Calendar,
  Heart,
  User,
  ExternalLink,
  MessageSquare,
  Eye,
  ZoomIn,
  Check,
  Microscope
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenTriage: () => void;
  onOpenAdmin: () => void;
  onOpenResearch?: (tab?: 'overview' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenPortal,
  onOpenTriage,
  onOpenAdmin,
  onOpenResearch,
}) => {
  const [isA11yMode, setIsA11yMode] = useState<boolean>(() => {
    return localStorage.getItem('aims_a11y_mode') === 'true';
  });

  useEffect(() => {
    if (isA11yMode) {
      document.documentElement.classList.add('accessibility-mode');
      localStorage.setItem('aims_a11y_mode', 'true');
    } else {
      document.documentElement.classList.remove('accessibility-mode');
      localStorage.setItem('aims_a11y_mode', 'false');
    }
  }, [isA11yMode]);

  const toggleAccessibility = () => {
    setIsA11yMode(prev => !prev);
  };
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency & Location Banner */}
        <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-red-950/90 p-6 rounded-3xl border border-red-500/30 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950 px-2.5 py-0.5 rounded border border-red-800">
                24/7 Level 1 Trauma & Cardiac Helpline
              </span>
              <h3 className="text-xl font-black text-white mt-1">Medical Emergency? Call Immediately</h3>
              <p className="text-xs text-slate-300">Resuscitation Bays, ICU Ambulance & Emergency Care Ready 24/7</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:1066"
              className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>1066 / +92 22 111 246 799</span>
            </a>
            <a
              href="https://wa.me/923163355355"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp 1: +92 316 3355355</span>
            </a>
            <a
              href="https://wa.me/923343355356"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp 2: +92 334 3355356</span>
            </a>
            <button
              onClick={onOpenTriage}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs rounded-xl border border-slate-700"
            >
              AI Symptom Triage
            </button>
          </div>
        </div>

        {/* 5 Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1 & 2: Brand, Location & Emergency Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <AIMSLogo size="lg" variant="full" textColor="text-white" />
            </div>

            <p className="text-slate-400 leading-relaxed pr-4">
              Asian Institute of Medical Sciences (AIMS) is a premier super-specialty healthcare institution equipped with sub-second 128-slice CT scan angiography, 3T MRI, robotic joint replacements, and Level 4 ICUs.
            </p>

            {/* Prominent Hospital Address & Contact Card */}
            <div className="bg-slate-900/90 border border-emerald-500/40 p-4 rounded-2xl space-y-2.5 shadow-md">
              <div className="flex items-start gap-2.5 text-slate-200">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white text-xs block uppercase tracking-wider text-emerald-400">Hospital Location & Address:</span>
                  <span className="text-sm font-bold text-slate-100 block mt-0.5">
                    C9VJ+6V, Aims Hospital Road Hala Naka, Hyderabad, 71000, Pakistan
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=C9VJ%2B6V%2C+Aims+Hospital+Road+Hala+Naka%2C+Hyderabad%2C+71000%2C+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline mt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Google Maps (Plus Code: C9VJ+6V)
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                  <span><strong className="text-white">Emergency:</strong> 1066 / +92 22 111 246 799</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">WhatsApp:</strong> +92 316 3355355 / +92 334 3355356</span>
                </div>
              </div>
            </div>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> JCI International
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> NABH Accredited
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> NABL Robolab
              </span>
            </div>
          </div>

          {/* Col 2: Clinical Departments */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
              Super Specialties
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Cardiology & Angioplasty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Neurology & Neurosurgery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Robotic Orthopedics & Joints
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Oncology & CyberKnife
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Level 4 NICU & Pediatrics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('departments')} className="hover:text-cyan-300 transition-colors">
                  Gastroenterology & Liver Transplant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Diagnostics & Key Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
              Diagnostics & Imaging
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('ct-scan')} className="hover:text-cyan-300 transition-colors font-bold text-white flex items-center gap-1">
                  <Scan className="w-3.5 h-3.5 text-amber-400" />
                  <span>128-Slice CT Scan Page</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('diagnostics')} className="hover:text-cyan-300 transition-colors">
                  3T Silent Cardiac MRI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('packages')} className="hover:text-cyan-300 transition-colors">
                  Full Body Health Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('diagnostics')} className="hover:text-cyan-300 transition-colors">
                  NABL Barcoded Pathology Lab
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-cyan-300 transition-colors">
                  Download Diagnostic Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Patient & Staff Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
              Staff & Patient Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenBooking} className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Book Doctor Appointment</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Patient Portal Access</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-400 font-bold bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>🔐 Staff Admin Login Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('donation')} className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>AIMS Care Philanthropy</span>
                </button>
              </li>
              {onOpenResearch && (
                <li>
                  <button onClick={() => onOpenResearch('overview')} className="hover:text-cyan-300 transition-colors flex items-center gap-1 font-extrabold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                    <Microscope className="w-3.5 h-3.5 text-cyan-400" />
                    <span>🔬 Research & IRB Division</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigateSection('careers')} className="hover:text-cyan-300 transition-colors">
                  Career Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('network')} className="hover:text-cyan-300 transition-colors">
                  Hospital Network & Maps
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Patient Accessibility & Assistive Mode Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isA11yMode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-xs uppercase tracking-wider">Patient Accessibility Mode</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isA11yMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  {isA11yMode ? 'ACTIVE (Large Font & High Contrast)' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Designed for visually impaired patients. Enlarge text size, improve color contrast, and enhance button touch targets.
              </p>
            </div>
          </div>

          <button
            onClick={toggleAccessibility}
            id="footer-accessibility-toggle"
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
              isA11yMode
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
            <span>{isA11yMode ? 'Disable Accessibility Mode' : 'Enable Accessibility Mode'}</span>
            {isA11yMode && <Check className="w-3.5 h-3.5 text-slate-950 font-black" />}
          </button>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 AIMS Hospital Group. All Rights Reserved. Built to International Healthcare Standards.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={toggleAccessibility}
              className={`hover:text-cyan-300 font-bold flex items-center gap-1 ${isA11yMode ? 'text-cyan-400' : 'text-slate-400'}`}
              title="Toggle Accessibility Mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>A11y {isA11yMode ? 'ON' : 'OFF'}</span>
            </button>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300">Terms of Service</a>
            <span>•</span>
            <button onClick={onOpenAdmin} className="hover:text-amber-300 text-amber-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
