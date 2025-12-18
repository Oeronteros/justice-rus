// api/discord-proxy.js - Прокси для Discord (Vercel)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const { endpoint, id, limit = '10' } = req.query;
    const token = process.env.DISCORD_BOT_TOKEN;
    
    if (!token) {
      return res.status(500).json({
        error: 'Discord token not configured',
        message: 'Add DISCORD_BOT_TOKEN in Vercel Environment Variables'
      });
    }
    
    let discordUrl;
    switch (endpoint) {
      case 'user':
        if (!id) throw new Error('User ID is required');
        discordUrl = `https://discord.com/api/v10/users/${id}`;
        break;
      case 'messages':
        if (!id) throw new Error('Channel ID is required');
        discordUrl = `https://discord.com/api/v10/channels/${id}/messages?limit=${limit}`;
        break;
      case 'guild':
        if (!id) throw new Error('Guild ID is required');
        discordUrl = `https://discord.com/api/v10/guilds/${id}`;
        break;
      default:
        throw new Error('Invalid endpoint. Use: user, messages, or guild');
    }
    
    const response = await fetch(discordUrl, {
      headers: {
        'Authorization': `Bot ${token}`,
        'User-Agent': 'DemonicCultPortal/1.0',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API error:', response.status, errorText);
      return res.status(response.status).json({ error: `Discord API error: ${response.status}` });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in discord-proxy:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}