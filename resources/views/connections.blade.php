<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Связь</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
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

            <!-- Таблица связей -->
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

<!-- Модалка добавления связи -->
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

<style>
    .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000; align-items: center; justify-content: center; }
    .modal.active { display: flex; }
    .modal-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); }
    .modal-content {
        background: var(--bg-card);
        border-radius: var(--radius);
        border: 1px solid var(--border);
        width: 100%;
        max-width: 420px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow);
        position: relative;
        margin: 20px;
    }
</style>

<script>
    function openAddConnectionModal() {
        document.getElementById('addConnectionModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeConnectionModal() {
        document.getElementById('addConnectionModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function saveConnection(event) {
        event.preventDefault();

        const connection = {
            source: document.getElementById('sourceDevice').value,
            type: document.getElementById('connectionType').value,
            target: document.getElementById('targetDevice').value,
            timestamp: new Date().toISOString()
        };

        // Сохраняем в Firebase
        fetch('/connections/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(connection)
        }).then(res => res.json()).then(data => {
            alert('Связь сохранена в Firebase!');
            closeConnectionModal();
        });
    }

    // Граф связей Vis.js
    const nodes = new vis.DataSet([
        { id: 1, label: 'Core Router 1', group: 'router', color: '#3b82f6' },
        { id: 2, label: 'Switch 7', group: 'switch', color: '#10b981' },
        { id: 3, label: 'Access Point 12', group: 'ap', color: '#f59e0b' },
        { id: 4, label: 'DB-Server-01', group: 'server', color: '#ef4444' }
    ]);

    const edges = new vis.DataSet([
        { from: 1, to: 2, label: 'подчинённое', arrows: 'to' },
        { from: 2, to: 3, label: 'подчинённое', arrows: 'to' },
        { from: 1, to: 4, label: 'зависимость', arrows: 'to' }
    ]);

    const container = document.getElementById('networkGraph');
    const data = { nodes, edges };
    const options = {
        layout: { hierarchical: false },
        physics: { enabled: true },
        nodes: { shape: 'box', font: { size: 14 } },
        edges: { font: { size: 12 } }
    };
    new vis.Network(container, data, options);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeConnectionModal();
    });
</script>
</body>
</html>
