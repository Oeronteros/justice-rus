// netlify/functions/google-proxy.js - для обхода CORS если нужно
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { sheet, id } = event.queryStringParameters;
    
    if (!sheet || !id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing sheet or id parameters' })
      };
    }

    const encodedSheet = encodeURIComponent(sheet);
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}`);
    }
    
    const csv = await response.text();
    
    // Парсим CSV в JSON
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;
    
    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      
      if (char === '"') {
        if (insideQuotes && csv[i + 1] === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\n' || (char === '\r' && csv[i + 1] === '\n')) && !insideQuotes) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++;
      } else {
        currentCell += char;
      }
    }
    
    if (currentCell !== '' || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }
    
    const filteredRows = rows.filter(row => row.length > 0 && !row.every(cell => cell === ''));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(filteredRows)
    };
    
  } catch (error) {
    console.error('Error in google-proxy:', error);
    
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