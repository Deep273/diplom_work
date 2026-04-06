<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Проверки</title>
    <link rel="stylesheet" href="{{ asset('css/checks.css') }}">
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
            <div class="header-meta">
                Запуск скриптов для тестирования оборудования
            </div>
        </header>

        <section class="page-content">

            <!-- TOOLBAR -->
            <div class="page-toolbar">
                <div class="filters">
                    <input id="checkSearch" class="input" type="text" placeholder="Поиск проверок">

                    <select id="checkStatusFilter" class="input">
                        <option value="all">Все статусы</option>
                        <option value="Успешно">Успешно</option>
                        <option value="Предупреждение">Предупреждение</option>
                        <option value="Ошибка">Ошибка</option>
                    </select>
                </div>

                <button class="btn btn-primary" onclick="openAddCheckModal()">
                    Новая проверка
                </button>
            </div>

            <!-- STATS -->
            <section class="cards">
                <div class="card">
                    <div class="card-title">
                        <span>Статистика проверок (24ч)</span>
                        <span class="status-pill status-ok">0/0</span>
                    </div>

                    <div class="grid-2">
                        <div>
                            <div class="card-value">0</div>
                            <div class="card-subtitle">Ошибки</div>
                        </div>

                        <div>
                            <div class="card-value">0</div>
                            <div class="card-subtitle">Предупреждения</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TABLE -->
            <section class="table-wrapper">
                <div class="card-title">Доступные проверки</div>

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
                    <tbody id="checksTableBody"></tbody>
                </table>
            </section>

        </section>
    </main>
</div>

<!-- MODAL -->
<div id="checkModal" class="modal">

    <div class="modal-overlay" onclick="closeCheckModal()"></div>

    <div class="modal-content">

        <div class="modal-header">
            <h3 id="checkModalTitle">Настройки проверки</h3>
            <button class="modal-close" onclick="closeCheckModal()">×</button>
        </div>

        <div class="check-settings">

            <div class="form-field">
                <span class="form-label">Название проверки</span>
                <input id="checkName" class="input" type="text">
            </div>

            <div class="form-field">
                <span class="form-label">Описание</span>
                <input id="checkDescription" class="input" type="text">
            </div>

            <div class="form-field">
                <span class="form-label">Цель проверки</span>
                <select id="checkTarget" class="input">
                    <option value="single">Одно устройство</option>
                    <option value="group">Группа устройств</option>
                    <option value="servers">Серверы</option>
                </select>
            </div>

            <div id="deviceField" class="form-field" style="display:none;">
                <span class="form-label">Выберите устройство</span>
                <div id="checkDeviceList" class="device-list"></div>
            </div>

            <div id="groupField" class="form-field" style="display:none;">
                <span class="form-label">Выберите группу</span>
                <select id="checkGroup" class="input">
                    <option value="workstations">Рабочие станции</option>
                    <option value="network">Сетевые устройства</option>
                    <option value="servers">Серверы</option>
                </select>
            </div>

        </div>

        <div class="modal-actions">
            <button class="btn btn-secondary" onclick="closeCheckModal()">Отмена</button>
            <button class="btn btn-primary" onclick="addCheck()">Добавить</button>
        </div>

    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="{{ asset('js/translations.js') }}"></script>
<script src="{{ asset('js/checks.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>

</body>
</html>
