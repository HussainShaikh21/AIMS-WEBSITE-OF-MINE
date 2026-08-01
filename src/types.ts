export interface Department {
  id: string;
  name: string;
  category: 'clinical' | 'surgical' | 'diagnostic' | 'critical';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  headOfDept: string;
  facilities: string[];
  commonConditions: string[];
  procedures: string[];
  opdTimings: string;
  bedCapacity: number;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  consultationFee: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  bio: string;
  specializations: string[];
  languages: string[];
  location: string;
  awards?: string[];
}

export interface DiagnosticService {
  id: string;
  name: string;
  category: 'imaging' | 'pathology' | 'cardiology' | 'neurology' | 'radiology';
  shortDesc: string;
  fullDesc: string;
  turnaroundTime: string;
  preparationInstructions: string[];
  price: number;
  badge?: string;
  features: string[];
  faqs: { question: string; answer: string }[];
  isFeaturedCTScan?: boolean;
}

export interface HealthPackage {
  id: string;
  title: string;
  targetAudience: string;
  testsIncludedCount: number;
  testsList: string[];
  originalPrice: number;
  discountedPrice: number;
  preparationNotes: string;
  recommendedFor: string;
  isPopular?: boolean;
}

export interface HospitalBranch {
  id: string;
  name: string;
  type: 'Main Campus' | 'Super Specialty Hub' | 'Children & Women' | 'Diagnostics Center';
  address: string;
  city: string;
  emergencyNumber: string;
  opdNumber: string;
  email: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
  icuBedsAvailable: number;
  is24x7Emergency: boolean;
  imagingFacilities: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Medical Breakthrough' | 'Health Guide' | 'Hospital News' | 'Event';
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  treatment: string;
  departmentName: string;
  doctorName: string;
  rating: number;
  reviewText: string;
  date: string;
  location: string;
  videoUrl?: string;
  isVerifiedPatient: boolean;
}

export interface CareerListing {
  id: string;
  title: string;
  department: string;
  type: 'Full Time' | 'Part Time' | 'Residency';
  experienceRequired: string;
  qualification: string;
  location: string;
  deadline: string;
  description: string;
  responsibilities: string[];
}

export interface PatientRecord {
  patientId: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  appointments: Appointment[];
  labReports: LabReport[];
  prescriptions: Prescription[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  bookingFee: number;
  createdAt: string;
  qrCodeToken: string;
  branchName: string;
}

export interface LabReport {
  id: string;
  reportName: string;
  date: string;
  category: string;
  status: 'Ready' | 'Processing';
  doctorName: string;
  downloadUrl?: string;
  summary: string;
  keyValues: { testName: string; result: string; normalRange: string; status: 'Normal' | 'High' | 'Low' }[];
}

export interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  department: string;
  diagnosis: string;
  medications: { name: string; dosage: string; frequency: string; duration: string }[];
  doctorAdvice: string;
}

export interface TriageResponse {
  triageLevel: 'Emergency' | 'Urgent' | 'Routine' | 'General Info';
  recommendedDepartment: string;
  recommendedDoctorType: string;
  summary: string;
  immediateAdvice: string[];
  warningSigns: string[];
  suggestedAction: string;
}
