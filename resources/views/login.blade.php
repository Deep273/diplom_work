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


<script>
    const firebaseConfig = {
        apiKey: "AIzaSyCTvuLekPVIRj6QJ8Hx3EblD5wbQrKKxqM",
        authDomain: "diplommm-5d205.firebaseapp.com",
        databaseURL: "https://diplommm-5d205-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "diplommm-5d205",
        storageBucket: "diplommm-5d205.firebasestorage.app",
        messagingSenderId: "897291350170",
        appId: "1:897291350170:web:8a9089ba9c60cc77b4af23",
        measurementId: "G-29FV07MSQ0"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const loginKey = login.replace(/\./g, '_');

        try {

            const snapshot = await db.ref('admins/' + loginKey + '/password').get();
            console.log('snapshot.exists():', snapshot.exists());
            console.log('snapshot.val():', snapshot.val());

            if (!snapshot.exists()) {
                document.getElementById('loginError').textContent = 'Пользователь не найден';
                return;
            }

            const storedPassword = snapshot.val(); // <- здесь уже строка, пароль из базы

            if (password !== storedPassword) {    // <- сравниваем напрямую
                document.getElementById('loginError').textContent = 'Неверный пароль';
                return;
            }

            // Сохраняем авторизацию
            localStorage.setItem('admin_logged', 'true');
            localStorage.setItem('admin_login', login);

            // Переходим на дашборд
            window.location.href = 'dashboard';

        } catch (err) {
            console.error(err);
            document.getElementById('loginError').textContent = 'Ошибка авторизации';
        }
    });
</script>
</body>
</html>
