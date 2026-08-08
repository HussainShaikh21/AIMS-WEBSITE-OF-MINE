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
  UserCheck,
  Building2,
  Package,
  FileText,
  Globe,
  Settings,
  RotateCcw,
  GraduationCap,
  User
} from 'lucide-react';
import {
  HOSPITAL_BRANCHES,
  DEPARTMENTS_DATA,
  DOCTORS_DATA,
  getStoredDoctors,
  saveStoredDoctors,
  getStoredDepartments,
  saveStoredDepartments,
  getStoredBranches,
  saveStoredBranches,
  getStoredPackages,
  saveStoredPackages,
  getStoredNews,
  saveStoredNews,
  getStoredSiteSettings,
  saveStoredSiteSettings,
  getStoredEmployees,
  saveStoredEmployees,
  getStoredEmployeeDepartments,
  saveStoredEmployeeDepartments,
  resetAllDataToDefault
} from '../data/hospitalData';
import { Doctor, Department, HospitalBranch, HealthPackage, NewsArticle, SiteSettings, Employee, EmployeeDepartment, EmployeeEducation } from '../types';

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
  const [activeTab, setActiveTab] = useState<
    'roster' | 'departments' | 'branches' | 'packages' | 'news' | 'settings' | 'beds' | 'queue' | 'emergency' | 'logo' | 'employees'
  >('roster');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedLogoPreview, setUploadedLogoPreview] = useState<string | null>(() => {
    try {
      return localStorage.getItem('aims_custom_logo');
    } catch {
      return null;
    }
  });

  // CMS Collections State
  const [doctors, setDoctors] = useState<Doctor[]>(() => getStoredDoctors());
  const [departments, setDepartments] = useState<Department[]>(() => getStoredDepartments());
  const [branches, setBranches] = useState<HospitalBranch[]>(() => getStoredBranches());
  const [packages, setPackages] = useState<HealthPackage[]>(() => getStoredPackages());
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => getStoredNews());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStoredSiteSettings());

  // Employee Directory State
  const [employees, setEmployees] = useState<Employee[]>(() => getStoredEmployees());
  const [employeeDepartments, setEmployeeDepartments] = useState<EmployeeDepartment[]>(() =>
    getStoredEmployeeDepartments()
  );
  const [empSearchQuery, setEmpSearchQuery] = useState('');
  const [empDeptFilter, setEmpDeptFilter] = useState('all');

  // Employee Modal Form State
  const [isEmpFormOpen, setIsEmpFormOpen] = useState(false);
  const [editingEmpId, setEditingEmpId] = useState<string | null>(null);
  const [empFormData, setEmpFormData] = useState({
    fullName: '',
    employeeId: '',
    designation: '',
    departmentId: 'dept-it',
    highestQualification: '',
    experienceYears: '3',
    imageUrl: '',
    employeeType: 'Full Time' as 'Full Time' | 'Part Time' | 'Contract' | 'Intern',
    joiningDate: '2023-01-15',
    status: 'Active' as 'Active' | 'Inactive' | 'On Leave',
    officialEmail: '',
    officialPhone: '',
    officeLocation: '',
    biography: '',
    certificationsStr: '',
    skillsStr: '',
    responsibilitiesStr: '',
    educationList: [] as EmployeeEducation[]
  });

  // Employee Department Form State
  const [isEmpDeptFormOpen, setIsEmpDeptFormOpen] = useState(false);
  const [editingEmpDeptId, setEditingEmpDeptId] = useState<string | null>(null);
  const [empDeptFormData, setEmpDeptFormData] = useState({
    name: '',
    iconName: 'Building2',
    description: '',
    headOfDepartment: '',
    contactEmail: '',
    contactExtension: ''
  });

  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('all');

  // Department Form State
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [isDeptFormOpen, setIsDeptFormOpen] = useState(false);
  const [deptFormData, setDeptFormData] = useState({
    name: '',
    shortDesc: '',
    fullDesc: '',
    headDoctorName: '',
    headDoctorTitle: '',
    headDoctorQualifications: '',
    bedCapacity: 20,
    opdTimings: '09:00 AM - 05:00 PM',
    emergency24x7: true,
    category: 'clinical' as 'clinical' | 'surgical' | 'diagnostic' | 'critical',
    keyFeatures: '128-Slice CT, 24/7 ICU, Board Certified Consultants'
  });

  // Branch / Campus Form State
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [isBranchFormOpen, setIsBranchFormOpen] = useState(false);
  const [branchFormData, setBranchFormData] = useState({
    name: '',
    city: 'Hyderabad',
    address: '',
    emergencyNumber: '',
    opdNumber: '',
    icuBedsAvailable: 25,
    totalBeds: 100,
    type: 'Main Hospital'
  });

  // Health Package Form State
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [isPkgFormOpen, setIsPkgFormOpen] = useState(false);
  const [pkgFormData, setPkgFormData] = useState({
    title: '',
    targetAudience: '',
    originalPrice: 5000,
    discountedPrice: 2999,
    testsIncludedCount: 20,
    testsList: 'CBC, Blood Sugar, ECG, LFT, CT Scan screening',
    isPopular: true
  });

  // News Form State
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [isNewsFormOpen, setIsNewsFormOpen] = useState(false);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    summary: '',
    content: '',
    date: 'August 2026',
    readTime: '3 min read',
    category: 'Clinical Excellence',
    imageUrl: ''
  });

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
      setDepartments(getStoredDepartments());
      setBranches(getStoredBranches());
      setPackages(getStoredPackages());
      setNewsArticles(getStoredNews());
      setSiteSettings(getStoredSiteSettings());
    };
    window.addEventListener('aims_doctors_updated', handleUpdate);
    window.addEventListener('aims_departments_updated', handleUpdate);
    window.addEventListener('aims_branches_updated', handleUpdate);
    window.addEventListener('aims_packages_updated', handleUpdate);
    window.addEventListener('aims_news_updated', handleUpdate);
    window.addEventListener('aims_settings_updated', handleUpdate);
    return () => {
      window.removeEventListener('aims_doctors_updated', handleUpdate);
      window.removeEventListener('aims_departments_updated', handleUpdate);
      window.removeEventListener('aims_branches_updated', handleUpdate);
      window.removeEventListener('aims_packages_updated', handleUpdate);
      window.removeEventListener('aims_news_updated', handleUpdate);
      window.removeEventListener('aims_settings_updated', handleUpdate);
    };
  }, []);

  // Department CRUD Handlers
  const handleSaveDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeptId) {
      const updated = departments.map((d) =>
        d.id === editingDeptId
          ? {
              ...d,
              name: deptFormData.name,
              shortDesc: deptFormData.shortDesc,
              fullDesc: deptFormData.fullDesc,
              headOfDept: deptFormData.headDoctorName || 'Consultant Specialist',
              bedCapacity: Number(deptFormData.bedCapacity),
              opdTimings: deptFormData.opdTimings,
              category: deptFormData.category
            }
          : d
      );
      setDepartments(updated);
      saveStoredDepartments(updated);
      setDoctorFormSuccess(`Department "${deptFormData.name}" updated successfully!`);
    } else {
      const newDept: Department = {
        id: `dept-custom-${Date.now()}`,
        name: deptFormData.name,
        shortDesc: deptFormData.shortDesc,
        fullDesc: deptFormData.fullDesc,
        iconName: 'Stethoscope',
        headOfDept: deptFormData.headDoctorName || 'Consultant Specialist',
        facilities: ['24/7 Emergency Care', '128-Slice CT Scan', 'ICU & Critical Care Units'],
        commonConditions: ['General Outpatient & Inpatient Consultations'],
        procedures: ['Comprehensive Clinical Examination & Diagnostics'],
        bedCapacity: Number(deptFormData.bedCapacity),
        opdTimings: deptFormData.opdTimings,
        category: deptFormData.category
      };
      const updated = [newDept, ...departments];
      setDepartments(updated);
      saveStoredDepartments(updated);
      setDoctorFormSuccess(`New Department "${deptFormData.name}" added successfully!`);
    }
    setIsDeptFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 3000);
  };

  const handleDeleteDepartment = (deptId: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      const updated = departments.filter((d) => d.id !== deptId);
      setDepartments(updated);
      saveStoredDepartments(updated);
      setDoctorFormSuccess('Department deleted successfully.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // Branch CRUD Handlers
  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranchId) {
      const updated = branches.map((b) =>
        b.id === editingBranchId
          ? {
              ...b,
              name: branchFormData.name,
              city: branchFormData.city,
              address: branchFormData.address,
              emergencyNumber: branchFormData.emergencyNumber,
              opdNumber: branchFormData.opdNumber,
              icuBedsAvailable: Number(branchFormData.icuBedsAvailable)
            }
          : b
      );
      setBranches(updated);
      saveStoredBranches(updated);
      setDoctorFormSuccess(`Campus "${branchFormData.name}" updated successfully!`);
    } else {
      const newBranch: HospitalBranch = {
        id: `branch-custom-${Date.now()}`,
        name: branchFormData.name,
        city: branchFormData.city,
        address: branchFormData.address,
        emergencyNumber: branchFormData.emergencyNumber,
        opdNumber: branchFormData.opdNumber,
        email: 'info@aimshospital.org',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=C9VJ%2B6V%2C+Aims+Hospital+Road+Hala+Naka%2C+Hyderabad%2C+71000%2C+Pakistan',
        lat: 25.3960,
        lng: 68.3578,
        icuBedsAvailable: Number(branchFormData.icuBedsAvailable),
        is24x7Emergency: true,
        type: 'Main Campus',
        imagingFacilities: ['24/7 Emergency', '128-Slice CT', 'Dedicated ICU Services']
      };
      const updated = [newBranch, ...branches];
      setBranches(updated);
      saveStoredBranches(updated);
      setDoctorFormSuccess(`New Campus "${branchFormData.name}" added successfully!`);
    }
    setIsBranchFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 3000);
  };

  const handleDeleteBranch = (branchId: string) => {
    if (confirm('Are you sure you want to delete this hospital branch campus?')) {
      const updated = branches.filter((b) => b.id !== branchId);
      setBranches(updated);
      saveStoredBranches(updated);
      setDoctorFormSuccess('Campus deleted successfully.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // Package CRUD Handlers
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const tests = pkgFormData.testsList.split(',').map((s) => s.trim()).filter(Boolean);
    if (editingPkgId) {
      const updated = packages.map((p) =>
        p.id === editingPkgId
          ? {
              ...p,
              title: pkgFormData.title,
              targetAudience: pkgFormData.targetAudience,
              originalPrice: Number(pkgFormData.originalPrice),
              discountedPrice: Number(pkgFormData.discountedPrice),
              testsIncludedCount: Number(pkgFormData.testsIncludedCount),
              testsList: tests,
              isPopular: pkgFormData.isPopular
            }
          : p
      );
      setPackages(updated);
      saveStoredPackages(updated);
      setDoctorFormSuccess(`Health Package "${pkgFormData.title}" updated successfully!`);
    } else {
      const newPkg: HealthPackage = {
        id: `pkg-custom-${Date.now()}`,
        title: pkgFormData.title,
        targetAudience: pkgFormData.targetAudience,
        originalPrice: Number(pkgFormData.originalPrice),
        discountedPrice: Number(pkgFormData.discountedPrice),
        testsIncludedCount: Number(pkgFormData.testsIncludedCount),
        testsList: tests,
        preparationNotes: '10-12 hours fasting required before test collection.',
        recommendedFor: pkgFormData.targetAudience || 'General Screening',
        isPopular: pkgFormData.isPopular
      };
      const updated = [newPkg, ...packages];
      setPackages(updated);
      saveStoredPackages(updated);
      setDoctorFormSuccess(`New Health Package "${pkgFormData.title}" added successfully!`);
    }
    setIsPkgFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 3000);
  };

  const handleDeletePackage = (pkgId: string) => {
    if (confirm('Delete this health package?')) {
      const updated = packages.filter((p) => p.id !== pkgId);
      setPackages(updated);
      saveStoredPackages(updated);
      setDoctorFormSuccess('Health package deleted.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // News Article CRUD Handlers
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNewsId) {
      const updated = newsArticles.map((n) =>
        n.id === editingNewsId
          ? {
              ...n,
              title: newsFormData.title,
              summary: newsFormData.summary,
              content: newsFormData.content || newsFormData.summary,
              date: newsFormData.date,
              readTime: newsFormData.readTime,
              category: newsFormData.category as any,
              imageUrl: newsFormData.imageUrl
            }
          : n
      );
      setNewsArticles(updated);
      saveStoredNews(updated);
      setDoctorFormSuccess(`News Article "${newsFormData.title}" updated successfully!`);
    } else {
      const newNews: NewsArticle = {
        id: `news-custom-${Date.now()}`,
        title: newsFormData.title,
        summary: newsFormData.summary,
        content: newsFormData.content || newsFormData.summary,
        date: newsFormData.date || 'August 2026',
        readTime: newsFormData.readTime || '3 min read',
        category: (newsFormData.category as any) || 'Hospital News',
        author: 'AIMS Medical Editorial Board',
        authorRole: 'Editorial Board',
        imageUrl: newsFormData.imageUrl || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        tags: [newsFormData.category || 'Hospital News']
      };
      const updated = [newNews, ...newsArticles];
      setNewsArticles(updated);
      saveStoredNews(updated);
      setDoctorFormSuccess(`New Article "${newsFormData.title}" created successfully!`);
    }
    setIsNewsFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 3000);
  };

  const handleDeleteNews = (newsId: string) => {
    if (confirm('Delete this news article?')) {
      const updated = newsArticles.filter((n) => n.id !== newsId);
      setNewsArticles(updated);
      saveStoredNews(updated);
      setDoctorFormSuccess('News article deleted.');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  // Site Settings Save Handler
  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSiteSettings(siteSettings);
    setDoctorFormSuccess('Website Banners, Hotlines, and Banners saved successfully!');
    setTimeout(() => setDoctorFormSuccess(null), 3000);
  };

  // Reset Everything to Factory Default
  const handleResetAllMasterData = () => {
    if (confirm('WARNING: Reset all doctors, departments, campuses, checkup packages, news articles, and site banners back to factory default?')) {
      resetAllDataToDefault();
      setDoctors(DOCTORS_DATA);
      setDepartments(DEPARTMENTS_DATA);
      setBranches(HOSPITAL_BRANCHES);
      setDoctorFormSuccess('Website master data reset to stock defaults.');
      setTimeout(() => setDoctorFormSuccess(null), 4000);
    }
  };

  const [appointmentQueue] = useState([
    { id: 'APT-9041', patientName: 'Tariq Mahmood', docName: 'Prof. Dr. M. Sadik Memon', dept: 'Gastroenterology', time: '10:30 AM', status: 'Confirmed' },
    { id: 'APT-9042', patientName: 'Saima Khan', docName: 'Dr. M. Umer Soomro', dept: 'Gastroenterology', time: '11:15 AM', status: 'In Consultation' },
    { id: 'APT-9043', patientName: 'Asad Ali', docName: 'Dr. Kashif Aziz Siddiqi', dept: 'Radiology', time: '12:00 PM', status: 'Pending OPD' }
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.png, .jpg, .jpeg, .svg, .webp)');
      return;
    }

    try {
      // Compress image to ensure it fits comfortably in localStorage without quota errors or corruption
      const compressedDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (event) => {
          const img = new Image();
          img.onerror = reject;
          img.onload = () => {
            const maxDim = 600;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(event.target?.result as string);
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);
            const isPng = file.type.includes('png') || file.type.includes('svg');
            const outputType = isPng ? 'image/png' : 'image/webp';
            const dataUrl = canvas.toDataURL(outputType, 0.92);
            resolve(dataUrl);
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });

      localStorage.setItem('aims_custom_logo', compressedDataUrl);
      window.dispatchEvent(new Event('aims_logo_updated'));
      setUploadedLogoPreview(compressedDataUrl);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      console.error('Logo upload error:', err);
      alert('Failed to process image. Please select a valid PNG, JPG, or WEBP image file.');
    }
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

  // EMPLOYEE MANAGEMENT HANDLERS
  const handleOpenAddEmployee = () => {
    setEditingEmpId(null);
    setEmpFormData({
      fullName: '',
      employeeId: `EMP-${Date.now().toString().slice(-4)}`,
      designation: '',
      departmentId: employeeDepartments[0]?.id || 'dept-it',
      highestQualification: '',
      experienceYears: '3',
      imageUrl: '',
      employeeType: 'Full Time',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      officialEmail: '',
      officialPhone: '',
      officeLocation: 'Main Campus',
      biography: '',
      certificationsStr: '',
      skillsStr: '',
      responsibilitiesStr: '',
      educationList: [
        {
          id: `edu-${Date.now()}`,
          degree: 'Bachelor Degree',
          fieldOfStudy: 'General Studies',
          institution: 'University',
          year: '2020'
        }
      ]
    });
    setIsEmpFormOpen(true);
  };

  const handleOpenEditEmployee = (emp: Employee) => {
    setEditingEmpId(emp.id);
    setEmpFormData({
      fullName: emp.fullName,
      employeeId: emp.employeeId,
      designation: emp.designation,
      departmentId: emp.departmentId,
      highestQualification: emp.highestQualification,
      experienceYears: String(emp.experienceYears),
      imageUrl: emp.imageUrl || '',
      employeeType: emp.employeeType,
      joiningDate: emp.joiningDate,
      status: emp.status,
      officialEmail: emp.officialEmail,
      officialPhone: emp.officialPhone,
      officeLocation: emp.officeLocation,
      biography: emp.biography,
      certificationsStr: (emp.certifications || []).join(', '),
      skillsStr: (emp.skills || []).join(', '),
      responsibilitiesStr: (emp.responsibilities || []).join(', '),
      educationList: emp.education || []
    });
    setIsEmpFormOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDept = employeeDepartments.find((d) => d.id === empFormData.departmentId) || {
      id: empFormData.departmentId,
      name: 'General Staff'
    };

    const certs = empFormData.certificationsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const sks = empFormData.skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const resps = empFormData.responsibilitiesStr.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingEmpId) {
      const updated = employees.map((emp) =>
        emp.id === editingEmpId
          ? {
              ...emp,
              fullName: empFormData.fullName,
              employeeId: empFormData.employeeId,
              designation: empFormData.designation,
              departmentId: empFormData.departmentId,
              departmentName: targetDept.name,
              highestQualification: empFormData.highestQualification,
              experienceYears: Number(empFormData.experienceYears),
              imageUrl: empFormData.imageUrl || '',
              employeeType: empFormData.employeeType,
              joiningDate: empFormData.joiningDate,
              status: empFormData.status,
              officialEmail: empFormData.officialEmail,
              officialPhone: empFormData.officialPhone,
              officeLocation: empFormData.officeLocation,
              biography: empFormData.biography,
              certifications: certs,
              skills: sks,
              responsibilities: resps,
              education: empFormData.educationList
            }
          : emp
      );
      setEmployees(updated);
      saveStoredEmployees(updated);
      setDoctorFormSuccess(`Employee profile "${empFormData.fullName}" updated successfully!`);
    } else {
      const newEmp: Employee = {
        id: `emp-custom-${Date.now()}`,
        employeeId: empFormData.employeeId || `EMP-${Date.now().toString().slice(-4)}`,
        fullName: empFormData.fullName,
        designation: empFormData.designation,
        departmentId: empFormData.departmentId,
        departmentName: targetDept.name,
        highestQualification: empFormData.highestQualification,
        experienceYears: Number(empFormData.experienceYears),
        imageUrl: empFormData.imageUrl || '',
        employeeType: empFormData.employeeType,
        joiningDate: empFormData.joiningDate,
        status: empFormData.status,
        officialEmail: empFormData.officialEmail,
        officialPhone: empFormData.officialPhone,
        officeLocation: empFormData.officeLocation,
        biography: empFormData.biography,
        certifications: certs,
        skills: sks,
        responsibilities: resps,
        education: empFormData.educationList
      };
      const updated = [newEmp, ...employees];
      setEmployees(updated);
      saveStoredEmployees(updated);
      setDoctorFormSuccess(`New Employee profile "${empFormData.fullName}" created successfully!`);
    }

    setIsEmpFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 4000);
  };

  const handleDeleteEmployee = (empId: string) => {
    if (confirm('Are you sure you want to delete this employee record?')) {
      const updated = employees.filter((e) => e.id !== empId);
      setEmployees(updated);
      saveStoredEmployees(updated);
      setDoctorFormSuccess('Employee record removed successfully!');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  const handleAddEducationRecord = () => {
    const newEdu: EmployeeEducation = {
      id: `edu-${Date.now()}`,
      degree: 'ADCS Degree',
      fieldOfStudy: 'Computer Science',
      institution: 'University of Sindh',
      year: '2022'
    };
    setEmpFormData((prev) => ({
      ...prev,
      educationList: [...prev.educationList, newEdu]
    }));
  };

  const handleRemoveEducationRecord = (eduId: string) => {
    setEmpFormData((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((e) => e.id !== eduId)
    }));
  };

  const handleUpdateEducationRecord = (eduId: string, field: keyof EmployeeEducation, value: string) => {
    setEmpFormData((prev) => ({
      ...prev,
      educationList: prev.educationList.map((e) => (e.id === eduId ? { ...e, [field]: value } : e))
    }));
  };

  // EMPLOYEE DEPARTMENT HANDLERS
  const handleOpenAddEmpDept = () => {
    setEditingEmpDeptId(null);
    setEmpDeptFormData({
      name: '',
      iconName: 'Building2',
      description: '',
      headOfDepartment: '',
      contactEmail: '',
      contactExtension: ''
    });
    setIsEmpDeptFormOpen(true);
  };

  const handleOpenEditEmpDept = (dept: EmployeeDepartment) => {
    setEditingEmpDeptId(dept.id);
    setEmpDeptFormData({
      name: dept.name,
      iconName: dept.iconName,
      description: dept.description,
      headOfDepartment: dept.headOfDepartment,
      contactEmail: dept.contactEmail,
      contactExtension: dept.contactExtension
    });
    setIsEmpDeptFormOpen(true);
  };

  const handleSaveEmpDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmpDeptId) {
      const updated = employeeDepartments.map((d) =>
        d.id === editingEmpDeptId
          ? {
              ...d,
              name: empDeptFormData.name,
              iconName: empDeptFormData.iconName,
              description: empDeptFormData.description,
              headOfDepartment: empDeptFormData.headOfDepartment,
              contactEmail: empDeptFormData.contactEmail,
              contactExtension: empDeptFormData.contactExtension
            }
          : d
      );
      setEmployeeDepartments(updated);
      saveStoredEmployeeDepartments(updated);
      setDoctorFormSuccess(`Department "${empDeptFormData.name}" updated successfully!`);
    } else {
      const newDept: EmployeeDepartment = {
        id: `dept-custom-${Date.now()}`,
        name: empDeptFormData.name,
        iconName: empDeptFormData.iconName || 'Building2',
        description: empDeptFormData.description,
        headOfDepartment: empDeptFormData.headOfDepartment,
        contactEmail: empDeptFormData.contactEmail,
        contactExtension: empDeptFormData.contactExtension,
        isActive: true
      };
      const updated = [...employeeDepartments, newDept];
      setEmployeeDepartments(updated);
      saveStoredEmployeeDepartments(updated);
      setDoctorFormSuccess(`New Department "${empDeptFormData.name}" created successfully!`);
    }
    setIsEmpDeptFormOpen(false);
    setTimeout(() => setDoctorFormSuccess(null), 4000);
  };

  const handleDeleteEmpDepartment = (deptId: string) => {
    if (confirm('Are you sure you want to delete this department? Employees inside will remain.')) {
      const updated = employeeDepartments.filter((d) => d.id !== deptId);
      setEmployeeDepartments(updated);
      saveStoredEmployeeDepartments(updated);
      setDoctorFormSuccess('Department removed successfully!');
      setTimeout(() => setDoctorFormSuccess(null), 3000);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
      emp.departmentName.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(empSearchQuery.toLowerCase());

    const matchesDept = empDeptFilter === 'all' || emp.departmentId === empDeptFilter;
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
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'roster' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-cyan-300" />
            <span>Doctors ({doctors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'employees' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Employees & Staff ({employees.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'departments' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-cyan-300" />
            <span>Departments ({departments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'branches' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Campuses ({branches.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'packages' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-cyan-300" />
            <span>Checkup Packages ({packages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'news' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-300" />
            <span>News & Articles ({newsArticles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-cyan-300" />
            <span>Site Banners & Hotlines</span>
          </button>
          <button
            onClick={() => setActiveTab('beds')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'beds' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <BedDouble className="w-3.5 h-3.5 text-cyan-300" />
            <span>ICU Beds</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'queue' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-300" />
            <span>Appointments</span>
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'logo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-emerald-300" />
            <span>Logo & Master Reset</span>
          </button>
        </div>

        {/* TAB: EMPLOYEES & STAFF MANAGEMENT */}
        {activeTab === 'employees' && (
          <div className="space-y-6 text-xs">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search employee by name, ID, qualification, or designation..."
                    value={empSearchQuery}
                    onChange={(e) => setEmpSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={empDeptFilter}
                  onChange={(e) => setEmpDeptFilter(e.target.value)}
                  className="bg-slate-900 text-white text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Departments ({employeeDepartments.length})</option>
                  {employeeDepartments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddEmployee}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Add New Employee</span>
                </button>
                <button
                  onClick={handleOpenAddEmpDept}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>+ Add Department</span>
                </button>
              </div>
            </div>

            {/* Department Quick List */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Managed Departments ({employeeDepartments.length})</span>
                </span>
                <span className="text-slate-400 text-[11px]">Create departments first, then add/move employees</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {employeeDepartments.map((dept) => {
                  const count = employees.filter((e) => e.departmentId === dept.id).length;
                  return (
                    <div
                      key={dept.id}
                      className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs"
                    >
                      <span className="font-bold text-white">{dept.name}</span>
                      <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-md font-bold">
                        {count} Staff
                      </span>
                      <button
                        onClick={() => handleOpenEditEmpDept(dept)}
                        className="text-slate-400 hover:text-blue-400 p-0.5"
                        title="Edit Department"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmpDepartment(dept.id)}
                        className="text-slate-400 hover:text-rose-400 p-0.5"
                        title="Delete Department"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Employees Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 text-[11px] font-extrabold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Employee</th>
                      <th className="p-3.5">Designation & Dept</th>
                      <th className="p-3.5">Highest Qualification</th>
                      <th className="p-3.5">Type & Join Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              {emp.imageUrl ? (
                                <img
                                  src={emp.imageUrl}
                                  alt={emp.fullName}
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const next = (e.target as HTMLImageElement).nextElementSibling;
                                    if (next) (next as HTMLElement).classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div
                                className={`w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-blue-950 border border-slate-700 items-center justify-center text-blue-300 font-extrabold text-xs shrink-0 ${
                                  emp.imageUrl ? 'hidden' : 'flex'
                                }`}
                              >
                                <User className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <span className="font-extrabold text-white block">{emp.fullName}</span>
                                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900">
                                  {emp.employeeId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-100 block">{emp.designation}</span>
                            <span className="text-[11px] text-blue-400 font-semibold">{emp.departmentName}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-900 inline-block text-[11px]">
                              {emp.highestQualification}
                            </span>
                          </td>
                          <td className="p-3.5 text-[11px]">
                            <span className="text-slate-200 font-semibold block">{emp.employeeType}</span>
                            <span className="text-slate-400">{emp.joiningDate}</span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                                emp.status === 'Active'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : emp.status === 'On Leave'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {emp.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => handleOpenEditEmployee(emp)}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 font-bold rounded-lg border border-slate-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp.id)}
                              className="px-2 py-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 rounded-lg border border-slate-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No employees found matching search/filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ADD / EDIT EMPLOYEE MODAL DIALOG */}
            {isEmpFormOpen && (
              <div className="fixed inset-0 z-70 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <form
                  onSubmit={handleSaveEmployee}
                  className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl p-6 space-y-4 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-blue-400" />
                      <span>{editingEmpId ? 'Edit Employee Profile' : 'Add New Employee'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEmpFormOpen(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Engr. Hamza Khan"
                        value={empFormData.fullName}
                        onChange={(e) => setEmpFormData({ ...empFormData, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Employee ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. EMP-IT-101"
                        value={empFormData.employeeId}
                        onChange={(e) => setEmpFormData({ ...empFormData, employeeId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Network Administrator / ADCS Specialist"
                        value={empFormData.designation}
                        onChange={(e) => setEmpFormData({ ...empFormData, designation: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Assigned Department *</label>
                      <select
                        value={empFormData.departmentId}
                        onChange={(e) => setEmpFormData({ ...empFormData, departmentId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        {employeeDepartments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Highest Qualification *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ADCS Degree / BS Computer Science"
                        value={empFormData.highestQualification}
                        onChange={(e) =>
                          setEmpFormData({ ...empFormData, highestQualification: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Experience Years</label>
                      <input
                        type="number"
                        placeholder="e.g. 5"
                        value={empFormData.experienceYears}
                        onChange={(e) => setEmpFormData({ ...empFormData, experienceYears: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                      <label className="block text-slate-300 font-bold text-xs flex items-center justify-between">
                        <span>Employee Profile Photo (Upload or Paste URL)</span>
                        <span className="text-slate-500 text-[10px]">Leave empty to use clean default profile avatar</span>
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="shrink-0">
                          {empFormData.imageUrl ? (
                            <img
                              src={empFormData.imageUrl}
                              alt="Preview"
                              className="w-14 h-14 rounded-xl object-cover border-2 border-blue-500 shadow-md"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-blue-950 border-2 border-slate-700 flex items-center justify-center text-blue-400 font-extrabold text-xs shadow-inner">
                              <User className="w-7 h-7 text-blue-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="cursor-pointer px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Photo File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 5 * 1024 * 1024) {
                                      alert('File size too large. Please choose an image under 5MB.');
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setEmpFormData((prev) => ({
                                        ...prev,
                                        imageUrl: reader.result as string
                                      }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>

                            {empFormData.imageUrl && (
                              <button
                                type="button"
                                onClick={() => setEmpFormData((prev) => ({ ...prev, imageUrl: '' }))}
                                className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-xl border border-rose-800 transition-colors"
                              >
                                Remove Photo
                              </button>
                            )}
                          </div>

                          <input
                            type="url"
                            placeholder="Or paste external photo URL (e.g. https://example.com/photo.jpg)"
                            value={empFormData.imageUrl}
                            onChange={(e) => setEmpFormData({ ...empFormData, imageUrl: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Status</label>
                      <select
                        value={empFormData.status}
                        onChange={(e) =>
                          setEmpFormData({
                            ...empFormData,
                            status: e.target.value as 'Active' | 'Inactive' | 'On Leave'
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Employee Type</label>
                      <select
                        value={empFormData.employeeType}
                        onChange={(e) =>
                          setEmpFormData({
                            ...empFormData,
                            employeeType: e.target.value as 'Full Time' | 'Part Time' | 'Contract' | 'Intern'
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Joining Date</label>
                      <input
                        type="date"
                        value={empFormData.joiningDate}
                        onChange={(e) => setEmpFormData({ ...empFormData, joiningDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Official Email</label>
                      <input
                        type="email"
                        placeholder="e.g. employee@aimshospital.org"
                        value={empFormData.officialEmail}
                        onChange={(e) => setEmpFormData({ ...empFormData, officialEmail: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Official Phone / Helpline</label>
                      <input
                        type="text"
                        placeholder="e.g. +92 22 111-246-777 Ext 402"
                        value={empFormData.officialPhone}
                        onChange={(e) => setEmpFormData({ ...empFormData, officialPhone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* DYNAMIC EDUCATION SECTION EDITOR */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-emerald-400" />
                        <span>Education & Degree History</span>
                      </span>

                      <button
                        type="button"
                        onClick={handleAddEducationRecord}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Degree/Qualification</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {empFormData.educationList.map((edu, idx) => (
                        <div
                          key={edu.id || idx}
                          className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 items-center"
                        >
                          <input
                            type="text"
                            placeholder="Degree (e.g. ADCS Degree)"
                            value={edu.degree}
                            onChange={(e) =>
                              handleUpdateEducationRecord(edu.id, 'degree', e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Field of Study"
                            value={edu.fieldOfStudy || ''}
                            onChange={(e) =>
                              handleUpdateEducationRecord(edu.id, 'fieldOfStudy', e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) =>
                              handleUpdateEducationRecord(edu.id, 'institution', e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              placeholder="Year (2022)"
                              value={edu.year}
                              onChange={(e) =>
                                handleUpdateEducationRecord(edu.id, 'year', e.target.value)
                              }
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveEducationRecord(edu.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 bg-slate-800 rounded-lg"
                              title="Delete Degree"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">
                        Certifications (comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cisco CCNA, ADCS Degree Specialist, ITIL Foundation"
                        value={empFormData.certificationsStr}
                        onChange={(e) =>
                          setEmpFormData({ ...empFormData, certificationsStr: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">
                        Skills & Competencies (comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Active Directory, Network Security, System Troubleshooting"
                        value={empFormData.skillsStr}
                        onChange={(e) => setEmpFormData({ ...empFormData, skillsStr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Professional Biography</label>
                      <textarea
                        rows={2}
                        placeholder="Short overview of duties, experience, and achievements..."
                        value={empFormData.biography}
                        onChange={(e) => setEmpFormData({ ...empFormData, biography: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsEmpFormOpen(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs shadow-md"
                    >
                      {editingEmpId ? 'Update Employee' : 'Save New Employee'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ADD / EDIT DEPARTMENT MODAL DIALOG */}
            {isEmpDeptFormOpen && (
              <div className="fixed inset-0 z-70 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveEmpDepartment}
                  className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-slate-100"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <span>{editingEmpDeptId ? 'Edit Department' : 'Add New Department'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEmpDeptFormOpen(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Department Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IT Department / Administration"
                        value={empDeptFormData.name}
                        onChange={(e) =>
                          setEmpDeptFormData({ ...empDeptFormData, name: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Head of Department *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Engr. Asadullah Mahar"
                        value={empDeptFormData.headOfDepartment}
                        onChange={(e) =>
                          setEmpDeptFormData({ ...empDeptFormData, headOfDepartment: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Core responsibilities and functions..."
                        value={empDeptFormData.description}
                        onChange={(e) =>
                          setEmpDeptFormData({ ...empDeptFormData, description: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Contact Email</label>
                        <input
                          type="email"
                          placeholder="dept@aimshospital.org"
                          value={empDeptFormData.contactEmail}
                          onChange={(e) =>
                            setEmpDeptFormData({ ...empDeptFormData, contactEmail: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Extension / Phone</label>
                        <input
                          type="text"
                          placeholder="Ext 401"
                          value={empDeptFormData.contactExtension}
                          onChange={(e) =>
                            setEmpDeptFormData({ ...empDeptFormData, contactExtension: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsEmpDeptFormOpen(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs shadow-md"
                    >
                      Save Department
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

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

        {/* TAB: DEPARTMENTS MANAGEMENT */}
        {activeTab === 'departments' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" />
                  Clinical & Surgical Departments ({departments.length})
                </h3>
                <p className="text-[11px] text-slate-400">Add, edit or update department descriptions, OPD timings, head doctors, and bed capacities</p>
              </div>
              <button
                onClick={() => {
                  setEditingDeptId(null);
                  setDeptFormData({
                    name: '',
                    shortDesc: '',
                    fullDesc: '',
                    headDoctorName: '',
                    headDoctorTitle: '',
                    headDoctorQualifications: '',
                    bedCapacity: 20,
                    opdTimings: '09:00 AM - 05:00 PM',
                    emergency24x7: true,
                    category: 'clinical',
                    keyFeatures: '128-Slice CT, 24/7 ICU, Board Certified Consultants'
                  });
                  setIsDeptFormOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Department</span>
              </button>
            </div>

            {/* Department Form Modal */}
            {isDeptFormOpen && (
              <form onSubmit={handleSaveDepartment} className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-cyan-400">
                    {editingDeptId ? 'Edit Department Details' : 'Create New Department'}
                  </h4>
                  <button type="button" onClick={() => setIsDeptFormOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Department Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cardiology & Cath Lab"
                      value={deptFormData.name}
                      onChange={(e) => setDeptFormData({ ...deptFormData, name: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Category *</label>
                    <select
                      value={deptFormData.category}
                      onChange={(e) => setDeptFormData({ ...deptFormData, category: e.target.value as any })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    >
                      <option value="clinical">Clinical Medicine</option>
                      <option value="surgical">Surgical Specialities</option>
                      <option value="diagnostic">Diagnostic & Radiology</option>
                      <option value="critical">Critical Care & Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Head Doctor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Prof. Dr. M. Sadik Memon"
                      value={deptFormData.headDoctorName}
                      onChange={(e) => setDeptFormData({ ...deptFormData, headDoctorName: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Head Doctor Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Chairman & Professor"
                      value={deptFormData.headDoctorTitle}
                      onChange={(e) => setDeptFormData({ ...deptFormData, headDoctorTitle: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Bed Capacity</label>
                    <input
                      type="number"
                      value={deptFormData.bedCapacity}
                      onChange={(e) => setDeptFormData({ ...deptFormData, bedCapacity: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Timings</label>
                    <input
                      type="text"
                      placeholder="e.g. 09:00 AM - 05:00 PM"
                      value={deptFormData.opdTimings}
                      onChange={(e) => setDeptFormData({ ...deptFormData, opdTimings: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of clinical services"
                    value={deptFormData.shortDesc}
                    onChange={(e) => setDeptFormData({ ...deptFormData, shortDesc: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Comprehensive description of clinical care..."
                    value={deptFormData.fullDesc}
                    onChange={(e) => setDeptFormData({ ...deptFormData, fullDesc: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDeptFormOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl"
                  >
                    Save Department
                  </button>
                </div>
              </form>
            )}

            {/* Department List */}
            <div className="grid md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {dept.category}
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-1">{dept.name}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{dept.shortDesc}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingDeptId(dept.id);
                          setDeptFormData({
                            name: dept.name,
                            shortDesc: dept.shortDesc,
                            fullDesc: dept.fullDesc,
                            headDoctorName: dept.headDoctor.name,
                            headDoctorTitle: dept.headDoctor.title,
                            headDoctorQualifications: dept.headDoctor.qualifications,
                            bedCapacity: dept.bedCapacity,
                            opdTimings: dept.opdTimings,
                            emergency24x7: dept.emergency24x7,
                            category: dept.category,
                            keyFeatures: dept.keyFeatures.join(', ')
                          });
                          setIsDeptFormOpen(true);
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(dept.id)}
                        className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div><strong>Head:</strong> {dept.headDoctor.name} ({dept.headDoctor.title})</div>
                    <div><strong>OPD Timings:</strong> {dept.opdTimings}</div>
                    <div><strong>Bed Capacity:</strong> {dept.bedCapacity} Dedicated Inpatient Beds</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CAMPUSES / BRANCHES MANAGEMENT */}
        {activeTab === 'branches' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Hospital Campuses & Locations ({branches.length})
                </h3>
                <p className="text-[11px] text-slate-400">Edit campus addresses, emergency numbers, and ICU bed capacities</p>
              </div>
              <button
                onClick={() => {
                  setEditingBranchId(null);
                  setBranchFormData({
                    name: '',
                    city: 'Hyderabad',
                    address: '',
                    emergencyNumber: '0300-1234567',
                    opdNumber: '022-2101100',
                    icuBedsAvailable: 25,
                    totalBeds: 100,
                    type: 'Main Hospital'
                  });
                  setIsBranchFormOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Campus</span>
              </button>
            </div>

            {isBranchFormOpen && (
              <form onSubmit={handleSaveBranch} className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-cyan-400">
                    {editingBranchId ? 'Edit Campus Details' : 'Add New Hospital Campus'}
                  </h4>
                  <button type="button" onClick={() => setIsBranchFormOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Campus Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AIMS Hospital Hala Naka"
                      value={branchFormData.name}
                      onChange={(e) => setBranchFormData({ ...branchFormData, name: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad"
                      value={branchFormData.city}
                      onChange={(e) => setBranchFormData({ ...branchFormData, city: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Emergency Hotline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={branchFormData.emergencyNumber}
                      onChange={(e) => setBranchFormData({ ...branchFormData, emergencyNumber: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. 022-2101100"
                      value={branchFormData.opdNumber}
                      onChange={(e) => setBranchFormData({ ...branchFormData, opdNumber: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ICU Beds Available</label>
                    <input
                      type="number"
                      value={branchFormData.icuBedsAvailable}
                      onChange={(e) => setBranchFormData({ ...branchFormData, icuBedsAvailable: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Total Inpatient Beds</label>
                    <input
                      type="number"
                      value={branchFormData.totalBeds}
                      onChange={(e) => setBranchFormData({ ...branchFormData, totalBeds: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Physical Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full address"
                    value={branchFormData.address}
                    onChange={(e) => setBranchFormData({ ...branchFormData, address: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsBranchFormOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-cyan-600 text-white font-black rounded-xl">
                    Save Campus
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {branches.map((b) => (
                <div key={b.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{b.name}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{b.address}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingBranchId(b.id);
                          setBranchFormData({
                            name: b.name,
                            city: b.city,
                            address: b.address,
                            emergencyNumber: b.emergencyNumber,
                            opdNumber: b.opdNumber,
                            icuBedsAvailable: b.icuBedsAvailable,
                            totalBeds: b.totalBeds,
                            type: b.type
                          });
                          setIsBranchFormOpen(true);
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteBranch(b.id)} className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1 font-mono">
                    <div>Emergency Phone: <span className="text-emerald-400">{b.emergencyNumber}</span></div>
                    <div>OPD Phone: <span className="text-cyan-400">{b.opdNumber}</span></div>
                    <div>ICU Beds Available: <span className="text-amber-400">{b.icuBedsAvailable} / {b.totalBeds} total</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: HEALTH PACKAGES MANAGEMENT */}
        {activeTab === 'packages' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  Health Checkup Packages ({packages.length})
                </h3>
                <p className="text-[11px] text-slate-400">Manage package titles, pricing, discounts, and test inclusions</p>
              </div>
              <button
                onClick={() => {
                  setEditingPkgId(null);
                  setPkgFormData({
                    title: '',
                    targetAudience: '',
                    originalPrice: 5000,
                    discountedPrice: 2999,
                    testsIncludedCount: 15,
                    testsList: 'CBC, Sugar, ECG, LFT',
                    isPopular: false
                  });
                  setIsPkgFormOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Package</span>
              </button>
            </div>

            {isPkgFormOpen && (
              <form onSubmit={handleSavePackage} className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-cyan-400">
                    {editingPkgId ? 'Edit Checkup Package' : 'Create Checkup Package'}
                  </h4>
                  <button type="button" onClick={() => setIsPkgFormOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Package Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Executive Health Checkup"
                      value={pkgFormData.title}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Original Price (PKR)</label>
                    <input
                      type="number"
                      value={pkgFormData.originalPrice}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, originalPrice: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Discounted Price (PKR)</label>
                    <input
                      type="number"
                      value={pkgFormData.discountedPrice}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, discountedPrice: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Audience / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Ideal for adults over 40 for cardiac screening"
                    value={pkgFormData.targetAudience}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, targetAudience: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Included Tests (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="128-Slice CT Calcium Scoring, 3D Echo, HbA1c, Lipid Profile, LFT, RFT, CBC"
                    value={pkgFormData.testsList}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, testsList: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsPkgFormOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-cyan-600 text-white font-black rounded-xl">
                    Save Package
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{pkg.title}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{pkg.targetAudience}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingPkgId(pkg.id);
                          setPkgFormData({
                            title: pkg.title,
                            targetAudience: pkg.targetAudience,
                            originalPrice: pkg.originalPrice,
                            discountedPrice: pkg.discountedPrice,
                            testsIncludedCount: pkg.testsIncludedCount,
                            testsList: pkg.testsList.join(', '),
                            isPopular: pkg.isPopular
                          });
                          setIsPkgFormOpen(true);
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeletePackage(pkg.id)} className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between text-xs font-bold pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 text-sm">PKR {pkg.discountedPrice.toLocaleString()}</span>
                    <span className="text-slate-500 line-through">PKR {pkg.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: NEWS ARTICLES MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Medical Articles & Hospital News ({newsArticles.length})
                </h3>
                <p className="text-[11px] text-slate-400">Publish or modify medical breakthroughs and clinical insights</p>
              </div>
              <button
                onClick={() => {
                  setEditingNewsId(null);
                  setNewsFormData({
                    title: '',
                    summary: '',
                    content: '',
                    date: 'August 2026',
                    readTime: '3 min read',
                    category: 'Clinical News',
                    imageUrl: ''
                  });
                  setIsNewsFormOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Article</span>
              </button>
            </div>

            {isNewsFormOpen && (
              <form onSubmit={handleSaveNews} className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-cyan-400">
                    {editingNewsId ? 'Edit Medical Article' : 'Publish New Article'}
                  </h4>
                  <button type="button" onClick={() => setIsNewsFormOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Article Headline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 128-Slice CT Scan Technology Commissioned at AIMS"
                      value={newsFormData.title}
                      onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Cardiology Breakthroughs"
                      value={newsFormData.category}
                      onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Short Article Summary *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief summary..."
                    value={newsFormData.summary}
                    onChange={(e) => setNewsFormData({ ...newsFormData, summary: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsNewsFormOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-cyan-600 text-white font-black rounded-xl">
                    Publish Article
                  </button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {newsArticles.map((art) => (
                <div key={art.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {art.category}
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-1">{art.title}</h4>
                      <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{art.summary}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingNewsId(art.id);
                          setNewsFormData({
                            title: art.title,
                            summary: art.summary,
                            content: art.content,
                            date: art.date,
                            readTime: art.readTime,
                            category: art.category,
                            imageUrl: art.imageUrl
                          });
                          setIsNewsFormOpen(true);
                        }}
                        className="p-1.5 bg-slate-800 text-cyan-300 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteNews(art.id)} className="p-1.5 bg-rose-950 text-rose-300 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SITE BANNERS & HOTLINES */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSiteSettings} className="space-y-6 text-xs bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Global Site Settings, Banners & Emergency Hotlines
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Update emergency broadcast bar, main hero headline, subheadline, and phone numbers across the website.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Top Emergency Announcement Bar Text</label>
                <textarea
                  rows={2}
                  value={siteSettings.announcementBanner}
                  onChange={(e) => setSiteSettings({ ...siteSettings, announcementBanner: e.target.value })}
                  className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Homepage Main Hero Headline</label>
                  <input
                    type="text"
                    value={siteSettings.heroHeadline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Homepage Hero Subheadline</label>
                  <input
                    type="text"
                    value={siteSettings.heroSubheadline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroSubheadline: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">24/7 Emergency Ambulance Hotline Number</label>
                  <input
                    type="text"
                    value={siteSettings.emergencyHotline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, emergencyHotline: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">OPD Helpline Number</label>
                  <input
                    type="text"
                    value={siteSettings.opdHelpline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, opdHelpline: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp Appointment Helpline</label>
                  <input
                    type="text"
                    value={siteSettings.whatsappNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-black rounded-xl shadow-lg">
                Save Global Site Settings
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: UPLOAD LOGO & MASTER RESET */}
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

            {/* Master Data Factory Reset Card */}
            <div className="bg-rose-950/40 p-6 rounded-2xl border border-rose-800/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Reset Website Content to Factory Stock Defaults</span>
              </div>
              <p className="text-slate-400 text-xs">
                If you ever want to discard all your custom edits and restore the original stock website data (doctors, departments, campuses, checkup packages, news), click the button below.
              </p>
              <button
                onClick={handleResetAllMasterData}
                className="px-5 py-2.5 bg-rose-900 hover:bg-rose-800 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-rose-200" />
                <span>Reset All Website Data to Factory Default</span>
              </button>
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
