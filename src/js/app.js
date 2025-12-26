import './notifications.js';
import './skeleton.js';
import './api.js';
import { showError, showSuccess } from './notifications.js';

// Глобальные переменные
let currentUser = null;
let currentSection = 'members';
let quillEditor = null;

// Инициализация приложения
async function initApp() {
  console.log('Initializing Justice Portal...');
  
  // Проверяем авторизацию
  const token = localStorage.getItem('auth_token');
  if (token) {
    try {
      const response = await fetch('/api/verify-auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        currentUser = data;
        showApp();
        loadSection('members');
      } else {
        showPinScreen();
      }
    } catch (error) {
      showPinScreen();
    }
  } else {
    showPinScreen();
  }
  
  // Инициализация слушателей событий
  initEventListeners();
}

// Показ экрана PIN
function showPinScreen() {
  document.getElementById('pinScreen').innerHTML = `
    <div class="fixed inset-0 flex items-center justify-center z-20">
      <div class="bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center w-full max-w-md border border-red-700/50">
        <div class="mb-6">
          <i class="fas fa-skull-crossbones text-4xl text-red-600 mb-3"></i>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Cult Game Community
          </h2>
          <p class="text-gray-400 mt-2">Guild Portal - Justice Mobile</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-400 mb-3">Enter PIN code to access</p>
            <input 
              id="pinInput" 
              type="password" 
              class="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 text-center text-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              placeholder="****"
            />
          </div>
          
          <button 
            id="pinBtn" 
            class="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <i class="fas fa-unlock-alt mr-2"></i>Enter Portal
          </button>
          
          <div id="pinError" class="text-red-400 text-sm mt-2 hidden p-3 bg-red-900/30 rounded-lg">
            <i class="fas fa-exclamation-triangle mr-2"></i>Invalid PIN code
          </div>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-800">
          <p class="text-xs text-gray-500">
            <i class="fas fa-info-circle mr-1"></i>Contact guild leadership for access
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Добавляем обработчики для PIN
  document.getElementById('pinBtn').addEventListener('click', handlePinSubmit);
  document.getElementById('pinInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handlePinSubmit();
  });
}

// Обработка PIN
async function handlePinSubmit() {
  const pin = document.getElementById('pinInput').value;
  const errorEl = document.getElementById('pinError');
  
  if (!pin) {
    showError('Please enter PIN code');
    return;
  }
  
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: pin })
    });
    
    if (!response.ok) {
      throw new Error('Invalid PIN');
    }
    
    const data = await response.json();
    
    // Сохраняем токен
    localStorage.setItem('auth_token', data.token);
    currentUser = { role: data.role };
    
    showSuccess('Access granted!');
    showApp();
    loadSection('members');
    
  } catch (error) {
    errorEl.classList.remove('hidden');
    document.getElementById('pinInput').value = '';
    showError('Invalid PIN code');
  }
}

// Показать основное приложение
function showApp() {
  document.getElementById('pinScreen').innerHTML = '';
  document.getElementById('app').classList.remove('hidden');
  
  // Загружаем шаблоны
  loadHeader();
  loadMobileNav();
}

// Загрузка шапки
function loadHeader() {
  document.getElementById('siteHeader').innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
      <div class="flex items-center space-x-3 mb-3 sm:mb-0">
        <div class="w-10 h-10 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center">
          <i class="fas fa-skull text-white"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold">Cult Game Community</h1>
          <p class="text-xs text-gray-400">Justice Mobile Guild</p>
        </div>
      </div>
      
      <nav class="flex flex-wrap items-center justify-center gap-3">
        <button 
          id="navMembers" 
          class="nav-btn active px-4 py-2 rounded-lg transition"
          data-section="members"
        >
          <i class="fas fa-users mr-2"></i>
          <span>Members</span>
        </button>
        <button 
          id="navActivity" 
          class="nav-btn px-4 py-2 rounded-lg transition"
          data-section="activity"
        >
          <i class="fas fa-calendar-alt mr-2"></i>
          <span>Activity</span>
        </button>
        <button 
          id="navHelp" 
          class="nav-btn px-4 py-2 rounded-lg transition"
          data-section="help"
        >
          <i class="fas fa-hands-helping mr-2"></i>
          <span>Help</span>
        </button>
        <button 
          id="navNews" 
          class="nav-btn px-4 py-2 rounded-lg transition"
          data-section="news"
        >
          <i class="fas fa-newspaper mr-2"></i>
          <span>News</span>
        </button>
        <button 
          id="navGuides" 
          class="nav-btn px-4 py-2 rounded-lg transition"
          data-section="guides"
        >
          <i class="fas fa-graduation-cap mr-2"></i>
          <span>Guides</span>
        </button>
        <button 
          id="navAbsences" 
          class="nav-btn px-4 py-2 rounded-lg transition"
          data-section="absences"
        >
          <i class="fas fa-calendar-times mr-2"></i>
          <span>Absences</span>
        </button>
        
        <select id="langSwitch" class="ml-2 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600">
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
        
        <button 
          id="refreshBtn" 
          class="ml-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition"
          title="Refresh data"
        >
          <i class="fas fa-sync-alt"></i>
        </button>
        
        <button 
          id="logoutBtn" 
          class="ml-2 bg-red-800 hover:bg-red-700 p-2 rounded-lg transition"
          title="Logout"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </nav>
    </div>
  `;
}

// Мобильная навигация
function loadMobileNav() {
  document.getElementById('mobileNav').innerHTML = `
    <div class="mobile-swipe-menu">
      <div class="nav-scroll-container">
        <button class="mobile-nav-btn active" data-section="members">
          <i class="fas fa-users mobile-icon"></i>
          <span class="text-xs mt-1">Members</span>
        </button>
        <button class="mobile-nav-btn" data-section="activity">
          <i class="fas fa-calendar-alt mobile-icon"></i>
          <span class="text-xs mt-1">Activity</span>
        </button>
        <button class="mobile-nav-btn" data-section="help">
          <i class="fas fa-hands-helping mobile-icon"></i>
          <span class="text-xs mt-1">Help</span>
        </button>
        <button class="mobile-nav-btn" data-section="news">
          <i class="fas fa-newspaper mobile-icon"></i>
          <span class="text-xs mt-1">News</span>
        </button>
        <button class="mobile-nav-btn" data-section="guides">
          <i class="fas fa-graduation-cap mobile-icon"></i>
          <span class="text-xs mt-1">Guides</span>
        </button>
        <button class="mobile-nav-btn" data-section="absences">
          <i class="fas fa-calendar-times mobile-icon"></i>
          <span class="text-xs mt-1">Absences</span>
        </button>
      </div>
    </div>
  `;
}

// Инициализация слушателей
function initEventListeners() {
  // Навигация
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-btn') || e.target.closest('.mobile-nav-btn')) {
      const btn = e.target.closest('.nav-btn') || e.target.closest('.mobile-nav-btn');
      const section = btn.dataset.section;
      loadSection(section);
    }
  });
  
  // Обновление данных
  document.addEventListener('click', (e) => {
    if (e.target.closest('#refreshBtn')) {
      refreshCurrentSection();
    }
  });
  
  // Выход
  document.addEventListener('click', (e) => {
    if (e.target.closest('#logoutBtn')) {
      logout();
    }
  });
  
  // Переключение языка
  document.addEventListener('change', (e) => {
    if (e.target.id === 'langSwitch') {
      applyLanguage(e.target.value);
    }
  });
}

// Загрузка секции
async function loadSection(section) {
  currentSection = section;
  
  // Обновляем активные кнопки
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });
  
  // Показываем скелетон
  document.getElementById('mainContent').innerHTML = `
    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4">
        <div id="sectionContent" class="animate-pulse">
          <div class="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
          <div class="h-64 bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  `;
  
  // Динамически импортируем компонент
  try {
    const { default: Component } = await import(`./components/${section.charAt(0).toUpperCase() + section.slice(1)}Section.js`);
    const content = new Component(currentUser);
    document.getElementById('sectionContent').innerHTML = content.render();
    
    // Инициализируем компонент
    if (content.init) {
      content.init();
    }
  } catch (error) {
    console.error(`Failed to load section ${section}:`, error);
    document.getElementById('sectionContent').innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">Error Loading Section</h3>
        <p class="text-gray-400">Please try again later</p>
      </div>
    `;
  }
}

// Обновление текущей секции
function refreshCurrentSection() {
  if (currentSection) {
    loadSection(currentSection);
  }
}

// Применение языка
function applyLanguage(lang) {
  localStorage.setItem('guild_portal_lang', lang);
  // Обновляем тексты
  document.querySelectorAll('[data-lang]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) el.textContent = text;
  });
}

// Выход
function logout() {
  localStorage.removeItem('auth_token');
  currentUser = null;
  document.getElementById('app').classList.add('hidden');
  showPinScreen();
  showSuccess('Logged out successfully');
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp);

// Экспорт для глобального использования
window.app = {
  loadSection,
  refreshCurrentSection,
  currentUser: () => currentUser,
  showSuccess,
  showError
};
