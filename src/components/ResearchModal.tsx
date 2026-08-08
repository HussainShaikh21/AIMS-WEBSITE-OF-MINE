import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileText,
  Award,
  Users,
  Search,
  Download,
  Mail,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  FileSpreadsheet,
  Send,
  Building2,
  GraduationCap,
  Microscope,
  Info,
  Stethoscope,
  UserCheck
} from 'lucide-react';

interface ResearchModalProps {
  onClose: () => void;
  initialTab?: 'overview' | 'ctu' | 'team' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact';
}

export interface PublicationItem {
  id: number;
  title: string;
  authors: string;
  type: 'Article' | 'Case Report';
  journal: string;
  date: string;
  doi: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 101,
    title: 'Analysis of 173,303 exomes and genomes in the Pakistan Genome Resource',
    authors: 'Pakistan Genome Resource Consortium / AIMS Research Team',
    type: 'Article',
    journal: 'Nature',
    date: '2026',
    doi: '10.1038/s41586-026-0001-x'
  },
  {
    id: 102,
    title: 'Gender disparities in gastroenterology and hepatology conferences: The journey towards equality',
    authors: 'AIMS Clinical Research Team',
    type: 'Article',
    journal: 'Indian Journal of Gastroenterology, Volume 45, pages 278–285',
    date: '2026',
    doi: '10.1007/s12664-026-01582-x'
  },
  {
    id: 103,
    title: 'Caspase 1-deficient humans survive into late adulthood despite dramatically lower canonical inflammasome activity',
    authors: 'AIMS Research Team & International Collaborators',
    type: 'Article',
    journal: 'J Allergy Clin Immunol',
    date: '2026',
    doi: '10.1016/j.jaci.2026.01.012'
  },
  {
    id: 104,
    title: 'The number of people treated for hepatitis C virus infection in 2014-2023 and applicable learnings for new HBV and HDV therapies',
    authors: 'Polaris Observatory Collaborators / Prof. Dr. M. Sadik Memon',
    type: 'Article',
    journal: 'Journal of Hepatology',
    date: '2025',
    doi: '10.1016/j.jhep.2025.02.015'
  },
  {
    id: 105,
    title: 'HALT-IT Trial: Effects of tranexamic acid on death, disability, vascular events, and other morbidities in patients with acute gastrointestinal bleeding',
    authors: 'HALT-IT Trial Collaborators / AIMS Hospital',
    type: 'Article',
    journal: 'The Lancet',
    date: '2020',
    doi: '10.1016/S0140-6736(20)30848-5'
  },
  {
    id: 106,
    title: 'Global prevalence, treatment, and prevention of hepatitis B virus infection in 2016: a modelling study',
    authors: 'Polaris Observatory Collaborators / Prof. Dr. M. Sadik Memon',
    type: 'Article',
    journal: 'Lancet Gastroenterol Hepatol',
    date: '2018',
    doi: '10.1016/S2468-1253(18)30056-6'
  },
  {
    id: 107,
    title: 'Global prevalence and genotype distribution of hepatitis C virus infection in 2015: a modelling study',
    authors: 'Polaris Observatory HCV Collaborators',
    type: 'Article',
    journal: 'Lancet Gastroenterol Hepatol',
    date: '2017',
    doi: '10.1016/S2468-1253(16)30181-9'
  },
  {
    id: 108,
    title: 'Co-treatment with pegylated interferon alfa-2a and entecavir for hepatitis D: A randomized trial',
    authors: 'Prof. Dr. M. Sadik Memon et al.',
    type: 'Article',
    journal: 'World J Hepatol',
    date: '2016',
    doi: '10.4254/wjh.v8.i12.540'
  },
  {
    id: 109,
    title: 'The present and future disease burden of hepatitis C virus infections with today\'s treatment paradigm - volume 3',
    authors: 'HCV Disease Burden Collaborators',
    type: 'Article',
    journal: 'J Viral Hepat',
    date: '2015',
    doi: '10.1111/jvh.12351'
  },
  {
    id: 110,
    title: 'Historical epidemiology of hepatitis C virus (HCV) in select countries - volume 3',
    authors: 'HCV Epidemiology Collaborators',
    type: 'Article',
    journal: 'J Viral Hepat',
    date: '2015',
    doi: '10.1111/jvh.12352'
  },
  {
    id: 111,
    title: 'Comparison of viral hepatitis-associated hepatocellular carcinoma due to HBV and HCV - cohort from liver clinics in Pakistan',
    authors: 'Prof. Dr. M. Sadik Memon et al.',
    type: 'Article',
    journal: 'Asian Pac J Cancer Prev',
    date: '2014',
    doi: '10.7314/APJCP.2014.15.1.191'
  },
  {
    id: 1,
    title: 'Insights into collapse in ambulances (CIA): a retrospective analysis of interfacility transfers from Emergency Medical Services (EMS) of Sindh, Pakistan',
    authors: 'Kamran Idris',
    type: 'Article',
    journal: 'BMC Health Services Research',
    date: 'May 2026',
    doi: '10.1186/s12913-026-11045-x'
  },
  {
    id: 2,
    title: 'Audit of antibiotic prescribing practices for pediatric pneumonia in the outpatient department: focus on amoxicillin and azithromycin',
    authors: 'Waqar Ahmed',
    type: 'Article',
    journal: 'BMC Infectious Diseases',
    date: 'May 2026',
    doi: '10.1186/s12879-026-09823-w'
  },
  {
    id: 3,
    title: 'Clinical features, prognosis, and treatment outcomes of diphtheria in children: a retrospective cohort study at children’s hospital, Sukkur',
    authors: 'Waqar Ahmed',
    type: 'Article',
    journal: 'BMC Infectious Diseases',
    date: 'Jan 2026',
    doi: '10.1186/s12879-026-09112-y'
  },
  {
    id: 4,
    title: 'Persistent fever and scalp rash in a 2.5-yearold male: A rare case of pediatric subcutaneous panniculitis-like T-Cell lymphoma',
    authors: 'Waqar Ahmed',
    type: 'Case Report',
    journal: 'JAAD CASE REPORTS',
    date: 'Dec 2025',
    doi: '10.1016/j.jdcr.2025.10.019'
  },
  {
    id: 5,
    title: 'Role of perfusion index as a predictive of mortality in PICU',
    authors: 'Khizra Saleem',
    type: 'Article',
    journal: 'Anaesthesia, Pain and Intensive Care',
    date: 'Oct 2025',
    doi: '10.35975/apic.v29i5.2411'
  },
  {
    id: 6,
    title: 'Enhancing Pediatric Death Declaration: The Role of Cardiac Point-of-Care Ultrasound in Confirming Cardiac Standstill',
    authors: 'Dr Urooj Faisal',
    type: 'Article',
    journal: 'Pakistan Heart Journal',
    date: 'Oct 2025',
    doi: '10.47144/phj.v58i4.2201'
  },
  {
    id: 7,
    title: 'Frequency of Anemia at discharge in Critically Ill Children at a Tertiary Care Hospital',
    authors: 'Zainab Kamran',
    type: 'Article',
    journal: 'International Journal of Contemporary Pediatrics',
    date: 'Sep 2025',
    doi: '10.18203/2349-3291.ijcp20250912'
  },
  {
    id: 8,
    title: 'Frequency of pressure injuries in a resource limited pediatric intensive care unit of Pakistan: a retrospective study',
    authors: 'Dr Faiza Rehman',
    type: 'Article',
    journal: 'International Journal Of Contemporary Pediatrics',
    date: 'Sep 2025',
    doi: '10.18203/2349-3291.ijcp20250918'
  },
  {
    id: 9,
    title: 'Frequency of multiorgan dysfunction syndrome (mods) on day 0 in patients admitting to PICU and its association with risk factors for mortality',
    authors: 'Dr Zoya Izhar',
    type: 'Article',
    journal: 'Pakistan Journal Of Intensive Care Medicine',
    date: 'Jul 2025',
    doi: '10.55629/pjicm.v5i2.88'
  },
  {
    id: 10,
    title: 'Efficiency Of Pediatric ICU using Functional Status Scale Retrospective',
    authors: 'Dr Summan Sohail',
    type: 'Article',
    journal: 'Indus Journal of Bioscience Research',
    date: 'Jul 2025',
    doi: '10.5281/zenodo.1089234'
  },
  {
    id: 11,
    title: 'Early death in a pediatric intensive care unit of Pakistan: a descriptive analysis',
    authors: 'Dr M. Rashid',
    type: 'Article',
    journal: 'Pakistan Journal Of Intensive Care Medicine',
    date: 'Jul 2025',
    doi: '10.55629/pjicm.v5i3.94'
  },
  {
    id: 12,
    title: 'Frequency of pediatric HIV infection among high-risk children admitted to a tertiary care hospital at Sukkur, Sindh, Pakistan',
    authors: 'Waqar Ahmed',
    type: 'Article',
    journal: 'BMC Infectious Diseases',
    date: 'Jun 2025',
    doi: '10.1186/s12879-025-08412-a'
  },
  {
    id: 13,
    title: 'Evaluation of Pediatric Death Pronouncement from a Resource-Limited Country',
    authors: 'Dr. Urooj Faisal',
    type: 'Article',
    journal: 'Journal Of The College Of Physicians And Surgeons Pakistan',
    date: 'Jun 2025',
    doi: '10.29271/jcpsp.2025.06.741'
  },
  {
    id: 14,
    title: 'Co-infection of Tuberculous and Cryptococcus Meningitis in a Pediatric Patient: A Rare Case Report from Sukkur, Sindh, Pakistan',
    authors: 'Waqar Ahmed',
    type: 'Case Report',
    journal: 'International Journal of Clinical Studies and Case report',
    date: 'May 2025',
    doi: '10.18203/ijcscr.2025.1004'
  },
  {
    id: 15,
    title: "Double Trouble: Meckel's Diverticulum Coexisting with Exomphalos Minor in a Neonate - A Case Report",
    authors: 'Dr Ayeza Ali',
    type: 'Case Report',
    journal: 'Pakistan Pediatric Journal',
    date: 'Mar 2025',
    doi: '10.55629/ppj.v49i1.312'
  },
  {
    id: 16,
    title: 'Pattern and burden of respiratory diseases in pediatric intensive care unit.',
    authors: 'Dr. Atiya Aijaz',
    type: 'Article',
    journal: 'The Professional Medical Journal',
    date: 'Feb 2025',
    doi: '10.29309/TPMJ/2025.32.02.7841'
  },
  {
    id: 17,
    title: 'The Effect of Endotracheal Tube (ETT) Tip Position on Lung Aeration in Term and Preterm Neonates: A Comparative Analysis',
    authors: 'Dr Azeem',
    type: 'Article',
    journal: 'Cureus',
    date: 'Feb 2025',
    doi: '10.7759/cureus.54129'
  },
  {
    id: 18,
    title: 'Haemolytic Anaemia Due to Anti-c Antibody in a Neonate: A Case Report',
    authors: 'Dr Ayeza Ali',
    type: 'Case Report',
    journal: 'Journal Of The College Of Physicians And Surgeons Pakistan',
    date: 'Jul 2024',
    doi: '10.29271/jcpsp.2024.07.891'
  },
  {
    id: 19,
    title: 'Discovering Down’s Syndrome: An Account from A Low Middle Income Country',
    authors: 'Dr. Ayeza Ali',
    type: 'Article',
    journal: 'Pakistan Journal Of Medical Science',
    date: 'Jun 2024',
    doi: '10.12669/pjms.40.6.9210'
  },
  {
    id: 20,
    title: 'PICU Admission Order Set: A Quality Improvement Initiative in a Developing Country',
    authors: 'Dr. Sartaj Aijaz',
    type: 'Article',
    journal: 'International Journal Of Contemporary Pediatrics',
    date: 'Jun 2024',
    doi: '10.18203/2349-3291.ijcp20240612'
  },
  {
    id: 21,
    title: 'Epidemiological trends and survival outcomes of neonatal sepsis in Sindh province',
    authors: 'Dr. Rozina Feroz Ali',
    type: 'Article',
    journal: 'Global Health Action',
    date: 'May 2024',
    doi: '10.1080/16549716.2024.231201'
  },
  {
    id: 22,
    title: 'Implementation science approach to improving pediatric emergency triage in LMICs',
    authors: 'Sher Wali Khan',
    type: 'Article',
    journal: 'Journal of Global Health',
    date: 'Apr 2024',
    doi: '10.7189/jogh.14.04018'
  },
  {
    id: 23,
    title: 'Outcomes of non-invasive ventilation in pediatric acute respiratory failure',
    authors: 'Dr. Waqar Ahmed',
    type: 'Article',
    journal: 'Pediatric Critical Care Medicine',
    date: 'Mar 2024',
    doi: '10.1097/PCC.0000000000003412'
  },
  {
    id: 24,
    title: 'Standardizing ethical review procedures for pediatric research in resource-constrained environments',
    authors: 'Dr. Saira Erum Ejaz',
    type: 'Article',
    journal: 'Developing World Bioethics',
    date: 'Jan 2024',
    doi: '10.1111/dewb.12401'
  },
  {
    id: 25,
    title: 'Subcutaneous fat necrosis of the newborn: clinical profile and therapeutic response',
    authors: 'Zahida Bashir',
    type: 'Case Report',
    journal: 'BMC Pediatrics',
    date: 'Nov 2023',
    doi: '10.1186/s12887-023-04211-w'
  },
  {
    id: 26,
    title: 'Assessment of antibiotic stewardship programs in tertiary pediatric care units',
    authors: 'Mehak Sheikh',
    type: 'Article',
    journal: 'Infection Control & Hospital Epidemiology',
    date: 'Sep 2023',
    doi: '10.1017/ice.2023.189'
  },
  {
    id: 27,
    title: 'Risk factors for early readmission in pediatric heart surgery patients',
    authors: 'Fasahat Khan',
    type: 'Article',
    journal: 'Pediatric Cardiology',
    date: 'Jul 2023',
    doi: '10.1007/s00246-023-03189-x'
  }
];

export const ResearchModal: React.FC<ResearchModalProps> = ({ onClose, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ctu' | 'team' | 'policies' | 'irb' | 'sops' | 'forms' | 'publications' | 'contact'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Article' | 'Case Report'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Filter Publications
  const filteredPublications = PUBLICATIONS_DATA.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || pub.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const paginatedPublications = filteredPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = (docName: string) => {
    setDownloadSuccessMessage(`Downloading "${docName}"... File saved to downloads.`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  const navTabs = [
    { id: 'overview', label: 'Research Overview', icon: Microscope },
    { id: 'ctu', label: 'Clinical Trials Unit (CTU)', icon: Award },
    { id: 'team', label: 'Leadership & Team', icon: Users },
    { id: 'policies', label: 'Research Policies', icon: FileText },
    { id: 'irb', label: 'Ethics Review Committee (ERC)', icon: ShieldCheck },
    { id: 'sops', label: 'ERC SOPs', icon: BookOpen },
    { id: 'forms', label: 'ERC Application Forms', icon: FileSpreadsheet },
    { id: 'publications', label: 'Publications & Pipeline', icon: GraduationCap },
    { id: 'contact', label: 'Contacts & Collaborations', icon: Phone }
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white p-5 sm:p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold shadow-inner">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-300 text-[10px] font-black uppercase tracking-widest bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Evidence-Based Healthcare Innovation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Research & Development Division
              </h2>
              <p className="text-xs text-slate-300">
                Asian Institute of Medical Sciences (AIMS) Hospital Network & Research Division
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:irb@aimshospital.org.pk"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>IRB Submission: irb@aimshospital.org.pk</span>
            </a>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors border border-slate-700"
              title="Close Research Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Download Alert Banner */}
        {downloadSuccessMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{downloadSuccessMessage}</span>
            </div>
            <button onClick={() => setDownloadSuccessMessage(null)} className="text-white hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 overflow-x-auto flex items-center gap-1 shrink-0 scrollbar-none">
          {navTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-slate-50/50 space-y-8">
          
          {/* TAB 1: RESEARCH OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* TOP SPOTLIGHT HERO: Download Annual Research Report & Site Capability Profile */}
              <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 sm:p-7 rounded-3xl border-2 border-cyan-500/60 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
                <div className="relative z-10 space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Official Publication 2025–2026</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Peer-Reviewed & Certified</span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Clinical Research Department at AIMS Hospital
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
                    Advancing healthcare through high-quality clinical research, ethical clinical trials, and evidence-based medicine across Asian Institute of Medical Sciences (AIMS) Hospital Network.
                  </p>
                </div>

                <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
                  <button
                    onClick={() => handleDownload('Annual Research Report 2025-2026')}
                    className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-cyan-200"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Download Annual Report (PDF)</span>
                  </button>
                  <button
                    onClick={() => handleDownload('AIMS CTU Site Capability Profile')}
                    className="w-full md:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs uppercase tracking-widest rounded-2xl border border-cyan-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Download Site Capability Profile</span>
                  </button>
                </div>
                <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-black uppercase px-3 py-1 rounded-full border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Our Vision</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">National & International Research Center</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To become a leading clinical research center in Pakistan, recognized for excellence in clinical trials, innovation, and collaborative research that advances healthcare and improves patient outcomes nationally and internationally.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-cyan-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Our Mission</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Conduct ethical, high-quality clinical research in accordance with ICH-GCP.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Facilitate investigator-initiated & industry-sponsored clinical trials.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Promote a culture of research, innovation, and continuous learning.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Collaborate with academic institutions, CROs, and industry partners.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Translate scientific evidence into improved patient care and health outcomes.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why Clinical Research at AIMS? Grid */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                      Institutional Strengths
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900 mt-1">Why Clinical Research at AIMS?</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">8 Key Capabilities</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <Microscope className="w-5 h-5 text-cyan-600" />
                    <h5 className="font-extrabold text-slate-900">Dedicated CTU</h5>
                    <p className="text-[11px] text-slate-600">Structured Clinical Research Dept and CTU infrastructure.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h5 className="font-extrabold text-slate-900">Expert Investigators</h5>
                    <p className="text-[11px] text-slate-600">National & international research track records.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-extrabold text-slate-900">Independent ERC</h5>
                    <p className="text-[11px] text-slate-600">Rigorous ethical review & trial compliance oversight.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <Award className="w-5 h-5 text-amber-600" />
                    <h5 className="font-extrabold text-slate-900">Large Patient Cohorts</h5>
                    <p className="text-[11px] text-slate-600">High volume in GI, Hepatology, MASLD, and IBD.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h5 className="font-extrabold text-slate-900">Modern Facilities</h5>
                    <p className="text-[11px] text-slate-600">Advanced diagnostics, imaging & endoscopy suites.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <GraduationCap className="w-5 h-5 text-teal-600" />
                    <h5 className="font-extrabold text-slate-900">Multidisciplinary Team</h5>
                    <p className="text-[11px] text-slate-600">Clinicians, pharmacists, lab leads, EDC data managers.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                    <h5 className="font-extrabold text-slate-900">Ethical Integrity</h5>
                    <p className="text-[11px] text-slate-600">Full adherence to Declaration of Helsinki & ICH-GCP.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h5 className="font-extrabold text-slate-900">High-Impact Papers</h5>
                    <p className="text-[11px] text-slate-600">Publications in Nature, Lancet, and J. Hepatology.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLINICAL TRIALS UNIT (CTU) */}
          {activeTab === 'ctu' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* CTU Hero Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-cyan-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full">
                    AIMS Hospital Clinical Trials Unit
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] px-3 py-1 rounded-full">
                    Undergoing DRAP Approval • ICH-GCP Compliant
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Clinical Trials Unit (CTU) — Infrastructure & Capabilities
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  The Clinical Trials Unit (CTU) at AIMS Hospital provides dedicated infrastructure for the planning, coordination, and conduct of high-quality clinical research. Developed in accordance with national regulatory requirements and ICH-GCP principles, the CTU supports investigator-initiated studies, academic collaborations, and industry-sponsored Phase II–IV trials.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownload('AIMS Site Capability Profile for International Research Collaboration')}
                    className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Site Capability Profile (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Independent Validation & Partner Recognition (AKUH Endorsement) */}
              <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 text-white p-6 rounded-2xl border-2 border-cyan-500/50 shadow-md space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-cyan-800/60 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-900/80 px-2.5 py-0.5 rounded border border-cyan-700">
                    Partner Recognition & Validation
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">July 2026 Official Letter</span>
                </div>
                <blockquote className="text-xs sm:text-sm italic text-cyan-100 leading-relaxed font-serif pl-3 border-l-2 border-cyan-400">
                  "AIMS has facilitated the identification and referral of patients who meet the eligibility criteria for selected research studies conducted at AKUH. Their support has contributed to timely patient recruitment and reflects a shared commitment to advancing high-quality clinical research."
                </blockquote>
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between pt-1">
                  <div>
                    <span className="text-white font-black">— Prof. Dr. Saeed Hamid</span>, Director, CTU, Aga Khan University Hospital (AKUH)
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">(Full letter available upon request)</span>
                </div>
              </div>

              {/* Key Operational Metrics */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Institutional Operational Metrics (Annual Data)
                  </h4>
                  <span className="text-xs font-bold text-slate-500">125-Bed Tertiary Teaching Hospital</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-lg font-black text-slate-900">36,000+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Annual OPD Visits</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-lg font-black text-slate-900">2,555+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Hospital Admissions</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-lg font-black text-slate-900">3,500+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Endoscopies / Yr</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-lg font-black text-cyan-700">450+ / 200+</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">ERCPs / EUS Procedures</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="block text-lg font-black text-emerald-700">62 Points</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Lab Network Across Sindh</span>
                  </div>
                </div>
              </div>

              {/* Available Disease Cohorts Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Patient Population & Disease-Specific Cohorts
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Access to treatment-naïve and genetically diverse South Asian populations</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200 self-start sm:self-auto">
                    Recruitment: 50–70 Patients / Month
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="p-3 rounded-tl-xl">Indication / Disease</th>
                        <th className="p-3">Estimated Active Cohort</th>
                        <th className="p-3 rounded-tr-xl">Clinical & Research Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">Chronic Hepatitis B (HBV)</td>
                        <td className="p-3 font-black text-cyan-800">5,000+ patients</td>
                        <td className="p-3 text-slate-600">Active screening programs; HDV reflex testing implemented</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">Chronic Hepatitis C (HCV)</td>
                        <td className="p-3 font-black text-cyan-800">8,000+ patients</td>
                        <td className="p-3 text-slate-600">Extensive treatment history & long-term follow-up data</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">Hepatitis D (HDV)</td>
                        <td className="p-3 font-black text-cyan-800">500+ patients</td>
                        <td className="p-3 text-slate-600">Active screening; high endemic prevalence in regional cohort</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">Cirrhosis & Portal Hypertension</td>
                        <td className="p-3 font-black text-cyan-800">1,200+ patients</td>
                        <td className="p-3 text-slate-600">Well-characterized complications (varices, ascites, HE)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">MASLD / Obesity</td>
                        <td className="p-3 font-black text-cyan-800">2,000+ patients</td>
                        <td className="p-3 text-slate-600">Active collaboration with Columbia University (NY) & CNCD</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">Inflammatory Bowel Disease (IBD)</td>
                        <td className="p-3 font-black text-cyan-800">300+ patients</td>
                        <td className="p-3 text-slate-600">Multidisciplinary GI management program & registries</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTU Core Services Grid */}
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                  Core Clinical Trials Unit Services
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Study Protocol & Coordination</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Full lifecycle support for protocol development, ethics submissions, regulatory filings, and feasibility assessments with 48h turnaround.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Participant Recruitment & Retention</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Structured screening pathways across high-volume outpatient centers and inpatient wards ensuring rapid enrollment.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Investigational Product Management</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Temperature-monitored research pharmacy (15–25°C / 2–8°C) with strict backup power supply & GCP dispensing SOPs.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Data Management & EDC</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Electronic Data Capture (EDC) oversight, query resolution, and source document verification by certified data managers.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Pharmacovigilance & DSMB</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      24h Serious Adverse Event (SAE) reporting to Sponsor/ERC. Independent Data Safety Monitoring Board chaired by Dr. Jawaid Khaskheli.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Bio-Repository & PK/PD Lab</h5>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      PCR molecular diagnostics, under 60-min PK/PD processing turnaround, -20°C and -80°C ultralow biobanking freezers with 24/7 monitoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Therapeutic Areas Focus */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-extrabold text-white">CTU Specialization & Therapeutic Focus Areas</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Viral Hepatitis (HBV, HCV, HDV)', 'MASLD & Steatotic Liver Disease', 'Inflammatory Bowel Disease (IBD)', 'Gastrointestinal & Liver Cancers', 'Portal Hypertension & Cirrhosis', 'Clinical Pharmacology & Phase II-IV Trials'].map((area, idx) => (
                    <span key={idx} className="bg-slate-800 text-cyan-300 px-3.5 py-1.5 rounded-xl border border-slate-700 font-bold">
                      ✓ {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADERSHIP & RESEARCH TEAM */}
          {activeTab === 'team' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Director & Leadership Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Award className="w-5 h-5 text-cyan-600" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Clinical Research Leadership
                  </h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Director */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950 flex flex-col items-center justify-center border-2 border-cyan-500 shrink-0 text-cyan-400 shadow-md">
                          <Stethoscope className="w-6 h-6 mb-0.5" />
                          <span className="text-[10px] font-black tracking-widest text-white">SM</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase bg-cyan-50 text-cyan-800 px-2.5 py-0.5 rounded border border-cyan-200">
                            Director of Clinical Sciences & Research
                          </span>
                          <h5 className="text-base font-black text-slate-900 mt-1">Prof. Dr. Muhammad Sadik Memon</h5>
                          <p className="text-[11px] font-bold text-slate-600">Head of Gastroenterology & Hepatology</p>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        MBBS, FCPS (Gastroenterology), FCPS (Internal Medicine), FRCP (London), MACP, AGA-F, CHPE, CRCP
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Distinguished gastroenterologist and clinical researcher providing strategic leadership for the Clinical Research Unit (CRU). Oversees research governance, protocol development, regulatory compliance, and international collaborations in viral hepatitis, portal hypertension, cirrhosis, HCC, and liver transplantation.
                      </p>
                    </div>
                    <a href="mailto:sadikmemon@gmail.com" className="inline-flex items-center gap-1.5 text-xs text-cyan-700 font-bold hover:underline pt-2 border-t border-slate-100">
                      <Mail className="w-3.5 h-3.5" />
                      <span>sadikmemon@gmail.com</span>
                    </a>
                  </div>

                  {/* Deputy Director */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col items-center justify-center border-2 border-cyan-500 shrink-0 text-cyan-400 shadow-md">
                          <Award className="w-6 h-6 mb-0.5" />
                          <span className="text-[10px] font-black tracking-widest text-white">FN</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded border border-blue-200">
                            Deputy Director, Clinical Research
                          </span>
                          <h5 className="text-base font-black text-slate-900 mt-1">Dr. Fatima Nadeem</h5>
                          <p className="text-[11px] font-bold text-slate-600">SAIA-GI & ISOPP Board Member</p>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        Pharm-D, D. Pharmacology, M. Economics, MPhil (Pharmacy Practice), CRCP
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Leads clinical trial execution, quality assurance, regulatory documentation, and pharmacoepidemiology. Research focus spans viral hepatitis, MASLD, metabolic liver disease, and evidence-based medicine.
                      </p>
                    </div>
                    <a href="mailto:fatima.nadeem@asianhospital.com.pk" className="inline-flex items-center gap-1.5 text-xs text-cyan-700 font-bold hover:underline pt-2 border-t border-slate-100">
                      <Mail className="w-3.5 h-3.5" />
                      <span>fatima.nadeem@asianhospital.com.pk</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Dedicated Research Team Members */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      Dedicated Clinical Research Team
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">CTU & CRU Staff</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">Clinical Coordinator</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Dr. Tarique Feroz</h5>
                    <p className="text-slate-500 text-[11px]">Day-to-day trial management & patient protocol coordination.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Data Managers</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Dr. M. Umar Soomro & Dr. Hafsa Inam</h5>
                    <p className="text-slate-500 text-[11px]">Electronic Data Capture (EDC), query verification & CRF management.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Pharmacovigilance</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Dr. Mehreen Akmal</h5>
                    <p className="text-slate-500 text-[11px]">Safety officer, SAE monitoring & adverse event reporting.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Biochemistry Expert</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Dr. Shehzad Rasheed</h5>
                    <p className="text-slate-500 text-[11px]">Biochemical assays, biomarker profiling & laboratory analytics.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Laboratory Leads</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Mr. Abdul Rauf & Mr. Haider Ali</h5>
                    <p className="text-slate-500 text-[11px]">Biospecimen processing, biobanking & ultralow cold chain handling.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Research Nurses & Support</span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-1">Ms. Habiba Otho, Ms. Bushra Basheer, Mr. Nouman Ali, Ms. Muneeba Zaki</h5>
                    <p className="text-slate-500 text-[11px]">Patient consent assistance, vital sampling & clinical trial administration.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH POLICIES */}
          {activeTab === 'policies' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-500/30">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Official Institutional Framework</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Research & Publication Policy Guidelines
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    Asian Institute of Medical Sciences (AIMS) Hospital & Research Division establish this policy framework to govern the ethical conduct, ICMJE authorship criteria, peer-review dissemination, data stewardship, and scientific integrity across all clinical studies.
                  </p>
                </div>
              </div>

              {/* PDF Document Download Spotlight Card */}
              <div className="bg-white p-6 rounded-3xl border-2 border-cyan-500/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                    <FileText className="w-6 h-6" />
                    <span className="text-[9px] uppercase tracking-wider mt-0.5">PDF</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase bg-slate-900 text-cyan-400 px-2.5 py-0.5 rounded-full">
                        Doc No: AIMS-HYD-RD-POL-001
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Version 1.0 • Effective March 1, 2023
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900">
                      AIMS Research & Publication Policy (Official PDF)
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xl">
                      Standardized guidelines covering ICMJE authorship, IRB compliance, similarity limits (&lt;20%), data retention (5-10 yrs), and APC publication fee grants.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => handleDownload('AIMS-HYD-RD-POL-001_Research_Policy.pdf')}
                    className="w-full md:w-auto px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Policy PDF</span>
                  </button>
                </div>
              </div>

              {/* Policy Sections Grid */}
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>Policy Sections & Standards (AIMS-HYD-RD-POL-001)</span>
                  </h4>
                  <span className="text-xs font-bold text-slate-500">14 Core Articles</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Article 1 & 2 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Section 1.0 & 2.0
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900 mt-1">
                        Purpose, Scope & Definitions
                      </h5>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Scope:</strong> Applies to all medical, nursing, administrative staff, research fellows, trainees, interns, and external collaborators using AIMS Hospital facilities or patient data.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Author Criteria:</strong> Substantial intellectual contribution meeting all four criteria of the International Committee of Medical Journal Editors (ICMJE). Technical or admin support does not confer authorship.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Conflict of Interest (COI):</strong> Any personal, professional, or financial interest that could compromise research objectivity must be fully disclosed.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Article 3 & 4 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Section 3.0 & 4.0
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900 mt-1">
                        Ethical Standards & Authorship Criteria
                      </h5>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>IRB Approval:</strong> No research can commence and no manuscript can be submitted without prior written approval from AIMS Hospital IRB.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Participant Rights:</strong> Valid written informed consent is required. All identifying data must be completely de-identified prior to analysis and submission.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Authorship Disputes:</strong> Escalated to the Research Department and Executive Director for final institutional arbitration.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Article 5 & 6 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Section 5.0 & 6.0
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900 mt-1">
                        Institutional Affiliation & Data Stewardship
                      </h5>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Primary Affiliation:</strong> All publications from affiliated research must explicitly list <em>"Asian Institute of Medical Sciences (AIMS) Hospital, Hyderabad"</em> as primary institutional affiliation.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Data Ownership:</strong> All data, clinical records, and IP generated are the institutional property of AIMS Hospital.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Data Retention:</strong> Raw data, protocols, and analysis files must be securely retained for <strong>5 to 10 years</strong> post-publication.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Article 7 & 8 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Section 7.0 & 8.0
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900 mt-1">
                        Scientific Misconduct & Plagiarism Checks
                      </h5>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Similarity Limit (&lt;20%):</strong> All manuscripts must pass iThenticate / Turnitin anti-plagiarism screening with a similarity index under 20% (excluding references).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Duplicate Submission Ban:</strong> Submitting identical data concurrently to multiple journals is strictly prohibited and subject to committee disciplinary action.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span><strong>Sanctions:</strong> Violation consequences include paper retraction, suspension of research privileges, and employment termination.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Article 9, 10 & 11 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          Section 9.0, 10.0, 11.0 & 12.0
                        </span>
                        <h5 className="text-base font-extrabold text-slate-900 mt-1">
                          Collaborations, Journal Indexing & APC Financial Support
                        </h5>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        ICMJE • COPE • Helsinki
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <h6 className="font-bold text-slate-900">Journal Selection</h6>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          Manuscripts should target PubMed, Scopus, or Web of Science indexed journals adhering to COPE guidelines. Predatory journals are strictly barred.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <h6 className="font-bold text-slate-900">Co-Author Review Window</h6>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          Accepted manuscripts must be circulated to all co-authors for a minimum of <strong>15 working days</strong> prior to final publication.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <h6 className="font-bold text-slate-900">APC Financial Support</h6>
                        <p className="text-[11px] text-slate-600 leading-normal">
                          Institutional grants for Article Processing Charges (APCs) may be awarded upon approval by the Director for studies developed with the Research Dept.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INSTITUTIONAL REVIEW BOARD (IRB) */}
          {activeTab === 'irb' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Mission Statement */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 bg-cyan-950 text-cyan-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-800">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Institutional Review Board (IRB)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  The AIMS Institutional Review Board (IRB) is dedicated to ensuring that all research involving human participants is conducted with the highest ethical standards. The IRB safeguards the rights, dignity, safety, and well-being of research participants while promoting integrity, transparency, and excellence in research.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The Board reviews research proposals, protocol amendments, continuing reviews, and study closure reports to ensure compliance with institutional policies, national regulations, and internationally accepted ethical guidelines. Through an independent and transparent review process, the IRB supports responsible research that advances scientific knowledge and improves patient care.
                </p>
              </div>

              {/* Leadership Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                  IRB Leadership & Governance
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* IRB Chairperson */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950 flex flex-col items-center justify-center border border-cyan-500 shrink-0 text-cyan-400 shadow-sm">
                        <ShieldCheck className="w-6 h-6 mb-0.5" />
                        <span className="text-[10px] font-black tracking-widest text-white">SE</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          IRB Chairperson
                        </span>
                        <h5 className="text-base font-extrabold text-slate-900 mt-1">Dr. Saira Erum Ejaz</h5>
                        <p className="text-[11px] font-bold text-slate-600">PhD Scholar, M.Phil., MBA-HHCM, PharmD</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      Over 18 years of experience in hospital pharmacy, clinical services, pharmaceutical quality assurance, and healthcare management. She currently serves as Manager, Pharmacy Services at AIMS Hospital and is also the Chairperson of the Institutional Review Board (IRB), overseeing ethical review and research governance.
                    </p>
                  </div>

                  {/* IRB Coordinator */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center border border-slate-700 shrink-0 text-cyan-400 shadow-sm">
                        <UserCheck className="w-6 h-6 mb-0.5" />
                        <span className="text-[10px] font-black tracking-widest text-white">TS</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          IRB Coordinator
                        </span>
                        <h5 className="text-base font-extrabold text-slate-900 mt-1">Tehmina Sumair Siyal</h5>
                        <p className="text-[11px] font-bold text-slate-600">Bachelor's Degree in Social Science</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      Over 8 years of experience in the Healthcare System, with UNICEF and WHO supported public health programs, coordinating ethical reviews, study submissions, and compliance tracking.
                    </p>
                  </div>
                </div>
              </div>

              {/* IRB Members Board List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      AIMS Ethical Review Committee (ERC) Members
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Independent multidisciplinary ethics review board</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload('ERC Application Form')}
                      className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-[11px] rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download ERC Submission Form</span>
                    </button>
                    <button
                      onClick={() => handleDownload('AIMS Research Policies')}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-[11px] rounded-lg transition-all flex items-center gap-1.5 border border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>AIMS Research Policies</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="p-3 rounded-tl-xl">S.No.</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Qualification</th>
                        <th className="p-3 rounded-tr-xl">Designation (Role)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">1</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Rehmatullah Bhatti</td>
                        <td className="p-3 text-slate-600">MBBS, FCPS(Medicine), FCPS(Gastro), EMBH(Gastro)</td>
                        <td className="p-3"><span className="bg-cyan-100 text-cyan-900 font-black text-[10px] px-2 py-0.5 rounded-md uppercase">Chairperson</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">2</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Bushra Kadir</td>
                        <td className="p-3 text-slate-600">MBBS, FCPS(Gastro)</td>
                        <td className="p-3"><span className="bg-blue-100 text-blue-900 font-black text-[10px] px-2 py-0.5 rounded-md uppercase">Vice Chairperson / Member Secretary</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">3</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Saadat Ali Jiskani</td>
                        <td className="p-3 text-slate-600">MBBS, FCPS(Gastro), MRCP(Medicine)</td>
                        <td className="p-3"><span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Clinician Member</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">4</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Jawaid Khaskheli</td>
                        <td className="p-3 text-slate-600">MBBS, FCPS(Gastro)</td>
                        <td className="p-3"><span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Clinician Member</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">5</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Shakir Ali</td>
                        <td className="p-3 text-slate-600">MBBS, MCPS, M.Phil (Pathology)</td>
                        <td className="p-3"><span className="bg-purple-100 text-purple-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Basic Medical Scientist</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">6</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Manzoor Jamali</td>
                        <td className="p-3 text-slate-600">MBBS, FCPS (Psychiatry)</td>
                        <td className="p-3"><span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Ethicist / Social Scientist</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">7</td>
                        <td className="p-3 font-extrabold text-slate-900">Dr. Fatima Nadeem</td>
                        <td className="p-3 text-slate-600">Pharm-D, D. Pharmacology, M.Economics, MPhil, CRCP</td>
                        <td className="p-3"><span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Member (Pharmacy & Research Quality)</span></td>
                      </tr>
                      <tr className="hover:bg-cyan-50/50">
                        <td className="p-3 font-bold text-slate-500">8</td>
                        <td className="p-3 font-extrabold text-slate-900">Mr. Haris Ali</td>
                        <td className="p-3 text-slate-600">B.A</td>
                        <td className="p-3"><span className="bg-teal-100 text-teal-800 font-bold text-[10px] px-2 py-0.5 rounded-md">Community Representative</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ERC Decision Workflow & Approval Number Structure */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded border border-cyan-300">
                      Official ERC Process
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                      AIMS Ethics Review Committee (ERC) Decision & Approval Structure
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-slate-900 text-cyan-300 px-3 py-1 rounded-full">
                    Ref Format: AIMS/ERC/YYYY/ID
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-black text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1. Approved</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Full ethical clearance granted for protocol execution without revisions.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-black text-amber-700">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>2. Approved with Modifications</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Approval conditional upon minor protocol or consent form revisions.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-red-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-black text-red-700">
                      <X className="w-4 h-4 text-red-600" />
                      <span>3. Rejected</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Significant ethical concerns; requires resubmission with major protocol design changes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready to Submit Box */}
              <div className="bg-cyan-950 text-white p-6 rounded-2xl border border-cyan-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-base font-black text-white">Ready to Submit a Proposal?</h4>
                  <p className="text-xs text-cyan-200 mt-1">
                    Download the official IRB submission forms and submit to <strong className="text-white">irb@aimshospital.org.pk</strong>
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('forms')}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Go to IRB Forms</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: IRB SOPs */}
          {activeTab === 'sops' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-extrabold text-slate-900">IRB Standard Operating Procedures (SOPs)</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Download the official Standard Operating Procedures (SOPs) for the AIMS Institutional Review Board:
                </p>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 p-8 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center font-bold">
                  <Info className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">No SOP documents uploaded yet.</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Standard Operating Procedures are currently being finalized for online publication. To request SOP guidelines directly from the IRB Secretariat, please email <a href="mailto:irb@aimshospital.org.pk" className="text-cyan-700 font-bold underline">irb@aimshospital.org.pk</a>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: IRB APPLICATION FORMS */}
          {activeTab === 'forms' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">AIMS Ethics Review Committee (ERC) Forms & Templates</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Download the official AIMS ERC Application for Ethical Approval form and mandatory submission documents:
                  </p>
                </div>
                <a
                  href="mailto:irb@aimshospital.org.pk?subject=AIMS%20ERC%20Application%20Submission"
                  className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit ERC Application via Email</span>
                </a>
              </div>

              {/* FEATURED SPOTLIGHT: AIMS ERC Application Form (PDF) */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-cyan-500/50 text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                        Primary Application Form
                      </span>
                      <span className="bg-cyan-900/80 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-700">
                        Doc Ref: AIMS/ERC/
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white">
                      AIMS Ethics Review Committee (ERC) — Application for Ethical Approval
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Official 2-page institutional template for protocol submission. Required for all human subject research, clinical trials, and epidemiological studies at AIMS Hospital.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => handleDownload('AIMS_ERC_Application_for_Ethical_Approval.pdf')}
                      className="flex-1 md:flex-initial px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download ERC Form (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* Form Sections Breakdown & Submission Checklist */}
                <div className="pt-4 border-t border-slate-800 grid md:grid-cols-2 gap-4 relative z-10 text-xs">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                    <h5 className="font-extrabold text-cyan-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>Required Form Sections (AIMS/ERC)</span>
                    </h5>
                    <ul className="space-y-1.5 text-slate-300 text-[11px]">
                      <li>• <strong>1. Study Identification:</strong> Protocol Title, Version, Sponsor, Funding</li>
                      <li>• <strong>2. Investigator Info:</strong> Principal Investigator & Co-PI, Department</li>
                      <li>• <strong>3. Study Summary:</strong> Design, Population, Sample Size, Intervention & Control Arms, Outcome, Duration</li>
                      <li>• <strong>4. Ethical Considerations:</strong> Consent, Participant Risk, Benefit, Confidentiality, DSMB Oversight</li>
                      <li>• <strong>6. PI Declaration:</strong> Declaration of Helsinki & ICH-GCP Compliance</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                    <h5 className="font-extrabold text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Section 5: Mandatory Document Checklist</span>
                    </h5>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 text-[11px]">
                      <span>✓ Study Protocol (v.1.0)</span>
                      <span>✓ Protocol Synopsis</span>
                      <span>✓ Informed Consent Form</span>
                      <span>✓ Participant Info Sheet</span>
                      <span>✓ Case Report Forms (CRFs)</span>
                      <span>✓ PI & Co-PI CVs</span>
                      <span>✓ Conflict of Interest (COI)</span>
                      <span>✓ Ethical Review Form</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Application Forms Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Standardized Ethics Forms & Appendices
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { title: 'AIMS ERC Application for Ethical Approval Form (Official PDF)', tag: 'Core ERC Form', featured: true },
                    { title: 'Study Protocol (v.1.0) Template', tag: 'Mandatory Doc', featured: false },
                    { title: 'Protocol Synopsis Template', tag: 'Mandatory Doc', featured: false },
                    { title: 'Informed Consent Form Template (English)', tag: 'Mandatory Doc', featured: false },
                    { title: 'Informed Consent Form Template (Urdu)', tag: 'Mandatory Doc', featured: false },
                    { title: 'Participant Information Sheet (PIS)', tag: 'Mandatory Doc', featured: false },
                    { title: 'Case Report Forms (CRF) Template', tag: 'Mandatory Doc', featured: false },
                    { title: 'Conflict of Interest (COI) Declaration Form', tag: 'Mandatory Doc', featured: false },
                    { title: 'IRB / ERC Fee Form', tag: 'Finance', featured: false },
                    { title: 'Consent Waiver Request Form', tag: 'Waiver', featured: false },
                    { title: 'Continuing Review / Annual Progress Form', tag: 'Monitoring', featured: false },
                    { title: 'Study Closure & Final Report Form', tag: 'Closure', featured: false }
                  ].map((formItem, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        formItem.featured
                          ? 'bg-cyan-50/80 border-cyan-400 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                      }`}
                    >
                      <div>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                            formItem.featured
                              ? 'bg-cyan-600 text-white border-cyan-700'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {formItem.tag}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{formItem.title}</h5>
                      </div>
                      <button
                        onClick={() => handleDownload(formItem.title)}
                        className={`p-2 rounded-lg transition-colors shrink-0 ${
                          formItem.featured
                            ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                            : 'bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700'
                        }`}
                        title={`Download ${formItem.title}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PUBLICATIONS & LIBRARY */}
          {activeTab === 'publications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Research Publications & Library</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Peer-reviewed articles, case reports, and epidemiological trials published by AIMS research teams.
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search research publications..."
                      className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:border-cyan-600"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value as typeof filterType);
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-600 font-bold"
                  >
                    <option value="All">All Types</option>
                    <option value="Article">Article</option>
                    <option value="Case Report">Case Report</option>
                  </select>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex justify-between items-center text-xs text-slate-600 bg-slate-100 p-3 rounded-xl font-medium">
                <span>
                  Showing <strong className="text-slate-900">{filteredPublications.length}</strong> Publications Found
                </span>
                <span>
                  Page {currentPage} of {totalPages || 1}
                </span>
              </div>

              {/* Publications Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="p-3.5 pl-4">Study Title</th>
                        <th className="p-3.5">Authors</th>
                        <th className="p-3.5">Type</th>
                        <th className="p-3.5">Journal Published</th>
                        <th className="p-3.5">Date Published</th>
                        <th className="p-3.5 pr-4 text-right">DOI Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedPublications.map((pub) => (
                        <tr key={pub.id} className="hover:bg-cyan-50/50 transition-colors">
                          <td className="p-3.5 pl-4 font-bold text-slate-900 max-w-sm leading-snug">
                            {pub.title}
                          </td>
                          <td className="p-3.5 text-slate-700 whitespace-nowrap font-medium">
                            {pub.authors}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                pub.type === 'Article'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {pub.type}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-700 italic font-medium max-w-[160px]">
                            {pub.journal}
                          </td>
                          <td className="p-3.5 text-slate-600 whitespace-nowrap font-mono">
                            {pub.date}
                          </td>
                          <td className="p-3.5 pr-4 text-right whitespace-nowrap">
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-900 font-bold hover:underline"
                            >
                              <span>DOI</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                      {paginatedPublications.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                            No publications matching "{searchTerm}". Try clearing search keywords.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                            currentPage === page
                              ? 'bg-slate-900 text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Research Pipeline (Under Submission / Review) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      Ongoing & Submitted Manuscripts
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1">Research Pipeline</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Under Review at Top International Journals</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h5 className="font-extrabold text-slate-900 text-sm">
                        "South Asian-enriched gain-of-function variant HNF4A Pro437Ser protects against diabetes"
                      </h5>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                        Submitted to Nature Communications (2026)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">Reference Number: NCOMMS-26-056985</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h5 className="font-extrabold text-slate-900 text-sm">WATERLAND TRIAL</h5>
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                        Submitted to NEJM (2026)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">Multicenter Phase III Randomized Clinical Trial</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h5 className="font-extrabold text-slate-900 text-sm">
                        Navigating Zinner Syndrome: A Tale of Resilience and Multisystem Challenges (Case Report)
                      </h5>
                      <span className="bg-purple-100 text-purple-800 font-bold text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                        Submitted to BMC Urology (2025)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">Rare Congenital Anomaly Clinical Case Report</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT / RESEARCH OFFICE CONTACTS */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-extrabold text-slate-900">Contact for Research Collaborations</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  AIMS welcomes collaborations with academic institutions, healthcare organizations, contract research organizations (CROs), pharmaceutical and biotechnology companies, and independent investigators.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Research Contacts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200 inline-block">
                    Direct Research Contacts
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <h5 className="font-extrabold text-slate-900 text-sm">Prof. Dr. Muhammad Sadik Memon</h5>
                      <p className="text-slate-600 font-bold text-[11px]">Director of Clinical Sciences & Research</p>
                      <a href="mailto:sadikmemon@gmail.com" className="inline-flex items-center gap-1.5 text-cyan-700 font-bold hover:underline pt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>sadikmemon@gmail.com</span>
                      </a>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <h5 className="font-extrabold text-slate-900 text-sm">Dr. Fatima Nadeem</h5>
                      <p className="text-slate-600 font-bold text-[11px]">Deputy Director, Clinical Research</p>
                      <a href="mailto:fatima.nadeem@asianhospital.com.pk" className="inline-flex items-center gap-1.5 text-cyan-700 font-bold hover:underline pt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>fatima.nadeem@asianhospital.com.pk</span>
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">Institutional Address:</strong>
                        <span className="text-slate-600">Asian Institute of Medical Sciences (AIMS) Hospital, Hala Naka Road, Hyderabad, Sindh, Pakistan</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <strong className="text-slate-900">Website: </strong>
                        <a href="http://asianhospital.com.pk" target="_blank" rel="noopener noreferrer" className="text-cyan-700 font-bold hover:underline">
                          asianhospital.com.pk
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <strong className="text-slate-900">General Email: </strong>
                        <a href="mailto:aimshyd786@gmail.com" className="text-cyan-700 font-bold hover:underline">
                          aimshyd786@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions Action Card */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                      <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                      <span>ERC Submissions</span>
                    </div>
                    <h4 className="text-lg font-extrabold text-white">Ethical Approval & Trial Proposals</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Download the official ERC submission forms and submit study proposals, clinical trial protocols, or research inquiries directly to <strong className="text-cyan-300">irb@aimshospital.org.pk</strong> or <strong className="text-cyan-300">research@aimshospital.org.pk</strong>.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => setActiveTab('forms')}
                      className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download ERC Application Forms</span>
                    </button>
                    <a
                      href="mailto:irb@aimshospital.org.pk?subject=ERC%20Research%20Collaboration"
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Email Research Secretariat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-100 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2 text-slate-700">
            <Building2 className="w-4 h-4 text-cyan-600" />
            <span>Asian Institute of Medical Sciences (AIMS) Hospital Network & Research Division</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">Need assistance? irb@aimshospital.org.pk</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              Close Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
