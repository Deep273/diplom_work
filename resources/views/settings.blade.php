<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Настройки</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item nav-item-section active">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
        </div>
    </aside>

    <main class="main">
        <header class="main-header">
            <h1 class="page-title">Настройки</h1>
            <div class="header-meta">Учётные записи и авторизация</div>
        </header>

        <section class="page-content">
            <div class="settings-grid">
                <div class="settings-card">
                    <div class="card-title">Настройки учетной записи</div>
                    <form class="form" id="accountForm">
                        <label class="form-field">
                            <span class="form-label">Имя</span>
                            <input type="text" class="input" id="userName" value="Администратор">
                        </label>
                        <label class="form-field">
                            <span class="form-label">Email</span>
                            <input type="email" class="input" id="userEmail" value="admin@example.com">
                        </label>
                        <label class="form-field">
                            <span class="form-label">Язык интерфейса</span>
                            <select class="input" id="languageSelect">
                                <option value="ru" selected>Русский</option>
                                <option value="en">English</option>
                            </select>
                        </label>
                        <button class="btn btn-primary" type="button" onclick="saveAccount()">Сохранить</button>
                    </form>
                </div>

                <!-- Учетки и авторизация -->
                <div class="settings-card">
                    <div class="card-title">Учетки и авторизация</div>

                    <div class="form" style="margin-bottom: 14px;">
                        <label class="form-field">
                            <span class="form-label">Режим авторизации</span>
                            <select class="input">
                                <option>Локальная (без регистрации)</option>
                                <option>Внешняя система</option>
                            </select>
                        </label>
                        <label class="form-field">
                            <span class="form-label">Таймаут сессии (мин)</span>
                            <input type="number" class="input" value="30">
                        </label>
                    </div>

                    <div class="card-subtitle" style="margin-bottom: 6px;">Учетные записи</div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Логин</th>
                                <th>Роль</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>admin</td>
                                <td>Администратор</td>
                            </tr>
                            <tr>
                                <td>viewer</td>
                                <td>Просмотр</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-small btn-secondary" style="margin-top: 8px;" onclick="addUser()">Добавить учетку</button>
                </div>
            </div>
        </section>
    </main>
</div>

<script>
    function saveAccount() {
        const formData = {
            lang: document.getElementById('languageSelect').value,
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value
        };
        fetch('/api/settings/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => {
                alert('Сохранено!');
                if (formData.lang !== 'ru') location.reload();
            })
            .catch(error => alert('Ошибка: ' + error));
    }

    function addUser() {
        alert('Добавить учетку');
    }
</script>
</body>
</html>
