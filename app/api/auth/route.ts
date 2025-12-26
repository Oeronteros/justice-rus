// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { PIN_CODES } from '@/lib/constants';
import { AuthResponse } from '@/types';
import { z } from 'zod';

const authSchema = z.object({
  pin: z.string().min(1),
  discordId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin, discordId } = authSchema.parse(body);

    // Проверяем PIN
    let role: 'member' | 'officer' | 'gm' | null = null;
    if (pin === PIN_CODES.member) role = 'member';
    else if (pin === PIN_CODES.officer) role = 'officer';
    else if (pin === PIN_CODES.gm) role = 'gm';

    if (!role) {
      return NextResponse.json(
        { error: 'Invalid PIN' },
        { status: 401 }
      );
    }

    // Создаем JWT токен
    const token = generateToken(role, discordId);

    const response: AuthResponse = {
      success: true,
      role,
      token,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

