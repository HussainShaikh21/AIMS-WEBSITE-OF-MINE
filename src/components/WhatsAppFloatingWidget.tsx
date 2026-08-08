import React, { useState } from 'react';
import { MessageSquare, PhoneCall, X, ExternalLink, CheckCircle2 } from 'lucide-react';

export const WhatsAppFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumbers = [
    {
      label: 'WhatsApp Support & OPD Helpline 1',
      displayNumber: '+92 316 3355355',
      waLink: 'https://wa.me/923163355355?text=Hello%20AIMS%20Hospital%2C%20I%20need%20assistance.',
      timing: '24/7 Available',
      badge: 'Fast Response'
    },
    {
      label: 'WhatsApp Support & Emergency Helpline 2',
      displayNumber: '+92 334 3355356',
      waLink: 'https://wa.me/923343355356?text=Hello%20AIMS%20Hospital%2C%20I%20need%20assistance.',
      timing: '24/7 Available',
      badge: 'Direct Line'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded WhatsApp Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">AIMS Official WhatsApp</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping inline-block"></span>
                  Instant Help & Appointments
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body content */}
          <div className="p-4 space-y-3 bg-slate-50/50">
            <p className="text-xs text-slate-600 font-medium">
              Connect directly with Asian Institute of Medical Sciences (AIMS) on WhatsApp:
            </p>

            {whatsappNumbers.map((num, idx) => (
              <a
                key={idx}
                href={num.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white hover:bg-emerald-50/80 p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-slate-700 block">
                        {num.label}
                      </span>
                      <span className="text-sm font-black text-emerald-700 font-mono tracking-tight block">
                        {num.displayNumber}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {num.badge}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {num.timing}
                  </span>
                  <span className="font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Chat Now <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}

            <div className="pt-2 text-center text-[10px] text-slate-400">
              Asian Institute of Medical Sciences • Official 24/7 Helpline
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white"
        title="Chat on Official WhatsApp"
        id="floating-whatsapp-button"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping"></span>
        </div>
        <div className="hidden sm:block text-left">
          <span className="text-[10px] font-black uppercase tracking-wider block text-emerald-100 leading-none">
            WhatsApp 24/7
          </span>
          <span className="text-xs font-black block text-white leading-tight">
            +92 316 3355355
          </span>
        </div>
      </button>
    </div>
  );
};
