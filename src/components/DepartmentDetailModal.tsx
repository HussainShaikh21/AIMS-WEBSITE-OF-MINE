import React, { useState, useEffect } from 'react';
import { Department, Doctor } from '../types';
import { X, CheckCircle2, Clock, BedDouble, Stethoscope, Calendar, UserCheck, ShieldCheck } from 'lucide-react';
import { getStoredDoctors } from '../data/hospitalData';

interface DepartmentDetailModalProps {
  department: Department | null;
  onClose: () => void;
  onBookAppointment: (deptId: string, docId?: string) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  onClose,
  onBookAppointment
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => getStoredDoctors());

  useEffect(() => {
    const handleUpdate = () => {
      setDoctors(getStoredDoctors());
    };
    window.addEventListener('aims_doctors_updated', handleUpdate);
    return () => window.removeEventListener('aims_doctors_updated', handleUpdate);
  }, []);

  if (!department) return null;

  const deptDoctors = doctors.filter((d) => d.departmentId === department.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">
              {department.category} Super Specialty
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{department.name}</h2>
            <p className="text-xs font-semibold text-cyan-700">Head of Department: {department.headOfDept}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-700 block">OPD Hours:</span>
              <span className="text-slate-600">{department.opdTimings}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-700 block">Inpatient Capacity:</span>
              <span className="text-slate-600">{department.bedCapacity} Dedicated Beds & ICUs</span>
            </div>
          </div>
        </div>

        {/* Full Overview */}
        <div className="space-y-6 text-xs text-slate-700 leading-relaxed mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Clinical Overview</h3>
            <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">{department.fullDesc}</p>
          </div>

          {/* Procedures & Facilities */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Specialized Surgical Procedures</span>
              </h3>
              <ul className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {department.procedures.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-cyan-600" />
                <span>Advanced Infrastructure</span>
              </h3>
              <ul className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {department.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Department Doctors */}
          {deptDoctors.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Senior Consultants in {department.name}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {deptDoctors.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                      {doc.imageUrl ? (
                        <img src={doc.imageUrl} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs border border-cyan-400 shrink-0">
                          <UserCheck className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-[10px] text-slate-500">{doc.qualifications}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onBookAppointment(department.id, doc.id);
                      }}
                      className="px-2.5 py-1 bg-cyan-600 text-white font-bold rounded text-[11px] hover:bg-cyan-700"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            Close Window
          </button>
          <button
            onClick={() => {
              onClose();
              onBookAppointment(department.id);
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment in {department.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
