<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cult Game Community — Justice Mobile</title>
  <link rel="stylesheet" href="/src/css/main.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <!-- PIN экран -->
  <div id="pinScreen" class="pin-screen"></div>
  
  <!-- Основное приложение -->
  <div id="app" class="hidden">
    <!-- Хедер -->
    <header id="siteHeader" class="site-header"></header>
    
    <!-- Контент -->
    <main id="mainContent" class="main-content">
      <!-- Секции загружаются динамически -->
    </main>
    
    <!-- Мобильная навигация -->
    <div id="mobileNav" class="mobile-nav mobile-hidden"></div>
  </div>

  <!-- Модальные окна -->
  <div id="modalsContainer"></div>

  <!-- Скрипты -->
  <script type="module" src="/src/js/app.js"></script>
</body>
</html>