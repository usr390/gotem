import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEMO_USERS } from '@/lib/constants';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setIsLoading(true);
    try {
      await login(demoEmail, 'demo-password');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
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
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
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
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login as Police Officer'}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin(DEMO_USERS.prosecutor.email)}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login as Prosecutor'}
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