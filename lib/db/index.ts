// Database connection и утилиты
// Поддерживает PostgreSQL, MongoDB, SQLite
//
// ВНИМАНИЕ: Этот файл предназначен ТОЛЬКО для Discord бота!
// Next.js приложение НЕ использует этот код напрямую.
// Веб-сайт получает данные через Discord Bot API (см. lib/api.ts).
//
// Для использования в Discord боте установите зависимости:
// npm install pg mongodb better-sqlite3

import { Registration, Schedule, News, Guide, Absence } from '@/types';

export interface DatabaseConfig {
  type: 'postgresql' | 'mongodb' | 'sqlite';
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  // Для SQLite
  path?: string;
  // Для MongoDB
  mongoUri?: string;
}

export interface DatabaseClient {
  getRegistrations(): Promise<Registration[]>;
  getSchedule(): Promise<Schedule[]>;
  getNews(): Promise<News[]>;
  getGuides(): Promise<Guide[]>;
  getAbsences(): Promise<Absence[]>;
  close(): Promise<void>;
  // Deprecated methods
  getMembers(): Promise<Registration[]>;
  getActivity(): Promise<Schedule[]>;
}

// Экспорт клиента в зависимости от типа БД
export async function createDatabaseClient(config: DatabaseConfig): Promise<DatabaseClient> {
  switch (config.type) {
    case 'postgresql':
      return await createPostgreSQLClient(config);
    case 'mongodb':
      return await createMongoDBClient(config);
    case 'sqlite':
      return await createSQLiteClient(config);
    default:
      throw new Error(`Unsupported database type: ${config.type}`);
  }
}

// PostgreSQL клиент
async function createPostgreSQLClient(config: DatabaseConfig): Promise<DatabaseClient> {
  // Динамический импорт для уменьшения размера бандла
  let Pool: any;
  try {
    const pg = await import('pg');
    Pool = pg.Pool;
  } catch (error) {
    throw new Error('PostgreSQL driver not installed. Run: npm install pg');
  }
  
  const pool = new Pool({
    connectionString: config.connectionString || 
      `postgresql://${config.username}:${config.password}@${config.host}:${config.port || 5432}/${config.database}`,
  });

  return {
    async getRegistrations(): Promise<Registration[]> {
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
      return result.rows.map(row => ({
        discord: row.discord,
        nickname: row.nickname,
        rank: row.rank,
        class: row.class,
        guild: row.guild,
        joinDate: row.joinDate,
        kpi: parseInt(row.kpi) || 0,
        status: row.status,
      }));
    },

    async getSchedule(): Promise<Schedule[]> {
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
      return result.rows.map(row => ({
        date: row.date,
        registration: row.registration,
        type: row.type,
        description: row.description,
      }));
    },

    async getNews(): Promise<News[]> {
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
      return result.rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        author: row.author,
        date: row.date,
        pinned: row.pinned || false,
      }));
    },

    async getGuides(): Promise<Guide[]> {
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
      return result.rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        category: row.category,
        author: row.author,
        date: row.date,
      }));
    },

    async getAbsences(): Promise<Absence[]> {
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
      return result.rows.map(row => ({
        id: row.id.toString(),
        member: row.member,
        startDate: row.startDate,
        endDate: row.endDate,
        reason: row.reason,
        status: row.status,
      }));
    },

    async close(): Promise<void> {
      await pool.end();
    },

    // Deprecated methods
    async getMembers(): Promise<Registration[]> {
      return this.getRegistrations();
    },

    async getActivity(): Promise<Schedule[]> {
      return this.getSchedule();
    },
  };
}

// MongoDB клиент
async function createMongoDBClient(config: DatabaseConfig): Promise<DatabaseClient> {
  let MongoClient: any;
  try {
    const mongodb = await import('mongodb');
    MongoClient = mongodb.MongoClient;
  } catch (error) {
    throw new Error('MongoDB driver not installed. Run: npm install mongodb');
  }
  
  const uri = config.mongoUri || config.connectionString || 
    `mongodb://${config.username}:${config.password}@${config.host}:${config.port || 27017}/${config.database}`;
  
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(config.database);

  return {
    async getRegistrations(): Promise<Registration[]> {
      const collection = db.collection('registrations');
      const docs = await collection.find({}).sort({ joinDate: -1 }).toArray();
      return docs.map(doc => ({
        discord: doc.discordId || doc.discord || '',
        nickname: doc.nickname || '',
        rank: doc.rank || 'novice',
        class: doc.class || '',
        guild: doc.guild || '',
        joinDate: doc.joinDate || doc.join_date || '',
        kpi: doc.kpi || 0,
        status: doc.status || 'pending',
      }));
    },

    async getSchedule(): Promise<Schedule[]> {
      const collection = db.collection('schedule');
      const docs = await collection.find({}).sort({ date: -1 }).limit(100).toArray();
      return docs.map(doc => ({
        date: doc.date || '',
        registration: doc.registration || '',
        type: doc.type || '',
        description: doc.description || '',
      }));
    },

    async getNews(): Promise<News[]> {
      const collection = db.collection('news');
      const docs = await collection.find({}).sort({ pinned: -1, date: -1 }).toArray();
      return docs.map(doc => ({
        id: doc._id.toString(),
        title: doc.title || '',
        content: doc.content || '',
        author: doc.author || '',
        date: doc.date || '',
        pinned: doc.pinned || false,
      }));
    },

    async getGuides(): Promise<Guide[]> {
      const collection = db.collection('guides');
      const docs = await collection.find({}).sort({ date: -1 }).toArray();
      return docs.map(doc => ({
        id: doc._id.toString(),
        title: doc.title || '',
        content: doc.content || '',
        category: doc.category || '',
        author: doc.author || '',
        date: doc.date || '',
      }));
    },

    async getAbsences(): Promise<Absence[]> {
      const collection = db.collection('absences');
      const docs = await collection.find({}).sort({ startDate: -1 }).toArray();
      return docs.map(doc => ({
        id: doc._id.toString(),
        member: doc.member || '',
        startDate: doc.startDate || doc.start_date || '',
        endDate: doc.endDate || doc.end_date || '',
        reason: doc.reason || '',
        status: doc.status || 'pending',
      }));
    },

    async close(): Promise<void> {
      await client.close();
    },

    // Deprecated methods
    async getMembers(): Promise<Registration[]> {
      return this.getRegistrations();
    },

    async getActivity(): Promise<Schedule[]> {
      return this.getSchedule();
    },
  };
}

// SQLite клиент
async function createSQLiteClient(config: DatabaseConfig): Promise<DatabaseClient> {
  let Database: any;
  try {
    const sqlite = await import('better-sqlite3');
    Database = sqlite.default;
  } catch (error) {
    throw new Error('SQLite driver not installed. Run: npm install better-sqlite3');
  }
  const db = new Database(config.path || './database.db');

  return {
    async getRegistrations(): Promise<Registration[]> {
      const rows = db.prepare(`
        SELECT 
          discord_id as discord,
          nickname,
          rank,
          class,
          guild,
          join_date as joinDate,
          kpi,
          status
        FROM registrations
        ORDER BY join_date DESC
      `).all() as any[];
      
      return rows.map(row => ({
        discord: row.discord,
        nickname: row.nickname,
        rank: row.rank,
        class: row.class,
        guild: row.guild,
        joinDate: row.joinDate,
        kpi: parseInt(row.kpi) || 0,
        status: row.status,
      }));
    },

    async getSchedule(): Promise<Schedule[]> {
      const rows = db.prepare(`
        SELECT 
          date,
          registration,
          type,
          description
        FROM schedule
        ORDER BY date DESC
        LIMIT 100
      `).all() as any[];
      
      return rows.map(row => ({
        date: row.date,
        registration: row.registration,
        type: row.type,
        description: row.description,
      }));
    },

    async getNews(): Promise<News[]> {
      const rows = db.prepare(`
        SELECT 
          id,
          title,
          content,
          author,
          date,
          pinned
        FROM news
        ORDER BY pinned DESC, date DESC
      `).all() as any[];
      
      return rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        author: row.author,
        date: row.date,
        pinned: row.pinned ? true : false,
      }));
    },

    async getGuides(): Promise<Guide[]> {
      const rows = db.prepare(`
        SELECT 
          id,
          title,
          content,
          category,
          author,
          date
        FROM guides
        ORDER BY date DESC
      `).all() as any[];
      
      return rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        category: row.category,
        author: row.author,
        date: row.date,
      }));
    },

    async getAbsences(): Promise<Absence[]> {
      const rows = db.prepare(`
        SELECT 
          id,
          member,
          start_date as startDate,
          end_date as endDate,
          reason,
          status
        FROM absences
        ORDER BY start_date DESC
      `).all() as any[];
      
      return rows.map(row => ({
        id: row.id.toString(),
        member: row.member,
        startDate: row.startDate,
        endDate: row.endDate,
        reason: row.reason,
        status: row.status,
      }));
    },

    async close(): Promise<void> {
      db.close();
    },

    // Deprecated methods
    async getMembers(): Promise<Registration[]> {
      return this.getRegistrations();
    },

    async getActivity(): Promise<Schedule[]> {
      return this.getSchedule();
    },
  };
}

// Singleton для переиспользования соединения
let dbClient: DatabaseClient | null = null;

export async function getDatabaseClient(): Promise<DatabaseClient> {
  if (dbClient) {
    return dbClient;
  }

  const dbType = (process.env.DB_TYPE || 'postgresql') as 'postgresql' | 'mongodb' | 'sqlite';
  
  const config: DatabaseConfig = {
    type: dbType,
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    path: process.env.DB_PATH,
    mongoUri: process.env.MONGODB_URI,
  };

  dbClient = await createDatabaseClient(config);
  return dbClient;
}
