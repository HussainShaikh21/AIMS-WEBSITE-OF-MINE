import React, { useState } from 'react';
import { HOSPITAL_BRANCHES } from '../data/hospitalData';
import { HospitalBranch } from '../types';
import { MapPin, PhoneCall, Mail, Clock, BedDouble, ShieldAlert, ExternalLink, Navigation, Scan } from 'lucide-react';

interface HospitalNetworkMapProps {
  onBookAppointment: (deptId?: string) => void;
}

export const HospitalNetworkMap: React.FC<HospitalNetworkMapProps> = ({ onBookAppointment }) => {
  const [selectedBranch, setSelectedBranch] = useState<HospitalBranch>(HOSPITAL_BRANCHES[0]);

  return (
    <section id="network" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Hospital Network & Branches
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Integrated Super Specialty Campuses Across the City
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Locate our tertiary campuses, specialized heart & brain hubs, and women & children hospitals equipped with 24/7 ICUs and advanced diagnostic centers.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Branch List */}
          <div className="lg:col-span-5 space-y-4">
            {HOSPITAL_BRANCHES.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedBranch.id === branch.id
                    ? 'bg-slate-900 text-white border-cyan-500 shadow-xl'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      selectedBranch.id === branch.id
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-cyan-100 text-cyan-800'
                    }`}
                  >
                    {branch.type}
                  </span>
                  {branch.is24x7Emergency && (
                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      24/7 Level 1 Emergency
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold mb-1">{branch.name}</h3>
                <p className={`text-xs ${selectedBranch.id === branch.id ? 'text-slate-300' : 'text-slate-600'}`}>
                  {branch.address}, {branch.city}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" />
                    {branch.icuBedsAvailable} ICU Beds Available
                  </span>
                  <span className="text-cyan-400">View Details →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map & Branch Details Card */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
                  Selected Campus Details
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedBranch.name}</h3>
                <p className="text-xs text-slate-300">{selectedBranch.address}</p>
              </div>
              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>

            {/* Simulated Map Visual Box */}
            <div className="relative h-56 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                alt="Map representation"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-cyan-600 text-white p-3 rounded-2xl shadow-2xl border-2 border-white text-center animate-bounce">
                  <MapPin className="w-6 h-6 mx-auto" />
                  <span className="text-xs font-bold block mt-1">{selectedBranch.name}</span>
                </div>
              </div>
            </div>

            {/* Facilities & Contact */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">Direct Hotline & Emergency:</span>
                <p className="text-red-400 font-bold text-sm">{selectedBranch.emergencyNumber}</p>
                <p className="text-slate-300">OPD Desk: {selectedBranch.opdNumber}</p>
                <p className="text-slate-400">Email: {selectedBranch.email}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">Imaging & Diagnostics On-Site:</span>
                <ul className="text-slate-300 space-y-1">
                  {selectedBranch.imagingFacilities.map((fac, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onBookAppointment()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg"
              >
                Book Appointment at {selectedBranch.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
