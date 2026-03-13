'use client';

import { CalendarView } from '@/components/rsvp';
import { useLanguage } from '@/lib/i18n/context';
import { useUser } from '@/lib/auth/context';

export default function CalendarPage() {
  const { language } = useLanguage();
  const user = useUser();

  return <CalendarView user={user} language={language} />;
}
