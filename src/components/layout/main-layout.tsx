import { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Settings, LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { CommandMenu } from "@/components/command-menu"

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  if (user?.role === 'prosecutor') {
    menuItems.push({ icon: Users, label: 'Users', path: '/users' });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-card">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Case Manager</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2',
                    location.pathname === item.path && 'bg-accent'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <header className="border-b">
              <div className="flex items-center h-16">
                <CommandMenu />
              </div>
            </header>
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}