import React from 'react';
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
  MessageSquare
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenTriage: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenPortal,
  onOpenTriage,
  onOpenAdmin,
}) => {
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
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Us</span>
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
                    Aims Hospital Road Hala Naka Hyderabad Sindh
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                  <span><strong className="text-white">Emergency:</strong> 1066 / +92 22 111 246 799</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>info@aimshospital.org</span>
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

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 AIMS Hospital Group. All Rights Reserved. Built to International Healthcare Standards.</p>
          <div className="flex items-center gap-4">
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
