import { createContext, useContext, useMemo, useState } from 'react';

const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [portal, setPortal] = useState('superadmin');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const value = useMemo(
    () => ({
      portal,
      setPortal,
      isSwitcherOpen,
      openSwitcher: () => setIsSwitcherOpen(true),
      closeSwitcher: () => setIsSwitcherOpen(false),
    }),
    [portal, isSwitcherOpen]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used inside PortalProvider');
  return ctx;
}

