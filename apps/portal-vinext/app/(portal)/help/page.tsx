'use client';

import HelpSection from '@/components/sections/help';
import { useUser } from '@/lib/auth/context';

export default function HelpPage() {
  const user = useUser();

  return <HelpSection user={user} />;
}
