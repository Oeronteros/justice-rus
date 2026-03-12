'use client';

import DashboardSection from '@/components/sections/dashboard';
import { useUser } from '@/lib/auth/context';
import { useLanguage } from '@/lib/i18n/context';

export default function DashboardPage() {
  const user = useUser();
  const { language } = useLanguage();

  return <DashboardSection user={user} language={language} />;
}
