// api/check-pin.js - Серверная проверка PIN (Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { pin } = await req.body;  // Ожидаем JSON body

    if (!pin) {
      return res.status(400).json({ error: 'PIN required' });
    }

    const memberPin = process.env.MEMBER_PIN;
    const officerPin = process.env.OFFICER_PIN;
    const gmPin = process.env.GM_PIN;

    let role = null;
    if (pin === memberPin) role = 'member';
    else if (pin === officerPin) role = 'officer';
    else if (pin === gmPin) role = 'gm';

    if (!role) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    // Можно добавить JWT или сессию, но для простоты возвращаем роль
    return res.status(200).json({ role });
  } catch (error) {
    console.error('Error in check-pin:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}