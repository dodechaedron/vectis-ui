import React, { PropsWithChildren, useCallback, useState } from 'react';

interface SidebarStatus {
  showSidebar: (sidebarName: 'chains' | 'accounts') => void;
  hideSidebar: () => void;
  isSidebarVisible: boolean;
  activeSidebar?: 'chains' | 'accounts';
}

const SidebarContext = React.createContext<SidebarStatus | null>(null);

export const SidebarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState<'chains' | 'accounts'>();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const showSidebar = useCallback(
    (sidebarName: 'chains' | 'accounts') => {
      setActiveSidebar(sidebarName);
      setSidebarVisible(true);
    },
    [setActiveSidebar, setSidebarVisible]
  );

  const hideSidebar = useCallback(() => setSidebarVisible(false), [setSidebarVisible]);

  return <SidebarContext.Provider value={{ showSidebar, hideSidebar, activeSidebar, isSidebarVisible }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useModal must be used within a SidebarProvider');

  return context;
};
