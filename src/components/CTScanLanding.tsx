import React, { useState } from 'react';
import { Scan, ShieldCheck, Clock, CheckCircle2, AlertCircle, FileText, Calendar, Zap, Sparkles, HelpCircle } from 'lucide-react';
import { DIAGNOSTICS_DATA } from '../data/hospitalData';

interface CTScanLandingProps {
  onBookDiagnostic: (diagId: string) => void;
  onOpenTriage: () => void;
}

export const CTScanLanding: React.FC<CTScanLandingProps> = ({ onBookDiagnostic, onOpenTriage }) => {
  const ctScanData = DIAGNOSTICS_DATA.find((d) => d.id === 'ct-scan-128') || DIAGNOSTICS_DATA[0];
  const [selectedScanType, setSelectedScanType] = useState<'cardiac' | 'brain' | 'chest' | 'abdomen'>('cardiac');

  const scanOptions = {
    cardiac: { title: '128-Slice Cardiac CT Angiography', price: 6500, time: '5 Seconds', prep: '4 hrs fasting, avoid caffeine 12 hrs before.' },
    brain: { title: '128-Slice Neuro CT (Stroke & Brain)', price: 4500, time: '3 Seconds', prep: 'No strict fasting unless contrast requested.' },
    chest: { title: '128-Slice High-Res HRCT Chest', price: 5000, time: '4 Seconds', prep: 'Wear loose clothing without metal buttons.' },
    abdomen: { title: '128-Slice Abdomen & Pelvis CT', price: 5800, time: '6 Seconds', prep: '4 hrs fasting, drink 1L oral contrast water.' }
  };

  return (
    <section id="ct-scan" className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Banner */}
        <div className="bg-gradient-to-r from-slate-800/90 via-cyan-950/70 to-slate-900 p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl mb-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  State-of-the-Art Imaging
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  Sub-Second 3D Scanning
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                128-Slice Cardiac CT Scan & Precision Angiography
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                AIMS Hospital features ultra-fast 128-slice CT scan technology. It captures complete 3D high-resolution heart images in less than 5 seconds, evaluating arterial blockages, calcium scores, and pulmonary embolisms with 60% less radiation.
              </p>

              {/* Quick Specs */}
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-cyan-400 font-bold block">Scan Speed:</span>
                  <span className="text-white font-extrabold text-sm">Under 5 Seconds</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-emerald-400 font-bold block">Radiation Dose:</span>
                  <span className="text-white font-extrabold text-sm">60% Reduced (AIDR 3D)</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-amber-400 font-bold block">Report Turnaround:</span>
                  <span className="text-white font-extrabold text-sm">Same Day (2 - 4 Hours)</span>
                </div>
              </div>
            </div>

            {/* Price Estimator & Instant Booking Box */}
            <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-cyan-500/40 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Select CT Scan Type</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['cardiac', 'brain', 'chest', 'abdomen'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedScanType(key)}
                    className={`p-2.5 rounded-xl text-left border font-bold capitalize transition-all ${
                      selectedScanType === key
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {key} CT
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Selected Scan:</span>
                  <span className="font-bold text-cyan-300">{scanOptions[selectedScanType].title}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Scan Duration:</span>
                  <span className="font-bold text-emerald-400">{scanOptions[selectedScanType].time}</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-800 pt-2 text-white">
                  <span className="font-bold">Estimated Cost:</span>
                  <span className="text-xl font-black text-amber-400">PKR {scanOptions[selectedScanType].price.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => onBookDiagnostic('ct-scan-128')}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                id="ct-landing-book-now"
              >
                <Calendar className="w-4 h-4" />
                <span>Book CT Scan Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why 128-Slice CT Scan is Superior */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold mb-3">
              <Scan className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">128 Anatomical Cuts per Rotation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides 3D micro-clarity of coronary blood vessels, identifying early fatty plaques, arterial narrowing, and calcium deposits long before heart symptoms occur.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Non-Invasive Angiogram</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike traditional catheter angiograms, 128-slice CT requires no hospital admission, groin punctures, or arterial catheters. You walk out in 20 minutes!
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Same-Day Digital DICOM Reports</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your 3D scan images are rendered instantly and uploaded to your AIMS Patient Portal for easy radiologist review and doctor consultation.
            </p>
          </div>
        </div>

        {/* Patient Instructions & Preparation */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-400" />
            <span>CT Scan Preparation Guidelines</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-300">
            {ctScanData.preparationInstructions.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-900 text-cyan-300 font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </div>
                <p className="leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Frequently Asked Questions about 128-Slice CT Scan</span>
            </h4>
            <div className="space-y-3">
              {ctScanData.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-cyan-300 mb-1">Q: {faq.question}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
