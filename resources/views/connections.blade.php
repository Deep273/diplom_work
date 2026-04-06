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
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item nav-item-section active">Связь</a>
        </nav>

        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout">Выход</a>
        </div>
    </aside>

    <!-- MAIN -->
    <main class="main">

        <header class="main-header">
            <h1 class="page-title">Связи устройств</h1>
            <div class="header-meta">Схема подключений и зависимостей</div>
        </header>

        <section class="page-content">

            <!-- TOOLBAR -->
            <div class="page-toolbar">
                <div class="filters">
                    <input id="searchInput" class="input" placeholder="Поиск">

                    <select id="typeFilter" class="input">
                        <option value="">Все типы</option>
                        <option value="subordinate">Подчинённое</option>
                        <option value="dependency">Зависимость</option>
                        <option value="gateway">Шлюз</option>
                    </select>
                </div>

                <button class="btn btn-primary" onclick="openAddConnectionModal()">
                    Добавить связь
                </button>
            </div>
            <div class="card">
                <div class="graph-wrap">
                    <div id="networkGraph"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">
                    Список связей
                    <span class="muted">
                        Связей: <span id="connectionsCount">0</span> |
                        Устройств: <span id="devicesCount">0</span>
                    </span>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Источник</th>
                            <th>Тип</th>
                            <th>Цель</th>
                            <th></th>
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

        <div class="card-title">Добавить связь</div>

        <form class="form" onsubmit="saveConnection(event)">

            <label class="form-field">
                <span class="form-label">Источник</span>
                <select id="sourceDevice" class="input"></select>
            </label>

            <label class="form-field">
                <span class="form-label">Тип</span>
                <select id="connectionType" class="input">
                    <option value="subordinate">Подчинённое</option>
                    <option value="dependency">Зависимость</option>
                    <option value="gateway">Шлюз</option>
                </select>
            </label>

            <label class="form-field">
                <span class="form-label">Цель</span>
                <select id="targetDevice" class="input"></select>
            </label>

            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeConnectionModal()">Отмена</button>
                <button type="submit" class="btn btn-primary">Создать</button>
            </div>

        </form>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>

<script src="{{ asset('js/connections.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
<script src="{{ asset('js/translations.js') }}"></script>
</body>
</html>
