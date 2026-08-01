import React, { useState } from 'react';
import { Department } from '../types';
import { DEPARTMENTS_DATA } from '../data/hospitalData';
import {
  HeartPulse,
  Brain,
  Bone,
  Activity,
  Baby,
  Sparkles,
  Stethoscope,
  Droplet,
  Scan,
  ShieldAlert,
  ArrowRight,
  Clock,
  BedDouble,
  CheckCircle2
} from 'lucide-react';

interface DepartmentsGridProps {
  onSelectDepartment: (dept: Department) => void;
  onBookAppointment: (deptId: string) => void;
}

export const DepartmentsGrid: React.FC<DepartmentsGridProps> = ({
  onSelectDepartment,
  onBookAppointment
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'clinical' | 'surgical' | 'diagnostic' | 'critical'>('all');

  const filteredDepts = DEPARTMENTS_DATA.filter((dept) => {
    if (activeFilter === 'all') return true;
    return dept.category === activeFilter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return HeartPulse;
      case 'Brain':
        return Brain;
      case 'Bone':
        return Bone;
      case 'Activity':
        return Activity;
      case 'Baby':
        return Baby;
      case 'Sparkles':
        return Sparkles;
      case 'Stethoscope':
        return Stethoscope;
      case 'Droplet':
        return Droplet;
      case 'Scan':
        return Scan;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return Stethoscope;
    }
  };

  return (
    <section id="departments" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-600"></span> Super Specialties
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Departments & Centers of Clinical Excellence
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1">
              Explore our super-specialty departments staffed by internationally accredited doctors and equipped with advanced surgical suites.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {(['all', 'clinical', 'surgical', 'diagnostic', 'critical'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Specialties' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => {
            const IconComponent = getIcon(dept.iconName);
            return (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {dept.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">Head: {dept.headOfDept}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{dept.shortDesc}</p>

                  {/* Top Key Procedures */}
                  <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Key Surgical Procedures
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {dept.procedures.slice(0, 2).map((proc, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectDepartment(dept)}
                    className="text-slate-700 font-bold hover:text-blue-600 flex items-center gap-1 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onBookAppointment(dept.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-sm transition-colors"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
