import React from 'react';
import { ShieldAlert, Scan, Cpu, CreditCard, Baby, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldAlert,
      title: '24/7 Level-1 Trauma & Emergency',
      desc: 'Dedicated resuscitation bays, air ambulance helipad, and door-to-balloon primary PCI cath labs under 30 minutes.',
      badge: 'Immediate Response',
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      icon: Scan,
      title: '128-Slice Ultra Fast CT Angio',
      desc: '5-second non-invasive cardiac scanning with 60% lower radiation dose and instant AI-assisted radiologist reports.',
      badge: 'Advanced Diagnostic',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      icon: Cpu,
      title: 'Robotic Joint & Spine Surgery',
      desc: 'MAKO robotic guidance ensuring 0.5mm sub-millimeter surgical accuracy, minimal blood loss, and rapid 24-hr recovery.',
      badge: 'Sub-Millimeter Precision',
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      icon: CreditCard,
      title: '40+ Cashless TPA & Insurance Desk',
      desc: 'Dedicated hospital desk providing instant cashless approval with Star Health, ICICI Lombard, HDFC ERGO, Max Bupa, etc.',
      badge: 'Hassle-Free Approval',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      icon: Baby,
      title: 'Level 4 NICU & PICU Intensive Care',
      desc: 'Specialized neonatal ICU equipped with high-frequency ventilators, nitric oxide therapy, and ECMO life support.',
      badge: 'Tiny Miracle Care',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      icon: ShieldCheck,
      title: '100% HEPA Ultra-Clean OTs',
      desc: 'Modular operating suites with laminar air flow, HEPA air filtration, and zero hospital-acquired infection benchmarks.',
      badge: 'Zero Infection',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      icon: HeartPulse,
      title: 'AI Symptom Checker & Triage',
      desc: 'Instant online preliminary symptom guidance powered by server-side Gemini AI to direct patients to the right specialist.',
      badge: '24/7 Digital Assistant',
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      icon: Sparkles,
      title: 'Digital Reports & Patient Portal',
      desc: 'Access lab test results, CT scan DICOM images, digital prescriptions, and doctor follow-up passes online 24/7.',
      badge: 'Paperless Records',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-300">
            Why Choose AIMS Hospital
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Excellence in Medical Outcomes, Driven by Technology & Empathy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From emergency trauma resuscitation to complex cardiac bypasses and sub-second 128-slice CT diagnostics, discover why thousands of families trust AIMS Hospital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-cyan-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AIMS Gold Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
