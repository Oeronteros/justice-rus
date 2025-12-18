// netlify/functions/discord-proxy.js
// api/discord-proxy.js
// api/discord-proxy.js - Обновлён для Node.js 20+
export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Если это OPTIONS запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Только GET запросы
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const { endpoint, id, limit = '10' } = req.query;
    const token = process.env.DISCORD_BOT_TOKEN;
    
    // Если нет токена
    if (!token) {
      return res.status(500).json({
        error: 'Discord token not configured',
        message: 'Add DISCORD_BOT_TOKEN in Vercel Environment Variables'
      });
    }
    
    // Формируем URL для Discord API
    let discordUrl;
    if (endpoint === 'user' && id) {
      discordUrl = `https://discord.com/api/v10/users/${id}`;
    } else if (endpoint === 'messages' && id) {
      discordUrl = `https://discord.com/api/v10/channels/${id}/messages?limit=${limit}`;
    } else {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    
    // Используем нативный fetch (Node.js 24.x уже имеет fetch)
    const response = await fetch(discordUrl, {
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Discord API error: ${response.status}`
      });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

    let discordUrl;
    
    // Определяем endpoint
    switch(endpoint) {
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

    // Делаем запрос к Discord API
    const response = await fetch(discordUrl, {
      headers: {
        'Authorization': `Bot ${token}`,
        'User-Agent': 'DemonicCultPortal/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API error:', response.status, errorText);
      throw new Error(`Discord API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
    
  } catch (error) {
    console.error('Error in discord-proxy:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};