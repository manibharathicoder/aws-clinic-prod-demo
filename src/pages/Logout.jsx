import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth.jsx';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    try {
      localStorage.removeItem('aim.auth.v1');
      localStorage.removeItem('aim.portal.v1');
    } catch {
      // ignore
    }
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return null;
}
