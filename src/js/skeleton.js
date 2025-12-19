// Skeleton loading компоненты
class SkeletonLoader {
  constructor() {
    this.templates = {
      table: this.createTableSkeleton,
      card: this.createCardSkeleton,
      list: this.createListSkeleton,
      grid: this.createGridSkeleton,
      chart: this.createChartSkeleton
    };
  }

  show(elementId, type = 'table', options = {}) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const skeleton = this.templates[type](options);
    element.innerHTML = '';
    element.appendChild(skeleton);
  }

  hide(elementId, content = '') {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (content) {
      element.innerHTML = content;
    } else {
      element.innerHTML = '';
    }
  }

  createTableSkeleton({ rows = 5, columns = 6 } = {}) {
    const container = document.createElement('div');
    container.className = 'w-full animate-pulse';

    // Заголовок таблицы
    const header = document.createElement('div');
    header.className = 'flex mb-4 space-x-4';
    for (let i = 0; i < columns; i++) {
      const th = document.createElement('div');
      th.className = 'h-6 bg-gray-700 rounded flex-1';
      header.appendChild(th);
    }
    container.appendChild(header);

    // Строки таблицы
    for (let r = 0; r < rows; r++) {
      const row = document.createElement('div');
      row.className = 'flex mb-3 space-x-4';
      
      for (let c = 0; c < columns; c++) {
        const cell = document.createElement('div');
        cell.className = 'h-12 bg-gray-800 rounded flex-1';
        row.appendChild(cell);
      }
      
      container.appendChild(row);
    }

    return container;
  }

  createCardSkeleton({ count = 3 } = {}) {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse';

    for (let i = 0; i < count; i++) {
      const card = document.createElement('div');
      card.className = 'bg-gray-800 rounded-xl p-6 border border-gray-700/50';
      
      card.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="h-3 bg-gray-700 rounded"></div>
          <div class="h-3 bg-gray-700 rounded w-5/6"></div>
          <div class="h-3 bg-gray-700 rounded w-4/6"></div>
        </div>
        <div class="flex space-x-3 mt-6">
          <div class="h-8 bg-gray-700 rounded flex-1"></div>
          <div class="h-8 bg-gray-700 rounded w-20"></div>
        </div>
      `;
      
      container.appendChild(card);
    }

    return container;
  }

  createListSkeleton({ items = 5 } = {}) {
    const container = document.createElement('div');
    container.className = 'space-y-4 animate-pulse';

    for (let i = 0; i < items; i++) {
      const item = document.createElement('div');
      item.className = 'flex items-center p-4 bg-gray-800 rounded-lg';
      
      item.innerHTML = `
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-700 rounded w-1/3"></div>
          <div class="h-3 bg-gray-700 rounded w-2/3"></div>
        </div>
        <div class="h-8 w-20 bg-gray-700 rounded"></div>
      `;
      
      container.appendChild(item);
    }

    return container;
  }

  createGridSkeleton({ columns = 4, rows = 2 } = {}) {
    const container = document.createElement('div');
    container.className = `grid grid-cols-${Math.min(columns, 2)} md:grid-cols-${Math.min(columns, 4)} lg:grid-cols-${columns} gap-4 animate-pulse`;

    for (let i = 0; i < columns * rows; i++) {
      const item = document.createElement('div');
      item.className = 'bg-gray-800 rounded-lg p-4';
      
      item.innerHTML = `
        <div class="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div class="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-700 rounded w-1/3"></div>
      `;
      
      container.appendChild(item);
    }

    return container;
  }

  createChartSkeleton() {
    const container = document.createElement('div');
    container.className = 'animate-pulse';
    
    container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <div class="h-6 bg-gray-700 rounded w-40"></div>
        <div class="h-8 bg-gray-700 rounded w-24"></div>
      </div>
      <div class="bg-gray-800 rounded-xl p-6">
        <div class="flex items-end space-x-2 h-64">
          ${Array.from({length: 12}).map(() => 
            '<div class="flex-1 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t"></div>'
          ).join('')}
        </div>
        <div class="flex justify-between mt-4">
          ${Array.from({length: 12}).map(() => 
            '<div class="h-3 bg-gray-700 rounded w-6"></div>'
          ).join('')}
        </div>
      </div>
    `;

    return container;
  }

  createInlineSkeleton({ width = '100%', height = '1rem' } = {}) {
    const element = document.createElement('div');
    element.className = 'animate-pulse rounded';
    element.style.width = width;
    element.style.height = height;
    element.style.backgroundColor = '#374151';
    
    return element;
  }
}

// Глобальный экземпляр
window.skeleton = new SkeletonLoader();