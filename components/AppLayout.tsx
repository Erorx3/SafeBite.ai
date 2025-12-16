import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">SafeBite AI</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            <Link to="/app/upload" className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive('/app/upload')}`}>
              Scan
            </Link>
            <Link to="/app/history" className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive('/app/history')}`}>
              History
            </Link>
          </nav>
          
          <div className="w-8"></div> {/* Spacer to balance layout if needed, or just empty to keep flex behavior predictable */}
        </div>
      </header>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
