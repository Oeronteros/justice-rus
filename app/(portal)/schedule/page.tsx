'use client';

import ScheduleSection from '@/components/sections/schedule';
import { useLanguage } from '@/lib/i18n/context';
import { useUser } from '@/lib/auth/context';

export default function SchedulePage() {
  const { language } = useLanguage();
  const user = useUser();
  
  return <ScheduleSection user={user} language={language} />;
}
