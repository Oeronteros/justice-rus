'use client';

import PvpSection from '@/components/sections/pvp';
import { useUser } from '@/lib/auth/context';

export default function PvpPage() {
  const user = useUser();
  return <PvpSection user={user} />;
}
