import { motion } from 'framer-motion';
import { AccountSettings } from '@/components/settings/account-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';

export function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8">
        <AccountSettings />
        <SecuritySettings />
        <AppearanceSettings />
      </div>
    </motion.div>
  );
}