// api/auth.js - Серверная аутентификация с JWT
import jwt from 'jsonwebtoken';

const requireEnv = (name) => {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value.trim();
};

// Отладка: выводим значения переменных окружения

const PASSWORDS = {
  member: requireEnv('MEMBER_PASSWORD'),
  officer: requireEnv('OFFICER_PASSWORD'),
  gm: requireEnv('GM_PASSWORD'),
};

const JWT_SECRET = requireEnv('JWT_SECRET');

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

    const normalizedPassword = String(password).trim();

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    // DY??D_D?D?????D?D? D?D???D_D??O
    let role = null;

    if (normalizedPassword === PASSWORDS.member) {
      role = 'member';
    } else if (normalizedPassword === PASSWORDS.officer) {
      role = 'officer';
    } else if (normalizedPassword === PASSWORDS.gm) {
      role = 'gm';
    }

    if (!role) {
      return res.status(401).json({
        error: 'Invalid password'
      });
    }

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