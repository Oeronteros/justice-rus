export default class GuidesSection {
  constructor(user) {
    this.user = user;
    this.guides = [];
  }

  render() {
    return `
      <section id="guides" class="py-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
              <i class="fas fa-graduation-cap mr-3 text-yellow-500"></i>
              Knowledge Base
            </h2>
            
            <div class="flex items-center space-x-3">
              <select id="guideCategoryFilter" 
                      class="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
                <option value="all">All Categories</option>
                <option value="pve">PvE</option>
                <option value="pvp">PvP</option>
                <option value="leveling">Leveling</option>
                <option value="gear">Gear</option>
                <option value="economy">Economy</option>
              </select>
              
              <button onclick="this.refreshGuides()" 
                      class="px-3 py-2 bg-yellow-700 hover:bg-yellow-600 rounded-lg transition">
                <i class="fas fa-sync-alt mr-1"></i>
                Refresh
              </button>
              
              ${this.user?.role === 'officer' || this.user?.role === 'gm' ? `
                <button onclick="this.openCreateGuideModal()" 
                        class="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 rounded-lg transition">
                  <i class="fas fa-plus mr-2"></i>
                  Create Guide
                </button>
              ` : ''}
            </div>
          </div>
          
          <div id="guidesContent">
            <!-- Гайды будут загружены динамически -->
          </div>
        </div>
      </section>
    `;
  }

  async init() {
    this.loadGuides();
  }

  async loadGuides() {
    // Загрузка гайдов
  }

  refreshGuides() {
    this.loadGuides();
  }

  openCreateGuideModal() {
    // Открытие модального окна создания гайда
  }
}