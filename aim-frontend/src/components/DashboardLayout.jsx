// src/components/DashboardLayout.jsx
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-72 relative">
        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full pl-8 pr-12 py-6 text-sm bg-background/80 sticky top-0 z-40 backdrop-blur-md border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4 bg-surface-container-high/40 px-5 py-2.5 rounded-full w-96 border border-white/5 shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-lg leading-none cursor-pointer">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50 focus:outline-none" 
              placeholder="Search clinical records or finances..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <div className="flex items-center gap-6 pr-6 border-r border-white/10">
              <button className="text-slate-400 hover:text-indigo-300 transition-all duration-200 relative flex items-center justify-center">
                 <span className="material-symbols-outlined">notifications</span>
                 <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-background"></span>
              </button>
              <button className="text-slate-400 hover:text-indigo-300 transition-all duration-200 flex items-center justify-center">
                 <span className="material-symbols-outlined">security</span>
              </button>
              <button className="text-slate-400 hover:text-indigo-300 transition-all duration-200 flex items-center justify-center">
                 <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="font-bold text-on-surface tracking-tight leading-none mb-1">Super Admin</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">AIM Analytics</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
                 SA
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="px-8 pb-12 w-full pt-4">
          <Outlet />
        </div>

        {/* Visual Accents */}
        <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      </main>
    </div>
  );
}
