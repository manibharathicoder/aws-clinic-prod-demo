import { NavLink } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon.jsx';
import PortalSwitcher from './PortalSwitcher.jsx';
import { usePortal } from '../../state/portal.jsx';
import AppBrand from './AppBrand.jsx';

export default function AccountingSidebar() {
  const { openSwitcher } = usePortal();

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 z-50 bg-[#F2F3F9] p-6 gap-y-2 border-r border-[#BACAC3]/20">
      <AppBrand icon="child_care" />

      <nav className="flex-1 space-y-1">
        <SidebarLink to="/accounting/dashboard" icon="dashboard" label="Dashboard" />
        <SidebarLink to="/accounting/invoices" icon="credit_card" label="Invoices" />
        <SidebarLink to="/accounting/payroll" icon="payments" label="Payroll" />
        <div className="h-4" />
        <SidebarLink to="/accounting/rates" icon="sell" label="Rate Management" />
        <SidebarLink to="/accounting/pricegroups" icon="inventory_2" label="Price Groups" />
        <SidebarLink to="/accounting/tax" icon="tune" label="Tax Settings" />
        <div className="h-4" />
        <SidebarLink to="/accounting/reports" icon="insights" label="Financial Reports" />
        <SidebarLink to="/accounting/oap" icon="local_hospital" label="OAP & Insurance" />
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

function SidebarLink({ to, icon, label }) {
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
    </NavLink>
  );
}
