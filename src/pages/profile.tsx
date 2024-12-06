import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-hooks';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ActivityList } from '@/components/profile/activity-list';
import { PreferencesForm } from '@/components/profile/preferences-form';
import { MOCK_ACTIVITIES } from '@/lib/mock-data';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  console.log('User data:', user);

  if (!user.email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading email data...</p>
      </div>
    );
  }

  if (!user.name || !user.role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile data...</p>
      </div>
    );
  }

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