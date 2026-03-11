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

    <main class="main">
        <header class="main-header">
            <h1 class="page-title">Связи устройств</h1>
            <div class="header-meta">Схема подключений и зависимостей</div>
        </header>

        <section class="page-content">
            <div class="page-toolbar">
                <div class="filters">
                    <input type="text" class="input" placeholder="Поиск устройств">
                    <select class="input">
                        <option>Все типы связей</option>
                        <option>Подчинённое</option>
                        <option>Зависимость</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="openAddConnectionModal()">Добавить связь</button>
                </div>
            </div>

            <div class="card" style="height: 50vh; padding: 14px;">
                <div id="networkGraph" style="width: 100%; height: 100%;"></div>
            </div>

            <div class="card" style="margin-top: 18px;">
                <div class="card-title">
                    Список связей
                    <span style="font-size: 13px; color: var(--text-muted);">(42 связи)</span>
                </div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Источник</th>
                            <th>Тип связи</th>
                            <th>Цель</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Core Router 1</td>
                            <td>Подчинённое</td>
                            <td>Switch 7</td>
                            <td><button class="btn btn-small btn-light">Удалить</button></td>
                        </tr>
                        <tr>
                            <td>Switch 7</td>
                            <td>Подчинённое</td>
                            <td>Access Point 12</td>
                            <td><button class="btn btn-small btn-light">Удалить</button></td>
                        </tr>
                        </tbody>
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
                <span class="form-label">Исходное устройство</span>
                <select class="input" id="sourceDevice">
                    <option>Core Router 1</option>
                    <option>Switch 7</option>
                    <option>DB-Server-01</option>
                </select>
            </label>
            <label class="form-field">
                <span class="form-label">Тип связи</span>
                <select class="input" id="connectionType">
                    <option>Подчинённое</option>
                    <option>Зависимость</option>
                    <option>Шлюз</option>
                </select>
            </label>
            <label class="form-field">
                <span class="form-label">Целевое устройство</span>
                <select class="input" id="targetDevice">
                    <option>Switch 7</option>
                    <option>Access Point 12</option>
                    <option>DB-Server-01</option>
                </select>
            </label>
            <div class="page-toolbar" style="margin-top: 14px;">
                <button type="button" class="btn btn-secondary" onclick="closeConnectionModal()">Отмена</button>
                <button type="submit" class="btn btn-primary">Создать связь</button>
            </div>
        </form>
    </div>
</div>
<script src="{{ asset('js/connections.js') }}"></script>
</body>
</html>
