<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Устройства</title>

    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/devices.css') }}">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>

        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item" data-i18n="nav.home">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item nav-item-section active" data-i18n="nav.devices">Устройства</a>
            <a href="#workstations" class="nav-item nav-item-sub active" data-i18n="groupDevices.workstations"
               onclick="showGroup('workstations', this); return false;">Рабочие станции</a>
            <a href="#network" class="nav-item nav-item-sub" data-i18n="groupDevices.network"
               onclick="showGroup('network', this); return false;">Сетевые устройства</a>
            <a href="#servers" class="nav-item nav-item-sub" data-i18n="groupDevices.servers"
               onclick="showGroup('servers', this); return false;">Серверы</a>
            <a href="{{ route('checks') }}" class="nav-item" data-i18n="nav.checks">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item" data-i18n="nav.settings">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item" data-i18n="nav.connections">Связь</a>
        </nav>

        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout">Выход</a>
        </div>
    </aside>

    <main class="main">
        <header class="main-header">
            <div>
                <h1 class="page-title">Устройства</h1>
                <div class="header-meta">Общий дашборд по оборудованию</div>
            </div>
        </header>

        <section class="content">
            <section class="cards">
                <article class="card">
                    <h2 class="card-title">Рабочие станции</h2>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Онлайн: 0 · Офлайн: 0</div>
                </article>

                <article class="card">
                    <h2 class="card-title">Сетевые устройства</h2>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Критичных нет</div>
                </article>

                <article class="card">
                    <h2 class="card-title">Серверы</h2>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Предупреждений: 0</div>
                </article>
            </section>

            <section class="toolbar">
                <div class="filters">
                    <input type="text" class="input" placeholder="Поиск по имени или домену">
                    <select class="input">
                        <option value="all">Все статусы</option>
                        <option value="online">Онлайн</option>
                        <option value="offline">Офлайн</option>
                        <option value="warn">Предупреждение</option>
                    </select>
                </div>

                <div class="actions">
                    <button type="button" class="btn btn-secondary" onclick="exportTable()">Экспорт таблицы</button>
                    <button type="button" class="btn btn-primary" onclick="openAddModal()">Добавить устройство</button>
                </div>
            </section>

            <section id="workstations" class="device-group active">
                <div class="group-header">
                    <div class="group-title">Рабочие станции</div>
                    <div class="group-count">0 устройств</div>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>IP / Домен</th>
                            <th>Статус</th>
                            <th>Последний ping</th>
                            <th>Локация</th>
                            <th style="display:none;">ID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <section id="network" class="device-group">
                <div class="group-header">
                    <div class="group-title">Сетевые устройства</div>
                    <div class="group-count">0 устройств</div>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>IP / Домен</th>
                            <th>Статус</th>
                            <th>Последний ping</th>
                            <th>Локация</th>
                            <th style="display:none;">ID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <section id="servers" class="device-group">
                <div class="group-header">
                    <div class="group-title">Серверы</div>
                    <div class="group-count">0 устройств</div>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>IP / Домен</th>
                            <th>Статус</th>
                            <th>Последний ping</th>
                            <th>Локация</th>
                            <th style="display:none;">ID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>
        </section>
    </main>
</div>

<div id="addModal" class="modal">
    <div class="modal-overlay" onclick="closeModal()"></div>

    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title">Добавить устройство</h3>
            <button type="button" class="modal-close" onclick="closeModal()">×</button>
        </div>

        <form id="addDeviceForm" class="form">
            <label class="field">
                <span>Тип устройства</span>
                <select class="input" id="deviceType">
                    <option value="workstations">Рабочая станция</option>
                    <option value="network">Сетевое устройство</option>
                    <option value="servers">Сервер</option>
                </select>
            </label>

            <label class="field">
                <span>Наименование</span>
                <input type="text" class="input" id="deviceName" placeholder="Core Router 1">
            </label>

            <label class="field">
                <span>IP адрес</span>
                <input type="text" class="input" id="deviceIp" placeholder="192.168.1.1">
            </label>

            <label class="field">
                <span>Доменное имя</span>
                <input type="text" class="input" id="deviceDomain" placeholder="device.example.com">
            </label>

            <label class="field">
                <span>Модель</span>
                <input type="text" class="input" id="deviceModel" placeholder="Cisco XYZ">
            </label>

            <label class="field">
                <span>Локация</span>
                <input type="text" class="input" id="deviceLocation" placeholder="Дата-центр 1">
            </label>

            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Отмена</button>
                <button type="submit" class="btn btn-primary">Добавить устройство</button>
            </div>
        </form>
    </div>
</div>

<div id="detailModal" class="modal">
    <div class="modal-overlay" onclick="closeModal()"></div>

    <div class="modal-content modal-content--detail">
        <div class="modal-header">
            <h3 id="detailTitle">Подробности устройства</h3>
            <button type="button" class="modal-close" onclick="closeModal()">×</button>
        </div>

        <div id="deviceDetails" class="device-detail-grid"></div>

        <div class="modal-actions">
            <a href="{{ route('connections') }}" class="btn btn-secondary">Управление связями</a>
            <button type="button" class="btn btn-primary" onclick="closeModal()">Закрыть</button>
        </div>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<script src="{{ asset('js/translations.js') }}"></script>
<script src="{{ asset('js/devices.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
</body>
</html>
