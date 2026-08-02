import React from 'react';
import { HEALTH_PACKAGES } from '../data/hospitalData';
import { CheckCircle2, ShieldCheck, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface HealthPackagesSectionProps {
  onBookPackage: (pkgTitle: string) => void;
}

export const HealthPackagesSection: React.FC<HealthPackagesSectionProps> = ({ onBookPackage }) => {
  return (
    <section id="packages" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-300">
            Preventive Healthcare
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Health Checkup Packages
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Early diagnosis saves lives. Explore curated organ screening panels including 128-slice cardiac CT, 3D echo, cancer markers, and full blood chemistry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                pkg.isPopular ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-slate-200'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                  MOST POPULAR
                </div>
              )}

              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 block w-fit mb-3">
                  {pkg.testsIncludedCount} Tests & Consults Included
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{pkg.targetAudience}</p>

                {/* Pricing */}
                <div className="mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-700">PKR {pkg.discountedPrice.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 line-through">PKR {pkg.originalPrice.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded ml-auto">
                    Save {Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Test Highlights */}
                <div className="space-y-2 mb-4 text-xs">
                  <span className="font-bold text-slate-700 block">Tests Included:</span>
                  <ul className="space-y-1.5 text-slate-600">
                    {pkg.testsList.map((test, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onBookPackage(pkg.title)}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Health Package</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
