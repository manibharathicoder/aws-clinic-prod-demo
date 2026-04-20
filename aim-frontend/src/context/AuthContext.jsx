// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);
const TOKEN_KEY = 'aim_auth_token';

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(null);
  const [user,  setUser]    = useState(null);
  const [ready, setReady]   = useState(false); // wait until we've checked localStorage

  // On first load, restore token from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      try {
        const decoded = jwtDecode(saved);
        // Check token hasn't expired
        if (decoded.exp * 1000 > Date.now()) {
          setToken(saved);
          setUser({ id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name });
        } else {
          localStorage.removeItem(TOKEN_KEY); // expired — clear it
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY); // invalid token — clear it
      }
    }
    setReady(true); // done checking
  }, []);

  const login = useCallback((jwtToken) => {
    try {
      const decoded = jwtDecode(jwtToken);
      localStorage.setItem(TOKEN_KEY, jwtToken); // persist across refreshes
      setToken(jwtToken);
      setUser({ id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name });
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Don't render children until we've checked localStorage (prevents flash of login page)
  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
