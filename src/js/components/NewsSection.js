export default class NewsSection {
  constructor(user) {
    this.user = user;
    this.news = [];
  }

  render() {
    return `
      <section id="news" class="py-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
              <i class="fas fa-newspaper mr-3 text-purple-500"></i>
              Guild News
            </h2>
            
            <div class="flex items-center space-x-3">
              <div class="text-sm text-gray-400">
                <i class="fab fa-discord mr-1 text-blue-400"></i>
                Synced with Discord
              </div>
              <button onclick="this.syncDiscordNews()" 
                      class="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm transition">
                <i class="fas fa-sync-alt mr-1"></i>
                Sync
              </button>
            </div>
          </div>
          
          <div id="newsContent">
            <!-- Новости будут загружены динамически -->
          </div>
        </div>
      </section>
    `;
  }

  async init() {
    this.loadNews();
  }

  async loadNews() {
    // Загрузка новостей
  }

  async syncDiscordNews() {
    // Синхронизация с Discord
  }
}