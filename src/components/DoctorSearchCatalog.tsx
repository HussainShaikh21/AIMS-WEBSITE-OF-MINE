import React, { useState, useEffect } from 'react';
import { Doctor } from '../types';
import { getStoredDoctors, DEPARTMENTS_DATA } from '../data/hospitalData';
import { Search, Star, Clock, MapPin, Filter, UserCheck, Stethoscope } from 'lucide-react';

interface DoctorSearchCatalogProps {
  onBookAppointment: (deptId: string, docId: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorSearchCatalog: React.FC<DoctorSearchCatalogProps> = ({
  onBookAppointment,
  onSelectDoctor
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => getStoredDoctors());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setDoctors(getStoredDoctors());
    };
    window.addEventListener('aims_doctors_updated', handleUpdate);
    return () => window.removeEventListener('aims_doctors_updated', handleUpdate);
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDeptId === 'all' || doc.departmentId === selectedDeptId;

    let matchesExp = true;
    if (selectedExp === '15+') matchesExp = doc.experienceYears >= 15;
    if (selectedExp === '20+') matchesExp = doc.experienceYears >= 20;

    return matchesSearch && matchesDept && matchesExp;
  });

  return (
    <section id="doctors" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Medical Faculty & Consultants
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Consult World-Renowned Super Specialists
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Choose from our panel of board-certified clinical chairmen, neurosurgeons, cardiologists, and robotic orthopedic innovators.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 shadow-sm mb-10 grid md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by doctor name or condition (e.g. Angioplasty)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white text-slate-900 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
              id="doctor-catalog-search-input"
            />
          </div>

          {/* Department Filter */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              id="doctor-catalog-dept-filter"
            >
              <option value="all">All Departments (20+)</option>
              {DEPARTMENTS_DATA.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              id="doctor-catalog-exp-filter"
            >
              <option value="all">All Experience Levels</option>
              <option value="15+">15+ Years Experience</option>
              <option value="20+">20+ Years Senior Practice</option>
            </select>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image / Avatar Banner */}
                <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white overflow-hidden flex items-center justify-center">
                  {doc.imageUrl ? (
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center font-black shadow-lg border border-cyan-400/30 group-hover:scale-105 transition-transform">
                        <Stethoscope className="w-8 h-8 text-cyan-200" />
                      </div>
                      <div className="space-y-0.5 max-w-[90%]">
                        <span className="text-xs font-bold text-white block truncate">{doc.name}</span>
                        <span className="text-[10px] text-cyan-300 font-medium block truncate">{doc.opdNo || 'OPD Consultant'}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{doc.rating} ({doc.reviewCount})</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {doc.experienceYears}+ Yrs Exp
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-cyan-700 uppercase tracking-wider block mb-0.5">
                      {doc.departmentName}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{doc.title}</p>
                  </div>

                  <p className="text-[11px] text-slate-600 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                    {doc.qualifications}
                  </p>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{doc.availability.days.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="truncate">{doc.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Consultation Fee</span>
                  <span className="text-sm font-black text-slate-900">PKR {doc.consultationFee.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onBookAppointment(doc.departmentId, doc.id)}
                  className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
