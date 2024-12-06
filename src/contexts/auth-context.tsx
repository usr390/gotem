import { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { DEMO_USERS } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { AuthContextType } from './auth-hooks';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle user login
  const login = useCallback(async (email: string, password: string) => {
    // Handle demo users
    if (email === DEMO_USERS.police.email) {
      setUser(DEMO_USERS.police as User);
      return;
    }
    if (email === DEMO_USERS.prosecutor.email) {
      setUser(DEMO_USERS.prosecutor as User);
      return;
    }

    // Handle real authentication
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  // Handle user logout
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    window.location.href = '/login';
  }, []);

  // Initialize auth state
  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.email!,
          role: 'police_officer',
          avatar: null,
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.email!,
          role: 'police_officer',
          avatar: null,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 w-full min-h-screen flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
