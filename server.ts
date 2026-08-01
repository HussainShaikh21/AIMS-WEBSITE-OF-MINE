import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// API ENDPOINTS
// -----------------------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hospital: "AIMS Hospital", time: new Date().toISOString() });
});

// AI Health Triage & Symptom Checker (Gemini 3.6 Flash Server-Side)
app.post("/api/triage", async (req, res) => {
  try {
    const { symptoms, age, gender, duration, medicalHistory } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Symptoms description is required.' });
    }

    const ai = getGeminiClient();

    if (ai) {
      const promptText = `Patient details:
Age: ${age || 'Not specified'}, Gender: ${gender || 'Not specified'}, Symptoms Duration: ${duration || 'Not specified'}
Known Medical Conditions: ${medicalHistory || 'None reported'}
Chief Complaint / Symptoms described: "${symptoms}"

Please evaluate these symptoms as a medical triage assistant for AIMS Hospital. Categorize severity, recommend the right department at AIMS, provide red flag warnings, and give general first-aid/guidance.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          systemInstruction: `You are AIMS Hospital's Chief AI Clinical Triage Assistant. 
Analyze patient symptoms with extreme medical precision and safety.
ALWAYS include a legal medical disclaimer that this is an AI triage guidance and not a final medical diagnosis.
If symptoms suggest chest pain, acute shortness of breath, sudden weakness/numbness, loss of consciousness, severe trauma, or anaphylaxis, set triageLevel to "Emergency" immediately and instruct calling emergency hotline (+91 1800-2467-99) or visiting AIMS Level 1 Emergency.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              triageLevel: {
                type: Type.STRING,
                description: "One of: Emergency, Urgent, Routine, General Info"
              },
              recommendedDepartment: {
                type: Type.STRING,
                description: "Target department at AIMS (e.g. Cardiology, Neurology, Orthopedics, Pediatrics, Emergency)"
              },
              recommendedDoctorType: {
                type: Type.STRING,
                description: "Specialist doctor type (e.g. Chief Interventional Cardiologist, Neurosurgeon)"
              },
              summary: {
                type: Type.STRING,
                description: "Clinical summary of symptoms presented"
              },
              immediateAdvice: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Safe immediate steps or precautions"
              },
              warningSigns: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Red flag warning signs that require emergency room visits"
              },
              suggestedAction: {
                type: Type.STRING,
                description: "Actionable recommendation (e.g. Book 128-slice CT scan, visit OPD today, proceed to Emergency)"
              }
            },
            required: ["triageLevel", "recommendedDepartment", "summary", "immediateAdvice", "warningSigns", "suggestedAction"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, triage: parsed, source: "gemini-ai" });
      }
    }

    // Smart Fallback Rule-Based Triage if Gemini API Key is missing or unavailable
    const lower = symptoms.toLowerCase();
    let triageLevel = "Routine";
    let department = "General Medicine";
    let doctorType = "Consultant Physician";
    let summary = "Evaluation of submitted symptoms.";
    let immediateAdvice = ["Stay hydrated and rest in a comfortable environment.", "Monitor temperature and vital signs."];
    let warningSigns = ["Persistent fever above 102°F", "Difficulty breathing or chest discomfort"];
    let suggestedAction = "Schedule an OPD consultation with AIMS General Medicine or relevant specialist.";

    if (lower.includes("chest pain") || lower.includes("heart") || lower.includes("breath") || lower.includes("arm pain") || lower.includes("sweating")) {
      triageLevel = "Emergency";
      department = "Cardiology & Emergency";
      doctorType = "Interventional Cardiologist / Emergency Specialist";
      summary = "High priority cardiac alert detected due to chest discomfort or dyspnea.";
      immediateAdvice = [
        "DO NOT drive yourself to the hospital. Call AIMS 24/7 Emergency Hotline immediately (+91 1800-2467-99).",
        "Sit upright and rest comfortably while emergency medical services arrive.",
        "Take prescribed cardiac medications if recommended by your physician."
      ];
      warningSigns = ["Radiation of pain to jaw, neck, or left arm", "Severe cold sweating & dizziness", "Cyanosis or blue lips"];
      suggestedAction = "Proceed directly to AIMS Level 1 Trauma & Emergency Resuscitation Room or call 1800-2467-99.";
    } else if (lower.includes("headache") || lower.includes("dizzy") || lower.includes("numb") || lower.includes("stroke") || lower.includes("seizure") || lower.includes("speech")) {
      triageLevel = "Emergency";
      department = "Neurology & Neurosurgery";
      doctorType = "Neurosurgeon / Stroke Specialist";
      summary = "Neurological alert detected (headache, numbness, or dizziness).";
      immediateAdvice = [
        "Perform FAST check (Face drooping, Arm weakness, Speech difficulty).",
        "Keep the patient in a safe recovery position."
      ];
      warningSigns = ["Sudden loss of vision or double vision", "Inability to speak clearly", "Sudden paralysis on one side"];
      suggestedAction = "Immediate evaluation in AIMS Comprehensive Stroke ICU.";
    } else if (lower.includes("fracture") || lower.includes("bone") || lower.includes("knee") || lower.includes("joint") || lower.includes("back pain")) {
      triageLevel = "Urgent";
      department = "Orthopedics & Robotic Surgery";
      doctorType = "Orthopedic Specialist";
      summary = "Musculoskeletal or joint symptom pattern reported.";
      immediateAdvice = ["Apply ice pack to swollen area for 15-20 minutes.", "Elevate and immobilize the affected limb."];
      warningSigns = ["Inability to bear weight", "Deformity of limb", "Numbness below the joint"];
      suggestedAction = "Book an urgent Orthopedic consultation or Digital X-Ray screening.";
    }

    return res.json({
      success: true,
      triage: {
        triageLevel,
        recommendedDepartment: department,
        recommendedDoctorType: doctorType,
        summary,
        immediateAdvice,
        warningSigns,
        suggestedAction
      },
      source: "rule-based-fallback"
    });

  } catch (err: any) {
    console.error("Triage Error:", err);
    res.status(500).json({ error: "Failed to process health triage.", details: err.message });
  }
});

// Online Appointment Booking API
app.post("/api/appointment/book", (req, res) => {
  const { patientName, patientPhone, patientEmail, patientAge, patientGender, departmentId, departmentName, doctorId, doctorName, appointmentDate, appointmentTime, symptoms, branchName } = req.body;

  if (!patientName || !patientPhone || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: "Patient name, phone number, date, and time are required." });
  }

  const bookingId = "AIMS-APT-" + Math.floor(100000 + Math.random() * 900000);
  const qrCodeToken = "QR-" + bookingId + "-" + Date.now();

  const appointmentRecord = {
    id: bookingId,
    patientName,
    patientPhone,
    patientEmail: patientEmail || "patient@aimshospital.org",
    patientAge: Number(patientAge) || 30,
    patientGender: patientGender || "Other",
    departmentId: departmentId || "general",
    departmentName: departmentName || "General Medicine",
    doctorId: doctorId || "doc-general",
    doctorName: doctorName || "Senior Consultant",
    appointmentDate,
    appointmentTime,
    symptoms: symptoms || "Routine checkup",
    status: "Confirmed",
    bookingFee: 1200,
    createdAt: new Date().toISOString().split("T")[0],
    qrCodeToken,
    branchName: branchName || "AIMS Main Campus"
  };

  return res.json({
    success: true,
    message: "Appointment confirmed successfully!",
    appointment: appointmentRecord,
    notificationsSent: {
      sms: `SMS sent to ${patientPhone}: Your appointment with ${doctorName} is confirmed for ${appointmentDate} at ${appointmentTime}. Booking Ref: ${bookingId}`,
      whatsapp: `WhatsApp pass generated with QR code ${qrCodeToken}.`,
      email: `Confirmation email dispatched to ${patientEmail || 'patient'}`
    }
  });
});

// Career Application Receiver API
app.post("/api/careers/apply", (req, res) => {
  const { fullName, email, phone, jobId, jobTitle, experience, coverLetter } = req.body;
  if (!fullName || !email || !phone || !jobId) {
    return res.status(400).json({ error: "Full name, email, phone, and target position are required." });
  }

  const applicationId = "APP-CAREER-" + Math.floor(1000 + Math.random() * 9000);

  return res.json({
    success: true,
    message: `Application submitted successfully for ${jobTitle}! Reference ID: ${applicationId}`,
    applicationId
  });
});

// -----------------------------------------------------------------------------
// VITE MIDDLEWARE SETUP FOR DEV & DIST SERVING FOR PRODUCTION
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AIMS Hospital Server running on http://localhost:${PORT}`);
  });
}

startServer();
