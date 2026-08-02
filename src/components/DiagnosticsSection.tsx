import React, { useState } from 'react';
import { DiagnosticService } from '../types';
import { DIAGNOSTICS_DATA } from '../data/hospitalData';
import { Scan, Clock, FileText, CheckCircle2, Search, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface DiagnosticsSectionProps {
  onBookDiagnostic: (diagId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const DiagnosticsSection: React.FC<DiagnosticsSectionProps> = ({ onBookDiagnostic, onNavigateSection }) => {
  const [reportSearchId, setReportSearchId] = useState('');
  const [reportStatusResult, setReportStatusResult] = useState<{ status: string; patientName: string; reportName: string; date: string } | null>(null);

  const handleReportLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSearchId.trim()) return;
    setReportStatusResult({
      status: 'Ready - Verified by Radiologist',
      patientName: 'Rajesh Malhotra',
      reportName: '128-Slice Cardiac CT Angiography',
      date: 'July 25, 2026'
    });
  };

  return (
    <section id="diagnostics" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-300">
              NABL & CAP Accredited
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Advanced Imaging & Automated Diagnostics
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1">
              Equipped with sub-second 128-slice CT, 3T silent MRI, 3D Echo, and NABL barcoded pathology testing.
            </p>
          </div>

          <button
            onClick={() => onNavigateSection('ct-scan')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-extrabold rounded-xl border border-cyan-500/30 transition-all flex items-center gap-2"
          >
            <Scan className="w-4 h-4 text-cyan-400" />
            <span>Dedicated 128-Slice CT Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Diagnostics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {DIAGNOSTICS_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center font-bold group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Scan className="w-6 h-6" />
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.shortDesc}</p>

                <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Turnaround Time:</span>
                    <span className="font-bold text-slate-800">{service.turnaroundTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Test Fee:</span>
                    <span className="font-bold text-cyan-700">PKR {service.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (service.isFeaturedCTScan) {
                      onNavigateSection('ct-scan');
                    } else {
                      onBookDiagnostic(service.id);
                    }
                  }}
                  className="text-xs font-bold text-cyan-700 hover:underline flex items-center gap-1"
                >
                  <span>View Test Prep & FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onBookDiagnostic(service.id)}
                  className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Book Test
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Lab Report Status Lookup Widget */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>Diagnostic Report Status Tracker</span>
            </h3>
            <p className="text-xs text-slate-300">
              Enter your Lab Sample ID or Booking Reference Number (e.g. <span className="text-cyan-300 font-mono font-bold">REP-8839</span>) to check test status.
            </p>

            <form onSubmit={handleReportLookup} className="flex items-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="text"
                placeholder="Enter Sample / Booking Ref ID..."
                value={reportSearchId}
                onChange={(e) => setReportSearchId(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                id="report-tracker-input"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
              >
                Track Status
              </button>
            </form>

            {reportStatusResult && (
              <div className="mt-4 p-4 bg-slate-800/90 rounded-2xl border border-cyan-500/30 text-left space-y-2 text-xs animate-in fade-in duration-200">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>Status: {reportStatusResult.status}</span>
                  <span className="text-slate-400 font-normal">{reportStatusResult.date}</span>
                </div>
                <p className="text-white font-bold">Patient: {reportStatusResult.patientName}</p>
                <p className="text-slate-300">Report Name: {reportStatusResult.reportName}</p>
                <div className="pt-2 border-t border-slate-700 text-cyan-300 font-semibold flex items-center justify-between">
                  <span>Available on Patient Portal</span>
                  <span className="underline cursor-pointer">Login to Download PDF</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
