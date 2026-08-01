import {
  Department,
  Doctor,
  DiagnosticService,
  HealthPackage,
  HospitalBranch,
  NewsArticle,
  Testimonial,
  CareerListing,
  PatientRecord
} from '../types';

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Cardiac Surgery',
    category: 'clinical',
    shortDesc: 'Comprehensive care for complex heart conditions, minimally invasive angioplasty, and bypass surgeries.',
    fullDesc: 'The AIMS Institute of Cardiac Sciences is equipped with world-class bi-plane Cath Labs, 3D Echocardiography, and dedicated Cardiac ICUs. Our multidisciplinary cardiac team provides 24/7 emergency angioplasty (PPCI), heart failure management, and robotic-assisted bypass procedures.',
    iconName: 'HeartPulse',
    headOfDept: 'Dr. Vikramaditya Mehta, DM Cardiology',
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
    headOfDept: 'Dr. Ananya Roy, MCh Neurosurgery',
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
    headOfDept: 'Dr. Rajeshwar Sharma, MS Ortho, FRCS',
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
    headOfDept: 'Dr. Sameer Deshmukh, MD, DM Medical Oncology',
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
    headOfDept: 'Dr. Meera Iyer, MD Pediatrics, Fellowship NICU',
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
    headOfDept: 'Dr. Sunita Patel, MD OB-GYN',
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
    headOfDept: 'Dr. Rajiv Menon, DM Gastroenterology',
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
    headOfDept: 'Dr. Harshwardhan Joshi, MCh Urology',
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
    headOfDept: 'Dr. Siddharth Kapoor, MD Radiology',
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
    headOfDept: 'Dr. Arvind Nambiar, MD Emergency Medicine',
    facilities: ['20-Bed Resuscitation & Triage Zone', 'Dedicated Emergency OT & Cath Lab Link', 'Fleet of ALS Mobile ICUs', 'Helipad for Air Ambulance', 'Poison & Toxicology Unit'],
    commonConditions: ['Polytrauma & Road Traffic Accidents', 'Acute Heart Attack (STEMI)', 'Acute Respiratory Distress', 'Severe Stroke & Coma', 'Burn Injuries & Poisoning'],
    procedures: ['Cardiopulmonary Resuscitation (CPR)', 'Emergency Airway Intubation', 'Trauma Resuscitation & Damage Control Surgery', 'Emergency Thrombolysis', 'Chest Tube Insertion'],
    opdTimings: 'Mon - Sun: 24/7/365 Non-Stop',
    bedCapacity: 50
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vikramaditya Mehta',
    title: 'Chairman & Chief Interventional Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Cardiac Surgery',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    experienceYears: 24,
    rating: 4.9,
    reviewCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM']
    },
    bio: 'Pioneer in complex coronary interventions, transcatheter aortic valve replacement (TAVR), and intravascular ultrasound-guided stenting with over 15,000 successful cardiac procedures.',
    specializations: ['Complex Coronary Angioplasty', 'TAVR / TAVI', 'Carotid & Peripheral Stenting', 'Heart Failure Management'],
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'AIMS Main Campus, Tower A, Level 3',
    awards: ['Best Cardiologist Award 2024', 'Lifetime Excellence in Healthcare', 'National Medical Laureate']
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Roy',
    title: 'Director & Chief Neurosurgeon',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    qualifications: 'MBBS, MS (Surgery), MCh (Neurosurgery), Fellowship Skull Base (US)',
    experienceYears: 21,
    rating: 4.95,
    reviewCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1594824813566-78a994784a0d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1600,
    availability: {
      days: ['Mon', 'Wed', 'Thu', 'Sat'],
      timeSlots: ['10:00 AM', '12:00 PM', '03:00 PM', '05:30 PM']
    },
    bio: 'Renowned neurosurgeon specializing in intraoperative MRI-guided brain tumor removal, endoscopic pituitary surgeries, and keyhole spine procedures.',
    specializations: ['Neuro-Oncology & Skull Base', 'Minimally Invasive Spine Surgery', 'Deep Brain Stimulation', 'Cerebrovascular Surgery'],
    languages: ['English', 'Bengali', 'Hindi'],
    location: 'AIMS Neuro Institute, Level 4',
    awards: ['International Spine Innovator 2023', 'Glory of India Healthcare Gold Medal']
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajeshwar Sharma',
    title: 'Head of Orthopedics & Robotic Surgery',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    qualifications: 'MBBS, MS (Ortho), FRCS (Edin), Fellowship Robotic Surgery (UK)',
    experienceYears: 19,
    rating: 4.88,
    reviewCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1400,
    availability: {
      days: ['Tue', 'Wed', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
    },
    bio: 'Performed over 6,000 robotic joint replacements. Specialist in revision joint surgeries, custom 3D printed implants, and complex trauma reconstruction.',
    specializations: ['MAKO Robotic Knee & Hip Replacement', 'Revision Joint Surgeries', 'Arthroscopic Shoulder Repair', 'Complex Fracture Management'],
    languages: ['English', 'Hindi', 'Punjabi'],
    location: 'AIMS Main Campus, Tower B, Level 2',
    awards: ['Pioneer in Robotic Orthopedics Award', 'Gold Medal in Orthopedic Research']
  },
  {
    id: 'doc-4',
    name: 'Dr. Sunita Patel',
    title: 'Chief Consultant Gynecologist & Fetal Specialist',
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Women’s Health',
    qualifications: 'MBBS, MD (OB-GYN), DNB, Fellowship Fetal Medicine (London)',
    experienceYears: 18,
    rating: 4.92,
    reviewCount: 450,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1200,
    availability: {
      days: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '04:00 PM']
    },
    bio: 'Expert in managing high-risk pregnancies, fetal echocardiography, painless birthing, and advanced laparoscopic gynecological procedures.',
    specializations: ['High-Risk Obstetrics', 'Fetal Echocardiography', 'Advanced Laparoscopic Gynae Surgery', 'IVF & Reproductive Medicine'],
    languages: ['English', 'Gujarati', 'Hindi'],
    location: 'AIMS Women & Children Wing, Level 1',
    awards: ['Woman Healthcare Leader of the Year', 'Excellence in Fetal Diagnostics']
  },
  {
    id: 'doc-5',
    name: 'Dr. Sameer Deshmukh',
    title: 'Senior Director - Medical & Precision Oncology',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Care & Oncology',
    qualifications: 'MBBS, MD (Internal Med), DM (Medical Oncology), ESMO Certified',
    experienceYears: 17,
    rating: 4.91,
    reviewCount: 290,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1500,
    availability: {
      days: ['Mon', 'Wed', 'Fri'],
      timeSlots: ['10:00 AM', '01:00 PM', '03:30 PM']
    },
    bio: 'Specialist in targeted targeted therapy, CAR-T cell therapy, precision genomic cancer care, and bone marrow transplants.',
    specializations: ['Precision Targeted Therapy', 'CAR-T & Immunotherapy', 'Breast & Lung Cancer Care', 'Lymphoma & Multiple Myeloma'],
    languages: ['English', 'Marathi', 'Hindi'],
    location: 'AIMS Cancer Care Pavilion, Level 5',
    awards: ['ESMO Distinguished Oncologist', 'National Cancer Research Laurel']
  },
  {
    id: 'doc-6',
    name: 'Dr. Meera Iyer',
    title: 'Lead Consultant Pediatrician & Neonatologist',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatology (NICU)',
    qualifications: 'MBBS, MD (Pediatrics), Fellowship Neonatology (Australia)',
    experienceYears: 16,
    rating: 4.96,
    reviewCount: 510,
    imageUrl: 'https://images.unsplash.com/photo-1594824813566-78a994784a0d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1000,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeSlots: ['08:30 AM', '11:00 AM', '02:00 PM', '05:00 PM']
    },
    bio: 'Dedicated to newborn intensive care, treating pre-term babies as small as 500 grams, pediatric respiratory diseases, and developmental care.',
    specializations: ['Level IV NICU Management', 'Extreme Pre-term Care', 'Pediatric Pulmonology', 'Childhood Vaccination & Growth'],
    languages: ['English', 'Tamil', 'Hindi', 'Malayalam'],
    location: 'AIMS Children Pavilion, Level 2',
    awards: ['Best Neonatologist Award 2024', 'Child Healthcare Excellence Medal']
  },
  {
    id: 'doc-7',
    name: 'Dr. Siddharth Kapoor',
    title: 'Chief Interventional Radiologist',
    departmentId: 'radiology',
    departmentName: 'Radiology & Advanced Imaging',
    qualifications: 'MBBS, MD (Radiodiagnosis), Fellowship Vascular Interventions (USA)',
    experienceYears: 15,
    rating: 4.89,
    reviewCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1100,
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlots: ['09:00 AM', '12:00 PM', '03:00 PM']
    },
    bio: 'Expert in 128-Slice Cardiac CT interpretations, 3T Cardiac MRI, uterine fibroid embolization, and image-guided tumor ablations.',
    specializations: ['128-Slice Cardiac CT Angiography', '3T Neuro & Cardiac MRI', 'Vascular Interventional Radiology', 'Image-Guided Tumor Ablation'],
    languages: ['English', 'Hindi'],
    location: 'AIMS Diagnostic & Imaging Block, Basement 1',
    awards: ['Radiology Innovation Pioneer 2023']
  },
  {
    id: 'doc-8',
    name: 'Dr. Harshwardhan Joshi',
    title: 'Senior Consultant Urologist & Transplant Surgeon',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Urology',
    qualifications: 'MBBS, MS (Surgery), MCh (Urology), DNB',
    experienceYears: 20,
    rating: 4.93,
    reviewCount: 360,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 1300,
    availability: {
      days: ['Mon', 'Wed', 'Fri', 'Sat'],
      timeSlots: ['10:30 AM', '01:00 PM', '04:00 PM']
    },
    bio: 'Specialist in kidney stone laser surgery (RIRS, PCNL), robot-assisted prostatectomy, and living-donor kidney transplantation.',
    specializations: ['Laser Stone Lithotripsy (RIRS)', 'Kidney Transplantation', 'Robotic Prostate Surgery', 'Endourology'],
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'AIMS Main Campus, Tower B, Level 4',
    awards: ['Urology Gold Medalist', 'National Kidney Foundation Service Award']
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
    name: 'AIMS Main Tertiary Super Specialty Campus',
    type: 'Main Campus',
    address: 'Plot 45, Healthcare Boulevard, Sector 18, Central City',
    city: 'Central City',
    emergencyNumber: '+91 (022) 1800-2467-99',
    opdNumber: '+91 (022) 4588-9000',
    email: 'info@aimshospital.org',
    googleMapsUrl: 'https://maps.google.com',
    lat: 19.0760,
    lng: 72.8777,
    icuBedsAvailable: 28,
    is24x7Emergency: true,
    imagingFacilities: ['128-Slice CT Scan', '3T Silent MRI', 'PET-CT', 'Bi-Plane Cath Lab', 'Robotic OT Suite']
  },
  {
    id: 'branch-neuro-heart',
    name: 'AIMS Institute of Cardiac & Neuro Sciences',
    type: 'Super Specialty Hub',
    address: '102 Apex Expressway Avenue, Medical Enclave',
    city: 'North Metro',
    emergencyNumber: '+91 (022) 1800-2467-88',
    opdNumber: '+91 (022) 4588-9100',
    email: 'heart-neuro@aimshospital.org',
    googleMapsUrl: 'https://maps.google.com',
    lat: 19.1197,
    lng: 72.9050,
    icuBedsAvailable: 15,
    is24x7Emergency: true,
    imagingFacilities: ['128-Slice CT', '3T MRI', 'Intraoperative MRI', 'Stroke Cath Lab']
  },
  {
    id: 'branch-women-child',
    name: 'AIMS Women & Children Specialty Center',
    type: 'Children & Women',
    address: '88 Rose Park Drive, Near Green Avenue',
    city: 'South Suburbs',
    emergencyNumber: '+91 (022) 1800-2467-77',
    opdNumber: '+91 (022) 4588-9200',
    email: 'womenchild@aimshospital.org',
    googleMapsUrl: 'https://maps.google.com',
    lat: 18.9690,
    lng: 72.8210,
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
    author: 'Dr. Vikramaditya Mehta',
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
    author: 'Dr. Rajeshwar Sharma',
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
    author: 'Dr. Ananya Roy',
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
    patientName: 'Sanjay Rastogi',
    age: 54,
    treatment: 'Emergency Primary PCI & Stenting',
    departmentName: 'Cardiology',
    doctorName: 'Dr. Vikramaditya Mehta',
    rating: 5,
    reviewText: 'I suffered severe chest pain at 2 AM. The AIMS Emergency team responded immediately. Within 25 minutes of arrival, Dr. Mehta performed primary angioplasty and saved my heart. The care in Cardiac ICU was outstanding!',
    date: 'June 2026',
    location: 'Central City',
    isVerifiedPatient: true
  },
  {
    id: 'test-2',
    patientName: 'Priya Mukherjee',
    age: 62,
    treatment: 'Robotic Total Knee Replacement',
    departmentName: 'Orthopedics',
    doctorName: 'Dr. Rajeshwar Sharma',
    rating: 5,
    reviewText: 'I could barely walk due to severe osteoarthritis. Dr. Sharma performed robotic knee surgery on both my legs. I was walking upstairs without pain on day 3. God bless the AIMS team!',
    date: 'May 2026',
    location: 'North Metro',
    isVerifiedPatient: true
  },
  {
    id: 'test-3',
    patientName: 'Rohit & Neha Verma',
    age: 31,
    treatment: 'High-Risk Premature Delivery & NICU Care',
    departmentName: 'Pediatrics & NICU',
    doctorName: 'Dr. Meera Iyer & Dr. Sunita Patel',
    rating: 5,
    reviewText: 'Our baby boy was born at 29 weeks weighing just 1.1 kg. Dr. Meera Iyer and her NICU team nursed him for 45 days with immense love and medical perfection. Today our son is thriving and healthy.',
    date: 'April 2026',
    location: 'South Suburbs',
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
    name: 'Rajesh Malhotra',
    phone: '+91 98201 45990',
    email: 'rajesh.malhotra@example.com',
    age: 48,
    gender: 'Male',
    bloodGroup: 'O Positive',
    appointments: [
      {
        id: 'APT-10029',
        patientName: 'Rajesh Malhotra',
        patientPhone: '+91 98201 45990',
        patientEmail: 'rajesh.malhotra@example.com',
        patientAge: 48,
        patientGender: 'Male',
        departmentId: 'cardiology',
        departmentName: 'Cardiology & Cardiac Surgery',
        doctorId: 'doc-1',
        doctorName: 'Dr. Vikramaditya Mehta',
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
        doctorName: 'Dr. Siddharth Kapoor',
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
        doctorName: 'Dr. Sameer Deshmukh',
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
        doctorName: 'Dr. Vikramaditya Mehta',
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
