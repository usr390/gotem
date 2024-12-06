import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth-context';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { SettingsPage } from '@/pages/settings';
import { MainLayout } from '@/components/layout/main-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { SignUpPage } from '@/pages/sign-up';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-hooks';

// ProtectedRoute Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <MainLayout>{children}</MainLayout>;
}

// App Component
export default function App() {
  const [loadingSession, setLoadingSession] = useState(true);

  // Check and restore session on app initialization
  useEffect(() => {
    const restoreSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error restoring session:', error);
      }
      setLoadingSession(false);
    };

    restoreSession();
  }, []);

  if (loadingSession) {
    // Optional: Add a loading screen while checking the session
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <div>User Management (Coming Soon)</div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
