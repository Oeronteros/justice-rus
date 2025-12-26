export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl mb-4">Страница не найдена</h2>
        <p className="text-gray-400 mb-8">Запрашиваемая страница не существует.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}

