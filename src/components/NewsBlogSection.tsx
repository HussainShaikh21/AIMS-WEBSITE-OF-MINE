import React, { useState, useEffect } from 'react';
import { getStoredNews } from '../data/hospitalData';
import { NewsArticle } from '../types';
import { Clock, User, Tag, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';

export const NewsBlogSection: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>(() => getStoredNews());
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setNews(getStoredNews());
    };
    window.addEventListener('aims_news_updated', handleUpdate);
    return () => window.removeEventListener('aims_news_updated', handleUpdate);
  }, []);

  return (
    <section id="news" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Medical News & Health Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest Clinical Breakthroughs & Health Guides
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Stay informed with medical articles authored by AIMS Hospital consultants on 128-slice CT scan, stroke FAST rules, and robotic surgery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{art.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-600" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-200/60 mt-2 flex items-center justify-between text-xs font-bold text-cyan-700">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative space-y-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                  <span>Authored by: <strong className="text-slate-800">{selectedArticle.author}</strong> ({selectedArticle.authorRole})</span>
                  <span>• {selectedArticle.date}</span>
                </div>
              </div>

              <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-64 object-cover rounded-2xl border border-slate-200" />

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-normal">
                <p className="font-semibold text-slate-900 text-sm bg-slate-50 p-4 rounded-xl border-l-4 border-cyan-600">
                  {selectedArticle.summary}
                </p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setSelectedArticle(null)} className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
