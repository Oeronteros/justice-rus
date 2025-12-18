// netlify/functions/discord-proxy.js
// api/discord-proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { endpoint, id } = req.query;
  const token = process.env.DISCORD_BOT_TOKEN;
  
  // остальной код...
}

  // Обработка OPTIONS запроса
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Проверяем метод
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Получаем параметры из запроса
    const { endpoint, id, limit = '10' } = event.queryStringParameters;
    const token = process.env.DISCORD_BOT_TOKEN;

    // Проверяем токен
    if (!token) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Discord bot token not configured in Netlify',
          message: 'Add DISCORD_BOT_TOKEN in Environment Variables'
        })
      };
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