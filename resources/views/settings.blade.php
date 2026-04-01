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
            <a href="{{ route('dashboard') }}" class="nav-item" data-i18n="nav.home">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item" data-i18n="nav.devices">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item" data-i18n="nav.checks">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item nav-item-section active" data-i18n="nav.settings">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item" data-i18n="nav.connections">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout" data-i18n="btn.logout">Выход</a>
        </div>
    </aside>
    <main class="main">
        <header class="main-header">
            <h1 class="page-title" data-i18n="settings.title">Настройки</h1>
            <div class="header-meta" data-i18n="settings.subtitle">Учётные записи и авторизация</div>
        </header>
        <section class="page-content">
            <div class="settings-grid">
                <div class="settings-card">
                    <div class="card-title" data-i18n="account.title">Настройки учетной записи</div>
                    <form class="form" id="accountForm">
                        <label class="form-field">
                            <span class="form-label" data-i18n="name">Имя</span>
                            <input type="text" class="input" id="userName">
                        </label>
                        <label class="form-field">
                            <span class="form-label">Email</span>
                            <input type="email" class="input" id="userEmail">
                        </label>
                        <div class="card-subtitle" data-i18n="password.change" style="margin-top:15px;">Смена пароля</div>
                        <label class="form-field">
                            <span class="form-label" data-i18n="password.current">Текущий пароль</span>
                            <input type="password" class="input" id="currentPassword">
                        </label>

                        <label class="form-field">
                            <span class="form-label" data-i18n="password.new">Новый пароль</span>
                            <input type="password" class="input" id="newPassword">
                        </label>

                        <label class="form-field">
                            <span class="form-label" data-i18n="password.confirm">Подтвердите пароль</span>
                            <input type="password" class="input" id="confirmPassword">
                        </label>
                        <button class="btn btn-primary" data-i18n="btn.changePassword" type="button" onclick="changePassword()">
                            Сменить пароль
                        </button>
                        <label class="form-field">
                            <span class="form-label" data-i18n="language">Язык интерфейса</span>
                            <select class="input" id="languageSelect">
                                <option value="ru" selected>Русский</option>
                                <option value="en">English</option>
                            </select>
                        </label>
                        <button class="btn btn-primary" data-i18n="btn.save" type="button" onclick="saveAccount()">Сохранить</button>
                    </form>
                </div>
                <div class="settings-card">
                    <div class="card-title" data-i18n="settings.auth">Учетки и авторизация</div>
                    <div class="form" style="margin-bottom: 14px;">
                        <label class="form-field">
                            <span class="form-label" data-i18n="session.timeout">Таймаут сессии (мин)</span>
                            <input type="number" class="input" id="sessionTimeout" value="30">
                        </label>
                    </div>

                    <div class="card-subtitle" data-i18n="accounts" style="margin-bottom: 6px;">Учетные записи</div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                            <tr>
                                <th data-i18n="table.login">Логин</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-small btn-secondary" data-i18n="modal.add" style="margin-top: 8px;" onclick="addUser()">
                        Добавить учетку
                    </button>
                    <div id="addUserModal" class="modal hidden">
                        <div class="modal-content">
                            <h3 data-i18n="modal.add">Добавить учетную запись</h3>

                            <label data-i18n="name">Имя</label>
                            <input type="text" id="newUserName" class="input">

                            <label>Email</label>
                            <input type="email" id="newUserEmail" class="input">

                            <label data-i18n="modal.password">Пароль</label>
                            <input type="password" id="newUserPassword" class="input">

                            <div class="modal-actions">
                                <button class="btn btn-secondary" data-i18n="modal.cancel" onclick="closeModal()">Отмена</button>
                                <button class="btn btn-primary" data-i18n="modal.create" onclick="createUser()">Создать</button>
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
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="{{ asset('js/translations.js') }}"></script>
<script src="{{ asset('js/settings.js') }}"></script>
<script src="{{ asset('js/auth.js') }}"></script>
</body>
</html>
