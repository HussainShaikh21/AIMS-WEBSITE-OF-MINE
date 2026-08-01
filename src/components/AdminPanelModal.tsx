import React, { useState } from 'react';
import { AIMSLogo } from './AIMSLogo';
import { X, ShieldAlert, BedDouble, Users, Calendar, Settings, Activity, CheckCircle, RefreshCw } from 'lucide-react';
import { DOCTORS_DATA, HOSPITAL_BRANCHES } from '../data/hospitalData';

interface AdminPanelModalProps {
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ onClose }) => {
  const [emergencyAlertActive, setEmergencyAlertActive] = useState(true);
  const [icuBeds, setIcuBeds] = useState(HOSPITAL_BRANCHES[0].icuBedsAvailable);
  const [activeTab, setActiveTab] = useState<'roster' | 'beds' | 'emergency' | 'queue'>('beds');

  const [appointmentQueue, setAppointmentQueue] = useState([
    { id: 'APT-9041', patientName: 'Rajesh Malhotra', docName: 'Dr. Vikramaditya Mehta', dept: 'Cardiology', time: '10:30 AM', status: 'Confirmed' },
    { id: 'APT-9042', patientName: 'Sunita Rao', docName: 'Dr. Meera Nambiar', dept: 'Neurology', time: '11:15 AM', status: 'In Consultation' },
    { id: 'APT-9043', patientName: 'Amit Verma', docName: 'Dr. Rajesh K. Singhania', dept: 'Orthopedics', time: '12:00 PM', status: 'Pending OPD' }
  ]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-800 p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <AIMSLogo size="sm" variant="icon-only" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">Asian Institute of Medical Sciences (AIMS) Control Panel</h2>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-cyan-500/30">
                  STAFF MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage real-time bed capacity, emergency alerts, and doctor rosters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('beds')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'beds' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>ICU Bed Availability</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'queue' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Queue</span>
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'roster' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Doctor Roster ({DOCTORS_DATA.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'emergency' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Alert Center</span>
          </button>
        </div>

        {/* TAB 1: BEDS */}
        {activeTab === 'beds' && (
          <div className="space-y-6 text-xs">
            <h3 className="text-sm font-bold text-white">Live Bed Management Dashboard</h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold block">Main Campus ICU Beds</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-emerald-400">{icuBeds}</span>
                  <span className="text-slate-500">Total: 45</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIcuBeds((b) => Math.max(0, b - 1))}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold"
                  >
                    - Occupy Bed
                  </button>
                  <button
                    onClick={() => setIcuBeds((b) => Math.min(45, b + 1))}
                    className="flex-1 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold"
                  >
                    + Release Bed
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold block">Level 4 NICU Ventilator Beds</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-amber-400">8</span>
                  <span className="text-slate-500">Total: 20</span>
                </div>
                <p className="text-[11px] text-slate-400">12 Babies currently under neonatal observation.</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold block">Cardiac Resuscitation Bays</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-cyan-400">4</span>
                  <span className="text-slate-500">Total: 8</span>
                </div>
                <p className="text-[11px] text-slate-400">Cath labs ready for door-to-balloon primary PCI.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Live OPD Appointment Queue</h3>
            <div className="space-y-2">
              {appointmentQueue.map((item) => (
                <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{item.patientName}</span>
                    <span className="text-slate-400 block">{item.dept} • {item.docName} ({item.time})</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold text-[10px]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Doctor Duty Roster & OPD Status</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {DOCTORS_DATA.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">{doc.name}</h4>
                    <p className="text-slate-400 text-[11px]">{doc.departmentName}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                    ON OPD DUTY
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EMERGENCY ALERT */}
        {activeTab === 'emergency' && (
          <div className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-white">Emergency Alert Broadcast Toggle</h3>

            <div className="p-5 bg-slate-950 rounded-2xl border border-red-500/30 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">24/7 Level 1 Trauma Triage Banner</h4>
                <p className="text-slate-400">Shows hotlines and air ambulance readiness across hospital website header.</p>
              </div>
              <button
                onClick={() => setEmergencyAlertActive(!emergencyAlertActive)}
                className={`px-4 py-2 rounded-xl font-bold ${
                  emergencyAlertActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {emergencyAlertActive ? 'ALERT ACTIVE' : 'ALERT OFF'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
