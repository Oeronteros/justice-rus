// api/google-proxy.js - Исправленная версия
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Только GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { sheet, id, apiKey } = req.query;

    if (!sheet || !id) {
      return res.status(400).json({ 
        error: 'Missing parameters',
        details: 'Required: sheet (sheet name) and id (spreadsheet ID)'
      });
    }

    // Вариант 1: Используем Google Sheets API v4 (рекомендуется)
    const useV4 = apiKey || process.env.GOOGLE_API_KEY;
    
    let url;
    if (useV4) {
      // Google Sheets API v4
      const apiKeyToUse = apiKey || process.env.GOOGLE_API_KEY;
      url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${sheet}?key=${apiKeyToUse}`;
    } else {
      // Старый метод с публикацией как CSV (требует публикации таблицы)
      const encodedSheet = encodeURIComponent(sheet);
      url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;
    }

    console.log('Fetching Google Sheet from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets error:', response.status, errorText);
      
      if (response.status === 404) {
        return res.status(404).json({ 
          error: 'Sheet not found or not accessible',
          details: 'Check if: 1) Spreadsheet ID is correct 2) Sheet is published to web 3) Sheet name exists',
          url: useV4 ? 'Using Google Sheets API v4' : 'Using CSV export method',
          status: response.status,
          statusText: response.statusText
        });
      }
      
      throw new Error(`Google Sheets returned ${response.status}: ${response.statusText}`);
    }

    if (useV4) {
      // Обработка ответа от Google Sheets API v4
      const data = await response.json();
      const rows = data.values || [];
      
      // Преобразуем в тот же формат, что и CSV парсер
      return res.status(200).json(rows);
    } else {
      // Обработка CSV ответа
      const csv = await response.text();
      
      // Улучшенный парсер CSV
      const rows = parseCSV(csv);
      return res.status(200).json(rows);
    }

  } catch (error) {
    console.error('Error in google-proxy:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: 'Make sure your Google Sheet is published to web (File → Publish to web → CSV)'
    });
  }
}

// Функция парсинга CSV
function parseCSV(csv) {
  const rows = [];
  const lines = csv.split(/\r?\n/);
  
  for (let line of lines) {
    if (!line.trim()) continue;
    
    const cells = [];
    let cell = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes && (i + 1 >= line.length || line[i + 1] !== '"')) {
        inQuotes = false;
      } else if (char === '"' && inQuotes && line[i + 1] === '"') {
        cell += '"';
        i++; // Пропустить вторую кавычку
      } else if (char === ',' && !inQuotes) {
        cells.push(cell.trim());
        cell = '';
      } else {
        cell += char;
      }
    }
    
    cells.push(cell.trim());
    if (cells.length > 0 && cells.some(c => c !== '')) {
      rows.push(cells);
    }
  }
  
  return rows;
}