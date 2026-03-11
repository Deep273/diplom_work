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
