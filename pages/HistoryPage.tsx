import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHistory, deleteResult } from '../services/storage';
import { AnalysisResult } from '../types';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  useEffect(() => {
    // Load actual history from storage
    const storedHistory = getHistory();
    setHistory(storedHistory);
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent row click navigation
    if (window.confirm('Are you sure you want to delete this scan record?')) {
      const updated = deleteResult(id);
      setHistory(updated);
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.sampleName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.includes(searchTerm) ||
                          item.date.includes(searchTerm);
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Saved Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review your AI-generated food quality assessments.</p>
        </div>
        <Link to="/app/upload" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Analysis
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-[20px] group-focus-within:text-emerald-600 transition-colors">search</span>
            </div>
            <input 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 sm:text-sm transition-all" 
              placeholder="Search by food name, ID or date..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Safe</option>
                <option>Adulterated</option>
                <option>Inconclusive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sample</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Scanned</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Confidence</th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} onClick={() => navigate(`/app/dashboard/${item.id}`)} className="group hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-100 shadow-sm shrink-0">
                          {item.imageUrl ? (
                             <img src={item.imageUrl} alt={item.sampleName} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                             <div className="h-full w-full flex items-center justify-center text-gray-400">
                               <span className="material-symbols-outlined">image_not_supported</span>
                             </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.sampleName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">ID: <span className="font-mono">{item.id}</span></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">{item.date.split(',')[0]}</span>
                        <span className="text-xs text-gray-400">{item.date.split(',')[1] || ''}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${item.status === 'Safe' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          item.status === 'Adulterated' ? 'bg-red-50 text-red-700 border-red-100' : 
                          'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Safe' ? 'bg-emerald-500' : item.status === 'Adulterated' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.status === 'Safe' ? 'bg-emerald-500' : item.status === 'Adulterated' ? 'bg-red-500' : 'bg-yellow-500'}`} 
                            style={{ width: `${item.confidenceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{item.confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          title="View Details"
                          className="text-gray-400 hover:text-emerald-600 transition-colors p-1.5 hover:bg-emerald-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button 
                          title="Delete"
                          onClick={(e) => handleDelete(e, item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined text-4xl mb-3 opacity-50">history_toggle_off</span>
                      <p className="text-gray-500 font-medium">No reports found</p>
                      <p className="text-xs mt-1">Uploaded scans will appear here.</p>
                      <Link to="/app/upload" className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold hover:underline">
                        Start your first scan
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};