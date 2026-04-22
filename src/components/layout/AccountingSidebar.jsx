import { NavLink, useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon.jsx';
import AppBrand from './AppBrand.jsx';
import { useAuth } from '../../state/auth.jsx';

export default function AccountingSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 z-50 bg-[#F2F3F9] p-6 gap-y-2 border-r border-[#BACAC3]/20">
      <AppBrand />

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

function SidebarLink({ to, icon, label }) {
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
    </NavLink>
  );
}
