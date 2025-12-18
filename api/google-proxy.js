// api/google-proxy.js - Прокси для Google Sheets (Vercel стиль)
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
    const { sheet, id } = req.query;

    if (!sheet || !id) {
      return res.status(400).json({ error: 'Missing sheet or id parameters' });
    }

    const encodedSheet = encodeURIComponent(sheet);
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}`);
    }

    const csv = await response.text();

    // Улучшенный парсер CSV (обрабатывает кавычки, multiline)
    const rows = [];
    const lines = csv.split(/\r?\n/);  // Разделяем по строкам
    for (let line of lines) {
      if (!line.trim()) continue;  // Пропускаем пустые
      const cells = [];
      let cell = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && !inQuotes) {
          inQuotes = true;
        } else if (char === '"' && inQuotes && line[i + 1] !== '"') {
          inQuotes = false;
        } else if (char === '"' && inQuotes && line[i + 1] === '"') {
          cell += '"';
          i++;  // Пропустить вторую кавычку
        } else if (char === ',' && !inQuotes) {
          cells.push(cell.trim());
          cell = '';
        } else {
          cell += char;
        }
      }
      cells.push(cell.trim());  // Последняя ячейка
      if (cells.length > 0 && cells.some(c => c !== '')) {
        rows.push(cells);
      }
    }

    return res.status(200).json(rows);

  } catch (error) {
    console.error('Error in google-proxy:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}