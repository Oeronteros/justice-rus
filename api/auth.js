// api/auth.js - Серверная аутентификация с JWT
import jwt from 'jsonwebtoken';

// Отладка: выводим значения переменных окружения
console.log('[AUTH] MEMBER_PIN from env:', process.env.MEMBER_PIN);
console.log('[AUTH] OFFICER_PIN from env:', process.env.OFFICER_PIN);
console.log('[AUTH] GM_PIN from env:', process.env.GM_PIN);

const PIN_CODES = {
  member: process.env.MEMBER_PIN || '1111',
  officer: process.env.OFFICER_PIN || '2222',
  gm: process.env.GM_PIN || '3333'
};

console.log('[AUTH] PIN_CODES after processing:', PIN_CODES);

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
    const { pin, discordId } = req.body;

    if (!pin) {
      return res.status(400).json({ error: 'PIN required' });
    }

    // Проверяем PIN
    let role = null;

    // Отладка: выводим полученный пин-код и ожидаемые значения
    console.log('[AUTH] Incoming PIN:', pin);
    console.log('[AUTH] Incoming PIN length:', pin.length);
    console.log('[AUTH] Incoming PIN char codes:', Array.from(pin).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected MEMBER_PIN:', PIN_CODES.member);
    console.log('[AUTH] Expected MEMBER_PIN length:', PIN_CODES.member.length);
    console.log('[AUTH] Expected MEMBER_PIN char codes:', Array.from(PIN_CODES.member).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected OFFICER_PIN:', PIN_CODES.officer);
    console.log('[AUTH] Expected OFFICER_PIN length:', PIN_CODES.officer.length);
    console.log('[AUTH] Expected OFFICER_PIN char codes:', Array.from(PIN_CODES.officer).map(c => c.charCodeAt(0)));
    console.log('[AUTH] Expected GM_PIN:', PIN_CODES.gm);
    console.log('[AUTH] Expected GM_PIN length:', PIN_CODES.gm.length);
    console.log('[AUTH] Expected GM_PIN char codes:', Array.from(PIN_CODES.gm).map(c => c.charCodeAt(0)));

    if (pin === PIN_CODES.member) {
      console.log('[AUTH] Match MEMBER: true');
      role = 'member';
    } else if (pin === PIN_CODES.officer) {
      console.log('[AUTH] Match OFFICER: true');
      role = 'officer';
    } else if (pin === PIN_CODES.gm) {
      console.log('[AUTH] Match GM: true');
      role = 'gm';
    } else {
      console.log('[AUTH] No role matched');
    }

    if (!role) {
      console.log('[AUTH] FAILED: No role matched');
      return res.status(401).json({
        error: 'Invalid PIN',
        debug: {
          incomingPin: pin,
          incomingPinLength: pin.length,
          incomingPinCharCodes: Array.from(pin).map(c => c.charCodeAt(0)),
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