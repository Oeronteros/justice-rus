import { NextResponse } from 'next/server';
import { getKnownClasses } from '@/lib/classes';

export async function GET() {
  try {
    const classes = await getKnownClasses();
    return NextResponse.json(classes, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Failed to load known classes:', error);
    return NextResponse.json({ error: 'Failed to load class list' }, { status: 500 });
  }
}
