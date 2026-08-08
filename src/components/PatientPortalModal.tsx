import React, { useState } from 'react';
import { AIMSLogo } from './AIMSLogo';
import { SAMPLE_PATIENT_RECORDS, DOCTORS_DATA as DOCTORS } from '../data/hospitalData';
import { PatientRecord, LabReport } from '../types';
import {
  User,
  X,
  Calendar,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  QrCode,
  Lock,
  Search,
  Stethoscope,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Send,
  UserCheck,
  Sparkles,
  PhoneOff,
  AlertCircle
} from 'lucide-react';

interface PatientPortalModalProps {
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({ onClose, onOpenBooking }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [patientRecord, setPatientRecord] = useState<PatientRecord>(SAMPLE_PATIENT_RECORDS[0]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'reports' | 'telemedicine'>('appointments');
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);

  // Telemedicine state
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS[0]?.id || '');
  const [telemedicineReason, setTelemedicineReason] = useState('');
  const [consultationType, setConsultationType] = useState<'instant' | 'scheduled'>('instant');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'patient' | 'doctor'; text: string; time: string }>>([
    { sender: 'doctor', text: 'Hello! Welcome to AIMS Hospital Telemedicine. Please describe your symptoms.', time: 'Just now' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus('connecting');
    setIsCallActive(true);

    setTimeout(() => {
      setCallStatus('connected');
    }, 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'patient', text: newMessage, time }]);
    const currentInput = newMessage;
    setNewMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: `Thank you for sharing. I am reviewing your record for "${currentInput}". I will advise on your treatment.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

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
            onClick={() => setActiveTab('telemedicine')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              activeTab === 'telemedicine'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-cyan-700 bg-cyan-50 hover:bg-cyan-100 hover:text-cyan-900'
            }`}
          >
            <Video className="w-4 h-4 text-cyan-500 animate-pulse" />
            <span>Telemedicine Video Consult</span>
            <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              LIVE
            </span>
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

        {/* TAB 3: TELEMEDICINE */}
        {activeTab === 'telemedicine' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-5 rounded-2xl border border-cyan-500/30 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-cyan-500/30 mb-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>AIMS Virtual Health Hub</span>
                </div>
                <h3 className="text-base font-extrabold text-white">Telemedicine Video Consultations</h3>
                <p className="text-xs text-slate-300">
                  Connect face-to-face with AIMS Hospital specialists from anywhere. Encrypted & HIPAA Compliant.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Specialists Online Now</span>
              </div>
            </div>

            {/* If Call is Active (Virtual Room View) */}
            {isCallActive ? (
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Video Header Bar */}
                <div className="bg-slate-900 p-3 px-4 border-b border-slate-800 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-extrabold text-white">{selectedDoctor.name}</span>
                    <span className="text-slate-400">({selectedDoctor.departmentName})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono">
                    <Lock className="w-3 h-3" />
                    <span>256-BIT ENCRYPTED ROOM</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-0 min-h-[360px]">
                  {/* Left: Main Doctor Video Canvas */}
                  <div className="md:col-span-8 bg-slate-900 relative p-4 flex flex-col justify-between items-center overflow-hidden min-h-[280px]">
                    {callStatus === 'connecting' && (
                      <div className="my-auto text-center space-y-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-cyan-900/50 border-2 border-cyan-500 flex items-center justify-center animate-pulse">
                          <Stethoscope className="w-8 h-8 text-cyan-400" />
                        </div>
                        <p className="text-xs font-bold text-cyan-300">Connecting to {selectedDoctor.name}...</p>
                        <p className="text-[10px] text-slate-400">Securing video link • High Definition Audio/Video</p>
                      </div>
                    )}

                    {callStatus === 'connected' && (
                      <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                        {/* Simulated Doctor Video Feed UI */}
                        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 mb-3 shadow-xl">
                            <Stethoscope className="w-10 h-10" />
                          </div>
                          <h4 className="text-base font-extrabold text-white">{selectedDoctor.name}</h4>
                          <p className="text-xs text-cyan-300 font-semibold">{selectedDoctor.departmentName}</p>
                          <span className="mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                            Video Channel Active • HD Stream
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white border border-slate-700 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          <span>LIVE CONSULTATION</span>
                        </div>

                        {/* Patient Self Video Window (Picture-in-Picture) */}
                        <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-900 rounded-lg border-2 border-cyan-500 overflow-hidden shadow-lg flex items-center justify-center">
                          <div className="text-center p-1">
                            <User className="w-6 h-6 text-cyan-400 mx-auto" />
                            <span className="text-[9px] text-slate-300 font-bold block mt-0.5">You ({patientRecord.name})</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Controls Bar */}
                    <div className="w-full mt-3 pt-3 border-t border-slate-800 flex justify-center items-center gap-4">
                      <button
                        onClick={() => setIsAudioMuted(!isAudioMuted)}
                        className={`p-3 rounded-full text-xs font-bold transition-all ${
                          isAudioMuted ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                        title={isAudioMuted ? 'Unmute Mic' : 'Mute Mic'}
                      >
                        {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className={`p-3 rounded-full text-xs font-bold transition-all ${
                          isVideoMuted ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                        title={isVideoMuted ? 'Turn Camera On' : 'Turn Camera Off'}
                      >
                        {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setIsCallActive(false);
                          setCallStatus('idle');
                        }}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>End Consultation</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Live Consultation Chat */}
                  <div className="md:col-span-4 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between p-3">
                    <div className="border-b border-slate-800 pb-2 mb-2">
                      <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                        Consultation Chat
                      </span>
                    </div>

                    {/* Messages Container */}
                    <div className="space-y-2 overflow-y-auto max-h-[220px] p-1 text-xs">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl max-w-[85%] text-xs space-y-1 ${
                            msg.sender === 'patient'
                              ? 'ml-auto bg-cyan-600 text-white'
                              : 'bg-slate-800 text-slate-200 border border-slate-700'
                          }`}
                        >
                          <p className="leading-snug">{msg.text}</p>
                          <span className="text-[9px] opacity-70 block text-right">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="mt-2 flex gap-1.5">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type message to doctor..."
                        className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl flex items-center justify-center"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              /* If Call is Inactive: Request Video Consultation Form & Available Specialists */
              <div className="grid md:grid-cols-12 gap-6">
                
                {/* Form Column */}
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Request Instant Video Consultation
                    </h4>
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded">
                      Fee: PKR 1,500
                    </span>
                  </div>

                  <form onSubmit={handleStartCall} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Select Consultant Specialist</label>
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none focus:border-cyan-600"
                      >
                        {DOCTORS.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} — {doc.departmentName} ({doc.location})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Consultation Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setConsultationType('instant')}
                          className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                            consultationType === 'instant'
                              ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          ⚡ Instant Video Call
                          <span className="block text-[10px] opacity-80 font-normal">Connects in ~2 mins</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConsultationType('scheduled')}
                          className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                            consultationType === 'scheduled'
                              ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          📅 Scheduled Follow-Up
                          <span className="block text-[10px] opacity-80 font-normal">Pick specific slot</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Describe Symptoms or Medical Reason</label>
                      <textarea
                        rows={3}
                        value={telemedicineReason}
                        onChange={(e) => setTelemedicineReason(e.target.value)}
                        placeholder="e.g. Mild abdominal discomfort, prescription review, or CT scan report consultation..."
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-cyan-600"
                        required
                      ></textarea>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Note for Emergencies:</strong> For severe chest pain, trauma, or respiratory distress, please visit AIMS Hospital 24/7 Emergency Department immediately on Aims Hospital Road, Hala Naka Hyderabad.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Initiate Video Consultation Room</span>
                    </button>
                  </form>
                </div>

                {/* Available Specialists Sidebar */}
                <div className="md:col-span-5 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Online Specialist Roster
                  </h4>

                  <div className="space-y-2.5">
                    {DOCTORS.slice(0, 4).map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs hover:border-cyan-400 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="font-bold text-slate-900">{doc.name}</span>
                          </div>
                          <p className="text-[11px] text-cyan-700 font-medium">{doc.departmentName}</p>
                          <p className="text-[10px] text-slate-500">{doc.qualifications}</p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedDoctorId(doc.id);
                            setConsultationType('instant');
                            setTelemedicineReason(`Telemedicine consultation request with ${doc.name}`);
                            setCallStatus('connecting');
                            setIsCallActive(true);
                            setTimeout(() => setCallStatus('connected'), 2500);
                          }}
                          className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[10px] rounded-lg shrink-0 flex items-center gap-1"
                        >
                          <Video className="w-3 h-3" />
                          <span>Call Now</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
