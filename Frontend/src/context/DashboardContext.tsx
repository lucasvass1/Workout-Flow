import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';

interface DashboardContextType {
  refreshVersion: number;
  refresh: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboardRefresh() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardRefresh deve ser usado dentro de DashboardProvider'
    );
  }
  return context;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [refreshVersion, setRefreshVersion] = useState(0);

  const refresh = useCallback(() => {
    setRefreshVersion((value) => value + 1);
  }, []);

  return (
    <DashboardContext.Provider value={{ refreshVersion, refresh }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardRefreshVersion() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardRefreshVersion deve ser usado dentro de DashboardProvider'
    );
  }

  return context.refreshVersion;
}
