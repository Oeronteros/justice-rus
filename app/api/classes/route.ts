import { NextResponse } from 'next/server';
import { getKnownClasses } from '@/lib/classes';
import { jsonError } from '@/lib/server/route-helpers';

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
    return jsonError('Failed to load class list', 500);
  }
}
