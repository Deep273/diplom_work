<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Устройства</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <!-- Всегда активный раздел -->
            <a href="{{ route('devices') }}" class="nav-item nav-item-section active">Устройства</a>
            <!-- Подгруппы внутри раздела Устройства -->
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
                    <div class="card-value">45</div>
                    <div class="card-subtitle">Онлайн: 32 · Офлайн: 13</div>
                </div>
                <div class="card">
                    <div class="card-title">Сетевые устройства</div>
                    <div class="card-value">23</div>
                    <div class="card-subtitle">Критичных нет</div>
                </div>
                <div class="card">
                    <div class="card-title">Серверы</div>
                    <div class="card-value">60</div>
                    <div class="card-subtitle">Предупреждений: 4</div>
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
            <!-- Рабочие станции -->
            <div id="workstations" class="device-group active">
                <div class="group-header">
                    <div class="group-title">Рабочие станции</div>
                    <div class="group-count">45 устройств</div>
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
                        <tr>
                            <td><strong>WS-Office-01</strong></td>
                            <td>192.168.1.101<br><span class="muted">ws01.office.local</span></td>
                            <td><span class="status-pill status-ok">Онлайн</span></td>
                            <td class="muted">2 мин назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('WS-Office-01')">Подробнее</button></td>
                        </tr>
                        <tr>
                            <td><strong>WS-Design-05</strong></td>
                            <td>192.168.1.105<br><span class="muted">design05.local</span></td>
                            <td><span class="status-pill status-warn">Офлайн</span></td>
                            <td class="muted">45 мин назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('WS-Design-05')">Подробнее</button></td>
                        </tr>
                        <tr>
                            <td><strong>WS-Accounting-12</strong></td>
                            <td>192.168.1.112<br><span class="muted">acc12.local</span></td>
                            <td><span class="status-pill status-ok">Онлайн</span></td>
                            <td class="muted">1 мин назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('WS-Accounting-12')">Подробнее</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Сетевые устройства -->
            <div id="network" class="device-group">
                <div class="group-header">
                    <div class="group-title">Сетевые устройства</div>
                    <div class="group-count">23 устройства</div>
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
                        <tr>
                            <td><strong>Core Router 1</strong></td>
                            <td>10.0.0.1<br><span class="muted">core1.example.com</span></td>
                            <td><span class="status-pill status-ok">Онлайн</span></td>
                            <td class="muted">30 сек назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('Core Router 1')">Подробнее</button></td>
                        </tr>
                        <tr>
                            <td><strong>Switch 7</strong></td>
                            <td>10.0.0.7<br><span class="muted">sw-7.dc.local</span></td>
                            <td><span class="status-pill status-ok">Онлайн</span></td>
                            <td class="muted">1 мин назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('Switch 7')">Подробнее</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Серверы -->
            <div id="servers" class="device-group">
                <div class="group-header">
                    <div class="group-title">Серверы</div>
                    <div class="group-count">60 устройств</div>
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
                        <tr>
                            <td><strong>DB-Server-01</strong></td>
                            <td>10.1.0.10<br><span class="muted">db01.internal</span></td>
                            <td><span class="status-pill status-ok">Онлайн</span></td>
                            <td class="muted">5 сек назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('DB-Server-01')">Подробнее</button></td>
                        </tr>
                        <tr>
                            <td><strong>Web-Server-03</strong></td>
                            <td>10.1.0.13<br><span class="muted">web03.internal</span></td>
                            <td><span class="status-pill status-warn">Предупреждение</span></td>
                            <td class="muted">2 часа назад</td>
                            <td><button class="btn btn-small btn-light" onclick="openDetailModal('Web-Server-03')">Подробнее</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</div>
<!-- Модальное окно добавления -->
<div id="addModal" class="modal">
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h3>Добавить устройство</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <form class="form" onsubmit="saveDevice(event)">
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
<!-- Модальное окно подробностей -->
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
<style>
    .device-group { display: none; }
    .device-group.active { display: block; }
    .device-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .nav-item-sub { padding-left: 32px; font-size: 14px; }
    .nav-item-section { font-weight: 600; border-left: 3px solid var(--primary); }
</style>
<script>
    function showGroup(groupId, element) {
        // Убираем активный класс у всех подгрупп
        document.querySelectorAll('.nav-item-sub').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.device-group').forEach(el => el.classList.remove('active'));

        // Добавляем активный класс
        element.classList.add('active');
        document.getElementById(groupId).classList.add('active');
    }

    function openAddModal() {
        document.getElementById('addModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openDetailModal(deviceName) {
        document.getElementById('detailTitle').textContent = deviceName;
        // Имитация данных
        document.getElementById('detailId').textContent = 'DEV-' + Math.floor(Math.random()*1000);
        document.getElementById('detailIp').textContent = '192.168.1.' + Math.floor(Math.random()*255);
        document.getElementById('detailDomain').textContent = deviceName.toLowerCase().replace(/ /g, '.') + '.local';
        document.getElementById('detailModel').textContent = 'Cisco Catalyst 9300';
        document.getElementById('detailLocation').textContent = 'DC-1 Rack 5';
        document.getElementById('detailStatus').textContent = '🟢 Онлайн';
        document.getElementById('detailLastOnline').textContent = '2 мин назад';
        document.getElementById('detailConnections').textContent = '3 подчинённых';

        document.getElementById('detailModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    }

    function saveDevice(event) {
        event.preventDefault();

        const device = {
            type: document.getElementById('deviceType').value,
            name: document.getElementById('deviceName').value,
            ip: document.getElementById('deviceIp').value,
            domain: document.getElementById('deviceDomain').value,
            location: document.getElementById('deviceLocation').value,
            timestamp: new Date().toISOString()
        };

        fetch('/devices/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(device)
        }).then(res => res.json()).then(data => {
            alert('Устройство сохранено в Firebase!');
            closeModal();
        }).catch(err => {
            alert('Ошибка сохранения');
        });
    }

    function exportTable() {
        alert('Экспорт в CSV... (функция в разработке)');
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
</script>
</body>
</html>
