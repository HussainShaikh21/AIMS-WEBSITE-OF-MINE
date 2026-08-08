import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Department, Doctor } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DirectorsMessageSection } from './components/DirectorsMessageSection';
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
import { ResearchModal } from './components/ResearchModal';
import { EmployeeDirectoryModal } from './components/EmployeeDirectoryModal';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';

export const App: React.FC = () => {
  // Navigation & Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDeptId, setBookingDeptId] = useState<string | undefined>();
  const [bookingDocId, setBookingDocId] = useState<string | undefined>();

  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [researchTab, setResearchTab] = useState<'overview' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact'>('overview');

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleOpenBooking = (deptId?: string, docId?: string) => {
    setBookingDeptId(deptId);
    setBookingDocId(docId);
    setIsBookingOpen(true);
  };

  const handleOpenResearch = (tab: 'overview' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact' = 'overview') => {
    setResearchTab(tab);
    setIsResearchOpen(true);
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
        onOpenResearch={handleOpenResearch}
        onOpenEmployees={() => setIsEmployeesOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection
            onOpenBooking={() => handleOpenBooking()}
            onOpenTriage={() => setIsTriageOpen(true)}
            onNavigateSection={scrollToSection}
          />
        </motion.div>

        {/* 2. About AIMS Hospital */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AboutSection />
        </motion.div>

        {/* 2.5 Director's Message & 125 Beds Feature */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <DirectorsMessageSection onOpenBooking={() => handleOpenBooking()} />
        </motion.div>

        {/* 3. Why Choose Us (8 Pillars) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <WhyChooseUs />
        </motion.div>

        {/* 4. Dedicated 128-Slice CT Scan & Precision Imaging Landing */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CTScanLanding
            onBookDiagnostic={() => handleOpenBooking('radiology')}
            onOpenTriage={() => setIsTriageOpen(true)}
          />
        </motion.div>

        {/* 5. Super Specialties & Departments Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <DepartmentsGrid
            onSelectDepartment={(dept) => setSelectedDepartment(dept)}
            onBookAppointment={(deptId) => handleOpenBooking(deptId)}
          />
        </motion.div>

        {/* 6. Advanced Diagnostics & Imaging */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <DiagnosticsSection
            onBookDiagnostic={(diagId) => handleOpenBooking('radiology')}
            onNavigateSection={scrollToSection}
          />
        </motion.div>

        {/* 7. Doctor Search Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <DoctorSearchCatalog
            onBookAppointment={(deptId, docId) => handleOpenBooking(deptId, docId)}
            onSelectDoctor={(doc) => handleOpenBooking(doc.departmentId, doc.id)}
          />
        </motion.div>

        {/* 8. Preventive Health Checkup Packages */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <HealthPackagesSection
            onBookPackage={(title) => handleOpenBooking()}
          />
        </motion.div>

        {/* 9. Hospital Network & Multi-Campus Locator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <HospitalNetworkMap
            onBookAppointment={(deptId) => handleOpenBooking(deptId)}
          />
        </motion.div>

        {/* 10. News & Medical Insights */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <NewsBlogSection />
        </motion.div>

        {/* 11. Careers & Job Openings */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CareersSection />
        </motion.div>

        {/* 12. AIMS Care Philanthropy & Donation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <DonationSection />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResearch={handleOpenResearch}
      />

      {/* MODALS & DRAWERS */}
      {/* Research & Development Division Modal */}
      {isResearchOpen && (
        <ResearchModal
          initialTab={researchTab}
          onClose={() => setIsResearchOpen(false)}
        />
      )}
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

      {/* Public Employee & Department Directory Modal */}
      {isEmployeesOpen && (
        <EmployeeDirectoryModal
          onClose={() => setIsEmployeesOpen(false)}
        />
      )}

      {/* Floating 24/7 WhatsApp Quick Access Widget */}
      <WhatsAppFloatingWidget />
    </div>
  );
};

export default App;
