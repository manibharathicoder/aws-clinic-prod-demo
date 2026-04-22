import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

export default function AdminLayout() {
  return (
    <>
      <AdminSidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
}

