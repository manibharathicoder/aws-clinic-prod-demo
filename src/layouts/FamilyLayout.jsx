import { Outlet } from 'react-router-dom';
import FamilySidebar from '../components/layout/FamilySidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

export default function FamilyLayout() {
  return (
    <>
      <FamilySidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
}

