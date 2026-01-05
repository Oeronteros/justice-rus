import { NextRequest, NextResponse } from 'next/server';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const dynamic = 'force-dynamic';

// GET - получить все правила
export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const pool = getPool();
    const result = await pool.query(
      'SELECT id, text_ru, text_en, order_index FROM rules ORDER BY order_index ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
  }
}

// POST - создать правило
export async function POST(request: NextRequest) {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { text_ru, text_en } = body;

    if (!text_ru && !text_en) {
      return NextResponse.json({ error: 'At least one text field is required' }, { status: 400 });
    }

    const pool = getPool();
    
    // Получаем максимальный order_index
    const maxOrder = await pool.query('SELECT COALESCE(MAX(order_index), 0) as max FROM rules');
    const newOrder = (maxOrder.rows[0]?.max || 0) + 1;

    const result = await pool.query(
      'INSERT INTO rules (text_ru, text_en, order_index) VALUES ($1, $2, $3) RETURNING id, text_ru, text_en, order_index',
      [text_ru || '', text_en || '', newOrder]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json({ error: 'Failed to create rule' }, { status: 500 });
  }
}

// PUT - обновить все правила (bulk update)
export async function PUT(request: NextRequest) {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { rules } = body;

    if (!Array.isArray(rules)) {
      return NextResponse.json({ error: 'Rules array is required' }, { status: 400 });
    }

    const pool = getPool();
    
    // Удаляем все старые правила и вставляем новые
    await pool.query('DELETE FROM rules');
    
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      await pool.query(
        'INSERT INTO rules (text_ru, text_en, order_index) VALUES ($1, $2, $3)',
        [rule.text_ru || '', rule.text_en || '', i + 1]
      );
    }

    // Возвращаем обновлённый список
    const result = await pool.query(
      'SELECT id, text_ru, text_en, order_index FROM rules ORDER BY order_index ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error updating rules:', error);
    return NextResponse.json({ error: 'Failed to update rules' }, { status: 500 });
  }
}
