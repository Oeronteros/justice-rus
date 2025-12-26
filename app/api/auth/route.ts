// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { PIN_CODES } from '@/lib/constants';
import { AuthResponse } from '@/types';
import { z } from 'zod';

// Отладка: выводим значения переменных окружения
console.log('[APP AUTH] MEMBER_PIN from env:', process.env.MEMBER_PIN);
console.log('[APP AUTH] OFFICER_PIN from env:', process.env.OFFICER_PIN);
console.log('[APP AUTH] GM_PIN from env:', process.env.GM_PIN);
console.log('[APP AUTH] PIN_CODES after processing:', PIN_CODES);

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
    console.log('[APP AUTH] Incoming PIN:', normalizedPin);
    console.log('[APP AUTH] Incoming PIN length:', normalizedPin.length);
    console.log('[APP AUTH] Incoming PIN char codes:', Array.from(normalizedPin).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected MEMBER_PIN:', PIN_CODES.member);
    console.log('[APP AUTH] Expected MEMBER_PIN length:', PIN_CODES.member.length);
    console.log('[APP AUTH] Expected MEMBER_PIN char codes:', Array.from(PIN_CODES.member).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected OFFICER_PIN:', PIN_CODES.officer);
    console.log('[APP AUTH] Expected OFFICER_PIN length:', PIN_CODES.officer.length);
    console.log('[APP AUTH] Expected OFFICER_PIN char codes:', Array.from(PIN_CODES.officer).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected GM_PIN:', PIN_CODES.gm);
    console.log('[APP AUTH] Expected GM_PIN length:', PIN_CODES.gm.length);
    console.log('[APP AUTH] Expected GM_PIN char codes:', Array.from(PIN_CODES.gm).map(c => c.charCodeAt(0)));

    if (normalizedPin === PIN_CODES.member) {
      console.log('[APP AUTH] Match MEMBER: true');
      role = 'member';
    } else if (normalizedPin === PIN_CODES.officer) {
      console.log('[APP AUTH] Match OFFICER: true');
      role = 'officer';
    } else if (normalizedPin === PIN_CODES.gm) {
      console.log('[APP AUTH] Match GM: true');
      role = 'gm';
    } else {
      console.log('[APP AUTH] No role matched');
    }

    if (!role) {
      console.log('[APP AUTH] FAILED: No role matched');
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

    console.log('[APP AUTH] SUCCESS: Role assigned:', role);
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

