import { Outlet } from 'react-router-dom';
import FamilySidebar from '../components/layout/FamilySidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import { PortalProvider } from '../state/portal.jsx';

export default function FamilyLayout() {
  return (
    <PortalProvider>
      <FamilySidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </PortalProvider>
  );
}

