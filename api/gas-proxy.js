// api/gas-proxy.js - Прокси для Google Apps Script
import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const GAS_URL = process.env.GAS_WEB_APP_URL;

  if (!GAS_URL) {
    return res.status(500).json({ 
      error: 'GAS URL not configured' 
    });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'GAS request failed');
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('GAS proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to communicate with GAS',
      message: error.message 
    });
  }
}