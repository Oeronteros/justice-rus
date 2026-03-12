import type { Schedule } from '@/lib/schemas/schedule';
import type { Language } from '@/lib/i18n';

interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  start: Date;
  end: Date;
}

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function formatDateForOutlook(date: Date): string {
  return date.toISOString().replace(/[-]/g, '').split('.')[0] + 'Z';
}

function formatEventDescription(event: Schedule, language: Language): string {
  const title = language === 'zh' ? event.titleZh || event.titleRu :
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu;

  const description = [
    title,
    event.dayType && `Тип: ${event.dayType}`,
    event.time && `Время: ${event.time}`,
    event.group && `Группа: ${event.group}`,
  ].filter(Boolean).join('\n');

  return description;
}

export function generateGoogleCalendarLink(event: Schedule, language: Language): string {
  const title = (language === 'zh' ? event.titleZh || event.titleRu :
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu) || 'Event';
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu;

  const baseDate = event.date ? new Date(event.date) : new Date();
  const timeParts = event.time?.match(/(\d{1,2}):(\d{2})/);
  
  const start = new Date(baseDate);
  const end = new Date(baseDate);
  
  if (timeParts) {
    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    start.setHours(hours, minutes, 0, 0);
    
    // Default 2 hour duration if no end time
    const endTimeMatch = event.time?.match(/[-–]\s*(\d{1,2}):(\d{2})/);
    if (endTimeMatch) {
      const endHours = parseInt(endTimeMatch[1], 10);
      const endMinutes = parseInt(endTimeMatch[2], 10);
      end.setHours(endHours, endMinutes, 0, 0);
    } else {
      end.setHours(hours + 2, minutes, 0, 0);
    }
  } else {
    // All-day event
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);
  }

  const description = formatEventDescription(event, language);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title || 'Event',
    dates: `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`,
    details: description,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateOutlookCalendarLink(event: Schedule, language: Language): string {
  const title = (language === 'zh' ? event.titleZh || event.titleRu :
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu) || 'Event';
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu;

  const baseDate = event.date ? new Date(event.date) : new Date();
  const timeParts = event.time?.match(/(\d{1,2}):(\d{2})/);
  
  const start = new Date(baseDate);
  const end = new Date(baseDate);
  
  if (timeParts) {
    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    start.setHours(hours, minutes, 0, 0);
    
    const endTimeMatch = event.time?.match(/[-–]\s*(\d{1,2}):(\d{2})/);
    if (endTimeMatch) {
      const endHours = parseInt(endTimeMatch[1], 10);
      const endMinutes = parseInt(endTimeMatch[2], 10);
      end.setHours(endHours, endMinutes, 0, 0);
    } else {
      end.setHours(hours + 2, minutes, 0, 0);
    }
  } else {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);
  }

  const description = formatEventDescription(event, language);
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    startdt: formatDateForOutlook(start),
    enddt: formatDateForOutlook(end),
    subject: title,
    body: description,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function generateICalEvent(event: Schedule, language: Language): string {
  const title = language === 'zh' ? event.titleZh || event.titleRu :
                language === 'en' ? event.titleEn || event.titleRu :
                event.titleRu;

  const baseDate = event.date ? new Date(event.date) : new Date();
  const timeParts = event.time?.match(/(\d{1,2}):(\d{2})/);
  
  const start = new Date(baseDate);
  const end = new Date(baseDate);
  
  if (timeParts) {
    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    start.setHours(hours, minutes, 0, 0);
    
    const endTimeMatch = event.time?.match(/[-–]\s*(\d{1,2}):(\d{2})/);
    if (endTimeMatch) {
      const endHours = parseInt(endTimeMatch[1], 10);
      const endMinutes = parseInt(endTimeMatch[2], 10);
      end.setHours(endHours, endMinutes, 0, 0);
    } else {
      end.setHours(hours + 2, minutes, 0, 0);
    }
  }

  const description = formatEventDescription(event, language).replace(/\n/g, '\\n');
  const uid = `${event.id || Date.now()}@silentmoonfall`;
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Silent Moonfall Guild//RSVP Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${formatDateForGoogle(start)}`,
    `DTEND:${formatDateForGoogle(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
