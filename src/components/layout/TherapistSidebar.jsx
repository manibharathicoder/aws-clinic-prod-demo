import { NavLink, useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon.jsx';
import AppBrand from './AppBrand.jsx';
import { useAuth } from '../../state/auth.jsx';

export default function TherapistSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 z-50 bg-[#F2F3F9] p-6 gap-y-2 border-r border-[#BACAC3]/20">
      <AppBrand />

      <nav className="flex-1 space-y-4">
        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Overview
          </div>
          <div className="space-y-1">
            <SidebarLink to="/therapist/dashboard" icon="dashboard" label="Dashboard" />
            <SidebarLink to="/therapist/schedule" icon="calendar_today" label="My Schedule" />
            <SidebarLink to="/therapist/allschedule" icon="groups" label="All Therapists" />
          </div>
        </div>

        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Work
          </div>
          <div className="space-y-1">
            <SidebarLink to="/therapist/sessions" icon="event_available" label="Sessions" badge="1" />
            <SidebarLink to="/therapist/cover" icon="sync" label="Cover Requests" badge="1" />
            <SidebarLink to="/therapist/paystatement" icon="payments" label="Pay Statement" />
          </div>
        </div>

        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Communicate
          </div>
          <div className="space-y-1">
            <SidebarLink to="/therapist/chat" icon="chat" label="Staff Chat" />
          </div>
        </div>
      </nav>

      <div className="mt-auto space-y-1">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
          onClick={() => navigate('/help')}
        >
          <MaterialIcon name="help" />
          <span className="text-base tracking-tight">Support</span>
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
          onClick={() => {
            logout();
            navigate('/login', { replace: true });
          }}
        >
          <MaterialIcon name="logout" />
          <span className="text-base tracking-tight">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, label, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'no-underline flex items-center gap-3 px-4 py-3 rounded-lg transition-colors scale-100 hover:scale-[1.02] active:scale-[0.98] duration-200',
          isActive
            ? 'bg-white text-primary shadow-sm font-semibold'
            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low',
        ].join(' ')
      }
    >
      <MaterialIcon name={icon} />
      <span className="text-base tracking-tight">{label}</span>
      {badge ? (
        <span className="ml-auto text-[10px] font-bold bg-error text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}
