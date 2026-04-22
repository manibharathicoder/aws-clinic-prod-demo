import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return {
      user,
      isAuthed: !!user,
      login: ({ email, role }) => {
        setUser({
          email: email || 'demo@aim.local',
          role,
          name: email ? email.split('@')[0] : 'Demo',
          ts: Date.now(),
        });
      },
      logout: () => setUser(null),
      switchRole: (role) => setUser((prev) => (prev ? { ...prev, role } : prev)),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider />');
  return ctx;
}
