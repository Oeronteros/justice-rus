-- Таблица правил гильдии
-- Выполни этот SQL в Neon Console

CREATE TABLE IF NOT EXISTS rules (
  id SERIAL PRIMARY KEY,
  text_ru TEXT NOT NULL DEFAULT '',
  text_en TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для сортировки
CREATE INDEX IF NOT EXISTS idx_rules_order ON rules(order_index);

-- Начальные данные (опционально)
INSERT INTO rules (text_ru, text_en, order_index) VALUES
  ('Уважай других участников гильдии', 'Respect other guild members', 1),
  ('Участвуй в гильдейских активностях', 'Participate in guild activities', 2),
  ('Предупреждай об отсутствии заранее', 'Notify about absences in advance', 3);
