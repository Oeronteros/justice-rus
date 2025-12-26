// Пример HTTP сервера для Discord бота
// Запустите этот файл на вашем компьютере или на сервере

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: '*', // В продакшене укажите конкретные домены
  credentials: true
}));
app.use(express.json());

// Подключение к БД (пример с PostgreSQL)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Проверка подключения
pool.on('connect', () => {
  console.log('✅ Connected to database');
});

// ============================================
// API Endpoints для веб-сайта
// ============================================

// GET /api/registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        discord_id as discord,
        nickname,
        rank,
        class,
        guild,
        join_date as "joinDate",
        kpi,
        status
      FROM registrations
      ORDER BY join_date DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch registrations',
      message: error.message 
    });
  }
});

// GET /api/schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        date,
        registration,
        type,
        description
      FROM schedule
      ORDER BY date DESC
      LIMIT 100
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ 
      error: 'Failed to fetch schedule',
      message: error.message 
    });
  }
});

// GET /api/news
app.get('/api/news', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        title,
        content,
        author,
        date,
        pinned
      FROM news
      ORDER BY pinned DESC, date DESC
    `);
    
    res.json(result.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      content: row.content,
      author: row.author,
      date: row.date,
      pinned: row.pinned || false,
    })));
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
});

// GET /api/guides
app.get('/api/guides', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        title,
        content,
        category,
        author,
        date
      FROM guides
      ORDER BY date DESC
    `);
    
    res.json(result.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      content: row.content,
      category: row.category,
      author: row.author,
      date: row.date,
    })));
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guides',
      message: error.message 
    });
  }
});

// GET /api/absences
app.get('/api/absences', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        member,
        start_date as "startDate",
        end_date as "endDate",
        reason,
        status
      FROM absences
      ORDER BY start_date DESC
    `);
    
    res.json(result.rows.map(row => ({
      id: row.id.toString(),
      member: row.member,
      startDate: row.startDate,
      endDate: row.endDate,
      reason: row.reason,
      status: row.status,
    })));
  } catch (error) {
    console.error('Error fetching absences:', error);
    res.status(500).json({ 
      error: 'Failed to fetch absences',
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================
// Discord Bot логика (ваш существующий код)
// ============================================

// Здесь добавьте ваш код Discord бота
// Например:
// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// client.on('ready', () => {
//   console.log(`✅ Discord bot logged in as ${client.user.tag}`);
// });
// client.login(process.env.DISCORD_BOT_TOKEN);

// ============================================
// Запуск сервера
// ============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Discord Bot API Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/*`);
  console.log(`💡 Use ngrok or Cloudflare Tunnel to expose this server`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
});

