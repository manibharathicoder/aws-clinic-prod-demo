import { NavLink } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon.jsx';
import PortalSwitcher from './PortalSwitcher.jsx';
import { usePortal } from '../../state/portal.jsx';
import AppBrand from './AppBrand.jsx';

export default function Sidebar() {
  const { openSwitcher } = usePortal();

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 z-50 bg-[#F2F3F9] p-6 gap-y-2 border-r border-[#BACAC3]/20">
      <AppBrand icon="child_care" />

      <nav className="flex-1 space-y-1">
        <SidebarLink to="/superadmin/dashboard" icon="dashboard" label="Dashboard" />
        <SidebarLink to="/superadmin/clients" icon="group" label="All Clients" />
        <SidebarLink to="/superadmin/therapists" icon="clinical_notes" label="All Therapists" />
        <SidebarLink to="/superadmin/users" icon="badge" label="User Management" />
        <SidebarLink to="/superadmin/permissions" icon="lock" label="Permissions" badge="2" />
        <SidebarLink to="/superadmin/analytics" icon="insights" label="Analytics" />
        <div className="h-4" />
        <SidebarLink to="/superadmin/clinic" icon="domain" label="Clinic Config" />
        <SidebarLink to="/superadmin/settings" icon="settings" label="System Settings" />
        <SidebarLink to="/superadmin/audit" icon="shield" label="Audit Log" />
      </nav>

      <div className="mt-auto space-y-1">
        <button
          type="button"
          className="w-full mb-4 py-3 px-4 flex items-center justify-between bg-primary-container text-on-primary-container rounded-xl font-bold shadow-md shadow-primary/10 group overflow-hidden relative transition-transform active:scale-95"
          onClick={openSwitcher}
        >
          <span className="relative z-10">Portal Switcher</span>
          <MaterialIcon name="swap_horiz" className="relative z-10" />
        </button>
        <a
          className="flex items-center gap-3 px-4 py-3 text-[#3C4A45] hover:text-[#006B58] hover:bg-[#ECEEF3] rounded-lg transition-colors"
          href="#"
        >
          <MaterialIcon name="help" />
          <span className="font-['Plus_Jakarta_Sans'] text-base tracking-tight">Support</span>
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 text-[#3C4A45] hover:text-[#006B58] hover:bg-[#ECEEF3] rounded-lg transition-colors"
          href="#"
        >
          <MaterialIcon name="logout" />
          <span className="font-['Plus_Jakarta_Sans'] text-base tracking-tight">Sign Out</span>
        </a>
      </div>

      <PortalSwitcher />
    </aside>
  );
}

function SidebarLink({ to, icon, label, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors scale-100 hover:scale-[1.02] active:scale-[0.98] duration-200',
          isActive
            ? 'bg-[#FFFFFF] text-[#006B58] shadow-sm font-semibold'
            : 'text-[#3C4A45] hover:text-[#006B58] hover:bg-[#ECEEF3]',
        ].join(' ')
      }
    >
      <MaterialIcon name={icon} />
      <span className="font-['Plus_Jakarta_Sans'] text-base tracking-tight">{label}</span>
      {badge ? (
        <span className="ml-auto text-[10px] font-bold bg-error text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}
