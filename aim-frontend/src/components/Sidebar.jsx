// src/components/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_CONFIG = {
  super_admin: [
    { label: 'Executive Insights',   path: '/superadmin/dashboard', icon: 'dashboard' },
    { label: 'Clinical Operations', path: '/superadmin/clients',   icon: 'diversity_2' },
    { label: 'Scheduling',  path: '/superadmin/scheduling',icon: 'calendar_today' },
    { label: 'Financial Center',    path: '/superadmin/invoices',  icon: 'payments' },
    { label: 'Rates',       path: '/superadmin/rates',     icon: 'attach_money' },
    { label: 'Reports',     path: '/superadmin/reports',   icon: 'bar_chart' },
    { label: 'Therapist Portal',       path: '/superadmin/users',     icon: 'medical_services' },
    { label: 'System Compliance',    path: '/superadmin/settings',  icon: 'verified_user' },
  ],
  admin: [
    { label: 'Dashboard',  path: '/admin/dashboard',  icon: 'dashboard' },
    { label: 'Clients',    path: '/admin/clients',    icon: 'groups' },
    { label: 'Scheduling', path: '/admin/scheduling', icon: 'calendar_today' },
    { label: 'Intake',     path: '/admin/intake',     icon: 'assignment' },
  ],
  accounting: [
    { label: 'Dashboard', path: '/accounting/dashboard', icon: 'dashboard' },
    { label: 'Invoices',  path: '/accounting/invoices',  icon: 'receipt_long' },
    { label: 'Rates',     path: '/accounting/rates',     icon: 'attach_money' },
    { label: 'Reports',   path: '/accounting/reports',   icon: 'bar_chart' },
  ],
  therapist: [
    { label: 'My Schedule',    path: '/therapist/schedule', icon: 'calendar_today' },
    { label: 'Session Notes',  path: '/therapist/notes',    icon: 'edit_note' },
    { label: 'Pay Statements', path: '/therapist/pay',      icon: 'payments' },
  ],
  family: [
    { label: 'My Sessions',    path: '/family/sessions',  icon: 'calendar_today' },
    { label: 'Invoices',       path: '/family/invoices',  icon: 'receipt_long' },
    { label: 'Child Progress', path: '/family/progress',  icon: 'trending_up' },
  ],
};

const ROLE_LABELS = {
  super_admin: 'Super Admin',
  admin:       'Admin',
  accounting:  'Accounting',
  therapist:   'Therapist',
  family:      'Family',
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = NAV_CONFIG[user?.role] || [];
  const roleLabel = ROLE_LABELS[user?.role] || user?.role;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-72 z-50 bg-slate-900/60 backdrop-blur-2xl shadow-2xl shadow-slate-950/50 rounded-r-[3rem] text-on-surface flex flex-col border-r border-white/5"
    >
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className="p-8 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400 leading-tight">AIM Pediatric</h1>
        <p className="text-on-surface-variant text-xs mt-1">{roleLabel} Portal</p>
      </div>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <nav className="flex-1 mt-4 flex flex-col gap-1 overflow-y-auto w-full">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition-all w-full ${
                isActive
                  ? 'border-l-4 border-indigo-500 bg-white/5 text-indigo-400 font-semibold shadow-sm shadow-indigo-900/20'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="text-base leading-none w-5 text-center select-none material-symbols-outlined">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Footer / User ─────────────────────────────────────────── */}
      <div className="mt-auto pb-10 w-full px-6 flex flex-col gap-4 shrink-0">
        {/* System Health pill */}
        <div className="bg-indigo-500/10 rounded-2xl p-4 flex items-center justify-between border border-indigo-500/10">
          <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">System Health: 100%</span>
          <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_12px_var(--color-tertiary)] animate-pulse"></div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-3 px-2 py-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-indigo-500/20">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-200 truncate leading-tight">{user?.name ?? 'User'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-3 text-red-500/80 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all font-bold text-sm"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
