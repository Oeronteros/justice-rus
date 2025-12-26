// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { PASSWORDS } from '@/lib/constants';
import { AuthResponse } from '@/types';
import { z } from 'zod';

// Отладка: выводим значения переменных окружения

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
    const normalizedPassword = String(password).trim();

    if (normalizedPassword === PASSWORDS.member) {
      role = 'member';
    } else if (normalizedPassword === PASSWORDS.officer) {
      role = 'officer';
    } else if (normalizedPassword === PASSWORDS.gm) {
      role = 'gm';
    }

    if (!role) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = generateToken(role, discordId);

    const responseBody: AuthResponse = {
      success: true,
      role,
    };

    const response = NextResponse.json(responseBody);
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return response;
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

