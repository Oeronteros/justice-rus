'use client';

import RegistrationSection from '@/components/sections/registration';
import { useUser } from '@/lib/auth/context';

export default function MembersPage() {
  const user = useUser();
  return <RegistrationSection user={user} />;
}
