// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { PASSWORDS } from '@/lib/constants';
import { AuthResponse } from '@/types';
import { z } from 'zod';

// Отладка: выводим значения переменных окружения
console.log('[APP AUTH] MEMBER_PASSWORD from env:', process.env.MEMBER_PASSWORD);
console.log('[APP AUTH] OFFICER_PASSWORD from env:', process.env.OFFICER_PASSWORD);
console.log('[APP AUTH] GM_PASSWORD from env:', process.env.GM_PASSWORD);
console.log('[APP AUTH] PASSWORDS after processing:', PASSWORDS);

const authSchema = z.object({
  password: z.string().min(1),
  discordId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, discordId } = authSchema.parse(body);

    // Проверяем пароль
    let role: 'member' | 'officer' | 'gm' | null = null;

    // Debug logging
    const normalizedPassword = String(password).trim();
    console.log('[APP AUTH] Incoming Password:', normalizedPassword);
    console.log('[APP AUTH] Incoming Password length:', normalizedPassword.length);
    console.log('[APP AUTH] Incoming Password char codes:', Array.from(normalizedPassword).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected MEMBER_PASSWORD:', PASSWORDS.member);
    console.log('[APP AUTH] Expected MEMBER_PASSWORD length:', PASSWORDS.member.length);
    console.log('[APP AUTH] Expected MEMBER_PASSWORD char codes:', Array.from(PASSWORDS.member).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected OFFICER_PASSWORD:', PASSWORDS.officer);
    console.log('[APP AUTH] Expected OFFICER_PASSWORD length:', PASSWORDS.officer.length);
    console.log('[APP AUTH] Expected OFFICER_PASSWORD char codes:', Array.from(PASSWORDS.officer).map(c => c.charCodeAt(0)));
    console.log('[APP AUTH] Expected GM_PASSWORD:', PASSWORDS.gm);
    console.log('[APP AUTH] Expected GM_PASSWORD length:', PASSWORDS.gm.length);
    console.log('[APP AUTH] Expected GM_PASSWORD char codes:', Array.from(PASSWORDS.gm).map(c => c.charCodeAt(0)));

    if (normalizedPassword === PASSWORDS.member) {
      console.log('[APP AUTH] Match MEMBER: true');
      role = 'member';
    } else if (normalizedPassword === PASSWORDS.officer) {
      console.log('[APP AUTH] Match OFFICER: true');
      role = 'officer';
    } else if (normalizedPassword === PASSWORDS.gm) {
      console.log('[APP AUTH] Match GM: true');
      role = 'gm';
    } else {
      console.log('[APP AUTH] No role matched');
    }

    if (!role) {
      console.log('[APP AUTH] FAILED: No role matched');
      return NextResponse.json(
        {
          error: 'Invalid password',
          debug: {
            incomingPassword: normalizedPassword,
            incomingPasswordLength: normalizedPassword.length,
            incomingPasswordCharCodes: Array.from(normalizedPassword).map(c => c.charCodeAt(0)),
            expectedMember: PASSWORDS.member,
            expectedMemberLength: PASSWORDS.member.length,
            expectedMemberCharCodes: Array.from(PASSWORDS.member).map(c => c.charCodeAt(0)),
            expectedOfficer: PASSWORDS.officer,
            expectedOfficerLength: PASSWORDS.officer.length,
            expectedOfficerCharCodes: Array.from(PASSWORDS.officer).map(c => c.charCodeAt(0)),
            expectedGm: PASSWORDS.gm,
            expectedGmLength: PASSWORDS.gm.length,
            expectedGmCharCodes: Array.from(PASSWORDS.gm).map(c => c.charCodeAt(0)),
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

