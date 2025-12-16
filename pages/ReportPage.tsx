import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { getResult } from '../services/storage';

export const ReportPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
    } else if (id) {
      const stored = getResult(id);
      setResult(stored || null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-emerald-500 animate-spin">progress_activity</span>
          <p className="text-slate-500">Retrieving intelligence...</p>
        </div>
      </div>
    );
  }

  if (!result) return <Navigate to="/app/upload" />;

  const isSafe = result.status === 'Safe';
  const riskColor = isSafe ? 'text-emerald-600' : result.confidenceScore > 80 ? 'text-red-600' : 'text-orange-600';
  const riskBg = isSafe ? 'bg-emerald-50' : result.confidenceScore > 80 ? 'bg-red-50' : 'bg-orange-50';
  const ringColor = isSafe ? '#10b981' : result.confidenceScore > 80 ? '#dc2626' : '#f97316';
  const percentage = result.confidenceScore;
  const gradient = `conic-gradient(${ringColor} 0% ${percentage}%, #e2e8f0 ${percentage}% 100%)`;

  return (
    <div className="animate-slide-up pb-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">ID: {result.id}</span>
          <span>•</span>
          <span>{result.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{result.sampleName} Report</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Visual Evidence (Only if Image exists) */}
          {result.imageUrl ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">image_search</span>
                  Analyzed Sample
                </h3>
              </div>
              <div className="relative bg-slate-100 aspect-square">
                <img src={result.imageUrl} alt={result.sampleName} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs text-slate-500">
                  <span className="font-bold">AI Workflow:</span> Identified product structure → Searched common adulterants → Compared visual signs.
                </p>
              </div>
            </div>
          ) : (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">description</span>
                  Text-Based Analysis
                </h3>
                <p className="text-sm text-slate-500 italic">
                  Analysis performed based on description and ingredient cross-referencing via Google Search.
                </p>
             </div>
          )}

          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Risk Assessment</h3>
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-4 transition-all duration-1000 ease-out" style={{ background: gradient }}>
              <div className="bg-white w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl font-bold text-slate-900 tracking-tighter">{percentage}%</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full mt-2 ${riskColor} ${riskBg}`}>
                  {result.status}
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600 max-w-xs mt-2">
              Confidence level based on visual evidence and search data grounding.
            </p>
          </div>

          {/* Sources */}
          {result.sourceLinks && result.sourceLinks.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-500">public</span>
                Verified Sources
              </h3>
              <ul className="space-y-2">
                {result.sourceLinks.slice(0, 3).map((link, i) => (
                  <li key={i} className="text-xs truncate">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">link</span>
                      {new URL(link).hostname}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FSSAI Action Button */}
          <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-8xl text-orange-900">gavel</span>
            </div>
            <h3 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-[18px]">policy</span>
              Consumer Action
            </h3>
            <p className="text-xs text-orange-800/80 mb-4 leading-relaxed relative z-10 font-medium">
              Suspect food adulteration? File a direct grievance with the Food Safety and Standards Authority of India (FSSAI).
            </p>
            <a 
              href="https://foscos.fssai.gov.in/consumer-grievance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              Report to FSSAI
              <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:translate-x-1 transition-transform">open_in_new</span>
            </a>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Impact on Body Section - RESTRUCTURED */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-900 p-4 flex items-center gap-3">
               <div className="bg-white/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">accessibility_new</span>
               </div>
               <div>
                 <h3 className="text-white font-bold text-lg">Impact on Human Body</h3>
                 <p className="text-slate-400 text-xs">Medical assessment of identified potential contaminants</p>
               </div>
             </div>
             
             <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-orange-600">
                    <span className="material-symbols-outlined">acute</span>
                    <h4 className="font-bold text-sm uppercase tracking-wide">Immediate Effects</h4>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {result.shortTermEffects}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-red-600">
                    <span className="material-symbols-outlined">chronic</span>
                    <h4 className="font-bold text-sm uppercase tracking-wide">Long-Term Risks</h4>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {result.longTermRisks}
                  </p>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
               <span className="material-symbols-outlined text-slate-700">fact_check</span>
               <h3 className="text-lg font-bold text-slate-900">Detailed Findings</h3>
            </div>
            
            {result.summary && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold block mb-1">AI Summary:</span>
                {result.summary}
              </div>
            )}
            
            {result.adulterants && result.adulterants.length > 0 ? (
              <div className="space-y-4">
                {result.adulterants.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.isToxic ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                           <span className="material-symbols-outlined text-[18px]">science</span>
                         </div>
                         <div>
                           <h4 className="font-bold text-slate-900">{item.name}</h4>
                           <span className="text-xs text-slate-500">{item.type}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isToxic && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded uppercase tracking-wide border border-red-200">Toxic</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-11">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center bg-emerald-50/50 rounded-xl border border-dashed border-emerald-200">
                <span className="material-symbols-outlined text-3xl text-emerald-600 mb-2">verified</span>
                <h4 className="text-lg font-semibold text-emerald-900">No Adulterants Detected</h4>
                <p className="text-emerald-700 max-w-md mt-1 text-sm">
                  The analysis did not find clear indicators of common contaminants.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};