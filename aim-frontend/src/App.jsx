// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Pages
import LoginPage from './pages/LoginPage';
import Unauthorized from './pages/Unauthorized';

// Portals
import SuperAdminDashboard from './pages/superadmin/Dashboard';
import AdminDashboard      from './pages/admin/Dashboard';
import AccountingDashboard from './pages/accounting/Dashboard';
import TherapistSchedule   from './pages/therapist/Schedule';
import FamilySessions      from './pages/family/Sessions';

// Placeholder page for routes not yet built
function ComingSoon({ title }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: '12px',
      color: '#94a3b8', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ fontSize: '48px' }}>🚧</div>
      <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>
        {title}
      </h2>
      <p style={{ margin: 0, fontSize: '14px' }}>This page is coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/"             element={<Navigate to="/login" replace />} />

          {/* ── Super Admin ─────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/superadmin/dashboard"  element={<SuperAdminDashboard />} />
              <Route path="/superadmin/clients"    element={<ComingSoon title="All Clients" />} />
              <Route path="/superadmin/scheduling" element={<ComingSoon title="Scheduling" />} />
              <Route path="/superadmin/invoices"   element={<ComingSoon title="Invoices" />} />
              <Route path="/superadmin/rates"      element={<ComingSoon title="Rates" />} />
              <Route path="/superadmin/reports"    element={<ComingSoon title="Reports" />} />
              <Route path="/superadmin/users"      element={<ComingSoon title="Users" />} />
              <Route path="/superadmin/settings"   element={<ComingSoon title="Settings" />} />
            </Route>
          </Route>

          {/* ── Admin ───────────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard"  element={<AdminDashboard />} />
              <Route path="/admin/clients"    element={<ComingSoon title="Clients" />} />
              <Route path="/admin/scheduling" element={<ComingSoon title="Scheduling" />} />
              <Route path="/admin/intake"     element={<ComingSoon title="Intake" />} />
            </Route>
          </Route>

          {/* ── Accounting ──────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['accounting']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/accounting/dashboard" element={<AccountingDashboard />} />
              <Route path="/accounting/invoices"  element={<ComingSoon title="Invoices" />} />
              <Route path="/accounting/rates"     element={<ComingSoon title="Rates" />} />
              <Route path="/accounting/reports"   element={<ComingSoon title="Reports" />} />
            </Route>
          </Route>

          {/* ── Therapist ───────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['therapist']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/therapist/schedule" element={<TherapistSchedule />} />
              <Route path="/therapist/notes"    element={<ComingSoon title="Session Notes" />} />
              <Route path="/therapist/pay"      element={<ComingSoon title="Pay Statements" />} />
            </Route>
          </Route>

          {/* ── Family ──────────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['family']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/family/sessions"  element={<FamilySessions />} />
              <Route path="/family/invoices"  element={<ComingSoon title="Invoices" />} />
              <Route path="/family/progress"  element={<ComingSoon title="Child Progress" />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
