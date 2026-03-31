<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Настройки</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/settings.css') }}">
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
            <a href="{{ route('login') }}" class="nav-item btn-logout">Выход</a>
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
                            <input type="text" class="input" id="userName">
                        </label>
                        <label class="form-field">
                            <span class="form-label">Email</span>
                            <input type="email" class="input" id="userEmail">
                        </label>
                        <div class="card-subtitle" style="margin-top:15px;">Смена пароля</div>

                        <label class="form-field">
                            <span class="form-label">Текущий пароль</span>
                            <input type="password" class="input" id="currentPassword">
                        </label>

                        <label class="form-field">
                            <span class="form-label">Новый пароль</span>
                            <input type="password" class="input" id="newPassword">
                        </label>

                        <label class="form-field">
                            <span class="form-label">Подтвердите пароль</span>
                            <input type="password" class="input" id="confirmPassword">
                        </label>

                        <button class="btn btn-primary" type="button" onclick="changePassword()">
                            Сменить пароль
                        </button>
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
                <div class="settings-card">
                    <div class="card-title">Учетки и авторизация</div>
                    <div class="form" style="margin-bottom: 14px;">
                        <label class="form-field">
                            <span class="form-label">Таймаут сессии (мин)</span>
                            <input type="number" class="input" id="sessionTimeout" value="30">
                        </label>
                    </div>

                    <div class="card-subtitle" style="margin-bottom: 6px;">Учетные записи</div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Логин</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-small btn-secondary" style="margin-top: 8px;" onclick="addUser()">
                        Добавить учетку
                    </button>
                    <div id="addUserModal" class="modal hidden">
                        <div class="modal-content">
                            <h3>Добавить учетную запись</h3>

                            <label>Имя</label>
                            <input type="text" id="newUserName" class="input">

                            <label>Email</label>
                            <input type="email" id="newUserEmail" class="input">

                            <label>Пароль</label>
                            <input type="password" id="newUserPassword" class="input">

                            <div class="modal-actions">
                                <button class="btn btn-secondary" onclick="closeModal()">Отмена</button>
                                <button class="btn btn-primary" onclick="createUser()">Создать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="{{ asset('js/settings.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
</body>
</html>
