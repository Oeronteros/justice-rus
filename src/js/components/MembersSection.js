import { formatDate, formatNumber } from '../api.js';
import { showError, showSuccess } from '../notifications.js';

export default class MembersSection {
  constructor(user) {
    this.user = user;
    this.members = [];
    this.filteredMembers = [];
  }

  render() {
    return `
      <section id="members" class="py-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
              <i class="fas fa-users mr-3 text-red-500"></i>
              Members List
            </h2>
            
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-400">
                <span>Role:</span>
                <span id="currentRole" class="ml-2 px-3 py-1 rounded-full ${this.getRoleColor()}">
                  ${this.user?.role || 'Member'}
                </span>
              </div>
              
              ${this.user?.role === 'gm' ? `
                <button onclick="app.showAdminStats()" 
                        class="px-3 py-1 bg-purple-900/50 hover:bg-purple-800/70 rounded-lg transition">
                  <i class="fas fa-chart-line mr-1"></i>
                  Stats
                </button>
              ` : ''}
            </div>
          </div>
          
          <!-- Статистика -->
          <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div class="bg-gray-800/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold" id="totalMembers">0</div>
              <div class="text-sm text-gray-400">Total Members</div>
            </div>
            <div class="bg-gray-800/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-400" id="onlineMembers">0</div>
              <div class="text-sm text-gray-400">Online</div>
            </div>
            <div class="bg-gray-800/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-400" id="avgKPI">0</div>
              <div class="text-sm text-gray-400">Avg KPI</div>
            </div>
          </div>
          
          <!-- Фильтры -->
          <div class="mb-6 flex flex-wrap gap-4">
            <input type="text" 
                   id="searchMembers" 
                   placeholder="Search by name..."
                   class="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
            
            <select id="filterStatus" 
                    class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            
            <select id="filterLevel" 
                    class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              <option value="all">All Levels</option>
              <option value="novice">Novice</option>
              <option value="member">Member</option>
              <option value="veteran">Veteran</option>
              <option value="elite">Elite</option>
              <option value="legend">Legend</option>
              <option value="gm">GM</option>
            </select>
          </div>
          
          <!-- Таблица -->
          <div class="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
            <div class="table-responsive">
              <table class="min-w-full">
                <thead class="bg-gray-900/80">
                  <tr>
                    <th class="py-3 px-4 text-left">No</th>
                    <th class="py-3 px-4 text-left">Level</th>
                    <th class="py-3 px-4 text-left">Discord</th>
                    <th class="py-3 px-4 text-left">Nickname</th>
                    <th class="py-3 px-4 text-left">Class</th>
                    <th class="py-3 px-4 text-left">Guild</th>
                    <th class="py-3 px-4 text-left">Join Date</th>
                    <th class="py-3 px-4 text-left">KPI</th>
                    <th class="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody id="membersTable">
                  <tr id="loadingRow">
                    <td colspan="9" class="py-12 text-center">
                      <div class="flex flex-col items-center">
                        <i class="fas fa-spinner fa-spin text-2xl text-gray-400 mb-2"></i>
                        <span class="text-gray-400">Loading members...</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async init() {
    // Показываем скелетон
    window.skeleton.show('membersTable', 'table', { rows: 8, columns: 9 });
    
    try {
      // Загружаем данные
      this.members = await window.api.getMembers();
      this.filteredMembers = [...this.members];
      
      // Обновляем статистику
      this.updateStats();
      
      // Рендерим таблицу
      this.renderTable();
      
      // Добавляем обработчики фильтров
      this.addEventListeners();
      
    } catch (error) {
      console.error('Failed to load members:', error);
      document.getElementById('membersTable').innerHTML = `
        <tr>
          <td colspan="9" class="py-12 text-center">
            <div class="flex flex-col items-center">
              <i class="fas fa-exclamation-triangle text-2xl text-red-500 mb-2"></i>
              <span class="text-gray-400">Failed to load members</span>
              <button onclick="app.refreshCurrentSection()" 
                      class="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition">
                Retry
              </button>
            </div>
          </td>
        </tr>
      `;
    }
  }

  updateStats() {
    const total = this.members.length;
    const online = this.members.filter(m => m.status === 'active').length;
    const avgKPI = this.members.reduce((sum, m) => sum + (parseInt(m.kpi) || 0), 0) / total || 0;
    
    document.getElementById('totalMembers').textContent = total;
    document.getElementById('onlineMembers').textContent = online;
    document.getElementById('avgKPI').textContent = avgKPI.toFixed(1);
  }

  renderTable() {
    const tbody = document.getElementById('membersTable');
    
    if (this.filteredMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-12 text-center text-gray-400">
            <i class="fas fa-users-slash text-2xl mb-2"></i>
            <div>No members found</div>
          </td>
        </tr>
      `;
      return;
    }
    
    let html = '';
    
    this.filteredMembers.forEach((member, index) => {
      const levelClass = this.getLevelClass(member.level);
      const statusClass = this.getStatusClass(member.status);
      
      html += `
        <tr class="hover:bg-gray-700/30 transition">
          <td class="py-3 px-4">${index + 1}</td>
          <td class="py-3 px-4">
            <span class="px-3 py-1 rounded-full text-xs ${levelClass}">
              ${member.level || 'Novice'}
            </span>
          </td>
          <td class="py-3 px-4">
            ${member.discord ? `
              <div class="flex items-center space-x-2">
                <i class="fab fa-discord text-blue-400"></i>
                <span>${member.discord}</span>
              </div>
            ` : '-'}
          </td>
          <td class="py-3 px-4 font-medium">${member.nickname || '-'}</td>
          <td class="py-3 px-4">${member.class || '-'}</td>
          <td class="py-3 px-4">${member.guild || '-'}</td>
          <td class="py-3 px-4">${formatDate(member.join_date)}</td>
          <td class="py-3 px-4">
            <span class="kpi ${this.getKPIClass(member.kpi)}">
              ${member.kpi || '0'}
            </span>
          </td>
          <td class="py-3 px-4">
            <span class="px-3 py-1 rounded-full text-xs ${statusClass}">
              ${member.status || 'pending'}
            </span>
          </td>
        </tr>
      `;
    });
    
    tbody.innerHTML = html;
  }

  addEventListeners() {
    // Поиск
    document.getElementById('searchMembers').addEventListener('input', (e) => {
      this.filterMembers(e.target.value);
    });
    
    // Фильтр по статусу
    document.getElementById('filterStatus').addEventListener('change', (e) => {
      this.filterMembers();
    });
    
    // Фильтр по уровню
    document.getElementById('filterLevel').addEventListener('change', (e) => {
      this.filterMembers();
    });
  }

  filterMembers(searchTerm = '') {
    const statusFilter = document.getElementById('filterStatus').value;
    const levelFilter = document.getElementById('filterLevel').value;
    
    this.filteredMembers = this.members.filter(member => {
      // Поиск
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          (member.nickname && member.nickname.toLowerCase().includes(searchLower)) ||
          (member.discord && member.discord.toLowerCase().includes(searchLower)) ||
          (member.class && member.class.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
      
      // Фильтр по статусу
      if (statusFilter !== 'all' && member.status !== statusFilter) {
        return false;
      }
      
      // Фильтр по уровню
      if (levelFilter !== 'all' && member.level !== levelFilter) {
        return false;
      }
      
      return true;
    });
    
    this.renderTable();
  }

  // Вспомогательные методы
  getRoleColor() {
    switch(this.user?.role) {
      case 'gm': return 'bg-gradient-to-r from-purple-700 to-purple-900';
      case 'officer': return 'bg-gradient-to-r from-red-700 to-red-900';
      default: return 'bg-gradient-to-r from-gray-700 to-gray-900';
    }
  }

  getLevelClass(level) {
    const classes = {
      'novice': 'level-novice',
      'member': 'level-member',
      'veteran': 'level-veteran',
      'elite': 'level-elite',
      'legend': 'level-legend',
      'gm': 'level-gm'
    };
    return classes[level?.toLowerCase()] || 'bg-gray-700';
  }

  getStatusClass(status) {
    const classes = {
      'active': 'status-active',
      'inactive': 'status-inactive',
      'pending': 'status-pending',
      'leave': 'status-leave'
    };
    return classes[status] || 'bg-gray-700';
  }

  getKPIClass(kpi) {
    const kpiNum = parseInt(kpi) || 0;
    if (kpiNum >= 80) return 'kpi-good';
    if (kpiNum >= 50) return 'kpi-medium';
    return 'kpi-bad';
  }
}