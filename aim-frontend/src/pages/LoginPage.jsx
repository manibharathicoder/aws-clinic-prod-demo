// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ROLE_HOME = {
  super_admin: '/superadmin/dashboard',
  admin:       '/admin/dashboard',
  accounting:  '/accounting/dashboard',
  therapist:   '/therapist/schedule',
  family:      '/family/sessions',
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.data.token);
      navigate(ROLE_HOME[data.data.role] || '/login');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Card */}
        <div style={{
          background: 'rgba(30,41,59,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>

          {/* Logo / Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.35)',
              marginBottom: '16px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 6px' }}>
              AIM Pediatric Therapy
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
              Sign in to your portal
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              marginBottom: '20px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#cbd5e1', marginBottom: '8px' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@aim.com"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: 'rgba(15,23,42,0.7)',
                  border: '1px solid #334155',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#cbd5e1', marginBottom: '8px' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: 'rgba(15,23,42,0.7)',
                  border: '1px solid #334155',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#334155'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: loading ? '#4338ca' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                border: 'none',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                transition: 'opacity 0.2s, transform 0.1s',
                marginTop: '4px',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{
            marginTop: '28px',
            padding: '14px 16px',
            borderRadius: '10px',
            background: 'rgba(15,23,42,0.5)',
            border: '1px solid #1e293b',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Database Connected Accounts
            </p>
            {[
              { email: 'superadmin@aim.com', role: 'super_admin' },
              { email: 'admin@aim.com',      role: 'admin' },
              { email: 'accounting@aim.com', role: 'accounting' },
              { email: 'therapist@aim.com',  role: 'therapist' },
              { email: 'family@aim.com',     role: 'family' }
            ].map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => setForm({ email: u.email, password: 'password' })}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '5px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{u.email}</span>
                <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: '500' }}>
                  {u.role.replace('_', ' ')}
                </span>
              </button>
            ))}
            <p style={{ fontSize: '11px', color: '#475569', marginTop: '8px' }}>
              All passwords: <span style={{ color: '#94a3b8' }}>password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
