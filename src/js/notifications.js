// Система toast-уведомлений
class NotificationManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'notification-container fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${this.getTypeClass(type)} 
      transform transition-all duration-300 ease-out translate-x-full opacity-0
      max-w-xs p-4 rounded-lg shadow-lg border-l-4`;
    
    notification.innerHTML = `
      <div class="flex items-start">
        <i class="${this.getIcon(type)} mt-1 mr-3"></i>
        <div class="flex-1">
          <p class="text-sm font-medium">${this.escapeHTML(message)}</p>
        </div>
        <button class="ml-3 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    this.container.appendChild(notification);

    // Анимация появления
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full', 'opacity-0');
      notification.classList.add('translate-x-0', 'opacity-100');
    });

    // Автоматическое удаление
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification);
      }, duration);
    }

    return notification;
  }

  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration = 5000) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration = 5000) {
    return this.show(message, 'info', duration);
  }

  remove(notification) {
    if (notification && notification.parentNode) {
      notification.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }

  getTypeClass(type) {
    const classes = {
      success: 'bg-green-900/90 border-green-500 text-green-100',
      error: 'bg-red-900/90 border-red-500 text-red-100',
      warning: 'bg-yellow-900/90 border-yellow-500 text-yellow-100',
      info: 'bg-blue-900/90 border-blue-500 text-blue-100'
    };
    return classes[type] || classes.info;
  }

  getIcon(type) {
    const icons = {
      success: 'fas fa-check-circle text-green-400',
      error: 'fas fa-exclamation-circle text-red-400',
      warning: 'fas fa-exclamation-triangle text-yellow-400',
      info: 'fas fa-info-circle text-blue-400'
    };
    return icons[type] || icons.info;
  }

  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Глобальный экземпляр
window.notifications = new NotificationManager();

// Утилитарные функции
export function showSuccess(message, duration) {
  return window.notifications.success(message, duration);
}

export function showError(message, duration) {
  return window.notifications.error(message, duration);
}

export function showWarning(message, duration) {
  return window.notifications.warning(message, duration);
}

export function showInfo(message, duration) {
  return window.notifications.info(message, duration);
}