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
    console.log('[AUTH] Incoming PIN length:', normalizedPin.length);
    console.log('[AUTH] Incoming PIN char codes:', Array.from(normalizedPin).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected MEMBER_PIN:', PIN_CODES.member);
    console.log('[AUTH] Expected MEMBER_PIN length:', PIN_CODES.member.length);
    console.log('[AUTH] Expected MEMBER_PIN char codes:', Array.from(PIN_CODES.member).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected OFFICER_PIN:', PIN_CODES.officer);
    console.log('[AUTH] Expected OFFICER_PIN length:', PIN_CODES.officer.length);
    console.log('[AUTH] Expected OFFICER_PIN char codes:', Array.from(PIN_CODES.officer).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected GM_PIN:', PIN_CODES.gm);
    console.log('[AUTH] Expected GM_PIN length:', PIN_CODES.gm.length);
    console.log('[AUTH] Expected GM_PIN char codes:', Array.from(PIN_CODES.gm).map(c => c.charCodeAt(0)));
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
            incomingPinLength: normalizedPin.length,
            incomingPinCharCodes: Array.from(normalizedPin).map(c => c.charCodeAt(0)),
            expectedMember: PIN_CODES.member,
            expectedMemberLength: PIN_CODES.member.length,
            expectedMemberCharCodes: Array.from(PIN_CODES.member).map(c => c.charCodeAt(0)),
            expectedOfficer: PIN_CODES.officer,
            expectedOfficerLength: PIN_CODES.officer.length,
            expectedOfficerCharCodes: Array.from(PIN_CODES.officer).map(c => c.charCodeAt(0)),
            expectedGm: PIN_CODES.gm,
            expectedGmLength: PIN_CODES.gm.length,
            expectedGmCharCodes: Array.from(PIN_CODES.gm).map(c => c.charCodeAt(0)),
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

    console.log('[AUTH] SUCCESS: Role assigned:', role);
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

