import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
  ChevronRight,
  ArrowLeft,
  Calendar,
  ShieldAlert,
  Monitor,
  Calculator,
  Stethoscope,
  Heart,
  Microscope,
  Scan,
  Pill,
  PhoneCall,
  Shield,
  Wrench,
  Megaphone,
  Network,
  UserCheck,
  FileText,
  BadgeCheck,
  Sparkles,
  Layers,
  Clock,
  User
} from 'lucide-react';
import { Employee, EmployeeDepartment } from '../types';
import {
  getStoredEmployees,
  getStoredEmployeeDepartments
} from '../data/hospitalData';

interface EmployeeDirectoryModalProps {
  onClose: () => void;
  initialDepartmentId?: string;
  onOpenAdmin?: () => void;
}

export const EmployeeDirectoryModal: React.FC<EmployeeDirectoryModalProps> = ({
  onClose,
  initialDepartmentId,
  onOpenAdmin
}) => {
  const [employees, setEmployees] = useState<Employee[]>(() => getStoredEmployees());
  const [departments, setDepartments] = useState<EmployeeDepartment[]>(() =>
    getStoredEmployeeDepartments()
  );

  const [activeTab, setActiveTab] = useState<'departments' | 'directory' | 'orgchart'>(
    initialDepartmentId ? 'directory' : 'departments'
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(
    initialDepartmentId || null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>(
    initialDepartmentId || 'all'
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [designationFilter, setDesignationFilter] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setEmployees(getStoredEmployees());
      setDepartments(getStoredEmployeeDepartments());
    };
    window.addEventListener('aims_employees_updated', handleUpdate);
    window.addEventListener('aims_employee_departments_updated', handleUpdate);
    return () => {
      window.removeEventListener('aims_employees_updated', handleUpdate);
      window.removeEventListener('aims_employee_departments_updated', handleUpdate);
    };
  }, []);

  // Helper to extract clean initials for empty profile placeholder
  const getInitials = (name: string) => {
    return name
      .replace(/^(Mr\.|Ms\.|Dr\.|Sr\.|Engr\.|Pharm\.)\s+/i, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Icon mapping helper
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'monitor':
        return <Monitor className="w-6 h-6" />;
      case 'users':
        return <Users className="w-6 h-6" />;
      case 'calculator':
        return <Calculator className="w-6 h-6" />;
      case 'building2':
        return <Building2 className="w-6 h-6" />;
      case 'stethoscope':
        return <Stethoscope className="w-6 h-6" />;
      case 'heart':
        return <Heart className="w-6 h-6" />;
      case 'microscope':
        return <Microscope className="w-6 h-6" />;
      case 'scan':
        return <Scan className="w-6 h-6" />;
      case 'pill':
        return <Pill className="w-6 h-6" />;
      case 'phonecall':
        return <PhoneCall className="w-6 h-6" />;
      case 'shield':
        return <Shield className="w-6 h-6" />;
      case 'wrench':
        return <Wrench className="w-6 h-6" />;
      case 'megaphone':
        return <Megaphone className="w-6 h-6" />;
      case 'award':
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.highestQualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        departmentFilter === 'all' || emp.departmentId === departmentFilter;

      const matchesStatus =
        statusFilter === 'all' || emp.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDesignation =
        designationFilter === 'all' || emp.designation === designationFilter;

      return matchesSearch && matchesDept && matchesStatus && matchesDesignation;
    });
  }, [employees, searchQuery, departmentFilter, statusFilter, designationFilter]);

  // Unique designations for filter dropdown
  const uniqueDesignations = useMemo(() => {
    return Array.from(new Set(employees.map((e) => e.designation))).sort();
  }, [employees]);

  // Handle department click
  const handleSelectDepartment = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    setDepartmentFilter(deptId);
    setActiveTab('directory');
  };

  const selectedDepartmentData = departments.find((d) => d.id === selectedDepartmentId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  Employee & Department Directory
                </h2>
                <span className="bg-blue-950 text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-800">
                  Institutional Directory
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Comprehensive directory of departments, management, clinical, IT & administrative staff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Staff Management</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('departments');
                setSelectedDepartmentId(null);
                setDepartmentFilter('all');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'departments' && !selectedDepartmentId
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Departments Overview ({departments.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('directory');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>
                {selectedDepartmentId && selectedDepartmentData
                  ? `${selectedDepartmentData.name} (${
                      employees.filter((e) => e.departmentId === selectedDepartmentId).length
                    })`
                  : `All Employees Directory (${employees.length})`}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('orgchart');
                setSelectedDepartmentId(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'orgchart'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Org Hierarchy Structure</span>
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{employees.filter((e) => e.status === 'Active').length} Active Personnel</span>
            </span>
            <span className="text-slate-700">|</span>
            <span>{departments.length} Institutional Departments</span>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: DEPARTMENTS OVERVIEW */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span>Institutional Departments Directory</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select any department card below to view its staff, department head, contact details, and employee profiles.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('directory');
                      setDepartmentFilter('all');
                    }}
                    className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-bold rounded-xl text-xs border border-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse All Staff Directory</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Department Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => {
                  const deptStaff = employees.filter((e) => e.departmentId === dept.id);
                  const activeStaff = deptStaff.filter((e) => e.status === 'Active');

                  return (
                    <div
                      key={dept.id}
                      className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-lg hover:shadow-blue-900/10 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="p-3 bg-blue-950/80 text-blue-400 rounded-xl border border-blue-800/80 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {getDepartmentIcon(dept.iconName)}
                          </div>
                          <span className="text-[11px] font-extrabold bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                            {deptStaff.length} Employees
                          </span>
                        </div>

                        <h4 className="text-base font-black text-white group-hover:text-blue-400 transition-colors">
                          {dept.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {dept.description}
                        </p>

                        {/* Head of Department Info */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                            <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="text-slate-400">Head:</span>
                            <span className="text-white font-bold">{dept.headOfDepartment}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>Contact: {dept.contactExtension}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{activeStaff.length} Active Staff</span>
                        </span>

                        <button
                          onClick={() => handleSelectDepartment(dept.id)}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Employees</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ALL EMPLOYEES DIRECTORY / DEPARTMENT PAGE */}
          {activeTab === 'directory' && (
            <div className="space-y-6">
              
              {/* Department Header Banner if specific department selected */}
              {selectedDepartmentId && selectedDepartmentData && (
                <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 p-6 rounded-2xl border border-blue-800/60 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setSelectedDepartmentId(null);
                        setDepartmentFilter('all');
                      }}
                      className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to All Departments</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-300 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
                        {employees.filter((e) => e.departmentId === selectedDepartmentId).length} Staff Members
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shrink-0">
                      {getDepartmentIcon(selectedDepartmentData.iconName)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {selectedDepartmentData.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                        {selectedDepartmentData.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                        <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                          <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>Head of Dept: <strong>{selectedDepartmentData.headOfDepartment}</strong></span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          <span>Email: {selectedDepartmentData.contactEmail}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Contact: {selectedDepartmentData.contactExtension}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search & Filters Controls Bar */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  
                  {/* Search Input */}
                  <div className="md:col-span-1 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search name, designation, qualification, ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Department Filter Dropdown */}
                  <div>
                    <select
                      value={departmentFilter}
                      onChange={(e) => {
                        setDepartmentFilter(e.target.value);
                        if (e.target.value !== 'all') {
                          setSelectedDepartmentId(e.target.value);
                        } else {
                          setSelectedDepartmentId(null);
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">All Departments ({departments.length})</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">All Employee Statuses</option>
                      <option value="Active">Active Only</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>

                  {/* Designation Filter */}
                  <div>
                    <select
                      value={designationFilter}
                      onChange={(e) => setDesignationFilter(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">All Designations</option>
                      {uniqueDesignations.map((desig) => (
                        <option key={desig} value={desig}>
                          {desig}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                  <span>
                    Showing <strong className="text-white">{filteredEmployees.length}</strong> of{' '}
                    <strong className="text-white">{employees.length}</strong> personnel profiles
                  </span>

                  {(searchQuery || departmentFilter !== 'all' || statusFilter !== 'all' || designationFilter !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setDepartmentFilter('all');
                        setSelectedDepartmentId(null);
                        setStatusFilter('all');
                        setDesignationFilter('all');
                      }}
                      className="text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Employee Cards Grid */}
              {filteredEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 shadow-lg hover:shadow-blue-900/15 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        {/* Employee Avatar & Status */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="relative shrink-0">
                            {emp.imageUrl ? (
                              <img
                                src={emp.imageUrl}
                                alt={emp.fullName}
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40 group-hover:border-blue-400 transition-all shadow-md"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  const fallback = (e.target as HTMLImageElement).nextElementSibling;
                                  if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 border-2 border-blue-500/30 flex flex-col items-center justify-center text-blue-300 font-black shadow-md ${
                                emp.imageUrl ? 'hidden' : 'flex'
                              }`}
                            >
                              <User className="w-6 h-6 text-blue-400 mb-0.5" />
                              <span className="text-[10px] tracking-wider font-extrabold">{getInitials(emp.fullName)}</span>
                            </div>
                            <span
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                                emp.status === 'Active'
                                  ? 'bg-emerald-500'
                                  : emp.status === 'On Leave'
                                  ? 'bg-amber-500'
                                  : 'bg-slate-500'
                              }`}
                              title={`Status: ${emp.status}`}
                            />
                          </div>

                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                            {emp.employeeId}
                          </span>
                        </div>

                        {/* Name & Designation */}
                        <h4 className="text-base font-black text-white group-hover:text-blue-400 transition-colors">
                          {emp.fullName}
                        </h4>
                        <p className="text-xs font-bold text-blue-400 mt-0.5">
                          {emp.designation}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                          {emp.departmentName}
                        </p>

                        {/* Qualification Pill */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{emp.highestQualification}</span>
                          </span>
                        </div>

                        {/* Additional Info Badges */}
                        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">Experience:</span>
                            <span className="font-bold text-slate-200">{emp.experienceYears} Years</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">Status:</span>
                            <span
                              className={`font-extrabold text-[11px] ${
                                emp.status === 'Active'
                                  ? 'text-emerald-400'
                                  : emp.status === 'On Leave'
                                  ? 'text-amber-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {emp.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* View Profile Action */}
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="mt-5 w-full py-2 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>View Profile</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">No Personnel Records Found</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    No employees matched your current search filters or department selection.
                  </p>
                  {onOpenAdmin && (
                    <button
                      onClick={onOpenAdmin}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5 shadow-md"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Add New Employee in Admin Panel</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORGANIZATION CHART */}
          {activeTab === 'orgchart' && (
            <div className="space-y-6">
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-400" />
                  <span>Institutional Organizational Structure</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Visual hierarchy showing institutional leadership, department heads, and operational teams.
                </p>
              </div>

              {/* Hierarchy Tree */}
              <div className="space-y-8">
                
                {/* Level 1: Board & Executive */}
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-r from-blue-900 to-indigo-900 border-2 border-blue-500 p-4 rounded-2xl shadow-xl max-w-md">
                    <div className="flex items-center justify-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4" />
                      <span>Executive Governance</span>
                    </div>
                    <h4 className="text-base font-black text-white">Asian Institute of Medical Sciences</h4>
                    <p className="text-xs text-blue-200 mt-1 font-semibold">
                      Board of Directors & Medical Executive Council
                    </p>
                  </div>
                  <div className="w-0.5 h-8 bg-blue-500/50 mx-auto" />
                </div>

                {/* Level 2: Department Heads & Staff */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map((dept) => {
                    const deptEmployees = employees.filter((e) => e.departmentId === dept.id);

                    return (
                      <div
                        key={dept.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 relative shadow-md"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                          <div className="p-2.5 bg-blue-950 text-blue-400 rounded-xl border border-blue-800 shrink-0">
                            {getDepartmentIcon(dept.iconName)}
                          </div>
                          <div>
                            <h5 className="text-sm font-extrabold text-white">{dept.name}</h5>
                            <p className="text-[11px] text-blue-400 font-bold">
                              Head: {dept.headOfDepartment}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            Department Team ({deptEmployees.length})
                          </span>

                          {deptEmployees.length > 0 ? (
                            <div className="space-y-1.5">
                              {deptEmployees.map((emp) => (
                                <div
                                  key={emp.id}
                                  onClick={() => setSelectedEmployee(emp)}
                                  className="bg-slate-950/80 hover:bg-slate-800/80 p-2 rounded-xl border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-xs cursor-pointer transition-all"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={emp.imageUrl}
                                      alt={emp.fullName}
                                      className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                                    />
                                    <div>
                                      <p className="font-extrabold text-white text-xs">{emp.fullName}</p>
                                      <p className="text-[10px] text-slate-400">{emp.designation}</p>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                    {emp.highestQualification}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">No staff assigned yet.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-950 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Institutional Directory • Verified Personnel Data</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl transition-all cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>

      {/* DETAILED EMPLOYEE PROFILE MODAL / DRAWER OVERLAY */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex justify-center items-center p-3 sm:p-6 overflow-y-auto animate-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 relative">
            
            {/* Profile Header Banner */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800 relative">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative shrink-0">
                  {selectedEmployee.imageUrl ? (
                    <img
                      src={selectedEmployee.imageUrl}
                      alt={selectedEmployee.fullName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-500 shadow-xl shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = (e.target as HTMLImageElement).nextElementSibling;
                        if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 border-2 border-blue-500/50 flex flex-col items-center justify-center text-blue-300 font-black shadow-xl shrink-0 ${
                      selectedEmployee.imageUrl ? 'hidden' : 'flex'
                    }`}
                  >
                    <User className="w-10 h-10 text-blue-400 mb-1" />
                    <span className="text-xs tracking-wider font-extrabold">{getInitials(selectedEmployee.fullName)}</span>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-xs font-black bg-blue-900 text-blue-300 px-3 py-0.5 rounded-full border border-blue-700">
                      {selectedEmployee.employeeId}
                    </span>
                    <span
                      className={`text-xs font-black px-3 py-0.5 rounded-full border ${
                        selectedEmployee.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : selectedEmployee.status === 'On Leave'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Status: {selectedEmployee.status}
                    </span>
                    <span className="text-xs font-bold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                      {selectedEmployee.employeeType}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white pt-1">
                    {selectedEmployee.fullName}
                  </h3>
                  <p className="text-sm font-extrabold text-blue-400">
                    {selectedEmployee.designation}
                  </p>
                  <p className="text-xs font-bold text-slate-300">
                    {selectedEmployee.departmentName}
                  </p>

                  <p className="text-xs text-slate-400 pt-1 flex items-center justify-center sm:justify-start gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Joined: {selectedEmployee.joiningDate} • {selectedEmployee.experienceYears} Years Exp.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Official Contact & Work Location Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Official Email</span>
                  </div>
                  <p className="text-xs text-white font-semibold truncate">
                    {selectedEmployee.officialEmail || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                    <Phone className="w-4 h-4" />
                    <span>Official Helpline</span>
                  </div>
                  <p className="text-xs text-white font-semibold truncate">
                    {selectedEmployee.officialPhone || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>Office Location</span>
                  </div>
                  <p className="text-xs text-white font-semibold truncate">
                    {selectedEmployee.officeLocation || 'Main Campus'}
                  </p>
                </div>
              </div>

              {/* Biography Section */}
              {selectedEmployee.biography && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Professional Overview</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                    {selectedEmployee.biography}
                  </p>
                </div>
              )}

              {/* Education Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Educational Qualifications</span>
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {selectedEmployee.education && selectedEmployee.education.length > 0 ? (
                    selectedEmployee.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                            <BadgeCheck className="w-4 h-4 text-emerald-400" />
                            <span>{edu.degree}</span>
                          </h5>
                          {edu.fieldOfStudy && (
                            <p className="text-[11px] font-semibold text-blue-300 pl-5">
                              {edu.fieldOfStudy}
                            </p>
                          )}
                          <p className="text-[11px] text-slate-400 pl-5">
                            Institution: <span className="text-slate-200 font-medium">{edu.institution}</span>
                          </p>
                        </div>

                        <span className="text-[11px] font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-800 shrink-0">
                          {edu.year}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                      Highest Qualification: {selectedEmployee.highestQualification}
                    </div>
                  )}
                </div>
              </div>

              {/* Certifications & Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Certifications */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>Certifications</span>
                  </h4>

                  <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    {selectedEmployee.certifications && selectedEmployee.certifications.length > 0 ? (
                      selectedEmployee.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No certifications listed.</p>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>Skills & Expertise</span>
                  </h4>

                  <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 flex flex-wrap gap-1.5">
                    {selectedEmployee.skills && selectedEmployee.skills.length > 0 ? (
                      selectedEmployee.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-950/80 text-blue-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-blue-800"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No skills listed.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Responsibilities */}
              {selectedEmployee.responsibilities && selectedEmployee.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Key Institutional Responsibilities</span>
                  </h4>

                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                    {selectedEmployee.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Footer */}
            <div className="bg-slate-950 border-t border-slate-800 px-6 py-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Official Staff Record • Public Professional View
              </span>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
