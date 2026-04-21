import { Outlet } from 'react-router-dom';
import AccountingSidebar from '../components/layout/AccountingSidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import { PortalProvider } from '../state/portal.jsx';

export default function AccountingLayout() {
  return (
    <PortalProvider>
      <AccountingSidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </PortalProvider>
  );
}

