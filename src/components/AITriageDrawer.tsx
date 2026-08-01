import React, { useState } from 'react';
import { AIMSLogo } from './AIMSLogo';
import { HeartPulse, X, Send, ShieldAlert, Sparkles, CheckCircle, AlertTriangle, ArrowRight, PhoneCall } from 'lucide-react';
import { TriageResponse } from '../types';

interface AITriageDrawerProps {
  onClose: () => void;
  onBookAppointment: (deptId?: string) => void;
}

export const AITriageDrawer: React.FC<AITriageDrawerProps> = ({ onClose, onBookAppointment }) => {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [age, setAge] = useState<string>('35');
  const [gender, setGender] = useState<string>('Male');
  const [duration, setDuration] = useState<string>('2 Days');

  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResponse | null>(null);

  const handleTriageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptomsInput,
          age,
          gender,
          duration
        })
      });

      const data = await res.json();
      if (data.success) {
        setTriageResult(data.triage);
      }
    } catch (err) {
      console.error('Triage call error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white w-full max-w-xl h-full shadow-2xl border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <AIMSLogo size="sm" variant="icon-only" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-white">Asian Institute of Medical Sciences (AIMS) AI Triage</h2>
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                    GEMINI AI
                  </span>
                </div>
                <p className="text-xs text-slate-400">24/7 Symptom analysis & specialty recommendation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Intro Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-300 mb-6 leading-relaxed">
            <span className="font-bold block mb-0.5">Medical Safety Disclaimer:</span>
            This AI tool provides preliminary triage guidance based on clinical rules and Gemini models. If you have severe chest pain, extreme dyspnea, or sudden paralysis, please call <a href="tel:1800246799" className="underline font-bold text-red-400">AIMS Emergency 1800-2467-99</a> immediately.
          </div>

          {/* Form */}
          <form onSubmit={handleTriageSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 font-medium"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 2 days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Describe Your Symptoms *</label>
              <textarea
                rows={4}
                required
                placeholder="e.g. I have severe chest pressure radiating to my left arm for 20 minutes with sweating..."
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                className="w-full p-3 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 leading-relaxed"
                id="triage-symptoms-input"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              id="triage-submit-button"
            >
              {isLoading ? (
                <span>Analyzing Symptoms with Gemini AI...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Run AI Clinical Assessment</span>
                </>
              )}
            </button>
          </form>

          {/* TRIAGE RESULT CARD */}
          {triageResult && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-300 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-bold text-slate-400">Triage Assessment Level:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    triageResult.triageLevel === 'Emergency'
                      ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                      : triageResult.triageLevel === 'Urgent'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}
                >
                  {triageResult.triageLevel} Priority
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-bold">Clinical Summary:</span>
                <p className="text-white mt-1 leading-relaxed">{triageResult.summary}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Recommended Department & Doctor:</span>
                <p className="text-white font-extrabold text-sm">{triageResult.recommendedDepartment}</p>
                <p className="text-slate-400 text-[11px]">{triageResult.recommendedDoctorType}</p>
              </div>

              {/* Immediate Advice */}
              <div>
                <span className="text-emerald-400 font-bold block mb-1">Immediate First-Aid / Action Steps:</span>
                <ul className="space-y-1 text-slate-300">
                  {triageResult.immediateAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flag Warning Signs */}
              {triageResult.warningSigns.length > 0 && (
                <div>
                  <span className="text-red-400 font-bold block mb-1">Red Flag Emergency Warnings:</span>
                  <ul className="space-y-1 text-slate-300">
                    {triageResult.warningSigns.map((warn, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{warn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                {triageResult.triageLevel === 'Emergency' ? (
                  <a
                    href="tel:1800246799"
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call 24/7 Emergency Hotline (1800-2467-99)</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onBookAppointment();
                    }}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Book Appointment in {triageResult.recommendedDepartment}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Powered by AIMS Hospital Gemini AI Server Triage Engine
        </div>
      </div>
    </div>
  );
};
