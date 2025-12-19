// api/demo-data.js - ИСПРАВЛЕННЫЕ демо данные
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sheet } = req.query;

  // ПРАВИЛЬНЫЕ демо данные
  const demoData = {
    members: [
      // Заголовки (11 колонок как в таблице)
      ['№', 'Level', 'Discord', 'Avatar', 'Nickname', 'Class', 'Guild', 'Join Date', 'KPI', 'BM UP', 'Status'],
      // Данные
      ['1', 'Novice', 'player1#1234', '', 'ShadowHunter', 'Rogue', 'Demonic Cult', '2023-01-15', '45', '10', 'active'],
      ['2', 'Member', 'player2#5678', '', 'FireMage', 'Mage', 'Demonic Cult', '2023-02-20', '78', '25', 'active'],
      ['3', 'Veteran', 'player3#9012', '', 'StoneGuard', 'Warrior', 'Demonic Cult', '2023-03-10', '92', '50', 'active'],
      ['4', 'Elite', 'player4#3456', '', 'HolyPriest', 'Priest', 'Demonic Cult', '2023-04-05', '85', '35', 'inactive'],
      ['5', 'Legend', 'player5#7890', '', 'StormCaller', 'Shaman', 'Demonic Cult', '2023-01-30', '95', '75', 'active'],
      ['6', 'GM', 'gm#9999', '', 'Admin', 'Admin', 'Demonic Cult', '2023-01-01', '100', '100', 'active']
    ],
    
    activity: [
      ['Date', 'Time', 'Event', 'Type', 'Organizer', 'Description'],
      ['2023-10-30', '20:00', 'Guild Raid', 'Raid', 'GM', 'Main raid night'],
      ['2023-10-31', '19:00', 'Halloween PvP', 'PvP', 'Officer', 'Special event'],
      ['2023-11-01', '21:00', 'Weekly Boss', 'PvE', 'Veteran', 'World boss']
    ],
    
    guides: [
      ['ID', 'Title', 'Category', 'Difficulty', 'Content', 'Author', 'Date', 'Tags'],
      ['1', 'Beginner Guide', 'leveling', 'beginner', 'How to start...', 'GM', '2023-10-01', 'guide,newbie'],
      ['2', 'Raid Tactics', 'pve', 'advanced', 'Boss mechanics...', 'Officer', '2023-10-15', 'raid,boss,pve'],
      ['3', 'PvP Strategies', 'pvp', 'intermediate', 'Combat tips...', 'Veteran', '2023-10-20', 'pvp,combat']
    ]
  };

  const data = demoData[sheet] || demoData.members;
  return res.status(200).json(data);
}