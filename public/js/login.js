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

const auth = firebase.auth();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);

        window.location.href = 'dashboard';

    } catch (error) {
        console.error(error);
        document.getElementById('loginError').textContent = 'Неверный email или пароль';
    }
});
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login';
    });
}
