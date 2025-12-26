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
    
    // Debug logging
    const normalizedPin = String(pin).trim();
    console.log('[AUTH] Incoming PIN:', normalizedPin);
    console.log('[AUTH] Expected MEMBER_PIN:', PIN_CODES.member);
    console.log('[AUTH] Expected OFFICER_PIN:', PIN_CODES.officer);
    console.log('[AUTH] Expected GM_PIN:', PIN_CODES.gm);
    console.log('[AUTH] Match MEMBER?', normalizedPin === PIN_CODES.member);
    console.log('[AUTH] Match OFFICER?', normalizedPin === PIN_CODES.officer);
    console.log('[AUTH] Match GM?', normalizedPin === PIN_CODES.gm);
    
    if (normalizedPin === PIN_CODES.member) role = 'member';
    else if (normalizedPin === PIN_CODES.officer) role = 'officer';
    else if (normalizedPin === PIN_CODES.gm) role = 'gm';

    if (!role) {
      console.log('[AUTH] FAILED: No role matched');
      return NextResponse.json(
        { 
          error: 'Invalid PIN',
          debug: {
            incomingPin: normalizedPin,
            expectedMember: PIN_CODES.member,
            expectedOfficer: PIN_CODES.officer,
            expectedGm: PIN_CODES.gm,
            matchMember: normalizedPin === PIN_CODES.member,
            matchOfficer: normalizedPin === PIN_CODES.officer,
            matchGm: normalizedPin === PIN_CODES.gm,
          }
        },
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

