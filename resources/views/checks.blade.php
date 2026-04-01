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
            <a href="{{ route('dashboard') }}" class="nav-item" data-i18n="nav.home">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item" data-i18n="nav.devices">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item" data-i18n="nav.checks">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item nav-item-section active" data-i18n="nav.settings">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item" data-i18n="nav.connections">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout" data-i18n="btn.logout">Выход</a>
        </div>
    </aside>
    <main class="main">
        <header class="main-header">
            <h1 class="page-title" data-i18n="checks.title">Проверки</h1>
            <div class="header-meta" data-i18n="checks.subtitle">
                Запуск скриптов для тестирования оборудования
            </div>
        </header>
        <section class="page-content">
            <div class="page-toolbar">
                <div class="filters">
                    <input type="text" id="checkSearch" class="input" data-i18n-placeholder="checks.search" placeholder="Поиск проверок">
                    <select id="checkStatusFilter" class="input">
                        <option value="all" data-i18n="checks.status.all">Все статусы</option>
                        <option value="Успешно" data-i18n="checks.status.success">Успешно</option>
                        <option value="Предупреждение" data-i18n="checks.status.warning">Предупреждение</option>
                        <option value="Ошибка" data-i18n="checks.status.error">Ошибка</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="openAddCheckModal()" data-i18n="checks.add">Новая проверка</button>
                </div>
            </div>
            <div class="cards">
                <div class="card">
                    <div class="card-title" data-i18n="checks.add">
                        Статистика проверок (24ч)
                        <span class="status-pill status-ok" style="font-size: 12px;">0/0</span>
                    </div>
                    <div class="grid-2" style="margin-top: 14px;">
                        <div>
                            <div class="card-value" style="font-size: 24px;">0</div>
                            <div class="card-subtitle" data-i18n="checks.stats.errors">Ошибки</div>
                        </div>
                        <div>
                            <div class="card-value" style="font-size: 24px;">0</div>
                            <div class="card-subtitle" data-i18n="checks.stats.warnings">Предупреждения</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top: 18px;">
                <div class="card-title" data-i18n="checks.available">Доступные проверки</div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th data-i18n="checks.table.name">Проверка</th>
                            <th data-i18n="checks.table.description">Описание</th>
                            <th data-i18n="checks.table.target">Цель</th>
                            <th data-i18n="checks.table.lastRun">Последний запуск</th>
                            <th data-i18n="checks.table.result">Результат</th>
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
            <h3 id="checkModalTitle" data-i18n="checks.modal.title.settings">Настройки проверки</h3>
            <button class="modal-close" onclick="closeCheckModal()">×</button>
        </div>

        <div class="check-settings">

            <div class="form-field">
                <span class="form-label" data-i18n="checks.modal.name">Название проверки</span>
                <input id="checkName" data-i18n-placeholder ="checks.modal.name" type="text" class="input" placeholder="Название проверки">
            </div>

            <div class="form-field">
                <span class="form-label"  data-i18n="checks.modal.name">Описание</span>
                <input id="checkDescription" type="text" class="input"
                       data-i18n-placeholder="checks.modal.descriptionPlaceholder"
                       placeholder="Краткое описание проверки">
            </div>

            <div class="form-field">
                <span class="form-label" data-i18n="checks.modal.target">Цель проверки</span>
                <select id="checkTarget" class="input">
                    <option value="single" data-i18n="checks.target.single">Одно устройство</option>
                    <option value="group" data-i18n="checks.target.group">Группа устройств</option>
                    <option value="servers" data-i18n="checks.target.servers">Серверы</option>
                </select>
            </div>

            <div class="form-field" id="deviceField" style="display:none;">
                <span class="form-label" data-i18n="checks.modal.device">Выберите устройство</span>
                <div id="checkDeviceList" class="device-list"></div>
            </div>

            <div class="form-field" id="groupField" style="display:none;">
                <span class="form-label" data-i18n="checks.modal.group">Выберите группу</span>
                <select id="checkGroup" class="input">
                    <option value="workstations" data-i18n="groupDevices.workstations">Рабочие станции</option>
                    <option value="network" data-i18n="groupDevices.network">Сетевые устройства</option>
                    <option value="servers" data-i18n="groupDevices.servers">Серверы</option>
                </select>
            </div>
        </div>

        <div class="modal-actions">
            <button class="btn btn-secondary" onclick="closeCheckModal()" data-i18n="modal.cancel">Отмена</button>
            <button class="btn btn-primary" onclick="addCheck()" data-i18n="checks.modal.add">Добавить</button>
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
