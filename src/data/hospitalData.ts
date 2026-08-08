import {
  Department,
  Doctor,
  DiagnosticService,
  HealthPackage,
  HospitalBranch,
  NewsArticle,
  Testimonial,
  CareerListing,
  PatientRecord,
  Employee,
  EmployeeDepartment
} from '../types';

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Cardiac Surgery',
    category: 'clinical',
    shortDesc: 'Comprehensive care for complex heart conditions, minimally invasive angioplasty, and bypass surgeries.',
    fullDesc: 'The AIMS Institute of Cardiac Sciences is equipped with world-class bi-plane Cath Labs, 3D Echocardiography, and dedicated Cardiac ICUs. Our multidisciplinary cardiac team provides 24/7 emergency angioplasty (PPCI), heart failure management, and robotic-assisted bypass procedures.',
    iconName: 'HeartPulse',
    headOfDept: 'Dr. M. Umer Soomro, DM Cardiology',
    facilities: ['24/7 Primary PCI Cath Lab', 'Hybrid Cardiac OT', '3D TEE Echo', 'Intra-Aortic Balloon Pump (IABP)', 'Cardiac Rehabilitation Wing'],
    commonConditions: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia & Atrial Fibrillation', 'Valvular Heart Disease', 'Hypertension & Aortic Aneurysm'],
    procedures: ['Coronary Angiography & Stenting', 'CABG (Bypass Surgery)', 'Pacemaker & ICD Implantation', 'TAVR / TAVI (Valve Replacement)', 'EP Study & Radiofrequency Ablation'],
    opdTimings: 'Mon - Sat: 08:00 AM - 08:00 PM',
    bedCapacity: 120
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    category: 'clinical',
    shortDesc: 'Advanced stroke management, neuro-trauma, spine surgery, and brain tumor resection.',
    fullDesc: 'AIMS Neurological Institute features state-of-the-art intraoperative MRI navigation, neuro-endoscopy, and dedicated Comprehensive Stroke Units. We specialize in complex skull-base brain surgeries, Parkinson’s Deep Brain Stimulation (DBS), and minimally invasive spine procedures.',
    iconName: 'Brain',
    headOfDept: 'Dr. Tariq Mahmood, MCh Neurosurgery',
    facilities: ['Dedicated Stroke ICU', 'Intraoperative MRI Navigation', 'Neuro-Angiography Cath Lab', 'Video EEG Monitoring', 'Robotic Spine Guidance System'],
    commonConditions: ['Acute Ischemic & Hemorrhagic Stroke', 'Brain & Spinal Cord Tumors', 'Epilepsy & Seizures', 'Parkinson’s Disease & Tremors', 'Sciatica & Herniated Disc'],
    procedures: ['Mechanical Thrombectomy for Stroke', 'Micro-Neurosurgical Tumor Resection', 'Deep Brain Stimulation (DBS)', 'Endoscopic Spine Surgery', 'Aneurysm Coiling'],
    opdTimings: 'Mon - Sat: 09:00 AM - 07:00 PM',
    bedCapacity: 95
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Robotic Joint Replacement',
    category: 'surgical',
    shortDesc: 'Robotic knee/hip replacements, complex fracture care, sports medicine, and spine surgery.',
    fullDesc: 'Our Center for Orthopedic Excellence offers AI-guided robotic total knee and hip replacements that ensure sub-millimeter precision, minimal tissue injury, and faster recovery. We treat elite athletes, complex poly-trauma, and degenerative bone disorders.',
    iconName: 'Bone',
    headOfDept: 'Dr. Shahzad Ali, MS Ortho, FRCS',
    facilities: ['MAKO Robotic Joint Replacement Suite', 'Sports Medicine & Arthroscopy Lab', 'Computer-Navigated OT', 'Advanced Gait Analysis Studio', 'Dedicated Ortho Rehab'],
    commonConditions: ['Osteoarthritis & Joint Degeneration', 'ACL / Meniscus Tear', 'Complex Fractures & Trauma', 'Spinal Stenosis & Spondylolisthesis', 'Bone Tumors'],
    procedures: ['Robotic Total Knee Replacement (TKR)', 'Total Hip Replacement (THR)', 'Arthroscopic Knee/Shoulder Reconstruction', 'Complex Spine Fusion', 'Deformity Correction'],
    opdTimings: 'Mon - Sat: 08:30 AM - 07:30 PM',
    bedCapacity: 80
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Care & Oncology',
    category: 'clinical',
    shortDesc: 'Integrated Medical, Surgical, and Radiation Oncology with Precision Immunotherapy.',
    fullDesc: 'AIMS Cancer Center delivers holistic oncological care backed by Tumor Boards. Equipped with TrueBeam Linear Accelerator for targeted radiotherapy, Immunotherapy, Bone Marrow Transplant (BMT) unit, and organ-preserving surgical techniques.',
    iconName: 'Activity',
    headOfDept: 'Dr. Arslan Mehmood Soomro, MD, DM Medical Oncology',
    facilities: ['TrueBeam Radiotherapy Unit', 'HEPA-Filtered BMT Suite', 'Daycare Chemotherapy Lounge', 'PET-CT Diagnostic Imaging', 'Cancer Rehabilitation & Palliative Care'],
    commonConditions: ['Breast & Gynecological Cancer', 'Lung & Head-Neck Cancer', 'Leukemia & Lymphoma', 'GI & Colorectal Cancer', 'Prostate & Kidney Cancer'],
    procedures: ['Targeted Chemotherapy & Immunotherapy', 'Stereotactic Radiosurgery (SRS/SBRT)', 'Onco-Surgical Resection', 'Autologous BMT', 'HIPEC Procedure'],
    opdTimings: 'Mon - Sat: 09:00 AM - 06:00 PM',
    bedCapacity: 110
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology (NICU)',
    category: 'critical',
    shortDesc: 'Super-specialty child care, Level 4 NICU for premature babies, and pediatric surgery.',
    fullDesc: 'Designed to match international pediatric standards, AIMS Children’s Hospital provides compassionate care from birth through adolescence. Our Level 4 NICU/PICU is equipped with high-frequency ventilators, nitric oxide therapy, and pediatric sub-specialties.',
    iconName: 'Baby',
    headOfDept: 'Dr. Bushra Kadir, MD Pediatrics, Fellowship NICU',
    facilities: ['Level IV NICU with ECMO', 'Pediatric Cardiac ICU', 'Child Development & Autism Clinic', 'Pediatric Surgery OT', '24/7 Child Emergency'],
    commonConditions: ['Extreme Prematurity (<28 weeks)', 'Congenital Heart Defects', 'Pediatric Asthma & Pneumonia', 'Childhood Diabetes & Endocrine Disorders', 'Developmental Delays'],
    procedures: ['Surfactant Therapy & Neonatal Ventilation', 'Pediatric Cardiac Repair', 'Pediatric Laparoscopic Surgery', 'Immunization & Allergy Testing', 'Growth Monitoring'],
    opdTimings: 'Mon - Sun: 24/7 Emergency & OPD 08:00 AM - 08:00 PM',
    bedCapacity: 75
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Women’s Health',
    category: 'clinical',
    shortDesc: 'High-risk pregnancy management, birthing suites, IVF, and laparoscopic gynecology.',
    fullDesc: 'AIMS Women’s Center provides end-to-end obstetric and gynecological care. From luxury birthing suites to fetal medicine, IVF/fertility management, and 3D laparoscopic fibroid/hysterectomy surgeries.',
    iconName: 'Sparkles',
    headOfDept: 'Dr. Salma Parveen, MD OB-GYN',
    facilities: ['Luxury Birthing Suites (LDRP)', 'Fetal Medicine & 4D Ultrasound', 'Advanced IVF & Fertility Lab', 'Laparoscopic Gynaec OT', 'Urogynaecology Clinic'],
    commonConditions: ['High-Risk Pregnancy & Preeclampsia', 'PCOS / PCOD & Infertility', 'Uterine Fibroids & Endometriosis', 'Pelvic Organ Prolapse', 'Gynae Cancers'],
    procedures: ['Painless Normal Delivery & C-Section', '3D Laparoscopic Hysterectomy', 'IVF & ICSI Fertility Treatments', 'Fetal Echocardiography', 'Colposcopy'],
    opdTimings: 'Mon - Sat: 08:30 AM - 07:30 PM',
    bedCapacity: 70
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    category: 'clinical',
    shortDesc: 'Advanced GI endoscopy, liver transplant, ERCP, and digestive disorder management.',
    fullDesc: 'The Institute of Digestive & Liver Sciences offers comprehensive diagnostic and therapeutic endoscopic procedures (EUS, ERCP, Capsule Endoscopy) and a multi-disciplinary Liver Transplant unit.',
    iconName: 'Stethoscope',
    headOfDept: 'Prof. Dr. M. Sadik Memon, FCPS Gastroenterology',
    facilities: ['High-Definition Endoscopy Suites', 'Endoscopic Ultrasound (EUS)', 'SpyGlass Cholangioscopy', 'Dedicated Liver ICU', '24/7 GI Bleed Management'],
    commonConditions: ['Cirrhosis & Liver Failure', 'GERD & Peptic Ulcers', 'Inflammatory Bowel Disease (Crohn’s/UC)', 'Gallstones & Pancreatitis', 'GI Cancers'],
    procedures: ['Diagnostic & Therapeutic Endoscopy', 'ERCP for Bile Duct Stones', 'EUS-Guided Fine Needle Aspiration', 'Liver Transplantation', 'Third Space Endoscopy (POEM)'],
    opdTimings: 'Mon - Sat: 09:00 AM - 06:30 PM',
    bedCapacity: 60
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Urology',
    category: 'surgical',
    shortDesc: '24/7 Dialysis, Kidney Transplantation, Laser Kidney Stone Surgery, and Prostate Care.',
    fullDesc: 'AIMS Renal Sciences provides ultra-modern 50-bed hemodialysis unit, ABO-incompatible kidney transplants, holmium laser prostate surgery (HoLEP), and pediatric urology.',
    iconName: 'Droplet',
    headOfDept: 'Dr. Kashif Aziz Siddiqi, MCh Urology',
    facilities: ['50-Bed Dialysis Lounge with CRRT', 'Holmium Laser Urology Suite', 'Kidney Transplant ICU', 'Rigid & Flexible Ureteroscopy', 'Urodynamics Lab'],
    commonConditions: ['Chronic Kidney Disease (CKD)', 'Kidney Stones (Renal Calculi)', 'Prostate Enlargement (BPH)', 'Bladder & Kidney Cancer', 'Urinary Tract Infections'],
    procedures: ['Living & Deceased Donor Kidney Transplant', 'Laser Stone Lithotripsy (RIRS/PCNL)', 'Holmium Laser Enucleation of Prostate (HoLEP)', 'Hemodialysis & Peritoneal Dialysis', 'Laparoscopic Nephrectomy'],
    opdTimings: 'Mon - Sat: 08:30 AM - 07:00 PM',
    bedCapacity: 65
  },
  {
    id: 'radiology',
    name: 'Radiology & Advanced Imaging',
    category: 'diagnostic',
    shortDesc: '128-Slice Cardiac CT Scan, 3T Silent MRI, Digital X-Ray, and Interventional Radiology.',
    fullDesc: 'Equipped with sub-second ultra-fast 128-slice CT scan, high-resolution 3 Tesla MRI with neuro-functional imaging, digital mammography, and vascular interventional radiology suites.',
    iconName: 'Scan',
    headOfDept: 'Dr. Syed Azhar Shah, MD Radiology',
    facilities: ['128-Slice Ultra Fast CT Scanner', '3 Tesla Wide-Bore Silent MRI', 'Digital Flat-Panel Mammography', 'Color Doppler & 4D Ultrasound', 'Interventional Angiography Suite'],
    commonConditions: ['Coronary Calcium & Angio Screening', 'Acute Brain Ischemia / Stroke', 'Musculoskeletal Injuries', 'Internal Organ Vascular Bleeds', 'Oncology Staging'],
    procedures: ['Non-Invasive Cardiac CT Angiography', 'Whole Body MRI & Multiparametric Prostate MRI', 'CT-Guided Biopsy & Drainage', 'Vascular Embolization', 'Digital Mammography'],
    opdTimings: 'Mon - Sun: 24/7 Diagnostics Available',
    bedCapacity: 0
  },
  {
    id: 'emergency',
    name: 'Emergency & Level 1 Trauma Center',
    category: 'critical',
    shortDesc: '24/7 Immediate Resuscitation, Cardiac Shock Rooms, Dedicated Trauma OTs and Ambulances.',
    fullDesc: 'AIMS Emergency Care Center operates round-the-clock with dedicated Triage bays, Trauma Surgeons, Cardiac Resuscitation specialists, Advanced Life Support (ALS) Ambulances, and immediate CT/MRI priority imaging.',
    iconName: 'ShieldAlert',
    headOfDept: 'Dr. A Hafeez Soomro, MD Emergency Medicine',
    facilities: ['20-Bed Resuscitation & Triage Zone', 'Dedicated Emergency OT & Cath Lab Link', 'Fleet of ALS Mobile ICUs', 'Helipad for Air Ambulance', 'Poison & Toxicology Unit'],
    commonConditions: ['Polytrauma & Road Traffic Accidents', 'Acute Heart Attack (STEMI)', 'Acute Respiratory Distress', 'Severe Stroke & Coma', 'Burn Injuries & Poisoning'],
    procedures: ['Cardiopulmonary Resuscitation (CPR)', 'Emergency Airway Intubation', 'Trauma Resuscitation & Damage Control Surgery', 'Emergency Thrombolysis', 'Chest Tube Insertion'],
    opdTimings: 'Mon - Sun: 24/7/365 Non-Stop',
    bedCapacity: 50
  },
  {
    id: 'surgery',
    name: 'General & Laparoscopic Surgery',
    category: 'surgical',
    shortDesc: 'Advanced laparoscopic cholecystectomy, hernia repairs, pediatric and trauma surgery.',
    fullDesc: 'AIMS General & Laparoscopic Surgery Department features state-of-the-art operation theaters, minimally invasive laparoscopic units, and expert surgical consultants available round-the-clock for elective and emergency procedures.',
    iconName: 'Activity',
    headOfDept: 'Dr. Sohail Soomro, FCPS Surgery',
    facilities: ['Modular Surgical OTs', 'Laparoscopic Tower', 'Surgical ICU', '24/7 Emergency Surgery Unit'],
    commonConditions: ['Gallstones (Cholecystitis)', 'Inguinal & Ventral Hernia', 'Appendicitis', 'Soft Tissue Lesions', 'Trauma'],
    procedures: ['Laparoscopic Cholecystectomy', 'Hernioplasty / Hernia Repair', 'Laparoscopic Appendectomy', 'Thyroidectomy', 'Wound Management'],
    opdTimings: 'Mon - Sat: 09:00 AM - 06:00 PM',
    bedCapacity: 60
  },
  {
    id: 'dental',
    name: 'Dental & Maxillofacial Surgery',
    category: 'surgical',
    shortDesc: 'Comprehensive dental care, maxillofacial trauma, root canal treatments, and oral surgery.',
    fullDesc: 'Equipped with digital dental X-rays, painless root canal technology, and specialized oral and maxillofacial surgical facilities for trauma and corrective jaw surgery.',
    iconName: 'Sparkles',
    headOfDept: 'Dr. Arslan Mehmood Soomro, BDS, FCPS',
    facilities: ['Digital Dental X-Ray Studio', 'Maxillofacial OT Suite', 'Dental Implants Lab'],
    commonConditions: ['Dental Caries & Toothache', 'Impacted Wisdom Teeth', 'Facial Fractures & Jaw Trauma', 'Malocclusion', 'Gum Disease'],
    procedures: ['Painless Root Canal Treatment', 'Impacted Tooth Extraction', 'Facial Fracture Fixation', 'Dental Scaling & Polishing', 'Crowns & Bridges'],
    opdTimings: 'Mon - Sat: 09:00 AM - 06:00 PM',
    bedCapacity: 20
  },
  {
    id: 'ent',
    name: 'ENT & Head Neck Surgery',
    category: 'clinical',
    shortDesc: 'Ear, nose, throat, sinus endoscopy, hearing evaluation, and head & neck surgery.',
    fullDesc: 'AIMS ENT department provides advanced diagnostic video endoscopy, audiometry, endoscopic sinus surgery, and micro-ear surgeries.',
    iconName: 'Stethoscope',
    headOfDept: 'Dr. Ishfaque Ahmed Arain, FCPS ENT',
    facilities: ['Video Endoscopy Clinic', 'Audiometry Sound Proof Room', 'Micro-Ear Surgery Unit'],
    commonConditions: ['Chronic Sinusitis & Nasal Polyps', 'Tonsillitis & Adenoids', 'Hearing Loss & Tinnitus', 'Deviated Nasal Septum (DNS)', 'Vertigo'],
    procedures: ['Endoscopic Sinus Surgery (FESS)', 'Tonsillectomy & Adenoidectomy', 'Tympanoplasty / Ear Surgery', 'Septoplasty'],
    opdTimings: 'Mon - Sat: 09:00 AM - 05:00 PM',
    bedCapacity: 25
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Chest Diseases',
    category: 'clinical',
    shortDesc: 'Expert care for asthma, COPD, tuberculosis, lung infections, and sleep apnea.',
    fullDesc: 'The Respiratory Medicine Department features Pulmonary Function Testing (PFT) lab, Bronchoscopy suite, and Sleep Apnea clinic.',
    iconName: 'Activity',
    headOfDept: 'Dr. Sagheer Hussain Awan, FCPS Pulmonology',
    facilities: ['PFT Spirometry Lab', 'Video Bronchoscopy Suite', 'Sleep Diagnostics Lab'],
    commonConditions: ['Bronchial Asthma', 'COPD & Chronic Bronchitis', 'Pulmonary Tuberculosis', 'Sleep Apnea & Snoring', 'Pneumonia'],
    procedures: ['Pulmonary Function Test (PFT)', 'Diagnostic & Therapeutic Bronchoscopy', 'Sleep Study (Polysomnography)', 'Chest Drain Insertion'],
    opdTimings: 'Mon - Fri: 09:00 AM - 05:00 PM',
    bedCapacity: 40
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology & Diabetes Care',
    category: 'clinical',
    shortDesc: 'Comprehensive management of Diabetes Mellitus, Thyroid disorders, and hormonal diseases.',
    fullDesc: 'Dedicated endocrine center offering continuous glucose monitoring, diabetic foot screening, thyroid nodule evaluation, and metabolic management.',
    iconName: 'Sparkles',
    headOfDept: 'Dr. Sarwat Anjum, FCPS Endocrinology',
    facilities: ['Diabetic Care Clinic', 'Hormone Assay Lab', 'Continuous Glucose Monitoring'],
    commonConditions: ['Type 1 & Type 2 Diabetes Mellitus', 'Hypothyroidism & Hyperthyroidism', 'PCOS & Hormonal Imbalance', 'Adrenal & Pituitary Disorders'],
    procedures: ['Diabetic Screening & Neuropathy Assessment', 'Fine Needle Aspiration Thyroid', 'Insulin Pump Optimization'],
    opdTimings: 'Mon - Sat: 09:00 AM - 05:00 PM',
    bedCapacity: 30
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Behavioral Health',
    category: 'clinical',
    shortDesc: 'Holistic care for anxiety, depression, mood disorders, stress, and behavioral health.',
    fullDesc: 'Providing compassionate inpatient and outpatient mental health care, psychotherapy, stress counseling, and addiction rehabilitation support.',
    iconName: 'Brain',
    headOfDept: 'Dr. Zahoor Memon, FCPS Psychiatry',
    facilities: ['Private Counseling Rooms', 'De-Addiction Suite', 'Psychometric Assessment Lab'],
    commonConditions: ['Depression & Bipolar Disorder', 'Generalized Anxiety & Panic Disorder', 'OCD & PTSD', 'Stress & Insomnia', 'Substance Dependence'],
    procedures: ['Cognitive Behavioral Therapy (CBT)', 'Pharmacotherapy', 'Psychometric Evaluation', 'Stress Management Counseling'],
    opdTimings: 'Mon - Sat: 09:00 AM - 05:00 PM',
    bedCapacity: 25
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology & Autoimmune Care',
    category: 'clinical',
    shortDesc: 'Specialized management of Rheumatoid Arthritis, Lupus (SLE), Gout, and joint pain.',
    fullDesc: 'AIMS Rheumatology Center focuses on early diagnosis and biological therapies for autoimmune rheumatic diseases, vasculitis, and osteoporosis.',
    iconName: 'Bone',
    headOfDept: 'Dr. Abrar Ahmed Wagan, FCPS Rheumatology',
    facilities: ['Joint Aspiration Clinic', 'Biological Infusion Daycare', 'Autoimmune Panel Diagnostics'],
    commonConditions: ['Rheumatoid Arthritis', 'Systemic Lupus Erythematosus (SLE)', 'Ankylosing Spondylitis', 'Gout & Hyperuricemia', 'Vasculitis'],
    procedures: ['Intra-Articular Joint Injection', 'Biological Therapy Infusion', 'Rheumatoid Factor & ANA Diagnostics'],
    opdTimings: 'Mon - Sat: 09:00 AM - 05:00 PM',
    bedCapacity: 20
  }
];

export const DOCTORS_DATA: Doctor[] = [
  // OPD 01
  {
    id: 'doc-aims-1',
    name: 'Prof. Dr. M. Sadik Memon',
    title: 'Professor & Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS, Consultant Gastroenterologist',
    experienceYears: 22,
    rating: 4.95,
    reviewCount: 380,
    imageUrl: '',
    consultationFee: 2000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM - 05:00 PM']
    },
    bio: 'Professor and Consultant Gastroenterologist at AIMS Hospital specializing in advanced endoscopies, liver disorders, and complex GI tract diseases.',
    specializations: ['Advanced Endoscopy', 'Hepatology', 'GI Bleed Management', 'Liver Cirrhosis'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 01',
    opdNo: 'OPD 01',
    phone: '0300-9373868'
  },
  {
    id: 'doc-aims-2',
    name: 'Dr. M. Umer Soomro',
    title: 'Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, Gastroenterology Specialist',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 700,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['11:00 AM - 07:00 PM']
    },
    bio: 'Expert Gastroenterologist focused on stomach disorders, peptic ulcers, acid reflux, and routine endoscopies.',
    specializations: ['Gastritis Care', 'GERD & Ulcers', 'Diagnostic Endoscopy', 'Colonoscopy'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 01',
    opdNo: 'OPD 01',
    phone: '0334-3803359'
  },
  {
    id: 'doc-aims-3',
    name: 'Dr. Kashif Aziz Siddiqi',
    title: 'Consultant Radiologist',
    departmentId: 'radiology',
    departmentName: 'Radiology & Advanced Imaging',
    qualifications: 'MBBS, MCPS, FCPS (Radiology)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['11:00 AM - 06:00 PM']
    },
    bio: 'Consultant Radiologist specializing in CT scan angiography, 3T MRI interpretation, ultrasound, and diagnostic imaging.',
    specializations: ['128-Slice CT Angiography', '3T MRI Diagnostics', 'Color Doppler', 'Abdominal Imaging'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 01',
    opdNo: 'OPD 01',
    phone: '0333-2637266'
  },

  // OPD 02
  {
    id: 'doc-aims-4',
    name: 'Dr. Saadat Ali Jiskani',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 10,
    rating: 4.75,
    reviewCount: 140,
    imageUrl: '',
    consultationFee: 700,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:00 AM - 12:00 PM']
    },
    bio: 'Consultant Gastroenterologist treating digestive tract diseases, IBS, liver infections, and routine GI care.',
    specializations: ['IBS & Motility', 'Gastric Disorders', 'Diagnostic Endoscopy'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0300-9203248'
  },
  {
    id: 'doc-aims-5',
    name: 'Dr. Bushra Kadir',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS (Gastroenterology)',
    experienceYears: 11,
    rating: 4.85,
    reviewCount: 220,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM - 02:00 PM']
    },
    bio: 'Experienced female consultant gastroenterologist specializing in female GI disorders, inflammatory bowel disease, and stomach infections.',
    specializations: ['Female GI Health', 'IBD Care', 'Diagnostic Endoscopy', 'Hepatitis Management'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0313-1396330'
  },
  {
    id: 'doc-aims-6',
    name: 'Dr. Ubaidullah Bughio',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 160,
    imageUrl: '',
    consultationFee: 700,
    availability: {
      days: ['Sat'],
      timeSlots: ['11:00 AM - 05:00 PM']
    },
    bio: 'Weekend consultant gastroenterologist providing expert consultation for liver and GI diseases.',
    specializations: ['Hepatology', 'GI Endoscopy', 'Digestive Health'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0333-7079112'
  },
  {
    id: 'doc-aims-7',
    name: 'Dr. Sana Sheikh',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 9,
    rating: 4.82,
    reviewCount: 175,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Dedicated gastroenterologist offering comprehensive diagnostic and therapeutic GI services.',
    specializations: ['Gastric Ulcers', 'Endoscopy', 'Liver Disease Care'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0321-3071360'
  },
  {
    id: 'doc-aims-8',
    name: 'Dr. Madiha Zaki',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 10,
    rating: 4.84,
    reviewCount: 155,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Sat'],
      timeSlots: ['10:00 AM - 05:00 PM']
    },
    bio: 'Specialist in functional gastrointestinal disorders, colonoscopy, and metabolic liver conditions.',
    specializations: ['Colonoscopy', 'Functional GI Disorders', 'Hepatitis Care'],
    languages: ['Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0333-2600993'
  },
  {
    id: 'doc-aims-9',
    name: 'Dr. Khalid Laghari',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 16,
    rating: 4.88,
    reviewCount: 240,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM - 02:00 PM']
    },
    bio: 'Senior consultant handling critical gastroenterology cases, biliary interventions, and chronic liver failure.',
    specializations: ['Biliary Interventions', 'Liver Cirrhosis', 'Therapeutic Endoscopy'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0334-3233821'
  },
  {
    id: 'doc-aims-10',
    name: 'Dr. Muhammad Asif Baig',
    title: 'Consultant Liver Transplant Physician',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS, Fellowship Liver Transplant',
    experienceYears: 18,
    rating: 4.96,
    reviewCount: 310,
    imageUrl: '',
    consultationFee: 2000,
    availability: {
      days: ['As Per Schedule'],
      timeSlots: ['11:00 AM - 02:00 PM']
    },
    bio: 'Leading Liver Transplant Physician specializing in end-stage liver disease, post-transplant care, and complex hepatology.',
    specializations: ['Liver Transplantation', 'End-Stage Liver Disease Care', 'Complex Hepatology'],
    languages: ['Urdu', 'English', 'Sindhi'],
    location: 'AIMS Hospital Hyderabad - OPD 02',
    opdNo: 'OPD 02',
    phone: '0333-2656801'
  },

  // OPD 03
  {
    id: 'doc-aims-11',
    name: 'Dr. Rehmatullah Bhatti',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 13,
    rating: 4.83,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Tue', 'Wed'],
      timeSlots: ['11:00 AM - 02:00 PM']
    },
    bio: 'Consultant Gastroenterologist dedicated to stomach, bowel, and pancreatic illness management.',
    specializations: ['Pancreatitis', 'Stomach Disorders', 'Endoscopy'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2691018'
  },
  {
    id: 'doc-aims-12',
    name: 'Dr. A Hafeez Soomro',
    title: 'Consultant Physician & Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS (Internal Medicine & Gastroenterology)',
    experienceYears: 17,
    rating: 4.89,
    reviewCount: 280,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Sat'],
      timeSlots: ['11:00 AM - 02:00 PM']
    },
    bio: 'Senior Consultant Physician providing dual expertise in internal medicine and advanced gastroenterology.',
    specializations: ['General Internal Medicine', 'Gastroenterology', 'Chronic Disease Management'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0301-2141911'
  },
  {
    id: 'doc-aims-13',
    name: 'Dr. Jawaid Iqbal',
    title: 'Consultant Gastroenterologist',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, FCPS Gastroenterology',
    experienceYears: 14,
    rating: 4.81,
    reviewCount: 205,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Consultant Gastroenterologist focused on diagnostic colonoscopy, esophageal motility, and peptic disease.',
    specializations: ['Colonoscopy', 'Esophageal Motility', 'Acid Peptic Disease'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2918511'
  },
  {
    id: 'doc-aims-14',
    name: 'Dr. Zeeshan Hyder',
    title: 'Hepatobiliary & Liver Transplant Surgeon',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    qualifications: 'MBBS, MRCS (UK), FCPS',
    experienceYears: 16,
    rating: 4.97,
    reviewCount: 340,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Fri'],
      timeSlots: ['03:00 PM - 05:00 PM']
    },
    bio: 'Specialist in Hepatobiliary, Liver Transplant Surgery, and advanced gastrointestinal care.',
    specializations: ['Hepatobiliary Surgery', 'Liver Transplant', 'Advanced GI Care'],
    languages: ['Urdu', 'English', 'Sindhi'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2522028'
  },
  {
    id: 'doc-aims-15',
    name: 'Dr. Sohail Soomro',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    experienceYears: 15,
    rating: 4.87,
    reviewCount: 210,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Expert Consultant General Surgeon performing laparoscopic cholecystectomy, hernia repairs, and trauma surgeries.',
    specializations: ['Laparoscopic Cholecystectomy', 'Hernia Surgery', 'General Trauma'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-7345017'
  },
  {
    id: 'doc-aims-16',
    name: 'Dr. Imran Idress Memon',
    title: 'Consultant Urologist',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Urology',
    qualifications: 'MBBS, FCPS (Urology)',
    experienceYears: 14,
    rating: 4.88,
    reviewCount: 230,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['03:00 PM - 06:00 PM']
    },
    bio: 'Consultant Urologist skilled in kidney stone lithotripsy, prostate enlarged treatments (TURP), and urological oncology.',
    specializations: ['Kidney Stone Removal', 'TURP Prostate Surgery', 'Endourology'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2745326'
  },
  {
    id: 'doc-aims-17',
    name: 'Dr. Syed Azhar Shah',
    title: 'Consultant Urologist',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Urology',
    qualifications: 'MBBS, FCPS (Urology)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 260,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Senior Consultant Urologist treating urinary tract disorders, kidney stones, and male reproductive care.',
    specializations: ['Laser Lithotripsy', 'Bladder & Kidney Disorders', 'Uro-Oncology'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2607673',
    pmdc: '38114-S'
  },
  {
    id: 'doc-aims-18',
    name: 'Dr. Asadullah Kaboro',
    title: 'Consultant Nephrologist',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Urology',
    qualifications: 'MBBS, FCPS (Nephrology)',
    experienceYears: 13,
    rating: 4.86,
    reviewCount: 195,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Consultant Nephrologist specializing in chronic kidney disease management, dialysis management, and hypertension.',
    specializations: ['CKD Management', 'Hemodialysis Supervision', 'Hypertension'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0313-3138666'
  },
  {
    id: 'doc-aims-19',
    name: 'Dr. Irfan Ali Shah',
    title: 'Consultant Neurosurgeon',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, FCPS (Neurosurgery)',
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 275,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Fri'],
      timeSlots: ['03:00 PM - 05:00 PM']
    },
    bio: 'Consultant Neurosurgeon specializing in brain tumor surgery, spine neuro-trauma, and micro-neurosurgery.',
    specializations: ['Brain Tumor Resection', 'Spine Surgery', 'Neuro-trauma Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0308-2643667'
  },
  {
    id: 'doc-aims-20',
    name: 'Dr. Abrar Ahmed Wagan',
    title: 'Consultant Rheumatologist',
    departmentId: 'rheumatology',
    departmentName: 'Rheumatology & Autoimmune Care',
    qualifications: 'MBBS, FCPS (Rheumatology)',
    experienceYears: 11,
    rating: 4.89,
    reviewCount: 180,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Sat'],
      timeSlots: ['12:00 PM - 02:00 PM']
    },
    bio: 'Consultant Rheumatologist expert in arthritis, lupus (SLE), gout, vasculitis, and joint pain care.',
    specializations: ['Rheumatoid Arthritis', 'Lupus (SLE)', 'Osteoarthritis', 'Gout & Vasculitis'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0331-3406174'
  },
  {
    id: 'doc-aims-21',
    name: 'Dr. Sagheer Hussain Awan',
    title: 'Consultant Pulmonologist',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology & Chest Diseases',
    qualifications: 'MBBS, FCPS (Pulmonology)',
    experienceYears: 12,
    rating: 4.84,
    reviewCount: 210,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Consultant Pulmonologist specializing in asthma, COPD, tuberculosis, lung infections, and sleep apnea.',
    specializations: ['Asthma & Allergy', 'COPD & Bronchitis', 'Tuberculosis Care', 'Sleep Apnea'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2726597'
  },
  {
    id: 'doc-aims-22',
    name: 'Dr. Farhana Anjum',
    title: 'Consultant Gynecologist',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Women’s Health',
    qualifications: 'MBBS, FCPS (OB-GYN)',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 320,
    imageUrl: '',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:00 AM - 11:00 AM']
    },
    bio: 'Senior Consultant Gynecologist specializing in antenatal care, delivery, fibroids, and ovarian cyst management.',
    specializations: ['Antenatal & Maternity Care', 'Normal & C-Section Delivery', 'Gynecological Surgeries'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0300-3013807'
  },
  {
    id: 'doc-aims-23',
    name: 'Dr. Ghulam Sughra',
    title: 'Consultant Gynecologist',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Women’s Health',
    qualifications: 'MBBS, FCPS (OB-GYN)',
    experienceYears: 12,
    rating: 4.82,
    reviewCount: 250,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:00 AM - 02:00 PM']
    },
    bio: 'Consultant Gynecologist delivering compassionate women health services, infertility workup, and laparoscopic care.',
    specializations: ['Women Reproductive Health', 'PCOS Management', 'Infertility Workup'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0312-3098465'
  },
  {
    id: 'doc-aims-24',
    name: 'Dr. Asif Ali Qasim',
    title: 'Consultant Orthopaedic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MBBS, FCPS (Orthopedics)',
    experienceYears: 13,
    rating: 4.85,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Consultant Orthopaedic Surgeon specializing in fracture care, trauma reconstruction, and arthroscopy.',
    specializations: ['Fracture Fixation', 'Trauma Surgery', 'Arthroscopy'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2696393'
  },
  {
    id: 'doc-aims-25',
    name: 'Dr. Fahad Jatoi',
    title: 'Consultant Pediatric & Trauma Orthopaedic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MBBS, FCPS (Orthopedics), Pediatric Ortho Fellowship',
    experienceYears: 11,
    rating: 4.88,
    reviewCount: 200,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu'],
      timeSlots: ['03:00 PM - 05:00 PM']
    },
    bio: 'Specialist in pediatric bone deformities, clubfoot, pediatric trauma, and joint corrections.',
    specializations: ['Pediatric Bone Deformity', 'Clubfoot Correction', 'Trauma Surgery'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-9939614'
  },
  {
    id: 'doc-aims-26',
    name: 'Dr. Muhammad Anas Ilyas',
    title: 'Consultant Orthopaedic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MBBS, FCPS (Orthopedics)',
    experienceYears: 10,
    rating: 4.81,
    reviewCount: 170,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Consultant Orthopaedic Surgeon focusing on bone health, joint arthritis, and complex bone trauma.',
    specializations: ['Joint Pain Management', 'Arthritis Care', 'Bone Fractures'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0313-0113441'
  },
  {
    id: 'doc-aims-27',
    name: 'Dr. Sorath Bhutto',
    title: 'Consultant Oncologist',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Care & Oncology',
    qualifications: 'MBBS, FCPS (Oncology)',
    experienceYears: 12,
    rating: 4.93,
    reviewCount: 280,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Thu'],
      timeSlots: ['03:00 PM - 08:00 PM']
    },
    bio: 'Consultant Oncologist specializing in chemotherapy, targeted cancer therapies, and tumor care.',
    specializations: ['Medical Oncology', 'Chemotherapy Protocol', 'Breast Cancer Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0312-3971246'
  },
  {
    id: 'doc-aims-28',
    name: 'Dr. Sarwat Anjum',
    title: 'Consultant Endocrinologist',
    departmentId: 'endocrinology',
    departmentName: 'Endocrinology & Diabetes Care',
    qualifications: 'MBBS, FCPS (Endocrinology)',
    experienceYears: 11,
    rating: 4.87,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Sat'],
      timeSlots: ['11:00 AM - 02:00 PM']
    },
    bio: 'Consultant Endocrinologist specializing in type 1 & 2 diabetes, thyroid disorders, and hormonal imbalances.',
    specializations: ['Diabetes Mellitus Care', 'Thyroid Disorders', 'Hormonal Imbalance'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0331-3415471'
  },
  {
    id: 'doc-aims-29',
    name: 'Dr. Manzoor Jamali',
    title: 'Consultant Psychiatrist',
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry & Behavioral Health',
    qualifications: 'MBBS, FCPS (Psychiatry)',
    experienceYears: 15,
    rating: 4.86,
    reviewCount: 160,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['02:00 PM']
    },
    bio: 'Consultant Psychiatrist offering empathetic treatment for anxiety, depression, mood disorders, and psychosis.',
    specializations: ['Depression & Anxiety Care', 'Mood Disorders', 'Cognitive Behavioral Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-3264892'
  },
  {
    id: 'doc-aims-30',
    name: 'Dr. Zahoor Memon',
    title: 'Consultant Psychiatrist',
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry & Behavioral Health',
    qualifications: 'MBBS, FCPS (Psychiatry)',
    experienceYears: 14,
    rating: 4.83,
    reviewCount: 175,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Wed'],
      timeSlots: ['10:00 AM - 02:00 PM']
    },
    bio: 'Experienced Psychiatrist treating stress disorders, addiction recovery, and adult mental wellness.',
    specializations: ['Stress Management', 'Mental Health Wellness', 'Addiction Treatment'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2727535'
  },
  {
    id: 'doc-aims-31',
    name: 'Dr. Ishfaque Ahmed Arain',
    title: 'Consultant ENT Surgeon',
    departmentId: 'ent',
    departmentName: 'ENT & Head Neck Surgery',
    qualifications: 'MBBS, FCPS (Otorhinolaryngology / ENT)',
    experienceYears: 13,
    rating: 4.88,
    reviewCount: 220,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Thu'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Consultant ENT Surgeon specializing in sinus surgery, hearing loss, tonsillectomy, and throat procedures.',
    specializations: ['Endoscopic Sinus Surgery', 'Tonsil & Adenoid Surgery', 'Hearing Loss Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-7594123'
  },
  {
    id: 'doc-aims-32',
    name: 'Dr. Arslan Mehmood Soomro',
    title: 'Consultant Oral & Maxillofacial Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, FCPS (Oral & Maxillofacial Surgery)',
    experienceYears: 10,
    rating: 4.89,
    reviewCount: 150,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['Every Time']
    },
    bio: 'Consultant Maxillofacial Surgeon treating facial fractures, jaw tumors, wisdom tooth impactions, and corrective jaw surgery.',
    specializations: ['Facial Trauma & Fracture', 'Jaw Surgery', 'Impacted Tooth Surgery'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-3272050'
  },
  {
    id: 'doc-aims-33',
    name: 'Dr. Jameel Sattar',
    title: 'Consultant Dental Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, Dental Surgery Specialist',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 240,
    imageUrl: '',
    consultationFee: 500,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM - 05:00 PM']
    },
    bio: 'Consultant Dental Surgeon offering root canals, dental crowns, teeth whitening, and fillings.',
    specializations: ['Root Canal Treatment', 'Dental Restorations', 'Crowns & Bridges'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0302-2197841'
  },
  {
    id: 'doc-aims-34',
    name: 'Dr. Rabia / Dr. Fiza',
    title: 'Consultant Dental Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, General Dental Surgery',
    experienceYears: 8,
    rating: 4.75,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 200,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM - 05:00 PM']
    },
    bio: 'Dental Surgeons providing affordable, high-quality dental scaling, extractions, and oral hygiene care.',
    specializations: ['Teeth Cleaning & Scaling', 'Tooth Extractions', 'Preventive Dentistry'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2451823'
  },
  {
    id: 'doc-aims-35',
    name: 'Dr. Faiz Memon',
    title: 'Consultant Dental Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, Dental Specialist',
    experienceYears: 11,
    rating: 4.82,
    reviewCount: 160,
    imageUrl: '',
    consultationFee: 300,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['12:00 PM - 02:00 PM']
    },
    bio: 'Consultant Dental Surgeon providing comprehensive dental care and restorative procedures.',
    specializations: ['Dental Fillings', 'Cosmetic Dentistry', 'Oral Surgery'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0320-3015309'
  },
  {
    id: 'doc-aims-36',
    name: 'Dr. Ghulam Murtaza',
    title: 'Consultant Dental Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, Dental Specialist',
    experienceYears: 10,
    rating: 4.8,
    reviewCount: 140,
    imageUrl: '',
    consultationFee: 300,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 06:00 PM']
    },
    bio: 'Dental specialist focusing on afternoon dental consultations and procedures.',
    specializations: ['Endodontics', 'Dental Prosthetics', 'Tooth Scaling'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2549043'
  },
  {
    id: 'doc-aims-37',
    name: 'Dr. Naeem Babar',
    title: 'Consultant Anaesthetist',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Anaesthesiology)',
    experienceYears: 17,
    rating: 4.95,
    reviewCount: 120,
    imageUrl: '',
    consultationFee: 5000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['03:00 PM - 06:00 PM']
    },
    bio: 'Senior Consultant Anaesthetist specializing in surgical anesthesia, critical pain management, and ICU sedation.',
    specializations: ['General Anesthesia', 'Epidural & Regional Anesthesia', 'Critical Pain Care'],
    languages: ['Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0334-3199210'
  },
  {
    id: 'doc-aims-38',
    name: 'Dr. Zulfiqar Ahmed',
    title: 'Consultant Urologist',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Urology',
    qualifications: 'MBBS, FCPS (Urology)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 220,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['Every Time']
    },
    bio: 'Consultant Urologist available on call for emergency stone obstructions, urinary retention, and trauma.',
    specializations: ['Emergency Urology', 'Kidney Stones', 'Bladder Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2502143'
  },
  {
    id: 'doc-aims-39',
    name: 'Dr. Masood-Uz-Zaman',
    title: 'Consultant Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, FCPS (Neurology)',
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 260,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call / Admit'],
      timeSlots: ['03:00 PM - 04:00 PM']
    },
    bio: 'Consultant Neurologist specializing in stroke management, epilepsy, neuropathy, and migraine.',
    specializations: ['Stroke Care', 'Epilepsy & Seizures', 'Migraine & Headache Care'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2584012'
  },
  {
    id: 'doc-aims-40',
    name: 'Dr. Gashia Ali Shah',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    experienceYears: 12,
    rating: 4.86,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['03:00 PM - 04:00 PM']
    },
    bio: 'Consultant General Surgeon specializing in laparoscopic procedures, emergency appendectomy, and breast surgery.',
    specializations: ['Laparoscopic Surgery', 'Emergency Surgery', 'Breast Disease Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0334-2806651'
  },
  {
    id: 'doc-aims-41',
    name: 'Dr. Amjed Bhurt',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    experienceYears: 14,
    rating: 4.84,
    reviewCount: 180,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['03:00 PM - 04:00 PM']
    },
    bio: 'Consultant General Surgeon managing gastrointestinal surgeries, wound care, and abdominal procedures.',
    specializations: ['Abdominal Surgeries', 'Gastrointestinal Surgery', 'Soft Tissue Trauma'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0331-5045880'
  },
  {
    id: 'doc-aims-42',
    name: 'Dr. Mahjabeen Memon',
    title: 'Consultant Neurosurgeon',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, FCPS (Neurosurgery)',
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['01:00 PM - 05:00 PM']
    },
    bio: 'Consultant Neurosurgeon specializing in brain injury care, spinal stabilization, and pediatric neurosurgery.',
    specializations: ['Neuro-trauma', 'Spine Stabilization', 'Hydrocephalus Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0300-3358474'
  },
  {
    id: 'doc-aims-43',
    name: 'Dr. Abida Durrani',
    title: 'Consultant Gynaecologist',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Women’s Health',
    qualifications: 'MBBS, FCPS (OB-GYN)',
    experienceYears: 16,
    rating: 4.93,
    reviewCount: 390,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timeSlots: ['03:00 PM - 10:00 PM']
    },
    bio: 'Senior Consultant Gynaecologist offering daily evening OPD consultations for obstetrics and gynecology.',
    specializations: ['Evening Maternity OPD', 'High Risk Births', 'Laparoscopic Surgery'],
    languages: ['Urdu', 'English', 'Sindhi'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0300-0216088'
  },
  {
    id: 'doc-aims-44',
    name: 'Dr. Farhan',
    title: 'Consultant Radiologist',
    departmentId: 'radiology',
    departmentName: 'Radiology & Advanced Imaging',
    qualifications: 'MBBS, FCPS (Radiology)',
    experienceYears: 11,
    rating: 4.81,
    reviewCount: 130,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Fri'],
      timeSlots: ['04:00 PM - 07:00 PM']
    },
    bio: 'Consultant Radiologist specializing in diagnostic ultrasound, CT scans, and X-ray reporting.',
    specializations: ['Diagnostic Ultrasound', 'CT Scan Reporting', 'X-Ray Diagnostics'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0336-0341182'
  },
  {
    id: 'doc-aims-45',
    name: 'Dr. Mubashar Memon',
    title: 'Consultant Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, FCPS (Neurology)',
    experienceYears: 14,
    rating: 4.89,
    reviewCount: 240,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Wed', 'Fri'],
      timeSlots: ['06:00 PM - 08:00 PM']
    },
    bio: 'Consultant Neurologist expert in peripheral neuropathy, epilepsy control, and movement disorders.',
    specializations: ['Epilepsy Control', 'Neuropathy', 'Parkinsonism Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2743316'
  },
  {
    id: 'doc-aims-46',
    name: 'Dr. Muhammad Kamran',
    title: 'Consultant Vascular Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Vascular Surgery',
    qualifications: 'MBBS, FCPS (Vascular Surgery)',
    experienceYears: 13,
    rating: 4.91,
    reviewCount: 200,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Sat'],
      timeSlots: ['03:00 PM - 05:00 PM']
    },
    bio: 'Consultant Vascular Surgeon treating varicose veins, diabetic foot vascular issues, and arterial bypasses.',
    specializations: ['Varicose Vein Laser', 'Diabetic Foot Salvage', 'Vascular Bypass'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-7014478'
  },
  {
    id: 'doc-aims-47',
    name: 'Dr. Durr-e-Shahwar Hayat',
    title: 'Consultant Diagnostic Radiology',
    departmentId: 'radiology',
    departmentName: 'Radiology & Advanced Imaging',
    qualifications: 'MBBS, FCPS (Radiology)',
    experienceYears: 12,
    rating: 4.88,
    reviewCount: 190,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['12:00 PM - 04:00 PM']
    },
    bio: 'Consultant Diagnostic Radiologist focusing on women imaging, mammography, pelvic MRI, and CT reporting.',
    specializations: ['Mammography', 'Pelvic Imaging', 'CT & MRI Diagnostics'],
    languages: ['Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0332-3735054'
  },
  {
    id: 'doc-aims-48',
    name: 'Dr. Ayesha Altaf',
    title: 'Consultant Gynecologist',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Women’s Health',
    qualifications: 'MBBS, FCPS (OB-GYN)',
    experienceYears: 10,
    rating: 4.85,
    reviewCount: 180,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['02:00 PM - 04:00 PM']
    },
    bio: 'Consultant Gynecologist providing routine and high-risk pregnancy care, family planning, and gynae consultations.',
    specializations: ['Antenatal Care', 'Family Planning', 'Gynae Consultations'],
    languages: ['Urdu', 'English', 'Sindhi'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0329-2129893'
  },
  {
    id: 'doc-aims-49',
    name: 'Dr. Muhammad Owais',
    title: 'Consultant Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Cardiac Surgery',
    qualifications: 'MBBS, FCPS (Cardiology)',
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 310,
    imageUrl: '',
    consultationFee: 1200,
    availability: {
      days: ['On Call'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Consultant Cardiologist specializing in echocardiography, hypertension, angina, and cardiac care.',
    specializations: ['Echocardiography', 'Hypertension Management', 'Coronary Care'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-2891060'
  },
  {
    id: 'doc-aims-50',
    name: 'Dr. Muhammad Ismail',
    title: 'Consultant Oral & Maxillofacial Surgeon',
    departmentId: 'dental',
    departmentName: 'Dental & Maxillofacial Surgery',
    qualifications: 'BDS, FCPS (Oral & Maxillofacial Surgery)',
    experienceYears: 11,
    rating: 4.87,
    reviewCount: 160,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['On Call'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Consultant Maxillofacial Surgeon specializing in facial trauma reconstructive surgery and complex extractions.',
    specializations: ['Facial Trauma Surgery', 'Reconstructive Surgery', 'Complex Tooth Extraction'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0347-9462226'
  },
  {
    id: 'doc-aims-51',
    name: 'Dr. Alam Ara',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (General Surgery)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 270,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed'],
      timeSlots: ['09:00 AM - 02:00 PM']
    },
    bio: 'Senior Female Consultant General Surgeon specializing in laparoscopic gallstone surgery, thyroid, and hernia surgery.',
    specializations: ['Female Laparoscopic Surgery', 'Thyroidectomy', 'Hernia Repair'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0336-0356092'
  },
  {
    id: 'doc-aims-52',
    name: 'Dr. Maira Sangrasi',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    experienceYears: 11,
    rating: 4.84,
    reviewCount: 195,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 06:00 PM']
    },
    bio: 'Consultant General Surgeon providing afternoon surgical consultations, minor OTs, and wound care.',
    specializations: ['General Surgery', 'Minor OT Procedures', 'Wound Management'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0333-1379627'
  },
  {
    id: 'doc-aims-53',
    name: 'Dr. Saadam Zia',
    title: 'Consultant General Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    experienceYears: 10,
    rating: 4.82,
    reviewCount: 180,
    imageUrl: '',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 06:00 PM']
    },
    bio: 'Consultant Surgeon specializing in appendectomy, gallbladder, and soft tissue surgeries.',
    specializations: ['Appendectomy', 'Gallbladder Surgery', 'Soft Tissue Lesions'],
    languages: ['Urdu', 'Sindhi', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0303-2306246'
  },
  {
    id: 'doc-aims-54',
    name: 'Dr. Najeebullah Metlo',
    title: 'Consultant Pediatric General & Laparoscopic Surgeon',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatology (NICU)',
    qualifications: 'MBBS, FCPS (Pediatric Surgery)',
    experienceYears: 15,
    rating: 4.93,
    reviewCount: 320,
    imageUrl: '',
    consultationFee: 1200,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['02:00 PM - 05:00 PM']
    },
    bio: 'Specialist Consultant Pediatric & Laparoscopic Surgeon performing neonatal surgeries, pediatric hernia, and congenital surgeries.',
    specializations: ['Pediatric Laparoscopy', 'Neonatal Surgery', 'Congenital Anomaly Correction'],
    languages: ['Sindhi', 'Urdu', 'English'],
    location: 'AIMS Hospital Hyderabad - OPD 03',
    opdNo: 'OPD 03',
    phone: '0303-2306246'
  }
];

export const DIAGNOSTICS_DATA: DiagnosticService[] = [
  {
    id: 'ct-scan-128',
    name: '128-Slice Cardiac CT Scan & Angiography',
    category: 'radiology',
    shortDesc: 'Ultra-fast, sub-second non-invasive scan of coronary arteries and full body soft tissues with minimal radiation.',
    fullDesc: 'AIMS Hospital houses state-of-the-art 128-slice CT imaging technology. It captures high-definition 3D images of the beating heart and coronary arteries within 5 heartbeats, evaluating arterial blockages, calcium scores, pulmonary embolism, and acute aortic dissections without requiring invasive catheterization.',
    turnaroundTime: 'Same Day (Within 2 - 4 Hours)',
    preparationInstructions: [
      'Fast for 4 hours prior to scan (water is allowed).',
      'Avoid caffeinated beverages, coffee, and energy drinks 12 hours before cardiac CT.',
      'Check Serum Creatinine level if contrast dye injection is planned.',
      'Inform the technician if you have a history of asthma, iodine allergy, or kidney disease.'
    ],
    price: 6500,
    badge: '128-Slice Technology',
    features: [
      'Sub-second 3D Heart Scan',
      'Ultra Low Radiation Dose (AIDR 3D Tech)',
      'Non-Invasive Coronary Angiogram',
      'Calcium Scoring & Plaque Characterization',
      'Instant AI-Assisted Radiologist Report'
    ],
    faqs: [
      {
        question: 'What is the advantage of 128-slice CT over standard CT scanners?',
        answer: 'A 128-slice scanner rotates around the body in a fraction of a second, providing 128 anatomical cuts per rotation. This speed allows ultra-crisp imaging of moving organs like the heart, reducing motion blur and radiation exposure by up to 60%.'
      },
      {
        question: 'Is contrast dye mandatory for CT Angiography?',
        answer: 'Yes, for visual clarity of blood vessel lumens, an intravenous contrast agent is administered. Our staff pre-screens kidney function to ensure safety.'
      },
      {
        question: 'When will I get my CT Scan report?',
        answer: 'Digital images are uploaded to your Patient Portal instantly, and signed radiologist reports are finalized within 2-4 hours.'
      }
    ],
    isFeaturedCTScan: true
  },
  {
    id: 'mri-3t',
    name: '3 Tesla Silent MRI (Brain, Spine & Joints)',
    category: 'radiology',
    shortDesc: 'High-resolution 3T MRI scanner offering noise reduction technology and exceptional soft-tissue contrast.',
    fullDesc: 'Our 3T MRI provides ultra-high resolution neuro imaging, cartilage mapping, multiparametric prostate MRI, and stroke diagnostic protocols with 70% acoustic noise reduction for maximum patient comfort.',
    turnaroundTime: 'Within 6 Hours',
    preparationInstructions: [
      'Remove all metallic objects, jewelry, watches, and hairpins.',
      'Notify staff if you have cardiac pacemakers, metallic implants, or aneurysm clips.',
      'No fasting required for non-contrast brain or joint scans.'
    ],
    price: 8500,
    badge: '3 Tesla High Field',
    features: [
      'Wide-Bore Ultra Comfortable Design',
      'Silent Scan Acoustic Dampening',
      'Advanced Diffusion Neuro Imaging',
      'Non-Contrast Angiography Available'
    ],
    faqs: [
      {
        question: 'Does 3T MRI involve any radiation?',
        answer: 'No, MRI uses powerful magnetic fields and radio waves, producing zero ionizing radiation.'
      }
    ]
  },
  {
    id: 'digital-xray',
    name: 'Digital Flat-Panel X-Ray',
    category: 'radiology',
    shortDesc: 'Low-dose, instant digital X-ray with crystal clear resolution for bone fractures and chest conditions.',
    fullDesc: 'Flat-panel digital radiograph system delivering instant high-definition chest, spine, and joint images directly to consulting doctors’ screens.',
    turnaroundTime: 'Within 30 Minutes',
    preparationInstructions: [
      'No advance fasting required.',
      'Wear comfortable clothing without zippers or metal buttons.'
    ],
    price: 600,
    features: [
      'Instant Digital Picture Archiving (PACS)',
      'Low Radiation Exposure',
      'High Contrast Resolution'
    ],
    faqs: []
  },
  {
    id: 'pathology-lab',
    name: 'Advanced Pathology & Blood Diagnostics',
    category: 'pathology',
    shortDesc: 'NABL Accredited automated pathology testing including CBC, Lipid, Thyroid, HbA1c, and Tumor Markers.',
    fullDesc: 'Automated robopathology laboratory equipped with barcoded sample tracking, strict internal quality controls, and home sample collection services.',
    turnaroundTime: 'Same Day (Within 3 Hours)',
    preparationInstructions: [
      '10-12 hours overnight fasting required for Lipid Profile and Fasting Blood Sugar.',
      'Water can be consumed freely.'
    ],
    price: 1200,
    features: [
      'NABL & CAP Accredited Testing',
      '100% Automated Sample Processing',
      'Barcoded Sample Security',
      'Free Home Sample Collection'
    ],
    faqs: []
  },
  {
    id: 'echocardiogram',
    name: '3D Color Doppler Echocardiography',
    category: 'cardiology',
    shortDesc: 'Ultrasound evaluation of cardiac heart valves, ejection fraction, and wall motion abnormalities.',
    fullDesc: 'Performed by senior cardiologists using high-frequency phased array ultrasound probes to assess cardiac pump function and valve leaks.',
    turnaroundTime: 'Immediate (Within 45 Minutes)',
    preparationInstructions: [
      'No special diet restrictions required.',
      'Wear a front-buttoned loose shirt for quick examination.'
    ],
    price: 2500,
    features: [
      'Real-Time 3D Valve Assessment',
      'Strain Imaging & Ejection Fraction',
      'Pediatric & Adult Probes'
    ],
    faqs: []
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-executive',
    title: 'AIMS Executive Full Body Checkup',
    targetAudience: 'Men & Women aged 30-60 looking for complete vital organ screening.',
    testsIncludedCount: 78,
    testsList: [
      'Complete Blood Count (CBC) with ESR',
      'Comprehensive Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (LFT - 11 Parameters)',
      'Kidney Function Test (KFT - Creatinine, Urea, Uric Acid)',
      'HbA1c & Fasting Blood Sugar',
      'Thyroid Profile (T3, T4, TSH)',
      '12-Lead ECG & Chest X-Ray',
      'Abdomen & Pelvis Ultrasound',
      'Doctor & Dietitian Consultation'
    ],
    originalPrice: 8500,
    discountedPrice: 4200,
    preparationNotes: '10-12 hours overnight fasting mandatory. Morning blood sample required.',
    recommendedFor: 'Annual Preventive Health Screening',
    isPopular: true
  },
  {
    id: 'pkg-cardiac',
    title: 'Cardiac Shield Pro Package',
    targetAudience: 'Individuals with family history of heart disease, hypertension, or high stress.',
    testsIncludedCount: 45,
    testsList: [
      '128-Slice Cardiac CT Calcium Scoring',
      '3D Color Doppler Echocardiography',
      'Treadmill Stress Test (TMT)',
      'Comprehensive Lipid & Apo-B Profile',
      'High-Sensitivity CRP (hs-CRP)',
      'HbA1c & Kidney Profile',
      'Senior Cardiologist Consultation'
    ],
    originalPrice: 12000,
    discountedPrice: 6900,
    preparationNotes: 'Avoid caffeine 12 hours prior. Wear sports shoes for TMT test.',
    recommendedFor: 'Heart Disease Prevention & Risk Assessment',
    isPopular: true
  },
  {
    id: 'pkg-women',
    title: 'AIMS Women Wellness & Breast Health',
    targetAudience: 'Women aged 25+ seeking hormonal, bone, and cervical/breast screening.',
    testsIncludedCount: 52,
    testsList: [
      'Digital Mammography / Breast Ultrasound',
      'Pap Smear Screening',
      'Thyroid & Vitamin D3 / B12 Profile',
      'Complete Hemogram & Iron Studies',
      'Bone Mineral Density (DEXA Scan)',
      'Pelvis Sonography',
      'Senior Gynecologist Consultation'
    ],
    originalPrice: 9000,
    discountedPrice: 4800,
    preparationNotes: 'Schedule 7-10 days after menstrual cycle for Mammography & Pap Smear.',
    recommendedFor: 'Women’s Preventive Health & Hormonal Balance'
  },
  {
    id: 'pkg-senior',
    title: 'Comprehensive Senior Citizen Care',
    targetAudience: 'Seniors aged 60+ requiring cardiac, joint, prostate/gynae and diabetic care.',
    testsIncludedCount: 84,
    testsList: [
      'All Vital Organ Panels (Liver, Kidney, Lipid, Thyroid)',
      'HbA1c & Average Blood Glucose',
      'PSA (Prostate Specific Antigen) for Men / Pap Smear for Women',
      'ECG & 2D Echo',
      'Bone Mineral Density DEXA',
      'Eye & Hearing Screening',
      'Geriatrician & Orthopedic Consultation'
    ],
    originalPrice: 11000,
    discountedPrice: 5500,
    preparationNotes: '10-12 hours overnight fasting required. Bring current prescription details.',
    recommendedFor: 'Active Senior Health & Longevity Management'
  }
];

export const HOSPITAL_BRANCHES: HospitalBranch[] = [
  {
    id: 'branch-main',
    name: 'AIMS Main Super Specialty Hospital',
    type: 'Main Campus',
    address: 'C9VJ+6V, Aims Hospital Road Hala Naka, Hyderabad, 71000, Pakistan',
    city: 'Hyderabad, Sindh',
    emergencyNumber: '1066 / +92 22 111 246 799',
    opdNumber: '+92 22 2100900',
    email: 'info@aimshospital.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=C9VJ%2B6V%2C+Aims+Hospital+Road+Hala+Naka%2C+Hyderabad%2C+71000%2C+Pakistan',
    lat: 25.3960,
    lng: 68.3578,
    icuBedsAvailable: 28,
    is24x7Emergency: true,
    imagingFacilities: ['128-Slice CT Scan', '3T Silent MRI', 'PET-CT', 'Bi-Plane Cath Lab', 'Robotic OT Suite']
  },
  {
    id: 'branch-neuro-heart',
    name: 'AIMS Cardiac & Neuro Sciences Center',
    type: 'Super Specialty Hub',
    address: 'C9VJ+6V, Aims Hospital Road Hala Naka, Hyderabad, 71000, Pakistan',
    city: 'Hyderabad, Sindh',
    emergencyNumber: '1066 / +92 22 111 246 788',
    opdNumber: '+92 22 2100910',
    email: 'heart-neuro@aimshospital.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=C9VJ%2B6V%2C+Aims+Hospital+Road+Hala+Naka%2C+Hyderabad%2C+71000%2C+Pakistan',
    lat: 25.3970,
    lng: 68.3585,
    icuBedsAvailable: 15,
    is24x7Emergency: true,
    imagingFacilities: ['128-Slice CT', '3T MRI', 'Intraoperative MRI', 'Stroke Cath Lab']
  },
  {
    id: 'branch-women-child',
    name: 'AIMS Women & Children Specialty Center',
    type: 'Children & Women',
    address: 'Autobahn Road, Unit 7 Latifabad, Hyderabad, 71000, Pakistan',
    city: 'Hyderabad, Sindh',
    emergencyNumber: '1066 / +92 22 111 246 777',
    opdNumber: '+92 22 2100920',
    email: 'womenchild@aimshospital.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Autobahn+Road+Latifabad+Hyderabad+Pakistan',
    lat: 25.3680,
    lng: 68.3610,
    icuBedsAvailable: 12,
    is24x7Emergency: true,
    imagingFacilities: ['4D Obstetric Ultrasound', 'Fetal Echo', 'Digital Mammography']
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'AIMS Hospital Introduces Next-Gen 128-Slice Cardiac CT Angiography',
    category: 'Medical Breakthrough',
    date: 'August 1, 2026',
    author: 'Dr. M. Umer Soomro',
    authorRole: 'Chairman & Chief Cardiologist',
    readTime: '4 min read',
    summary: 'AIMS Hospital announces the commissioning of ultra-fast 128-slice CT scanner enabling non-invasive 5-second heart screening with 60% less radiation.',
    content: 'Coronary artery disease remains the leading cause of premature cardiac events. Traditional angiography required arterial catheterization and hospital stay. With our new 128-slice CT scanner, patients can walk in and complete a comprehensive 3D coronary angiogram in under 10 seconds. The technology features AI-assisted calcium scoring and automated motion compensation, delivering unmatched diagnostic precision.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    tags: ['Cardiology', 'CT Scan', 'Medical Tech', 'Radiology']
  },
  {
    id: 'news-2',
    title: 'AI & Robotic Surgery Milestones: 1,000 Robotic Joint Replacements Completed',
    category: 'Hospital News',
    date: 'July 18, 2026',
    author: 'Dr. Shahzad Ali',
    authorRole: 'Head of Orthopedics',
    readTime: '3 min read',
    summary: 'Our orthopedic surgical team achieves landmark milestone with 100% success rate and zero infection in MAKO robotic knee and hip surgeries.',
    content: 'Robotic guidance allows surgeons to pre-plan bone cuts down to 0.5 mm accuracy. Patients report walking unassisted within 24 hours of surgery and resuming full active lifestyles in weeks rather than months.',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    tags: ['Robotic Surgery', 'Orthopedics', 'Healthcare Leadership']
  },
  {
    id: 'news-3',
    title: 'Understanding Stroke Symptoms: The FAST Rule That Saves Brain Cells',
    category: 'Health Guide',
    date: 'July 05, 2026',
    author: 'Dr. Tariq Mahmood',
    authorRole: 'Director of Neurosurgery',
    readTime: '5 min read',
    summary: 'Every second counts during acute ischemic stroke. Learn how to recognize Face drooping, Arm weakness, Speech difficulty, and Time to call AIMS Emergency.',
    content: 'Brain tissue dies rapidly during arterial blockage. AIMS Hospital Stroke Emergency response unit guarantees door-to-needle thrombolysis within 30 minutes and emergency mechanical thrombectomy within 60 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Stroke Care', 'Neurology', 'Emergency']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Sohail Ahmed',
    age: 54,
    treatment: 'Emergency Primary PCI & Stenting',
    departmentName: 'Cardiology',
    doctorName: 'Dr. M. Umer Soomro',
    rating: 5,
    reviewText: 'I suffered severe chest pain at 2 AM. The AIMS Emergency team responded immediately. Within 25 minutes of arrival, Dr. Soomro performed primary angioplasty and saved my heart. The care in Cardiac ICU was outstanding!',
    date: 'June 2026',
    location: 'Hyderabad',
    isVerifiedPatient: true
  },
  {
    id: 'test-2',
    patientName: 'Parveen Bibi',
    age: 62,
    treatment: 'Robotic Total Knee Replacement',
    departmentName: 'Orthopedics',
    doctorName: 'Dr. Shahzad Ali',
    rating: 5,
    reviewText: 'I could barely walk due to severe osteoarthritis. Dr. Shahzad performed robotic knee surgery on both my legs. I was walking upstairs without pain on day 3. God bless the AIMS team!',
    date: 'May 2026',
    location: 'Karachi',
    isVerifiedPatient: true
  },
  {
    id: 'test-3',
    patientName: 'Kamran & Sadia Khan',
    age: 31,
    treatment: 'High-Risk Premature Delivery & NICU Care',
    departmentName: 'Pediatrics & NICU',
    doctorName: 'Dr. Bushra Kadir & Dr. Salma Parveen',
    rating: 5,
    reviewText: 'Our baby boy was born at 29 weeks weighing just 1.1 kg. Dr. Bushra Kadir and her NICU team nursed him for 45 days with immense love and medical perfection. Today our son is thriving and healthy.',
    date: 'April 2026',
    location: 'Sukkur',
    isVerifiedPatient: true
  }
];

export const CAREERS_DATA: CareerListing[] = [
  {
    id: 'car-1',
    title: 'Senior Consultant - Interventional Cardiology',
    department: 'Cardiology',
    type: 'Full Time',
    experienceRequired: '8+ Years Post DM',
    qualification: 'DM Cardiology / DNB Cardiology with FACC/FESC',
    location: 'AIMS Main Campus',
    deadline: 'August 31, 2026',
    description: 'Seeking an accomplished interventional cardiologist to lead complex PCI, structural heart procedures, and research initiatives.',
    responsibilities: [
      'Perform primary & elective PCI, TAVR, peripheral interventions.',
      'Lead clinical rounds in Cardiac ICU & mentor fellows.',
      'Participate in international clinical trials.'
    ]
  },
  {
    id: 'car-2',
    title: 'Lead Nurse Specialist - Intensive Care Unit (ICU)',
    department: 'Critical Care / ICU',
    type: 'Full Time',
    experienceRequired: '4+ Years in Tertiary ICU',
    qualification: 'B.Sc Nursing / Post Basic B.Sc with ACLS/BLS certification',
    location: 'AIMS Main Campus & Neuro Hub',
    deadline: 'August 25, 2026',
    description: 'Responsible for critical patient monitoring, mechanical ventilator care, and quality compliance in multi-disciplinary ICU.',
    responsibilities: [
      'Manage arterial lines, hemodialysis feeds, and ventilator settings.',
      'Ensure zero hospital-acquired infection compliance.',
      'Coordinate patient family updates.'
    ]
  },
  {
    id: 'car-3',
    title: 'Senior Diagnostic Radiographer (CT & MRI)',
    department: 'Radiology & Imaging',
    type: 'Full Time',
    experienceRequired: '3+ Years on 128-Slice CT or 3T MRI',
    qualification: 'B.Sc / M.Sc Medical Imaging Technology',
    location: 'Diagnostic Block',
    deadline: 'September 10, 2026',
    description: 'Operate state-of-the-art 128-slice CT scan and 3T MRI scanners following optimized radiation safety standards.',
    responsibilities: [
      'Execute cardiac CT angiography & MRI neuro diffusion scans.',
      'Maintain PACS workflow and image quality control.'
    ]
  }
];

export const SAMPLE_PATIENT_RECORDS: PatientRecord[] = [
  {
    patientId: 'AIMS-P-99204',
    name: 'Tariq Mahmood',
    phone: '+92 300 1234567',
    email: 'tariq.mahmood@example.com',
    age: 48,
    gender: 'Male',
    bloodGroup: 'O Positive',
    appointments: [
      {
        id: 'APT-10029',
        patientName: 'Tariq Mahmood',
        patientPhone: '+92 300 1234567',
        patientEmail: 'tariq.mahmood@example.com',
        patientAge: 48,
        patientGender: 'Male',
        departmentId: 'cardiology',
        departmentName: 'Cardiology & Cardiac Surgery',
        doctorId: 'doc-1',
        doctorName: 'Dr. M. Umer Soomro',
        appointmentDate: '2026-08-05',
        appointmentTime: '10:30 AM',
        symptoms: 'Follow-up post lipid test & stress evaluation',
        status: 'Confirmed',
        bookingFee: 1500,
        createdAt: '2026-07-29',
        qrCodeToken: 'AIMS-QR-8849201',
        branchName: 'AIMS Main Campus'
      }
    ],
    labReports: [
      {
        id: 'REP-8839',
        reportName: '128-Slice Cardiac CT Angiography',
        date: '2026-07-25',
        category: 'Radiology / CT Scan',
        status: 'Ready',
        doctorName: 'Dr. Shahzad Ali',
        summary: 'Normal coronary origins. Calcium score = 12 (Low risk). No hemodynamically significant stenosis in LAD, LCX, or RCA.',
        keyValues: [
          { testName: 'Agatston Calcium Score', result: '12', normalRange: '< 100', status: 'Normal' },
          { testName: 'LAD Lumen Diameter', result: 'Normal (>90%)', normalRange: 'Clear', status: 'Normal' },
          { testName: 'Ejection Fraction', result: '62%', normalRange: '55 - 70%', status: 'Normal' }
        ]
      },
      {
        id: 'REP-8812',
        reportName: 'Comprehensive Lipid & Blood Profile',
        date: '2026-07-24',
        category: 'Pathology Lab',
        status: 'Ready',
        doctorName: 'Dr. Tariq Mahmood',
        summary: 'Serum Cholesterol slightly elevated. Fasting blood sugar within normal limits.',
        keyValues: [
          { testName: 'Total Cholesterol', result: '215 mg/dL', normalRange: '< 200 mg/dL', status: 'High' },
          { testName: 'HDL (Good Cholesterol)', result: '48 mg/dL', normalRange: '> 40 mg/dL', status: 'Normal' },
          { testName: 'LDL (Bad Cholesterol)', result: '138 mg/dL', normalRange: '< 100 mg/dL', status: 'High' },
          { testName: 'HbA1c', result: '5.6%', normalRange: '< 5.7%', status: 'Normal' }
        ]
      }
    ],
    prescriptions: [
      {
        id: 'RX-5002',
        date: '2026-07-25',
        doctorName: 'Dr. M. Umer Soomro',
        department: 'Cardiology',
        diagnosis: 'Mild Hyperlipidemia with Low Coronary Calcium',
        medications: [
          { name: 'Rosuvastatin 10mg', dosage: '1 Tablet', frequency: 'Once Daily at Night', duration: '90 Days' },
          { name: 'Omega-3 Fish Oil 1000mg', dosage: '1 Capsule', frequency: 'After Lunch', duration: '60 Days' }
        ],
        doctorAdvice: 'Maintain low sodium, low saturated fat Mediterranean diet. 30 minutes brisk walking daily.'
      }
    ]
  }
];

export function getStoredDoctors(): Doctor[] {
  try {
    const saved = localStorage.getItem('aims_custom_doctors');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom doctors:', e);
  }
  return DOCTORS_DATA;
}

export function saveStoredDoctors(doctors: Doctor[]) {
  try {
    localStorage.setItem('aims_custom_doctors', JSON.stringify(doctors));
    window.dispatchEvent(new Event('aims_doctors_updated'));
  } catch (e) {
    console.error('Error saving custom doctors:', e);
  }
}

export function getStoredDepartments(): Department[] {
  try {
    const saved = localStorage.getItem('aims_custom_departments');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom departments:', e);
  }
  return DEPARTMENTS_DATA;
}

export function saveStoredDepartments(departments: Department[]) {
  try {
    localStorage.setItem('aims_custom_departments', JSON.stringify(departments));
    window.dispatchEvent(new Event('aims_departments_updated'));
  } catch (e) {
    console.error('Error saving custom departments:', e);
  }
}

export function getStoredBranches(): HospitalBranch[] {
  try {
    const saved = localStorage.getItem('aims_custom_branches');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom branches:', e);
  }
  return HOSPITAL_BRANCHES;
}

export function saveStoredBranches(branches: HospitalBranch[]) {
  try {
    localStorage.setItem('aims_custom_branches', JSON.stringify(branches));
    window.dispatchEvent(new Event('aims_branches_updated'));
  } catch (e) {
    console.error('Error saving custom branches:', e);
  }
}

export function getStoredPackages(): HealthPackage[] {
  try {
    const saved = localStorage.getItem('aims_custom_packages');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom packages:', e);
  }
  return HEALTH_PACKAGES;
}

export function saveStoredPackages(packages: HealthPackage[]) {
  try {
    localStorage.setItem('aims_custom_packages', JSON.stringify(packages));
    window.dispatchEvent(new Event('aims_packages_updated'));
  } catch (e) {
    console.error('Error saving custom packages:', e);
  }
}

export function getStoredNews(): NewsArticle[] {
  try {
    const saved = localStorage.getItem('aims_custom_news');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom news:', e);
  }
  return NEWS_ARTICLES;
}

export function saveStoredNews(news: NewsArticle[]) {
  try {
    localStorage.setItem('aims_custom_news', JSON.stringify(news));
    window.dispatchEvent(new Event('aims_news_updated'));
  } catch (e) {
    console.error('Error saving custom news:', e);
  }
}

export const DEFAULT_SITE_SETTINGS = {
  announcementBanner: '🚨 24/7 Emergency & Level-1 Trauma Center Active | Dedicated 128-Slice CT Scan & Cardiac Cath Lab Operational in Hyderabad & Karachi',
  showAnnouncementBanner: true,
  emergencyHotline: '0300-1234567',
  opdHelpline: '022-2101100',
  whatsappNumber: '+923001234567',
  hospitalName: 'AIMS Hospital',
  hospitalTagline: 'Advance International Medical Sciences',
  heroHeadline: 'Premier Healthcare Excellence & Precision Medicine',
  heroSubheadline: 'World-Class Multi-Specialty Care, 128-Slice CT Imaging, Level-1 Trauma & Dedicated ICUs'
};

export function getStoredSiteSettings() {
  try {
    const saved = localStorage.getItem('aims_site_settings');
    if (saved) {
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error reading site settings:', e);
  }
  return DEFAULT_SITE_SETTINGS;
}

export function saveStoredSiteSettings(settings: typeof DEFAULT_SITE_SETTINGS) {
  try {
    localStorage.setItem('aims_site_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('aims_settings_updated'));
  } catch (e) {
    console.error('Error saving site settings:', e);
  }
}

export const DEFAULT_EMPLOYEE_DEPARTMENTS: EmployeeDepartment[] = [
  {
    id: 'dept-it',
    name: 'IT Department',
    iconName: 'Monitor',
    description: 'Responsible for hospital/institute information technology, software, networking, clinical databases, systems, technical support, and digital health services.',
    headOfDepartment: 'Engr. Faisal Memon',
    contactEmail: 'it@aimshospital.org',
    contactExtension: 'Ext. 400',
    isActive: true
  },
  {
    id: 'dept-hr',
    name: 'Human Resources',
    iconName: 'Users',
    description: 'Manages staff recruitment, employee relations, payroll support, medical staff credentials, training, and personnel administration.',
    headOfDepartment: 'Syed Farhan Shah',
    contactEmail: 'hr@aimshospital.org',
    contactExtension: 'Ext. 100',
    isActive: true
  },
  {
    id: 'dept-finance',
    name: 'Finance & Accounts',
    iconName: 'Calculator',
    description: 'Oversees financial operations, patient billing, corporate insurance claims, auditing, vendor accounts, and budget management.',
    headOfDepartment: 'Tariq Ahmed CPA',
    contactEmail: 'finance@aimshospital.org',
    contactExtension: 'Ext. 110',
    isActive: true
  },
  {
    id: 'dept-admin',
    name: 'Administration',
    iconName: 'Building2',
    description: 'Handles day-to-day hospital operations, executive management, facility governance, regulatory compliance, and administrative oversight.',
    headOfDepartment: 'Maj. (R) Asad Raza',
    contactEmail: 'admin@aimshospital.org',
    contactExtension: 'Ext. 101',
    isActive: true
  },
  {
    id: 'dept-medical',
    name: 'Medical',
    iconName: 'Stethoscope',
    description: 'Coordinates senior clinical consultants, outpatient departments (OPD), clinical specialty suites, and physician services.',
    headOfDepartment: 'Dr. M. Umer Soomro',
    contactEmail: 'medical@aimshospital.org',
    contactExtension: 'Ext. 200',
    isActive: true
  },
  {
    id: 'dept-nursing',
    name: 'Nursing',
    iconName: 'Heart',
    description: 'Provides 24/7 compassionate inpatient nursing care, ICU & CCU monitoring, operation theater assisting, and patient safety.',
    headOfDepartment: 'Sr. Rehana Parveen',
    contactEmail: 'nursing@aimshospital.org',
    contactExtension: 'Ext. 300',
    isActive: true
  },
  {
    id: 'dept-lab',
    name: 'Laboratory',
    iconName: 'Microscope',
    description: 'Delivers high-precision diagnostic pathology, blood banking, clinical biochemistry, microbiology, and molecular diagnostics.',
    headOfDepartment: 'Dr. Noman Shaikh',
    contactEmail: 'lab@aimshospital.org',
    contactExtension: 'Ext. 500',
    isActive: true
  },
  {
    id: 'dept-radiology',
    name: 'Radiology',
    iconName: 'Scan',
    description: 'Operates 128-Slice CT Scan, MRI, 4D Ultrasound, Digital X-Ray, Mammography, and fluoroscopy imaging.',
    headOfDepartment: 'Dr. Sarfaraz Junejo',
    contactEmail: 'radiology@aimshospital.org',
    contactExtension: 'Ext. 550',
    isActive: true
  },
  {
    id: 'dept-pharmacy',
    name: 'Pharmacy',
    iconName: 'Pill',
    description: 'Provides 24/7 inpatient & outpatient pharmaceutical dispensing, medicine inventory, and medication counseling.',
    headOfDepartment: 'Pharm. Zeeshan Ali',
    contactEmail: 'pharmacy@aimshospital.org',
    contactExtension: 'Ext. 600',
    isActive: true
  },
  {
    id: 'dept-reception',
    name: 'Reception',
    iconName: 'PhoneCall',
    description: 'Front desk operations, patient inquiries, appointment registration, visitor direction, and helpline assistance.',
    headOfDepartment: 'Maryam Khan',
    contactEmail: 'reception@aimshospital.org',
    contactExtension: 'Ext. 102',
    isActive: true
  },
  {
    id: 'dept-security',
    name: 'Security',
    iconName: 'Shield',
    description: 'Maintains 24/7 premise safety, CCTV surveillance, emergency access protocols, and visitor crowd management.',
    headOfDepartment: 'Capt. (R) Imran Malik',
    contactEmail: 'security@aimshospital.org',
    contactExtension: 'Ext. 105',
    isActive: true
  },
  {
    id: 'dept-maintenance',
    name: 'Maintenance',
    iconName: 'Wrench',
    description: 'Oversees biomedical equipment upkeep, HVAC cooling, electrical backup generators, water supply, and facility maintenance.',
    headOfDepartment: 'Engr. Bilal Hassan',
    contactEmail: 'engineering@aimshospital.org',
    contactExtension: 'Ext. 108',
    isActive: true
  },
  {
    id: 'dept-marketing',
    name: 'Marketing',
    iconName: 'Megaphone',
    description: 'Coordinates health awareness campaigns, community medical camps, public relations, and institutional communication.',
    headOfDepartment: 'Sara Soomro',
    contactEmail: 'media@aimshospital.org',
    contactExtension: 'Ext. 115',
    isActive: true
  },
  {
    id: 'dept-management',
    name: 'Management',
    iconName: 'Award',
    description: 'Executive governance board providing strategic leadership, hospital expansion, quality assurance, and institutional policy.',
    headOfDepartment: 'Prof. Dr. A. G. Soomro',
    contactEmail: 'executive@aimshospital.org',
    contactExtension: 'Ext. 100',
    isActive: true
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-101',
    employeeId: 'EMP-IT-101',
    fullName: 'Hussain Shaikh',
    designation: 'IT Specialist',
    departmentId: 'dept-it',
    departmentName: 'IT Department',
    highestQualification: 'ADCS Degree',
    experienceYears: 5,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2021-03-15',
    status: 'Active',
    education: [
      {
        id: 'edu-1',
        degree: 'ADCS Degree',
        fieldOfStudy: 'Associate Degree in Computer Science',
        institution: 'University of Sindh / City College',
        year: '2022'
      },
      {
        id: 'edu-dit',
        degree: 'DIT (Diploma in Information Technology)',
        fieldOfStudy: 'Information Technology & Software Systems',
        institution: 'Sindh Board of Technical Education (SBTE)',
        year: '2021'
      },
      {
        id: 'edu-cit',
        degree: 'CIT (Certificate in Information Technology)',
        fieldOfStudy: 'Computer Applications & Networking',
        institution: 'Vocational & Technical Training Institute',
        year: '2020'
      },
      {
        id: 'edu-2',
        degree: 'Intermediate (FSc Pre-Engineering)',
        fieldOfStudy: 'Computer Science & Mathematics',
        institution: 'BISE Hyderabad',
        year: '2019'
      }
    ],
    certifications: [
      'UI/UX Design (Figma, Adobe XD, Responsive Interface Prototyping)',
      'Graphics Designing (Photoshop, Illustrator, Branding & Visual Design)',
      'CIT & DIT Certified',
      'WordPress Development (CMS Customization, E-commerce, Speed Optimization)',
      'Video Editing (Premiere Pro, After Effects, Motion Graphics)',
      'Digital Marketing & SEO (Content Strategy, Social Media & Search Optimization)',
      'Web Development (HTML5, CSS3, JavaScript, React, PHP & Full-Stack Solutions)',
      'Hospital Information Systems (HMIS) & Network Administration Support'
    ],
    skills: [
      'UI/UX Design (Figma, Adobe XD)',
      'Graphics Designing (Photoshop, Illustrator)',
      'CIT & DIT Certified',
      'WordPress Development',
      'Video Editing (Premiere Pro, After Effects)',
      'Digital Marketing & SEO',
      'Web Development (React, JS, PHP)',
      'Hospital Information Systems (HMIS) & Network Administration Support'
    ],
    responsibilities: [
      'Leads hospital digital media, web development, and UI/UX design for online portals and patient services.',
      'Manages WordPress content management systems, digital marketing campaigns, and video production.',
      'Oversees Hospital Information Systems (HMIS), network infrastructure, CIT/DIT technical support, and data security.',
      'Provides 24/7 IT specialized troubleshooting across clinical and administrative units.'
    ],
    officialEmail: 'hussain.shaikh@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 401',
    officeLocation: 'Main Building, 2nd Floor, IT Control Room 204',
    biography: 'Hussain Shaikh is a versatile IT Specialist at AIMS Hospital. Holding an ADCS Degree along with DIT and CIT qualifications, Hussain possesses comprehensive expertise across UI/UX Design, Graphics Designing, WordPress Development, Web Development, Video Editing, and Digital Marketing. He manages both core hospital server infrastructure and modern digital growth initiatives.'
  },
  {
    id: 'emp-101b',
    employeeId: 'EMP-IT-102',
    fullName: 'Muhammad Saim',
    designation: 'IT Assistant',
    departmentId: 'dept-it',
    departmentName: 'IT Department',
    highestQualification: 'Certificate in Graphics Designing',
    experienceYears: 2,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2023-01-10',
    status: 'Active',
    education: [
      {
        id: 'edu-saim-1',
        degree: 'Certificate in Graphics Designing',
        fieldOfStudy: 'Graphics & Visual Arts',
        institution: 'Vocational Training Institute',
        year: '2022'
      },
      {
        id: 'edu-saim-2',
        degree: 'Intermediate in Computer Science (ICS)',
        fieldOfStudy: 'Computer Science',
        institution: 'BISE Hyderabad',
        year: '2021'
      }
    ],
    certifications: [
      'Certificate in Graphics Designing',
      'Adobe Photoshop & Illustrator Professional',
      'IT Support & Hardware Fundamentals'
    ],
    skills: [
      'Graphics Designing',
      'Visual Asset Creation',
      'IT Assistance & User Support',
      'Hardware & Software Troubleshooting',
      'Digital Media Design'
    ],
    responsibilities: [
      'Assists the IT team in graphics designing for hospital posters, web banners, and digital health campaigns.',
      'Provides daily IT helpdesk assistance to hospital staff for workstation setup and software troubleshooting.',
      'Maintains visual documentation and branding assets across hospital departments.'
    ],
    officialEmail: 'muhammad.saim@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 402',
    officeLocation: 'Main Building, 2nd Floor, IT Control Room 204',
    biography: 'Muhammad Saim is an IT Assistant in the IT Department at AIMS Hospital. Certified in Graphics Designing, he specializes in visual creative design, digital assets, and providing prompt technical IT assistance across all hospital divisions.'
  },
  {
    id: 'emp-102',
    employeeId: 'EMP-HR-201',
    fullName: 'Syed Farhan Shah',
    designation: 'Human Resources Manager',
    departmentId: 'dept-hr',
    departmentName: 'Human Resources',
    highestQualification: 'MS in Human Resource Management',
    experienceYears: 8,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2019-06-10',
    status: 'Active',
    education: [
      {
        id: 'edu-hr-1',
        degree: 'MS in HRM',
        fieldOfStudy: 'Human Resource Management',
        institution: 'Institute of Business Administration (IBA)',
        year: '2018'
      },
      {
        id: 'edu-hr-2',
        degree: 'BBA (Hons)',
        fieldOfStudy: 'Management & Marketing',
        institution: 'University of Karachi',
        year: '2015'
      }
    ],
    certifications: [
      'SHRM Certified Professional (SHRM-CP)',
      'Healthcare Staff Credentials Audit Specialist'
    ],
    skills: [
      'Healthcare Recruitment',
      'PMDC Doctor Credentialing',
      'Performance Management',
      'Employee Welfare & Policy Development'
    ],
    responsibilities: [
      'Manages recruitment and onboarding for medical doctors, nurses, and administrative personnel.',
      'Verifies doctor credentials with PMDC and regulatory boards.',
      'Conducts staff welfare initiatives and monthly performance reviews.'
    ],
    officialEmail: 'farhan.shah@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 100',
    officeLocation: 'Admin Block, 1st Floor, HR Suite 102',
    biography: 'Syed Farhan Shah oversees the Human Resource department at AIMS, ensuring compliance with medical board standards, staff satisfaction, and efficient hospital talent management.'
  },
  {
    id: 'emp-103',
    employeeId: 'EMP-NUR-301',
    fullName: 'Sr. Rehana Parveen',
    designation: 'Chief Nursing Superintendent',
    departmentId: 'dept-nursing',
    departmentName: 'Nursing',
    highestQualification: 'MSc Nursing (Critical Care)',
    experienceYears: 12,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2016-01-20',
    status: 'Active',
    education: [
      {
        id: 'edu-nur-1',
        degree: 'MSc Nursing',
        fieldOfStudy: 'Critical Care & ICU Nursing',
        institution: 'Aga Khan University School of Nursing',
        year: '2015'
      },
      {
        id: 'edu-nur-2',
        degree: 'BSc Nursing',
        fieldOfStudy: 'General Nursing',
        institution: 'LUMHS Jamshoro',
        year: '2011'
      }
    ],
    certifications: [
      'Advanced Cardiac Life Support (ACLS)',
      'Certified Infection Control Practitioner (CICP)'
    ],
    skills: [
      'ICU & CCU Patient Management',
      'Infection Prevention Control',
      'Staff Roster Management',
      'Emergency Resuscitation Protocol'
    ],
    responsibilities: [
      'Directs the 24/7 nursing workforce across 125 inpatient beds, ICUs, and emergency wards.',
      'Monitors strict adherence to aseptic techniques and infection control standards.',
      'Coordinates nursing continuing education workshops and patient care audits.'
    ],
    officialEmail: 'rehana.parveen@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 300',
    officeLocation: 'Inpatient Tower, 2nd Floor, Nursing Office',
    biography: 'Sr. Rehana Parveen leads the nursing staff at AIMS with over 12 years of clinical excellence in critical care nursing, patient advocacy, and bedside protocols.'
  },
  {
    id: 'emp-104',
    employeeId: 'EMP-PHARM-401',
    fullName: 'Pharm. Zeeshan Ali',
    designation: 'Head Pharmacist',
    departmentId: 'dept-pharmacy',
    departmentName: 'Pharmacy',
    highestQualification: 'Pharm.D (Doctor of Pharmacy)',
    experienceYears: 7,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2020-09-01',
    status: 'Active',
    education: [
      {
        id: 'edu-pharm-1',
        degree: 'Pharm.D',
        fieldOfStudy: 'Doctor of Pharmacy',
        institution: 'Faculty of Pharmacy, University of Sindh',
        year: '2018'
      }
    ],
    certifications: [
      'Hospital Pharmacy Administration',
      'Pharmacovigilance & Drug Interaction Specialist'
    ],
    skills: [
      'Clinical Pharmacy Management',
      'Cold-Chain Vaccine Preservation',
      'Inpatient Dose Reconciliation',
      'Pharmaceutical Inventory Control'
    ],
    responsibilities: [
      'Oversees 24/7 medicine dispensing for OPD, IPD, and emergency departments.',
      'Maintains strict cold-chain refrigeration for vaccines and biological products.',
      'Verifies prescription dosages and conducts drug interaction checks.'
    ],
    officialEmail: 'zeeshan.ali@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 600',
    officeLocation: 'Ground Floor, Central Pharmacy Complex',
    biography: 'Pharm. Zeeshan Ali leads the AIMS Pharmacy department, ensuring 100% genuine medications, fast dispensing, and precise pharmaceutical care.'
  },
  {
    id: 'emp-105',
    employeeId: 'EMP-REC-501',
    fullName: 'Maryam Khan',
    designation: 'Front Desk & Reception Supervisor',
    departmentId: 'dept-reception',
    departmentName: 'Reception',
    highestQualification: 'BS in Mass Communication',
    experienceYears: 4,
    imageUrl: '',
    employeeType: 'Full Time',
    joiningDate: '2022-02-10',
    status: 'Active',
    education: [
      {
        id: 'edu-rec-1',
        degree: 'BS Mass Communication',
        fieldOfStudy: 'Public Relations & Communication',
        institution: 'University of Sindh',
        year: '2021'
      }
    ],
    certifications: [
      'Healthcare Guest Services Protocol',
      'Bilingual Patient Communication'
    ],
    skills: [
      'Patient Registration',
      'Helpline Coordination',
      'Conflict Resolution',
      'OPD Appointment Scheduling'
    ],
    responsibilities: [
      'Manages front desk reception counter and incoming patient inquiries.',
      'Assists patients with appointment registration, token generation, and doctor directory.',
      'Coordinates emergency patient triage routing to emergency ward.'
    ],
    officialEmail: 'maryam.khan@aimshospital.org',
    officialPhone: '+92 22 2101100 Ext. 102',
    officeLocation: 'Main Atrium, Front Reception Desk 1',
    biography: 'Maryam Khan oversees front-desk operations with warmth and professionalism, ensuring every visitor and patient receives immediate support upon entering AIMS Hospital.'
  }
];

export function getStoredEmployeeDepartments(): EmployeeDepartment[] {
  try {
    const saved = localStorage.getItem('aims_custom_employee_departments');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom employee departments:', e);
  }
  return DEFAULT_EMPLOYEE_DEPARTMENTS;
}

export function saveStoredEmployeeDepartments(depts: EmployeeDepartment[]) {
  try {
    localStorage.setItem('aims_custom_employee_departments', JSON.stringify(depts));
    window.dispatchEvent(new Event('aims_employee_departments_updated'));
  } catch (e) {
    console.error('Error saving custom employee departments:', e);
  }
}

export function getStoredEmployees(): Employee[] {
  try {
    const saved = localStorage.getItem('aims_custom_employees');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Guarantee emp-101 (Hussain Shaikh) and emp-101b (Muhammad Saim) are present with latest info
        let hasSaim = false;
        const updated = parsed.map((emp: Employee) => {
          let cleanImg = emp.imageUrl || '';
          if (cleanImg.includes('unsplash.com')) {
            cleanImg = '';
          }

          if (emp.id === 'emp-101' || emp.employeeId === 'EMP-IT-101') {
            return {
              ...emp,
              fullName: 'Hussain Shaikh',
              designation: 'IT Specialist',
              highestQualification: 'ADCS Degree',
              imageUrl: cleanImg,
              education: INITIAL_EMPLOYEES[0].education,
              certifications: INITIAL_EMPLOYEES[0].certifications,
              skills: INITIAL_EMPLOYEES[0].skills,
              responsibilities: INITIAL_EMPLOYEES[0].responsibilities,
              biography: INITIAL_EMPLOYEES[0].biography
            };
          }
          if (emp.id === 'emp-101b' || emp.employeeId === 'EMP-IT-102') {
            hasSaim = true;
          }
          return {
            ...emp,
            imageUrl: cleanImg
          };
        });
        if (!hasSaim) {
          const saimObj = INITIAL_EMPLOYEES.find((e) => e.id === 'emp-101b');
          if (saimObj) updated.push(saimObj);
        }
        return updated;
      }
    }
  } catch (e) {
    console.error('Error reading custom employees:', e);
  }
  return INITIAL_EMPLOYEES;
}

export function saveStoredEmployees(employees: Employee[]) {
  try {
    localStorage.setItem('aims_custom_employees', JSON.stringify(employees));
    window.dispatchEvent(new Event('aims_employees_updated'));
  } catch (e) {
    console.error('Error saving custom employees:', e);
  }
}

export function resetAllDataToDefault() {
  localStorage.removeItem('aims_custom_doctors');
  localStorage.removeItem('aims_custom_departments');
  localStorage.removeItem('aims_custom_branches');
  localStorage.removeItem('aims_custom_packages');
  localStorage.removeItem('aims_custom_news');
  localStorage.removeItem('aims_site_settings');
  localStorage.removeItem('aims_custom_logo');
  localStorage.removeItem('aims_custom_employee_departments');
  localStorage.removeItem('aims_custom_employees');
  window.dispatchEvent(new Event('aims_doctors_updated'));
  window.dispatchEvent(new Event('aims_departments_updated'));
  window.dispatchEvent(new Event('aims_branches_updated'));
  window.dispatchEvent(new Event('aims_packages_updated'));
  window.dispatchEvent(new Event('aims_news_updated'));
  window.dispatchEvent(new Event('aims_settings_updated'));
  window.dispatchEvent(new Event('aims_employee_departments_updated'));
  window.dispatchEvent(new Event('aims_employees_updated'));
}


