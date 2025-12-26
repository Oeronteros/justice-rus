// api/auth.js - Серверная аутентификация с JWT
import jwt from 'jsonwebtoken';

// Отладка: выводим значения переменных окружения
console.log('[AUTH] MEMBER_PASSWORD from env:', process.env.MEMBER_PASSWORD);
console.log('[AUTH] OFFICER_PASSWORD from env:', process.env.OFFICER_PASSWORD);
console.log('[AUTH] GM_PASSWORD from env:', process.env.GM_PASSWORD);

const PASSWORDS = {
  member: process.env.MEMBER_PASSWORD || '1111',
  officer: process.env.OFFICER_PASSWORD || '2222',
  gm: process.env.GM_PASSWORD || '3333'
};

console.log('[AUTH] PASSWORDS after processing:', PASSWORDS);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { password, discordId } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    // Проверяем пароль
    let role = null;

    // Отладка: выводим полученный пароль и ожидаемые значения
    console.log('[AUTH] Incoming Password:', password);
    console.log('[AUTH] Incoming Password length:', password.length);
    console.log('[AUTH] Incoming Password char codes:', Array.from(password).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected MEMBER_PASSWORD:', PASSWORDS.member);
    console.log('[AUTH] Expected MEMBER_PASSWORD length:', PASSWORDS.member.length);
    console.log('[AUTH] Expected MEMBER_PASSWORD char codes:', Array.from(PASSWORDS.member).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected OFFICER_PASSWORD:', PASSWORDS.officer);
    console.log('[AUTH] Expected OFFICER_PASSWORD length:', PASSWORDS.officer.length);
    console.log('[AUTH] Expected OFFICER_PASSWORD char codes:', Array.from(PASSWORDS.officer).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected GM_PASSWORD:', PASSWORDS.gm);
    console.log('[AUTH] Expected GM_PASSWORD length:', PASSWORDS.gm.length);
    console.log('[AUTH] Expected GM_PASSWORD char codes:', Array.from(PASSWORDS.gm).map(c => c.charCodeAt(0)));

    if (password === PASSWORDS.member) {
      console.log('[AUTH] Match MEMBER: true');
      role = 'member';
    } else if (password === PASSWORDS.officer) {
      console.log('[AUTH] Match OFFICER: true');
      role = 'officer';
    } else if (password === PASSWORDS.gm) {
      console.log('[AUTH] Match GM: true');
      role = 'gm';
    } else {
      console.log('[AUTH] No role matched');
    }

    if (!role) {
      console.log('[AUTH] FAILED: No role matched');
      return res.status(401).json({
        error: 'Invalid password',
        debug: {
          incomingPassword: password,
          incomingPasswordLength: password.length,
          incomingPasswordCharCodes: Array.from(password).map(c => c.charCodeAt(0)),
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
      });
    }

    // Создаем JWT токен
    const token = jwt.sign(
      {
        role,
        discordId: discordId || null,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 часа
      },
      JWT_SECRET
    );

    console.log('[AUTH] SUCCESS: Token generated for role:', role);
    return res.status(200).json({
      success: true,
      role,
      token
    });

  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware для проверки JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}