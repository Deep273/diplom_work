<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Проверки</title>
    <link rel="stylesheet" href="{{ asset('css/checks.css') }}">
    <script src="{{ asset('js/auth.js') }}"></script>
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item nav-item-section active">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout">Выход</a>
        </div>
    </aside>
    <main class="main">
        <header class="main-header">
            <h1 class="page-title">Проверки</h1>
            <div class="header-meta">Запуск скриптов для тестирования оборудования</div>
        </header>
        <section class="page-content">
            <div class="page-toolbar">
                <div class="filters">
                    <input type="text" class="input" placeholder="Поиск проверок">
                    <select class="input">
                        <option>Все статусы</option>
                        <option>Успешно</option>
                        <option>Предупреждение</option>
                        <option>Ошибка</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="openAddCheckModal()">Новая проверка</button>
                </div>
            </div>
            <div class="cards">
                <div class="card">
                    <div class="card-title">
                        Статистика проверок (24ч)
                        <span class="status-pill status-ok" style="font-size: 12px;">127/128</span>
                    </div>
                    <div class="grid-2" style="margin-top: 14px;">
                        <div>
                            <div class="card-value" style="font-size: 24px;">3</div>
                            <div class="card-subtitle">Ошибки</div>
                        </div>
                        <div>
                            <div class="card-value" style="font-size: 24px;">12</div>
                            <div class="card-subtitle">Предупреждения</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top: 18px;">
                <div class="card-title">Доступные проверки</div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Проверка</th>
                            <th>Описание</th>
                            <th>Цель</th>
                            <th>Последний запуск</th>
                            <th>Результат</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody id="checksTableBody">
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</div>
<div id="checkModal" class="modal">
    <div class="modal-overlay" onclick="closeCheckModal()"></div>
    <div class="modal-content" style="max-width: 580px;">
        <div class="modal-header">
            <h3 id="checkModalTitle">Настройки проверки</h3>
            <button class="modal-close" onclick="closeCheckModal()">×</button>
        </div>

        <div class="check-settings">

            <div class="form-field">
                <span class="form-label">Название проверки</span>
                <input id="checkName" type="text" class="input" placeholder="Название проверки">
            </div>

            <div class="form-field">
                <span class="form-label">Описание</span>
                <input id="checkDescription" type="text" class="input" placeholder="Краткое описание проверки">
            </div>

            <div class="form-field">
                <span class="form-label">Цель проверки</span>
                <select id="checkTarget" class="input">
                    <option value="Одно устройство">Одно устройство</option>
                    <option value="Группа устройств">Группа устройств</option>
                    <option value="Серверы">Серверы</option>
                </select>
            </div>
        </div>

        <div class="modal-actions">
            <button class="btn btn-secondary" onclick="closeCheckModal()">Отмена</button>
            <button class="btn btn-primary" onclick="addCheck()">Добавить</button>
        </div>
    </div>
</div>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="{{ asset('js/checks.js') }}"></script>
</body>
</html>
