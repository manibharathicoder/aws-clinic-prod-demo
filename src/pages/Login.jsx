import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBrand from '../components/layout/AppBrand.jsx';
import Card from '../components/ui/Card.jsx';
import { useAuth } from '../state/auth.jsx';
import { DEFAULT_HOME } from '../components/auth/RequireAuth.jsx';

const ROLES = [
  { id: 'superadmin', name: 'Super Admin' },
  { id: 'admin', name: 'Admin' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'therapist', name: 'Therapist' },
  { id: 'family', name: 'Family' },
];

export default function LoginPage() {
  const { isAuthed, user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const next = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('next') || '';
  }, [location.search]);

  const [email, setEmail] = useState('superadmin@demo.com');
  const [role, setRole] = useState('superadmin');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-2">
          <div className="max-w-sm">
            <AppBrand />
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Sign in</h2>
            <p className="mt-2 text-on-surface-variant font-medium">
              Demo login for role-based portals. No backend yet.
            </p>

            {isAuthed ? (
              <div className="mt-4 rounded-2xl border border-outline-variant/30 bg-white p-4">
                <div className="text-sm font-extrabold text-on-surface">You are already signed in</div>
                <div className="mt-1 text-xs text-on-surface-variant">
                  {user.email} · role: <span className="font-bold">{user.role}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-extrabold"
                    onClick={() => navigate(DEFAULT_HOME[user.role] || '/superadmin/dashboard')}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-extrabold"
                    onClick={() => navigate('/login', { replace: true })}
                  >
                    Switch role below
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Quick roles</div>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={[
                      'px-4 py-3 rounded-xl border text-left transition-colors',
                      role === r.id
                        ? 'bg-primary/5 border-primary text-on-surface'
                        : 'bg-white border-outline-variant/30 hover:border-primary/40 text-on-surface',
                    ].join(' ')}
                  >
                    <div className="text-sm font-extrabold">{r.name}</div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">Switch portal</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card className="p-6 lg:p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              login({ email, role });
              if (next) navigate(next, { replace: true });
              else navigate(DEFAULT_HOME[role] || '/superadmin/dashboard', { replace: true });
            }}
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full px-4 py-3 rounded-xl bg-primary text-white font-extrabold">
              Sign in
            </button>

            <div className="text-[11px] text-on-surface-variant">
              Tip: pick a role and click Sign in. This stores a demo session in <span className="font-bold">localStorage</span>.
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
