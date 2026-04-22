import { Outlet } from 'react-router-dom';
import TherapistSidebar from '../components/layout/TherapistSidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

export default function TherapistLayout() {
  return (
    <>
      <TherapistSidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
}

