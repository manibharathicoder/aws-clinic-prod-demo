import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import { PortalProvider } from '../state/portal.jsx';

export default function SuperAdminLayout() {
  return (
    <PortalProvider>
      <Sidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </PortalProvider>
  );
}

