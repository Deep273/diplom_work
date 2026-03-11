<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Устройства</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/devices.css') }}">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item nav-item-section active">Устройства</a>
            <a href="#workstations"
               class="nav-item nav-item-sub active"
               onclick="showGroup('workstations', this); return false;">
                Рабочие станции</a>
            <a href="#network"
               class="nav-item nav-item-sub"
               onclick="showGroup('network', this); return false;">
                Сетевые устройства</a>
            <a href="#servers"
               class="nav-item nav-item-sub"
               onclick="showGroup('servers', this); return false;">
                Серверы
            </a>
            <a href="{{ route('checks') }}" class="nav-item">Проверки</a>
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
            <div>
                <h1 class="page-title">Устройства</h1>
                <div class="header-meta">Общий дашборд по оборудованию</div>
            </div>
        </header>
        <section class="page-content">
            <div class="cards">
                <div class="card">
                    <div class="card-title">Рабочие станции</div>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Онлайн: 0 · Офлайн: 0</div>
                </div>
                <div class="card">
                    <div class="card-title">Сетевые устройства</div>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Критичных нет</div>
                </div>
                <div class="card">
                    <div class="card-title">Серверы</div>
                    <div class="card-value">0</div>
                    <div class="card-subtitle">Предупреждений: 0</div>
                </div>
            </div>
            <div class="page-toolbar" style="margin-top: 20px;">
                <div class="filters">
                    <input type="text" class="input" placeholder="Поиск по имени или домену">
                    <select class="input">
                        <option>Все статусы</option>
                        <option>Онлайн</option>
                        <option>Офлайн</option>
                        <option>Предупреждение</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-secondary" onclick="exportTable()">Экспорт таблицы</button>
                    <button class="btn btn-primary" onclick="openAddModal()">
                        Добавить устройство
                    </button>
                </div>
            </div>
            <div id="workstations" class="device-group active">
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div id="network" class="device-group">
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="servers" class="device-group">
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</div>
<div id="addModal" class="modal">
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h3>Добавить устройство</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <form id="addDeviceForm" class="form">
            <label class="form-field">
                <span class="form-label">Тип устройства</span>
                <select class="input" id="deviceType">
                    <option>Рабочая станция</option>
                    <option>Сетевое устройство</option>
                    <option>Сервер</option>
                </select>
            </label>
            <label class="form-field">
                <span class="form-label">Наименование</span>
                <input type="text" class="input" id="deviceName" placeholder="Core Router 1">
            </label>
            <label class="form-field">
                <span class="form-label">IP адрес</span>
                <input type="text" class="input" id="deviceIp" placeholder="192.168.1.1">
            </label>
            <label class="form-field">
                <span class="form-label">Доменное имя</span>
                <input type="text" class="input" id="deviceDomain" placeholder="device.example.com">
            </label>
            <label class="form-field">
                <span class="form-label">Локация</span>
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
    <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
            <h3 id="detailTitle">Подробности устройства</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="device-detail-grid">
            <div class="form-field">
                <span class="form-label">ID устройства</span>
                <span id="detailId" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">IP адрес</span>
                <span id="detailIp" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Доменное имя</span>
                <span id="detailDomain" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Модель</span>
                <span id="detailModel" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Локация</span>
                <span id="detailLocation" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Статус</span>
                <span id="detailStatus" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Последний онлайн</span>
                <span id="detailLastOnline" class="detail-value">-</span>
            </div>
            <div class="form-field">
                <span class="form-label">Связи</span>
                <span id="detailConnections" class="detail-value">0 подчинённых</span>
            </div>
        </div>
        <div class="modal-actions">
            <a href="{{ route('connections') }}" class="btn btn-secondary">Управление связями</a>
            <button class="btn btn-primary" onclick="closeModal()">Закрыть</button>
        </div>
    </div>
</div>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="{{ asset('js/devices.js') }}"></script>
</body>
</html>
