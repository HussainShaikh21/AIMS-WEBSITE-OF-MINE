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
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenTriage: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenPortal,
  onOpenTriage
}) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 p-6 rounded-3xl border border-red-500/30 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950 px-2.5 py-0.5 rounded border border-red-800">
                24/7 Level 1 Trauma & Cardiac Helpline
              </span>
              <h3 className="text-xl font-black text-white mt-1">Medical Emergency? Call Immediately</h3>
              <p className="text-xs text-slate-300">Air Ambulance, Resuscitation Bays, door-to-balloon Cath Labs ready</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:1800246799"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>1800-2467-99</span>
            </a>
            <button
              onClick={onOpenTriage}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs rounded-xl border border-slate-700"
            >
              AI Symptom Triage
            </button>
          </div>
        </div>

        {/* 4 Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1: Brand & Accreditations */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <AIMSLogo size="lg" variant="full" textColor="text-white" />
            </div>

            <p className="text-slate-400 leading-relaxed pr-4">
              Asian Institute of Medical Sciences (AIMS) is a premier super-specialty healthcare institution equipped with sub-second 128-slice CT scan angiography, 3T MRI, robotic joint replacements, and Level 4 ICUs.
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
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

          {/* Col 4: Quick Patient Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
              Patient Quick Links
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
            <a href="#about" className="hover:text-slate-300">Biomedical Waste Disposal Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
