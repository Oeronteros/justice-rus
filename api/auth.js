// api/auth.js - Серверная аутентификация с JWT
import jwt from 'jsonwebtoken';

const PIN_CODES = {
  member: process.env.MEMBER_PIN || '1111',
  officer: process.env.OFFICER_PIN || '2222',
  gm: process.env.GM_PIN || '3333'
};

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
    if (pin === PIN_CODES.member) role = 'member';
    else if (pin === PIN_CODES.officer) role = 'officer';
    else if (pin === PIN_CODES.gm) role = 'gm';

    if (!role) {
      return res.status(401).json({ error: 'Invalid PIN' });
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