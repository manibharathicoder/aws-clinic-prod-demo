import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/auth.jsx';

const DEFAULT_HOME = {
  superadmin: '/superadmin/dashboard',
  accounting: '/accounting/dashboard',
  admin: '/admin/dashboard',
  therapist: '/therapist/dashboard',
  family: '/family/dashboard',
};

export default function RequireAuth({ allow, children }) {
  const { isAuthed, user } = useAuth();
  const location = useLocation();

  if (!isAuthed) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (Array.isArray(allow) && allow.length > 0 && !allow.includes(user.role)) {
    return <Navigate to={DEFAULT_HOME[user.role] || '/login'} replace />;
  }

  return children;
}

export { DEFAULT_HOME };
