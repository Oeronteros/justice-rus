'use client';

import ProfileSection from '@/components/sections/profile';
import { useUser } from '@/lib/auth/context';

export default function ProfilePage() {
  const user = useUser();

  return <ProfileSection user={user} />;
}
