import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ActivityList } from '@/components/profile/activity-list';
import { PreferencesForm } from '@/components/profile/preferences-form';
import { MOCK_ACTIVITIES } from '@/lib/mock-data';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <ProfileHeader user={user} />

      <div className="grid gap-8 md:grid-cols-2">
        <ActivityList activities={MOCK_ACTIVITIES} />
        <PreferencesForm />
      </div>
    </motion.div>
  );
}