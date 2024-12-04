import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEMO_USERS } from '@/lib/constants';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  const handleDemoLogin = (demoEmail: string) => {
    login(demoEmail);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the case management system
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Demo Accounts
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin(DEMO_USERS.police.email)}
            >
              Login as Police Officer
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin(DEMO_USERS.prosecutor.email)}
            >
              Login as Prosecutor
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link 
              to="/sign-up"
              className="text-primary hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}