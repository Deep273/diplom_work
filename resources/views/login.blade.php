<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Авторизация</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>

<div class="auth-layout">
    <div class="auth-card">

        <div class="auth-logo">DM</div>

        <h1 class="auth-title">Вход в систему</h1>

        <p class="auth-subtitle">
            Введите логин и пароль.
        </p>

        @if(session('error'))
            <div style="color:red; margin-bottom:10px; text-align:center;">
                {{ session('error') }}
            </div>
        @endif

        <form id="loginForm" class="auth-form">

            <label class="form-field">
                <span class="form-label">Логин</span>
                <input type="text" class="input"  id="login" name="login" placeholder="admin" required>
            </label>

            <label class="form-field">
                <span class="form-label">Пароль</span>
                <input type="password" class="input"  id="password" name="password" placeholder="••••••••" required>
            </label>

            <button type="submit" class="btn btn-primary auth-btn">
                Войти
            </button>

            <div id="loginError" style="color:red; margin-top:10px;"></div>
        </form>

        <div class="auth-footer">
            Учетки создаются только через админку, регистрации для пользователей нет.
        </div>

    </div>
</div>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="{{ asset('js/login.js') }}"></script>
</body>
</html>
