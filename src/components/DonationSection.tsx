import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, CreditCard, Gift, FileText, QrCode } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const [selectedCause, setSelectedCause] = useState<'heart' | 'cancer' | 'eye' | 'emergency'>('heart');
  const [amount, setAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const [donationSuccess, setDonationSuccess] = useState(false);
  const [receiptNo, setReceiptNo] = useState('');

  const causeTitles = {
    heart: 'Free Pediatric Heart Surgeries (Little Hearts Fund)',
    cancer: 'Indigent Patient Chemotherapy & Radiotherapy Support',
    eye: 'Rural Mobile Cataract & Eye Screening Camps',
    emergency: '24/7 Unclaimed Emergency Patient Relief Fund'
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    const generatedReceipt = `80G-AIMS-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptNo(generatedReceipt);
    setDonationSuccess(true);
  };

  return (
    <section id="donation" className="py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Asian Institute of Medical Sciences (AIMS) Care Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Heal a Heart, Save a Life — Philanthropy in Healthcare
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            100% of your contributions go directly to funding life-saving pediatric surgeries, cancer care for underprivileged families, and emergency trauma relief. All donations are 80G tax deductible.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Causes Cards */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span>Choose a Philanthropic Cause</span>
            </h3>

            {(['heart', 'cancer', 'eye', 'emergency'] as const).map((key) => (
              <div
                key={key}
                onClick={() => setSelectedCause(key)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedCause === key
                    ? 'bg-slate-800 border-cyan-400 shadow-xl'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold text-white">{causeTitles[key]}</h4>
                  <span className="text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    80G Tax Exempt
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {key === 'heart' && 'Funds life-saving congenital cardiac defect surgeries for infants of low-income families.'}
                  {key === 'cancer' && 'Provides free chemotherapy cycles, radiation therapy, and targeted immunotherapy.'}
                  {key === 'eye' && 'Operates high-tech mobile vision vans providing free cataract surgeries in remote villages.'}
                  {key === 'emergency' && 'Covers emergency trauma, ventilator care, and blood transfusions for accident victims.'}
                </p>
              </div>
            ))}
          </div>

          {/* Donation Form / Tax Receipt Card */}
          <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
            {!donationSuccess ? (
              <form onSubmit={handleDonationSubmit} className="space-y-5 text-xs">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span>Make a Difference Today</span>
                </h3>

                <div>
                  <label className="block text-slate-300 font-bold mb-2">Select Donation Amount (INR)</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[1000, 5000, 10000, 25000].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => {
                          setAmount(val);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 rounded-xl font-extrabold transition-all border ${
                          amount === val && !customAmount
                            ? 'bg-cyan-600 text-white border-cyan-400 shadow'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        ₹{val.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    placeholder="Or enter custom amount in ₹..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Donor Name (For Tax Receipt) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                      id="donor-name-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">PAN Number (For 80G Tax Rebate)</label>
                      <input
                        type="text"
                        placeholder="ABCDE1234F"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value)}
                        className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="ramesh@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  id="donate-now-button"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Donate ₹{(customAmount ? Number(customAmount) : amount).toLocaleString()} & Generate 80G Certificate</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">Thank You for Saving Lives!</h3>
                  <p className="text-xs text-slate-300">Your contribution brings healing and hope.</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/40 text-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-extrabold text-cyan-300">AIMS CARE FOUNDATION 80G RECEIPT</span>
                    <span className="font-mono text-amber-400 font-bold">{receiptNo}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Donor Name:</span>
                      <span className="font-bold text-white">{donorName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">PAN Number:</span>
                      <span className="font-mono text-white">{donorPan || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Cause:</span>
                      <span className="font-bold text-cyan-300">{causeTitles[selectedCause]}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Amount:</span>
                      <span className="font-black text-emerald-400 text-sm">₹{(customAmount ? Number(customAmount) : amount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setDonationSuccess(false)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Make Another Contribution
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
