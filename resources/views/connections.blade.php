<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Связь</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/connections.css') }}">
    <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item" data-i18n="nav.home">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item" data-i18n="nav.devices">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item" data-i18n="nav.checks">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item" data-i18n="nav.settings">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item nav-item-section active" data-i18n="nav.connections">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout" data-i18n="btn.logout">Выход</a>
        </div>
    </aside>

    <main class="main">
        <header class="main-header">
            <h1 class="page-title" data-i18n="connections.title">Связи устройств</h1>
            <div class="header-meta" data-i18n="connections.subtitle">Схема подключений и зависимостей</div>
        </header>

        <section class="page-content">
            <div class="page-toolbar">
                <div class="filters">
                    <input type="text" class="input" id="searchInput" placeholder="" data-i18n-placeholder="connections.searchPlaceholder">
                    <select class="input" id="typeFilter">
                        <option value="" data-i18n="connections.allTypes">Все типы связей</option>
                        <option value="subordinate" data-i18n="connections.type.subordinate">Подчинённое</option>
                        <option value="dependency" data-i18n="connections.type.dependency">Зависимость</option>
                        <option value="gateway" data-i18n="connections.type.gateway">Шлюз</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="openAddConnectionModal()" data-i18n="connections.add">Добавить связь</button>

                </div>
            </div>

            <div class="card" style="height: 50vh; padding: 14px;">
                <div id="networkGraph" style="width: 100%; height: 100%;"></div>
            </div>

            <div class="card" style="margin-top: 18px;">
                <span data-i18n="connections.title">Список связей</span>
                <div style="font-size: 13px; color: var(--text-muted);">
                    <span data-i18n="connections.countLabel">Связей:</span>
                    <span id="connectionsCount">0</span> |

                    <span data-i18n="connections.devicesLabel">Устройств:</span>
                    <span id="devicesCount">0</span>
                </div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th data-i18n="connections.table.source">Источник</th>
                            <th data-i18n="connections.type">Тип связи</th>
                            <th data-i18n="connections.table.target">Цель</th>
                            <th data-i18n="connections.table.actions">Действия</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</div>
<div id="addConnectionModal" class="modal">
    <div class="modal-overlay" onclick="closeConnectionModal()"></div>
    <div class="modal-content">
        <div class="card-title" data-i18n="connections.add">Добавить связь</div>
        <form class="form" onsubmit="saveConnection(event)">
            <label class="form-field">
                <span class="form-label" data-i18n="connections.modal.sourceLabel">Исходное устройство</span>
                <select class="input" id="sourceDevice"></select>
            </label>
            <label class="form-field">
                <span class="form-label" data-i18n="connections.type">Тип связи</span>
                <select id="connectionType">
                    <option value="subordinate" data-i18n="connections.type.subordinate">Подчинённое</option>
                    <option value="dependency" data-i18n="connections.type.dependency">Зависимость</option>
                    <option value="gateway" data-i18n="connections.type.gateway">Шлюз</option>
                </select>
            </label>
            <label class="form-field">
                <span class="form-label" data-i18n="connections.modal.targetLabel">Целевое устройство</span>
                <select class="input" id="targetDevice"></select>
            </label>
            <div class="page-toolbar" style="margin-top: 14px;">
                <button type="button" class="btn btn-secondary" onclick="closeConnectionModal()" data-i18n="modal.cancel">Отмена</button>
                <button type="submit" class="btn btn-primary" data-i18n="connections.create">Создать связь</button>
            </div>
        </form>
    </div>
</div>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="{{ asset('js/translations.js') }}"></script>
<script src="{{ asset('js/connections.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
</body>
</html>
