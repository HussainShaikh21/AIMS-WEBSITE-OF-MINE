import React, { useState } from 'react';
import { CAREERS_DATA } from '../data/hospitalData';
import { CareerListing } from '../types';
import { Briefcase, MapPin, Clock, Building, CheckCircle, Send, X, FileText } from 'lucide-react';

export const CareersSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<CareerListing | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('3');
  const [coverNote, setCoverNote] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          applicantName,
          applicantEmail,
          applicantPhone,
          experienceYears,
          coverNote
        })
      });

      const data = await res.json();
      if (data.success) {
        setApplicationSuccess(true);
      }
    } catch (err) {
      console.error('Job application error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-300">
            Work at AIMS Hospital
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Join Our World-Class Medical & Administrative Team
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We empower doctors, nurses, radiographers, and medical researchers with cutting-edge surgical robotics, 128-slice CT imaging, and competitive compensation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CAREERS_DATA.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{job.title}</h3>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
                    {job.experienceRequired} Exp
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{job.description}</p>

                <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold block text-slate-800">Required Qualification:</span>
                  <p>{job.qualification}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Apply Before: {job.deadline}</span>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setApplicationSuccess(false);
                  }}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-sm"
                  id={`apply-job-${job.id}`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Job Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!applicationSuccess ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-extrabold uppercase bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded">
                      {selectedJob.department}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Apply for {selectedJob.title}</h3>
                    <p className="text-xs text-slate-500">AIMS Campus: {selectedJob.location}</p>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Ananya Sharma"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                        id="job-applicant-name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="ananya@example.com"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                          id="job-applicant-email"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mobile Phone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Relevant Clinical Experience (Years)</label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Resume / Cover Note Summary</label>
                      <textarea
                        rows={3}
                        placeholder="Brief summary of degrees, medical registration numbers, and clinical background..."
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                        id="job-submit-button"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong className="text-slate-800">{applicantName}</strong>. Our HR & Medical Board will review your application for <strong>{selectedJob.title}</strong> and contact you via email.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-4 px-6 py-2.5 bg-cyan-600 text-white font-bold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
