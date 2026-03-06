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
                    <button class="btn btn-primary" onclick="openCheckModal(null)">Новая проверка</button>
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
                        <tbody>
                        <tr>
                            <td><strong>Ping</strong></td>
                            <td>Проверка доступности по ICMP</td>
                            <td>Одно устройство</td>
                            <td class="muted">2 мин назад</td>
                            <td><span class="status-pill status-ok">Успешно (12ms)</span></td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-small btn-light" onclick="openCheckModal('ping')">Настроить</button>
                                    <button class="btn btn-small btn-primary" onclick="runCheck('ping')">Запустить</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Проверка порта</strong></td>
                            <td>Тест TCP порта (22,80,443)</td>
                            <td>Одно устройство</td>
                            <td class="muted">45 мин назад</td>
                            <td><span class="status-pill status-warn">Таймаут (порт 22)</span></td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-small btn-light" onclick="openCheckModal('port')">Настроить</button>
                                    <button class="btn btn-small btn-primary" onclick="runCheck('port')">Запустить</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>HTTP тест</strong></td>
                            <td>Проверка HTTP/HTTPS сервисов</td>
                            <td>Группа устройств</td>
                            <td class="muted">1ч 20мин назад</td>
                            <td><span class="status-pill status-bad">3/5 недоступно</span></td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-small btn-light" onclick="openCheckModal('http')">Настроить</button>
                                    <button class="btn btn-small btn-primary" onclick="runCheck('http')">Запустить</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Дисковое пространство</strong></td>
                            <td>Мониторинг свободного места</td>
                            <td>Серверы</td>
                            <td class="muted">5 мин назад</td>
                            <td><span class="status-pill status-ok">78% свободно</span></td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-small btn-light" onclick="openCheckModal('disk')">Настроить</button>
                                    <button class="btn btn-small btn-primary" onclick="runCheck('disk')">Запустить</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</div>

<!-- Модальное окно настроек проверки -->
<div id="checkModal" class="modal">
    <div class="modal-overlay" onclick="closeCheckModal()"></div>
    <div class="modal-content" style="max-width: 580px;">
        <div class="modal-header">
            <h3 id="checkModalTitle">Настройки проверки</h3>
            <button class="modal-close" onclick="closeCheckModal()">×</button>
        </div>

        <div class="check-settings">
            <div class="form-field">
                <span class="form-label">Целевые устройства</span>
                <div class="tag-group">
                    <span class="tag status-ok">Core Router 1</span>
                    <span class="tag status-warn">Switch 7</span>
                    <input type="text" class="input" placeholder="Добавить устройство...">
                </div>
            </div>

            <div class="grid-2">
                <div class="form-field">
                    <span class="form-label">Таймаут (сек)</span>
                    <input type="number" class="input" value="5">
                </div>
                <div class="form-field">
                    <span class="form-label">Повторений</span>
                    <input type="number" class="input" value="3">
                </div>
            </div>

            <div class="form-field">
                <span class="form-label">Дополнительные параметры</span>
                <textarea class="input" rows="3" placeholder="--count=4 --verbose"></textarea>
            </div>
        </div>

        <div class="modal-actions">
            <button class="btn btn-secondary" onclick="closeCheckModal()">Отмена</button>
            <button class="btn btn-primary" onclick="saveCheckSettings()">Сохранить</button>
            <button class="btn btn-danger" onclick="runCheckNow()" style="margin-left: auto;">Запустить сейчас</button>
        </div>
    </div>
</div>
<script>
    function openCheckModal(checkType) {
        const titles = {
            'ping': 'Ping - Настройки',
            'port': 'Проверка порта - Настройки',
            'http': 'HTTP тест - Настройки',
            'disk': 'Дисковое пространство - Настройки',
            null: 'Новая проверка'
        };

        document.getElementById('checkModalTitle').textContent = titles[checkType] || titles.null;
        document.getElementById('checkModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function runCheck(checkType) {
        // Имитация запуска ОНО РЕАЛЬНО РАБОТАЕТ НИ-
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '⏳ Запуск...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Готово!';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        }, 2000);
    }

    function closeCheckModal() {
        document.getElementById('checkModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function saveCheckSettings() {
        alert('Настройки сохранены!');
        closeCheckModal();
    }

    function runCheckNow() {
        alert('Проверка запущена!');
        closeCheckModal();
    }

    // эскейп типа закрытие
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeCheckModal();
    });
</script>
</body>
</html>
