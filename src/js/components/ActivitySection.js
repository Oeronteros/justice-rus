export default class ActivitySection {
  constructor(user) {
    this.user = user;
    this.activities = [];
    this.currentWeek = 0;
  }

  render() {
    return `
      <section id="activity" class="py-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
              <i class="fas fa-calendar-alt mr-3 text-blue-500"></i>
              Weekly Schedule
            </h2>
            
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button onclick="this.prevWeek()" 
                        class="p-2 hover:bg-gray-800 rounded-lg">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <span id="currentWeek" class="font-semibold"></span>
                <button onclick="this.nextWeek()" 
                        class="p-2 hover:bg-gray-800 rounded-lg">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
              
              ${this.user?.role === 'officer' || this.user?.role === 'gm' ? `
                <button onclick="this.openAddEventModal()" 
                        class="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition">
                  <i class="fas fa-plus mr-2"></i>
                  Add Event
                </button>
              ` : ''}
            </div>
          </div>
          
          <!-- Календарь будет загружен динамически -->
          <div id="calendarContainer" class="animate-pulse">
            <div class="h-96 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </section>
    `;
  }

  async init() {
    this.loadCalendar();
  }

  loadCalendar() {
    // Загрузка календаря
    // Реализация загрузки расписания
  }

  prevWeek() {
    this.currentWeek--;
    this.loadCalendar();
  }

  nextWeek() {
    this.currentWeek++;
    this.loadCalendar();
  }

  openAddEventModal() {
    // Открытие модального окна для добавления события
  }
}