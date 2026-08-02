import React, { useState, useEffect } from 'react';
import { AIMSLogo } from './AIMSLogo';
import { Department, Doctor, Appointment } from '../types';
import { DEPARTMENTS_DATA, getStoredDoctors } from '../data/hospitalData';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle,
  FileText,
  QrCode,
  Printer,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  UserCheck
} from 'lucide-react';

interface AppointmentBookingModalProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onClose: () => void;
  onBookingComplete?: (apt: Appointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  initialDepartmentId,
  initialDoctorId,
  onClose,
  onBookingComplete
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => getStoredDoctors());
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const handleUpdate = () => {
      setDoctors(getStoredDoctors());
    };
    window.addEventListener('aims_doctors_updated', handleUpdate);
    return () => window.removeEventListener('aims_doctors_updated', handleUpdate);
  }, []);

  // Form State
  const [selectedBranch, setSelectedBranch] = useState('AIMS Main Campus');
  const [departmentId, setDepartmentId] = useState<string>(initialDepartmentId || DEPARTMENTS_DATA[0].id);
  const [doctorId, setDoctorId] = useState<string>(initialDoctorId || doctors[0]?.id || 'doc-aims-1');
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [appointmentTime, setAppointmentTime] = useState<string>('10:30 AM');

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState<number>(35);
  const [patientGender, setPatientGender] = useState('Male');
  const [symptoms, setSymptoms] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Available Doctors filtered by chosen Department
  const filteredDoctors = doctors.filter((d) => d.departmentId === departmentId);
  const activeDepartment = DEPARTMENTS_DATA.find((d) => d.id === departmentId) || DEPARTMENTS_DATA[0];
  const activeDoctor = doctors.find((d) => d.id === doctorId) || filteredDoctors[0] || doctors[0];

  const handleDepartmentChange = (id: string) => {
    setDepartmentId(id);
    const firstDoc = doctors.find((d) => d.departmentId === id);
    if (firstDoc) {
      setDoctorId(firstDoc.id);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/appointment/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientPhone,
          patientEmail,
          patientAge,
          patientGender,
          departmentId,
          departmentName: activeDepartment.name,
          doctorId: activeDoctor.id,
          doctorName: activeDoctor.name,
          appointmentDate,
          appointmentTime,
          symptoms,
          branchName: selectedBranch
        })
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedAppointment(data.appointment);
        if (onBookingComplete) onBookingComplete(data.appointment);
        setStep(4);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 p-6 sm:p-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <AIMSLogo size="sm" variant="icon-only" />
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Asian Institute of Medical Sciences (AIMS) Booking</h2>
              <p className="text-xs text-slate-500">Instant confirmation pass with digital QR code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className={step >= 1 ? 'text-cyan-700 font-extrabold' : ''}>1. Department & Branch</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-cyan-700 font-extrabold' : ''}>2. Doctor & Time Slot</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-cyan-700 font-extrabold' : ''}>3. Patient Info</span>
          </div>
        )}

        {/* STEP 1: Department & Branch */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Hospital Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                <option value="AIMS Main Campus">AIMS Main Campus (Sector 18, Central City)</option>
                <option value="AIMS Heart & Neuro">AIMS Institute of Cardiac & Neuro Sciences (North Metro)</option>
                <option value="AIMS Women & Children">AIMS Women & Children Specialty Center (South Suburbs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Department / Super Specialty</label>
              <select
                value={departmentId}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-cyan-50/60 rounded-xl border border-cyan-200 text-xs text-cyan-800 space-y-1">
              <span className="font-bold block">Selected Specialty Highlights:</span>
              <p>{activeDepartment.shortDesc}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span>Select Doctor & Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Doctor & Time Slot */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Consultant Doctor</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.title} (Fee: ₹{doc.consultationFee})
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Card Preview */}
            {activeDoctor && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                {activeDoctor.imageUrl ? (
                  <img src={activeDoctor.imageUrl} alt={activeDoctor.name} className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center font-bold border-2 border-cyan-400 shrink-0 shadow">
                    <UserCheck className="w-7 h-7 text-white" />
                  </div>
                )}
                <div className="text-xs">
                  <h4 className="font-bold text-slate-900">{activeDoctor.name}</h4>
                  <p className="text-slate-500">{activeDoctor.qualifications}</p>
                  <span className="text-cyan-700 font-semibold mt-1 block">Experience: {activeDoctor.experienceYears} Years</span>
                </div>
              </div>
            )}

            {/* Date & Time Slot Picker */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="09:30 AM">09:30 AM (Morning Slot)</option>
                  <option value="11:00 AM">11:00 AM (Morning Slot)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon Slot)</option>
                  <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span>Enter Patient Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Information Form */}
        {step === 3 && (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Malhotra"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                  id="booking-patient-name"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number (For SMS/WhatsApp Pass) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98201 45990"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                  id="booking-patient-phone"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="rajesh@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Symptoms / Reason for Visit</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your symptoms or routine consultation reason..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full p-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between text-slate-700">
              <span>Consultation Booking Fee:</span>
              <span className="font-extrabold text-sm text-cyan-700">PKR {activeDoctor.consultationFee.toLocaleString()}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2"
                id="booking-confirm-submit"
              >
                {isLoading ? (
                  <span>Generating Appointment Pass...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm & Generate Digital Pass</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Digital Confirmation Ticket & Pass */}
        {step === 4 && confirmedAppointment && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Appointment Confirmed!</h3>
              <p className="text-xs text-slate-500">Booking Reference ID: <span className="font-mono font-bold text-cyan-700">{confirmedAppointment.id}</span></p>
            </div>

            {/* Printable Ticket Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-cyan-500/30 shadow-xl space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-cyan-300">AIMS HOSPITAL DIGITAL PASS</h4>
                  <p className="text-slate-400">{confirmedAppointment.branchName}</p>
                </div>
                <div className="bg-white p-1 rounded">
                  <QrCode className="w-10 h-10 text-slate-950" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">Patient Name:</span>
                  <span className="font-bold text-white text-sm">{confirmedAppointment.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Contact:</span>
                  <span className="font-bold text-white">{confirmedAppointment.patientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Doctor:</span>
                  <span className="font-bold text-cyan-300">{confirmedAppointment.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Department:</span>
                  <span className="font-bold text-white">{confirmedAppointment.departmentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date & Time:</span>
                  <span className="font-bold text-amber-400 text-sm">{confirmedAppointment.appointmentDate} at {confirmedAppointment.appointmentTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status:</span>
                  <span className="font-bold text-emerald-400">{confirmedAppointment.status}</span>
                </div>
              </div>
            </div>

            {/* SMS & WhatsApp notification simulation payload */}
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant SMS & WhatsApp confirmation pass has been dispatched to {confirmedAppointment.patientPhone}.</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Pass</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
