import { Navigate, Route, Routes } from 'react-router-dom';
import SuperAdminLayout from './layouts/SuperAdminLayout.jsx';
import AccountingLayout from './layouts/AccountingLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import TherapistLayout from './layouts/TherapistLayout.jsx';
import SuperAdminDashboard from './pages/superadmin/Dashboard.jsx';
import SuperAdminUsers from './pages/superadmin/Users.jsx';
import SuperAdminPermissions from './pages/superadmin/Permissions.jsx';
import SuperAdminClinic from './pages/superadmin/Clinic.jsx';
import SuperAdminSettings from './pages/superadmin/Settings.jsx';
import SuperAdminAudit from './pages/superadmin/Audit.jsx';
import SuperAdminAnalytics from './pages/superadmin/Analytics.jsx';
import SuperAdminClients from './pages/superadmin/Clients.jsx';
import SuperAdminTherapists from './pages/superadmin/Therapists.jsx';
import AccountingDashboard from './pages/accounting/Dashboard.jsx';
import AccountingInvoices from './pages/accounting/Invoices.jsx';
import AccountingPayroll from './pages/accounting/Payroll.jsx';
import AccountingRates from './pages/accounting/Rates.jsx';
import AccountingPriceGroups from './pages/accounting/PriceGroups.jsx';
import AccountingTax from './pages/accounting/Tax.jsx';
import AccountingReports from './pages/accounting/Reports.jsx';
import AccountingOapInsurance from './pages/accounting/OapInsurance.jsx';
import FamilyLayout from './layouts/FamilyLayout.jsx';
import FamilyDashboard from './pages/family/Dashboard.jsx';
import FamilySessions from './pages/family/Sessions.jsx';
import FamilyProgress from './pages/family/Progress.jsx';
import FamilyBilling from './pages/family/Billing.jsx';
import FamilyPayment from './pages/family/Payment.jsx';
import FamilyMessages from './pages/family/Messages.jsx';
import FamilyDocuments from './pages/family/Documents.jsx';
import LoginPage from './pages/Login.jsx';
import LogoutPage from './pages/Logout.jsx';
import HelpPage from './pages/Help.jsx';
import RequireAuth from './components/auth/RequireAuth.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminSchedule from './pages/admin/Schedule.jsx';
import AdminIntake from './pages/admin/Intake.jsx';
import AdminClients from './pages/admin/Clients.jsx';
import AdminActions from './pages/admin/Actions.jsx';
import AdminMessages from './pages/admin/Messages.jsx';
import TherapistDashboard from './pages/therapist/Dashboard.jsx';
import TherapistSchedule from './pages/therapist/Schedule.jsx';
import TherapistAllSchedule from './pages/therapist/AllSchedule.jsx';
import TherapistSessions from './pages/therapist/Sessions.jsx';
import TherapistCover from './pages/therapist/Cover.jsx';
import TherapistPayStatement from './pages/therapist/PayStatement.jsx';
import TherapistChat from './pages/therapist/Chat.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/help" element={<HelpPage />} />

      <Route
        path="/superadmin"
        element={
          <RequireAuth allow={['superadmin']}>
            <SuperAdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="analytics" element={<SuperAdminAnalytics />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="permissions" element={<SuperAdminPermissions />} />
        <Route path="clients" element={<SuperAdminClients />} />
        <Route path="therapists" element={<SuperAdminTherapists />} />
        <Route path="clinic" element={<SuperAdminClinic />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="audit" element={<SuperAdminAudit />} />
      </Route>

      <Route
        path="/accounting"
        element={
          <RequireAuth allow={['accounting', 'superadmin']}>
            <AccountingLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/accounting/dashboard" replace />} />
        <Route path="dashboard" element={<AccountingDashboard />} />
        <Route path="invoices" element={<AccountingInvoices />} />
        <Route path="payroll" element={<AccountingPayroll />} />
        <Route path="rates" element={<AccountingRates />} />
        <Route path="pricegroups" element={<AccountingPriceGroups />} />
        <Route path="tax" element={<AccountingTax />} />
        <Route path="reports" element={<AccountingReports />} />
        <Route path="oap" element={<AccountingOapInsurance />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RequireAuth allow={['admin', 'superadmin']}>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route path="intake" element={<AdminIntake />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="actions" element={<AdminActions />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      <Route
        path="/therapist"
        element={
          <RequireAuth allow={['therapist', 'superadmin']}>
            <TherapistLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/therapist/dashboard" replace />} />
        <Route path="dashboard" element={<TherapistDashboard />} />
        <Route path="schedule" element={<TherapistSchedule />} />
        <Route path="allschedule" element={<TherapistAllSchedule />} />
        <Route path="sessions" element={<TherapistSessions />} />
        <Route path="cover" element={<TherapistCover />} />
        <Route path="paystatement" element={<TherapistPayStatement />} />
        <Route path="chat" element={<TherapistChat />} />
        <Route path="*" element={<Navigate to="/therapist/dashboard" replace />} />
      </Route>

      <Route
        path="/family"
        element={
          <RequireAuth allow={['family', 'superadmin']}>
            <FamilyLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/family/dashboard" replace />} />
        <Route path="dashboard" element={<FamilyDashboard />} />
        <Route path="sessions" element={<FamilySessions />} />
        <Route path="progress" element={<FamilyProgress />} />
        <Route path="billing" element={<FamilyBilling />} />
        <Route path="payment" element={<FamilyPayment />} />
        <Route path="messages" element={<FamilyMessages />} />
        <Route path="documents" element={<FamilyDocuments />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
