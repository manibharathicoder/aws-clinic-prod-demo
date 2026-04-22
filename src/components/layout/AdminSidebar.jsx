import { NavLink, useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon.jsx';
import AppBrand from './AppBrand.jsx';
import { useAuth } from '../../state/auth.jsx';

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 z-50 bg-[#F2F3F9] p-6 gap-y-2 border-r border-[#BACAC3]/20">
      <AppBrand />

      <nav className="flex-1 space-y-4">
        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Daily Ops
          </div>
          <div className="space-y-1">
            <SidebarLink to="/admin/dashboard" icon="dashboard" label="Dashboard" />
            <SidebarLink to="/admin/schedule" icon="calendar_today" label="Scheduling" />
            <SidebarLink to="/admin/intake" icon="playlist_add" label="Intake Pipeline" badge="4" />
          </div>
        </div>

        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Manage
          </div>
          <div className="space-y-1">
            <SidebarLink to="/admin/clients" icon="group" label="Clients" />
            <SidebarLink to="/admin/actions" icon="task_alt" label="Pending Actions" badge="6" />
          </div>
        </div>

        <div>
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-2">
            Communicate
          </div>
          <div className="space-y-1">
            <SidebarLink to="/admin/messages" icon="chat" label="Messages" />
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
