import React, { useState } from 'react';
import { Department, Doctor } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CTScanLanding } from './components/CTScanLanding';
import { DepartmentsGrid } from './components/DepartmentsGrid';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { DiagnosticsSection } from './components/DiagnosticsSection';
import { DoctorSearchCatalog } from './components/DoctorSearchCatalog';
import { HealthPackagesSection } from './components/HealthPackagesSection';
import { HospitalNetworkMap } from './components/HospitalNetworkMap';
import { NewsBlogSection } from './components/NewsBlogSection';
import { CareersSection } from './components/CareersSection';
import { DonationSection } from './components/DonationSection';
import { Footer } from './components/Footer';

import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { AITriageDrawer } from './components/AITriageDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';

export const App: React.FC = () => {
  // Navigation & Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDeptId, setBookingDeptId] = useState<string | undefined>();
  const [bookingDocId, setBookingDocId] = useState<string | undefined>();

  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleOpenBooking = (deptId?: string, docId?: string) => {
    setBookingDeptId(deptId);
    setBookingDocId(docId);
    setIsBookingOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenTriage={() => setIsTriageOpen(true)}
          onNavigateSection={scrollToSection}
        />

        {/* 2. About AIMS Hospital */}
        <AboutSection />

        {/* 3. Why Choose Us (8 Pillars) */}
        <WhyChooseUs />

        {/* 4. Dedicated 128-Slice CT Scan & Precision Imaging Landing */}
        <CTScanLanding
          onBookDiagnostic={() => handleOpenBooking('radiology')}
          onOpenTriage={() => setIsTriageOpen(true)}
        />

        {/* 5. Super Specialties & Departments Grid */}
        <DepartmentsGrid
          onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          onBookAppointment={(deptId) => handleOpenBooking(deptId)}
        />

        {/* 6. Advanced Diagnostics & Imaging */}
        <DiagnosticsSection
          onBookDiagnostic={(diagId) => handleOpenBooking('radiology')}
          onNavigateSection={scrollToSection}
        />

        {/* 7. Doctor Search Catalog */}
        <DoctorSearchCatalog
          onBookAppointment={(deptId, docId) => handleOpenBooking(deptId, docId)}
          onSelectDoctor={(doc) => handleOpenBooking(doc.departmentId, doc.id)}
        />

        {/* 8. Preventive Health Checkup Packages */}
        <HealthPackagesSection
          onBookPackage={(title) => handleOpenBooking()}
        />

        {/* 9. Hospital Network & Multi-Campus Locator */}
        <HospitalNetworkMap
          onBookAppointment={(deptId) => handleOpenBooking(deptId)}
        />

        {/* 10. News & Medical Insights */}
        <NewsBlogSection />

        {/* 11. Careers & Job Openings */}
        <CareersSection />

        {/* 12. AIMS Care Philanthropy & Donation */}
        <DonationSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      {/* Appointment Booking Wizard */}
      {isBookingOpen && (
        <AppointmentBookingModal
          initialDepartmentId={bookingDeptId}
          initialDoctorId={bookingDocId}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {/* Patient Portal Modal */}
      {isPortalOpen && (
        <PatientPortalModal
          onClose={() => setIsPortalOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {/* Gemini AI Clinical Triage Drawer */}
      {isTriageOpen && (
        <AITriageDrawer
          onClose={() => setIsTriageOpen(false)}
          onBookAppointment={(deptId) => handleOpenBooking(deptId)}
        />
      )}

      {/* Department Detail Drawer */}
      {selectedDepartment && (
        <DepartmentDetailModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
          onBookAppointment={(deptId, docId) => handleOpenBooking(deptId, docId)}
        />
      )}

      {/* Staff Admin Panel */}
      {isAdminOpen && (
        <AdminPanelModal
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
