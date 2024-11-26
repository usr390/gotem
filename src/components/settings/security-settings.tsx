import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';
import { Shield, Smartphone, Key } from 'lucide-react';

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactor(checked);
    toast.success(
      checked
        ? 'Two-factor authentication enabled'
        : 'Two-factor authentication disabled'
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and authentication methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <Switch checked={twoFactor} onCheckedChange={handleTwoFactorToggle} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Biometric Login</h4>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face recognition to login
                  </p>
                </div>
              </div>
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Key className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Auto Session Timeout</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after period of inactivity
                  </p>
                </div>
              </div>
              <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              View Security Log
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}