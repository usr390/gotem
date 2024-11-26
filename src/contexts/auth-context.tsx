import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';
import { DEMO_USERS } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    if (email === DEMO_USERS.police.email) {
      setUser(DEMO_USERS.police as User);
    } else if (email === DEMO_USERS.prosecutor.email) {
      setUser(DEMO_USERS.prosecutor as User);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}