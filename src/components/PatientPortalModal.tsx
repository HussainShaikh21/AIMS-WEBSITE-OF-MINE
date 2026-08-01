import React, { useState } from 'react';
import { AIMSLogo } from './AIMSLogo';
import { SAMPLE_PATIENT_RECORDS } from '../data/hospitalData';
import { PatientRecord, LabReport } from '../types';
import {
  User,
  X,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Download,
  Eye,
  CheckCircle,
  Clock,
  QrCode,
  Lock,
  Search,
  Stethoscope
} from 'lucide-react';

interface PatientPortalModalProps {
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({ onClose, onOpenBooking }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [patientRecord, setPatientRecord] = useState<PatientRecord>(SAMPLE_PATIENT_RECORDS[0]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'reports' | 'prescriptions' | 'billing'>('appointments');
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <AIMSLogo size="sm" variant="icon-only" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">Asian Institute of Medical Sciences (AIMS) Patient Portal</h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  VERIFIED PATIENT
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Patient ID: <span className="font-mono font-bold text-slate-700">{patientRecord.patientId}</span> • {patientRecord.name} ({patientRecord.age} Yrs, {patientRecord.gender})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Appointments ({patientRecord.appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lab & CT Scan Reports ({patientRecord.labReports.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'prescriptions'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescriptions</span>
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'billing'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Billing & Receipts</span>
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Active & Past Appointments</h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-3.5 py-1.5 bg-cyan-600 text-white font-bold text-xs rounded-lg shadow-sm"
              >
                + Book New Appointment
              </button>
            </div>

            {patientRecord.appointments.map((apt) => (
              <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{apt.doctorName}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[10px]">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-cyan-700 font-medium">{apt.departmentName} ({apt.branchName})</p>
                  <p className="text-slate-500">Scheduled: <span className="font-bold text-slate-800">{apt.appointmentDate} at {apt.appointmentTime}</span></p>
                  <p className="text-slate-500 italic">Symptoms: "{apt.symptoms}"</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-white p-1 rounded border border-slate-200" title="QR Token Pass">
                    <QrCode className="w-8 h-8 text-slate-800" />
                  </div>
                  <button
                    onClick={() => alert(`Appointment Pass Ref: ${apt.id}\nQR Token: ${apt.qrCodeToken}`)}
                    className="px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg"
                  >
                    View Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LAB & CT SCAN REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Diagnostic Reports & 128-Slice CT Scan Results</h3>
            <div className="space-y-3">
              {patientRecord.labReports.map((report) => (
                <div key={report.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{report.reportName}</span>
                      <span className="bg-cyan-100 text-cyan-800 font-extrabold px-2 py-0.5 rounded text-[10px]">
                        {report.category}
                      </span>
                    </div>
                    <p className="text-slate-500">Date: {report.date} • Radiologist: {report.doctorName}</p>
                    <p className="text-slate-600 line-clamp-1">{report.summary}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Report Modal Viewer */}
            {selectedReport && (
              <div className="mt-4 p-6 bg-slate-900 text-white rounded-2xl border border-cyan-500/30 space-y-4 animate-in fade-in duration-200">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                      Official Radiologist Report
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{selectedReport.reportName}</h4>
                    <p className="text-xs text-slate-400">Date: {selectedReport.date} | Consultant: {selectedReport.doctorName}</p>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-cyan-400 block">Radiologist Findings Summary:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedReport.summary}</p>
                </div>

                {/* Key Values Table */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300">Measured Diagnostic Values</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-cyan-400">
                          <th className="py-1.5">Parameter / Test</th>
                          <th className="py-1.5">Result</th>
                          <th className="py-1.5">Reference Range</th>
                          <th className="py-1.5">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.keyValues.map((kv, idx) => (
                          <tr key={idx} className="border-b border-slate-800/60">
                            <td className="py-2 font-medium">{kv.testName}</td>
                            <td className="py-2 font-bold text-white">{kv.result}</td>
                            <td className="py-2 text-slate-400">{kv.normalRange}</td>
                            <td className="py-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${kv.status === 'Normal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                                {kv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => alert(`Downloading signed PDF report for ${selectedReport.reportName}...`)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF Report</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-4 text-xs">
            {patientRecord.prescriptions.map((rx) => (
              <div key={rx.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Prescription Rx — {rx.doctorName}</h4>
                    <p className="text-slate-500">{rx.department} • Date: {rx.date}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                    Active Rx
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block">Diagnosis:</span>
                  <p className="text-slate-600">{rx.diagnosis}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 block">Prescribed Medicines:</span>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                    {rx.medications.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-800">
                        <span className="font-bold text-cyan-700">{m.name}</span>
                        <span>{m.dosage} ({m.frequency}) — {m.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 text-cyan-900">
                  <span className="font-bold block">Doctor Advice:</span>
                  <p>{rx.doctorAdvice}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: BILLING */}
        {activeTab === 'billing' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Billing Statements & TPA Insurance</h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">OPD Consultation & Diagnostic Package</h4>
                  <p className="text-slate-500">Invoice #INV-2026-991 • Paid via Cashless TPA</p>
                </div>
                <span className="text-sm font-black text-emerald-600">PAID ₹1,500</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
