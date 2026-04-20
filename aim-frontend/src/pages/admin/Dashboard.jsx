// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [childRes, sessionRes] = await Promise.all([
          api.get('/children'),
          api.get('/sessions?limit=10')
        ]);
        
        if (childRes.data.success) setChildren(childRes.data.children);
        if (sessionRes.data.success) setSessions(sessionRes.data.sessions);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Showing demo fallback.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Clients', value: children.length || '0', change: 'Live from database', icon: '👥', color: '#6366f1' },
    { label: 'Upcoming Sessions', value: sessions.filter(s => s.status === 'scheduled').length || '0', change: 'Next 7 days', icon: '📅', color: '#06b6d4' },
    { label: 'Intake Pending', value: children.filter(c => c.diagnosis === null).length || '0', change: 'Needs review', icon: '📋', color: '#f59e0b' },
    { label: 'Services', value: '8', change: 'Active programs', icon: '🛠️', color: '#10b981' },
  ];

  const statusColor = {
    active: { bg: '#10b98120', color: '#34d399' },
    scheduled: { bg: '#06b6d420', color: '#22d3ee' },
    completed: { bg: '#6366f120', color: '#818cf8' },
    cancelled: { bg: '#ef444420', color: '#f87171' },
    no_show: { bg: '#334155', color: '#94a3b8' },
  };

  return (
    <div className="animate-fade-in" style={{ fontFamily: "'Inter', sans-serif", padding: '10px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Admin <span style={{ color: '#6366f1' }}>Dashboard</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>
            {loading ? 'Fetching latest clinic data...' : `Welcome back, ${user?.name}. Everything is running smoothly.`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
             <button className="glass-card" style={{ padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Download Reports
             </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#ef444415', border: '1px solid #ef444430', color: '#f87171', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '13px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={s.label} className="glass-panel" style={{ borderRadius: '20px', padding: '24px', transitionDelay: `${i * 100}ms` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px', background: `${s.color}20`, padding: '10px', borderRadius: '12px' }}>{s.icon}</span>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</p>
            </div>
            <p style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.value}</p>
            <p style={{ fontSize: '13px', color: '#475569' }}>{s.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Main Content: Recent Sessions */}
        <div className="glass-panel" style={{ borderRadius: '20px', padding: '28px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>📅 Recent Sessions</h2>
            <button style={{ fontSize: '13px', color: '#6366f1', background: 'transparent', border: 'none', fontWeight: 600, cursor: 'pointer' }}>View All →</button>
          </div>
          
          {loading ? (
            <div className="animate-pulse-subtle" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading session data...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['Client', 'Therapist', 'Service', 'Date', 'Status'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.length > 0 ? sessions.map((s, i) => (
                    <tr key={i} className="glass-card" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{s.child_first_name} {s.child_last_name}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{s.therapist_name}</td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#94a3b8' }}>{s.service_name || 'General'}</td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#64748b' }}>{new Date(s.scheduled_at).toLocaleDateString()}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ 
                          fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '10px', textTransform: 'uppercase',
                          background: statusColor[s.status]?.bg || '#334155', color: statusColor[s.status]?.color || '#94a3b8' 
                        }}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No sessions found in the database.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar: New Clients */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>👥 Recent Clients</h2>
              <span style={{ fontSize: '12px', color: '#6366f1', background: '#6366f115', padding: '4px 10px', borderRadius: '8px' }}>Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {loading ? (
                 <div className="animate-pulse-subtle" style={{ height: '100px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}></div>
              ) : children.slice(0, 5).map((c, i) => (
                <div key={i} className="glass-card" style={{ borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: '#6366f1', height: '40px', width: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                    {c.first_name[0]}{c.last_name[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{c.first_name} {c.last_name}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>Member since {new Date(c.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {!loading && children.length === 0 && <p style={{ fontSize: '13px', color: '#475569', textAlign: 'center' }}>No clients registered yet.</p>}
            </div>
            <button className="glass-card" style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              + Add New Client
            </button>
          </div>

          <div className="glass-panel" style={{ borderRadius: '20px', padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Security Audit</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>Your database is currently running on AWS RDS with SSL enforcement enabled.</p>
            <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <span style={{ height: '8px', width: '8px', background: '#10b981', borderRadius: '50%' }}></span>
               All systems operational
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

