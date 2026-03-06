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
        <form class="auth-form" action="{{ route('dashboard') }}" method="get">
            <label class="form-field">
                <span class="form-label">Логин</span>
                <input type="text" class="input" name="login" placeholder="admin">
            </label>
            <label class="form-field">
                <span class="form-label">Пароль</span>
                <input type="password" class="input" name="password" placeholder="••••••••">
            </label>
            <button type="submit" class="btn btn-primary auth-btn">Войти</button>
        </form>
        <div class="auth-footer">
            Учетки создаются только через админку, регистрации для пользователей нет.
        </div>
    </div>
</div>
</body>
</html>
