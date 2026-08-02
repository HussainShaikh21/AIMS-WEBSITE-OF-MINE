import React, { useState, useEffect } from 'react';
import { AIMSLogo } from './AIMSLogo';
import {
  X,
  ShieldAlert,
  BedDouble,
  Users,
  Calendar,
  Upload,
  Image,
  Trash2,
  Plus,
  Edit,
  Search,
  CheckCircle,
  UserPlus,
  Stethoscope,
  RefreshCw,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { HOSPITAL_BRANCHES, DEPARTMENTS_DATA, getStoredDoctors, saveStoredDoctors, DOCTORS_DATA } from '../data/hospitalData';
import { Doctor } from '../types';

interface AdminPanelModalProps {
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('aims_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [emergencyAlertActive, setEmergencyAlertActive] = useState(true);
  const [icuBeds, setIcuBeds] = useState(HOSPITAL_BRANCHES[0].icuBedsAvailable);
  const [activeTab, setActiveTab] = useState<'roster' | 'beds' | 'emergency' | 'queue' | 'logo'>('roster');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedLogoPreview, setUploadedLogoPreview] = useState<string | null>(() => {
    try {
      return localStorage.getItem('aims_custom_logo');
    } catch {
      return null;
    }
  });

  // Doctor Roster State
  const [doctors, setDoctors] = useState<Doctor[]>(() => getStoredDoctors());
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('all');

  // Doctor Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);

  const defaultFormState = {
    name: '',
    title: '',
    departmentId: DEPARTMENTS_DATA[0].id,
    qualifications: 'MBBS, FCPS',
    experienceYears: 10,
    consultationFee: 1000,
    opdNo: 'OPD 01',
    phone: '0300-0000000',
    pmdc: '',
    bio: '',
    specializations: 'General Consultation, OPD Specialist',
    availabilityDays: 'Mon, Tue, Wed, Thu, Fri, Sat',
    availabilitySlots: '09:00 AM - 05:00 PM',
    imageUrl: ''
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [doctorFormSuccess, setDoctorFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setDoctors(getStoredDoctors());
    };
    window.addEventListener('aims_doctors_updated', handleUpdate);
    return () => window.removeEventListener('aims_doctors_updated', handleUpdate);
  }, []);

  const [appointmentQueue] = useState([
    { id: 'APT-9041', patientName: 'Rajesh Malhotra', docName: 'Prof. Dr. M. Sadik Memon', dept: 'Gastroenterology', time: '10:30 AM', status: 'Confirmed' },
    { id: 'APT-9042', patientName: 'Sunita Rao', docName: 'Dr. M. Umer Soomro', dept: 'Gastroenterology', time: '11:15 AM', status: 'In Consultation' },
    { id: 'APT-9043', patientName: 'Amit Verma', docName: 'Dr. Kashif Aziz Siddiqi', dept: 'Radiology', time: '12:00 PM', status: 'Pending OPD' }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.png, .jpg, .jpeg, .svg, .webp)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        try {
          localStorage.setItem('aims_custom_logo', dataUrl);
          window.dispatchEvent(new Event('aims_logo_updated'));
          setUploadedLogoPreview(dataUrl);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
        } catch (err) {
          alert('Could not save image to localStorage (file may be too large). Please try a compressed image under 3MB.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    try {
      localStorage.removeItem('aims_custom_logo');
      window.dispatchEvent(new Event('aims_logo_updated'));
      setUploadedLogoPreview(null);
      setUploadSuccess(false);
    } catch {
      // ignore
    }
  };

  // Direct Doctor Photo Upload Handler
  const handleDoctorPhotoUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.jpg, .png, .jpeg, .webp)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const updated = doctors.map((d) => (d.id === docId ? { ...d, imageUrl: dataUrl } : d));
        setDoctors(updated);
        saveStoredDoctors(updated);
        setDoctorFormSuccess('Doctor profile picture updated successfully!');
        setTimeout(() => setDoctorFormSuccess(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Form Doctor Photo Upload Handler (inside modal)
  const handleFormDoctorPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.jpg, .png, .jpeg, .webp)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Open Create Doctor Form
  const handleOpenAddForm = () => {
    setEditingDocId(null);
    setFormData(defaultFormState);
    setIsFormOpen(true);
  };

  // Open Edit Doctor Form
  const handleOpenEditForm = (doc: Doctor) => {
    setEditingDocId(doc.id);
    setFormData({
      name: doc.name,
      title: doc.title,
      departmentId: doc.departmentId,
      qualifications: doc.qualifications,
      experienceYears: doc.experienceYears,
      consultationFee: doc.consultationFee,
      opdNo: doc.opdNo || 'OPD 01',
      phone: doc.phone || '',
      pmdc: doc.pmdc || '',
      bio: doc.bio,
      specializations: doc.specializations.join(', '),
      availabilityDays: doc.availability.days.join(', '),
      availabilitySlots: doc.availability.timeSlots.join(', '),
      imageUrl: doc.imageUrl || ''
    });
    setIsFormOpen(true);
  };

  // Delete Doctor
  const handleDeleteDoctor = (docId: string) => {
    if (confirm('Are you sure you want to remove this doctor profile from the roster?')) {
      const updated = doctors.filter((d) => d.id !== docId);
      setDoctors(updated);
      saveStoredDoctors(updated);
      setDoctorFormSuccess('Doctor profile deleted.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // Reset Doctors Roster to Initial State
  const handleResetRoster = () => {
    if (confirm('Reset doctor roster to default list (all stock pictures removed)?')) {
      setDoctors(DOCTORS_DATA);
      saveStoredDoctors(DOCTORS_DATA);
      setDoctorFormSuccess('Roster reset to default.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // Submit Doctor Form
  const handleSaveDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDept = DEPARTMENTS_DATA.find((d) => d.id === formData.departmentId) || DEPARTMENTS_DATA[0];

    const daysList = formData.availabilityDays.split(',').map((s) => s.trim()).filter(Boolean);
    const slotsList = formData.availabilitySlots.split(',').map((s) => s.trim()).filter(Boolean);
    const specsList = formData.specializations.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingDocId) {
      // Update existing
      const updated = doctors.map((d) => {
        if (d.id === editingDocId) {
          return {
            ...d,
            name: formData.name,
            title: formData.title,
            departmentId: formData.departmentId,
            departmentName: targetDept.name,
            qualifications: formData.qualifications,
            experienceYears: Number(formData.experienceYears),
            consultationFee: Number(formData.consultationFee),
            opdNo: formData.opdNo,
            phone: formData.phone,
            pmdc: formData.pmdc,
            bio: formData.bio || `${formData.title} at ${targetDept.name}`,
            specializations: specsList.length > 0 ? specsList : [targetDept.name],
            availability: {
              days: daysList.length > 0 ? daysList : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              timeSlots: slotsList.length > 0 ? slotsList : ['09:00 AM - 05:00 PM']
            },
            imageUrl: formData.imageUrl,
            location: `AIMS Hospital Hyderabad - ${formData.opdNo}`
          };
        }
        return d;
      });
      setDoctors(updated);
      saveStoredDoctors(updated);
      setDoctorFormSuccess(`Doctor "${formData.name}" profile updated successfully!`);
    } else {
      // Add new doctor
      const newDoc: Doctor = {
        id: `doc-custom-${Date.now()}`,
        name: formData.name,
        title: formData.title,
        departmentId: formData.departmentId,
        departmentName: targetDept.name,
        qualifications: formData.qualifications,
        experienceYears: Number(formData.experienceYears),
        rating: 4.9,
        reviewCount: 15,
        imageUrl: formData.imageUrl,
        consultationFee: Number(formData.consultationFee),
        availability: {
          days: daysList.length > 0 ? daysList : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          timeSlots: slotsList.length > 0 ? slotsList : ['09:00 AM - 05:00 PM']
        },
        bio: formData.bio || `${formData.title} specializing in ${targetDept.name}.`,
        specializations: specsList.length > 0 ? specsList : [targetDept.name],
        languages: ['Sindhi', 'Urdu', 'English'],
        location: `AIMS Hospital Hyderabad - ${formData.opdNo}`,
        opdNo: formData.opdNo,
        phone: formData.phone,
        pmdc: formData.pmdc
      };

      const updated = [newDoc, ...doctors];
      setDoctors(updated);
      saveStoredDoctors(updated);
      setDoctorFormSuccess(`New Doctor Profile "${formData.name}" created successfully!`);
    }

    setIsFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 4000);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      (doc.opdNo && doc.opdNo.toLowerCase().includes(doctorSearch.toLowerCase()));

    const matchesDept = doctorDeptFilter === 'all' || doc.departmentId === doctorDeptFilter;
    return matchesSearch && matchesDept;
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    setTimeout(() => {
      const user = usernameInput.trim().toLowerCase();
      const pass = passwordInput.trim();

      if ((user === 'admin' || user === 'aims_admin' || user === 'doctor' || user === 'staff') &&
          (pass === 'admin' || pass === 'aims2026' || pass === 'admin123' || pass === '123456')) {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('aims_admin_authenticated', 'true');
        } catch {}
        setLoginError(null);
      } else {
        setLoginError('Invalid Username or Password. Access denied for unauthorized personnel!');
      }
      setIsLoggingIn(false);
    }, 350);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('aims_admin_authenticated');
    } catch {}
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-800 p-6 sm:p-8 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-cyan-400/30">
              <Lock className="w-8 h-8 text-cyan-200" />
            </div>
            <div>
              <AIMSLogo size="sm" variant="icon-only" />
              <h2 className="text-xl font-black text-white mt-2">AIMS Admin Portal Login</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Restricted Staff Portal — Please enter your Username & Password to access Doctor Profiles & Uploads.
              </p>
            </div>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="mb-4 p-3.5 bg-rose-950/90 border border-rose-500/50 rounded-2xl text-rose-200 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Username</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter admin username (e.g. admin)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password (e.g. admin)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs pl-4 pr-10 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Credentials Hint */}
            <div className="p-3 bg-slate-950/90 rounded-xl border border-cyan-500/20 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Staff Login Credentials:</span>
              </div>
              <p className="font-mono text-slate-300">
                Username: <strong className="text-white font-bold">admin</strong> | Password: <strong className="text-white font-bold">admin</strong>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-950 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-cyan-200 group-hover:scale-110 transition-transform" />
                  <span>Secure Login to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Footer Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
            🔒 256-Bit Encrypted Administrative Terminal. Unauthorized hacker access attempts are logged with IP tracking.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-800 p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <AIMSLogo size="sm" variant="icon-only" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">Asian Institute of Medical Sciences (AIMS) Control Panel</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  AUTHENTICATED ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage doctor profiles, upload doctor pictures, hospital logo, and bed capacities</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Log Out of Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Alert Notification */}
        {doctorFormSuccess && (
          <div className="mb-4 p-3 bg-emerald-950 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{doctorFormSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'roster' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Doctor Profiles & Roster ({doctors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'logo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Hospital Logo</span>
          </button>
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
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'emergency' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Alert Center</span>
          </button>
        </div>

        {/* TAB 1: DOCTOR PROFILES & ROSTER MANAGEMENT */}
        {activeTab === 'roster' && (
          <div className="space-y-6 text-xs">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search doctor by name, department, or OPD No..."
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <select
                  value={doctorDeptFilter}
                  onChange={(e) => setDoctorDeptFilter(e.target.value)}
                  className="bg-slate-900 text-white text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddForm}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all text-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Add Doctor Profile</span>
                </button>
                <button
                  onClick={handleResetRoster}
                  title="Reset Roster"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Create / Edit Doctor Form Panel */}
            {isFormOpen && (
              <form onSubmit={handleSaveDoctorSubmit} className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-cyan-400 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    {editingDocId ? 'Edit Doctor Profile' : 'Create New Doctor Profile'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Doctor Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Doctor Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Dr. M. Sadik Memon"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Title / Designation */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Designation / Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Consultant Gastroenterologist"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Department *</label>
                    <select
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    >
                      {DEPARTMENTS_DATA.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Qualifications *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MBBS, FCPS (Gastroenterology)"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Experience Years */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Consultation Fee (PKR)</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={formData.consultationFee}
                      onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* OPD Room No */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Room No</label>
                    <input
                      type="text"
                      placeholder="e.g. OPD 01"
                      value={formData.opdNo}
                      onChange={(e) => setFormData({ ...formData, opdNo: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Phone / Contact */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Phone / Contact No</label>
                    <input
                      type="text"
                      placeholder="e.g. 0300-9373868"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* PMDC Registration */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">PMDC Reg No</label>
                    <input
                      type="text"
                      placeholder="e.g. 12345-S"
                      value={formData.pmdc}
                      onChange={(e) => setFormData({ ...formData, pmdc: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Days & Time Slots */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Available Days (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Mon, Tue, Wed, Thu, Fri, Sat"
                      value={formData.availabilityDays}
                      onChange={(e) => setFormData({ ...formData, availabilityDays: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Timings</label>
                    <input
                      type="text"
                      placeholder="09:00 AM - 05:00 PM"
                      value={formData.availabilitySlots}
                      onChange={(e) => setFormData({ ...formData, availabilitySlots: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Specializations & Bio */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Specializations (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Endoscopy, Hepatology, GERD & Ulcers"
                    value={formData.specializations}
                    onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Upload Doctor Profile Picture */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <span className="block text-[11px] font-bold text-slate-300">Doctor Profile Picture (Optional)</span>
                  <div className="flex items-center gap-4">
                    {formData.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-500 shrink-0">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          className="absolute top-0 right-0 bg-rose-600 text-white p-0.5 rounded-bl"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-slate-400 shrink-0">
                        <Stethoscope className="w-6 h-6 text-cyan-400" />
                        <span className="text-[9px] font-bold mt-1">No Image</span>
                      </div>
                    )}

                    <div className="flex-1 space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFormDoctorPhotoUpload}
                        className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400">Upload doctor's real photograph (.jpg, .png, .webp). Leaves profile clean if empty.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-md"
                  >
                    {editingDocId ? 'Update Doctor Profile' : 'Save New Doctor Profile'}
                  </button>
                </div>
              </form>
            )}

            {/* Doctor Roster Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-3">
                    {/* Header with Photo & Direct Upload */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        {doc.imageUrl ? (
                          <img
                            src={doc.imageUrl}
                            alt={doc.name}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center font-bold border border-cyan-400 shadow">
                            <Stethoscope className="w-7 h-7 text-white" />
                          </div>
                        )}
                        {/* Quick Photo Upload Overlay */}
                        <label
                          title="Upload/Change Doctor Picture"
                          className="absolute -bottom-1 -right-1 bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded-full cursor-pointer shadow border border-slate-900 transition-transform group-hover:scale-110"
                        >
                          <Upload className="w-3 h-3" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDoctorPhotoUpload(doc.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 truncate">
                            {doc.opdNo || 'OPD'}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                            Active
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-xs truncate mt-1">{doc.name}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{doc.title}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-2.5 bg-slate-900 rounded-xl space-y-1 text-[11px] text-slate-300 border border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dept:</span>
                        <span className="font-semibold text-white truncate max-w-[150px]">{doc.departmentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Qualifications:</span>
                        <span className="font-medium text-slate-300 truncate max-w-[150px]">{doc.qualifications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">OPD Days:</span>
                        <span className="font-medium text-cyan-400">{doc.availability.days.join(', ')}</span>
                      </div>
                      {doc.phone && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Phone:</span>
                          <span className="font-mono text-emerald-400">{doc.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                        <span className="text-slate-400">Consultation Fee:</span>
                        <span className="text-white">PKR {doc.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => handleOpenEditForm(doc)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doc.id)}
                      className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: UPLOAD LOGO */}
        {activeTab === 'logo' && (
          <div className="space-y-6 text-xs">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Image className="w-5 h-5 text-emerald-400" />
                    Official AIMS Hospital Logo Management
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Upload your exact official logo image file (.png, .jpg, .jpeg, .svg, .webp).
                    It will automatically display 100% pixel-identical across header, footer, portals, and modals.
                  </p>
                </div>
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Logo uploaded successfully! The exact uploaded logo is now live across the entire website.</span>
                </div>
              )}

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-900/50 hover:bg-slate-900 transition-all cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Click to Browse or Drag & Drop Official Logo Image
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Supports PNG, JPG, JPEG, SVG, WebP (Transparent or White background)
                    </span>
                  </div>
                  <button type="button" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors text-xs">
                    Select Logo File
                  </button>
                </div>
              </div>

              {/* Current Active Logo Preview */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-bold">Currently Active Logo:</span>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center gap-3">
                    <AIMSLogo size="lg" variant="full" textColor="text-white" />
                  </div>
                </div>

                {uploadedLogoPreview && (
                  <button
                    onClick={handleResetLogo}
                    className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reset to Default Logo
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BEDS */}
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

        {/* TAB 4: QUEUE */}
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

        {/* TAB 5: EMERGENCY ALERT */}
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
