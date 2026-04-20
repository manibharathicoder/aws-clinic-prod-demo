// src/pages/superadmin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [childRes, sessionRes, therapistRes] = await Promise.all([
          api.get('/children'),
          api.get('/sessions?limit=5'),
          api.get('/therapists')
        ]);
        if (childRes.data.success) setChildren(childRes.data.children);
        if (sessionRes.data.success) setSessions(sessionRes.data.sessions);
        if (therapistRes.data.success) setTherapists(therapistRes.data.therapists);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load live data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Clients', value: children.length || '0', change: 'Live from DB', icon: '👥', color: '#6366f1' },
    { label: 'Sessions Scheduled', value: sessions.length || '0', change: 'This week', icon: '📅', color: '#06b6d4' },
    { label: 'Staff Count', value: therapists.length || '0', change: 'Active providers', icon: '🩺', color: '#10b981' },
    { label: 'Monthly Revenue', value: '$48K', change: '+12% vs last mo', icon: '💰', color: '#a78bfa' },
  ];

  return (
    <div className="animate-fade-in font-body pb-12 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Executive Dashboard
          </h2>
          <p className="text-on-surface-variant mt-2 font-body text-base">
            {loading ? 'Analyzing clinic performance...' : 'Real-time overview of AIM Pediatric health and performance.'}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-semibold flex items-center gap-1 hover:bg-surface-bright transition-all">
            <span className="material-symbols-outlined text-lg leading-none">download</span> Export
          </button>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed px-4 py-2 rounded-full font-bold shadow-lg shadow-primary-container/20 flex items-center gap-1 hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg leading-none">add</span> New Intake
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-5 rounded-xl flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: s.color }}>{s.change}</span>
            </div>
            <div>
              <p className="text-2xl font-bold font-headline leading-none mb-1">{s.value}</p>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider opacity-70">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Center Piece */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Clinic Performance Chart */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold font-headline">Clinic Performance</h3>
              <p className="text-on-surface-variant text-sm">Session volume across all locations</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-indigo-400"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Sessions</span>
          </div>
          <div className="h-40 flex items-end justify-between gap-2 px-2">
            <div className="flex-1 bg-surface-container-low rounded-t-lg" style={{ height: '40%' }} title="Day 1"></div>
            <div className="flex-1 bg-surface-container-low rounded-t-lg" style={{ height: '45%' }} title="Day 2"></div>
            <div className="flex-1 bg-indigo-500/40 rounded-t-lg" style={{ height: '60%' }} title="Day 3"></div>
            <div className="flex-1 bg-indigo-500/60 rounded-t-lg animate-pulse" style={{ height: '55%' }} title="Day 4"></div>
            <div className="flex-1 bg-indigo-500/40 rounded-t-lg" style={{ height: '70%' }} title="Day 5"></div>
            <div className="flex-1 bg-indigo-500/80 rounded-t-lg" style={{ height: '85%' }} title="Day 6"></div>
            <div className="flex-1 bg-indigo-500 rounded-t-lg" style={{ height: '100%' }} title="Today"></div>
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h3 className="text-lg font-bold font-headline">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-surface-container-lowest rounded">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> HIPAA Compliance</span>
              <span className="text-xs bg-tertiary/10 text-tertiary px-2 py-0.5 rounded font-bold">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container-lowest rounded">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> AWS Server Health</span>
              <span className="text-xs text-on-surface-variant">32ms Latency</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container-lowest rounded">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>warning</span> Open Tickets</span>
              <span className="text-xs text-primary font-bold">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
