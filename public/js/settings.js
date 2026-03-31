// ---------------------- Firebase ----------------------
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

if (!window.firebaseAppInitialized) {
    firebase.initializeApp(firebaseConfig);
    window.firebaseAppInitialized = true;
}

window.auth = firebase.auth();
window.db = firebase.database();

// ---------------------- Аккаунт ----------------------
async function loadAccount(user) {
    const snapshot = await db.ref("admins/" + user.uid).get();

    const data = snapshot.val();

    if (data) {
        document.getElementById("userName").value = data.name || "";
        document.getElementById("userEmail").value = user.email || "";
    } else {
        console.warn("Нет данных в базе по этому UID");
    }
}

window.saveAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
        alert("Вы не авторизованы");
        return;
    }

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();

    if (!name || !email) {
        alert("Заполните все поля");
        return;
    }

    try {
        try {
            await user.updateEmail(email);
            await user.sendEmailVerification();
        } catch (error) {

            if (error.code === "auth/requires-recent-login") {

                const password = prompt("Введите пароль для подтверждения");

                if (!password) {
                    alert("Нужно подтвердить пароль");
                    return;
                }

                const credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    password
                );

                // переавторизация
                await user.reauthenticateWithCredential(credential);

                // повторная попытка смены email
                await user.updateEmail(email);

            } else {
                throw error;
            }
        }
        // Обновляем данные в базе
        await db.ref("admins/" + user.uid).update({
            name: name,
            email: email
        });

        document.querySelector(".sidebar-user").textContent = name;

        const timeout = document.getElementById("sessionTimeout").value;
        localStorage.setItem("sessionTimeout", timeout);
        alert("Сохранено");

    } catch (error) {
        console.error(error);

        if (error.code === "auth/requires-recent-login") {
            alert("Перезайдите в аккаунт для изменения email");
        } else {
            alert("Ошибка: " + error.message);
        }
    }
};

// ---------------------- Пароль ----------------------
window.changePassword = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
        alert("Вы не авторизованы");
        return;
    }

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Заполните все поля");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
    }

    if (newPassword.length < 6) {
        alert("Пароль должен быть минимум 6 символов");
        return;
    }

    try {
        //  переавторизация
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        await user.reauthenticateWithCredential(credential);

        // смена пароля
        await user.updatePassword(newPassword);

        alert("Пароль успешно изменён");

        // очистка полей
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";

    } catch (error) {
        console.error(error);

        if (error.code === "auth/wrong-password") {
            alert("Неверный текущий пароль");
        } else if (error.code === "auth/weak-password") {
            alert("Слишком простой пароль");
        } else {
            alert("Ошибка: " + error.message);
        }
    }
};

// ---------------------- Auth ----------------------
auth.onAuthStateChanged(user => {
    if (user) {
        loadAccount(user);
        loadUsers();
        resetSessionTimer();
    } else {
        window.location.href = "login";
    }
});

// ---------------------- Сессия ----------------------
let logoutTimer;

function resetSessionTimer() {
    clearTimeout(logoutTimer);

    const timeoutMinutes = Number(localStorage.getItem("sessionTimeout")) || 30;
    const timeoutMs = timeoutMinutes * 60 * 1000;

    logoutTimer = setTimeout(() => {
        alert("Сессия истекла");
        firebase.auth().signOut().then(() => {
            window.location.href = "login";
        });
    }, timeoutMs);
}

["click", "mousemove", "keydown", "scroll"].forEach(event => {
    document.addEventListener(event, resetSessionTimer);
});

// ---------------------- Модалка ----------------------
window.addUser = () => {
    const modal = document.getElementById("addUserModal");

    modal.classList.add("active");

    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPassword").value = "";
};

window.closeModal = () => {
    document.getElementById("addUserModal").classList.remove("active");
};

document.addEventListener("click", (e) => {
    const modal = document.getElementById("addUserModal");

    if (!modal.classList.contains("active")) return;

    if (e.target === modal) {
        closeModal();
    }
});

// ---------------------- Пользователи ----------------------
window.createUser = async () => {
    const name = document.getElementById("newUserName").value.trim();
    const email = document.getElementById("newUserEmail").value.trim();
    const password = document.getElementById("newUserPassword").value;

    if (!name || !email || !password) {
        alert("Заполни все поля");
        return;
    }

    if (password.length < 6) {
        alert("Пароль должен быть минимум 6 символов");
        return;
    }

    try {
        // создаём пользователя
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const newUser = result.user;

        // сохраняем доп. данные в базе
        await db.ref("admins/" + newUser.uid).set({
            name: name,
            email: email,
            createdAt: Date.now()
        });

        // ⚠️ отправляем подтверждение email
        await newUser.sendEmailVerification();

        alert("Пользователь создан");

        closeModal();

    } catch (error) {
        console.error(error);

        if (error.code === "auth/email-already-in-use") {
            alert("Этот email уже используется");
        } else if (error.code === "auth/invalid-email") {
            alert("Некорректный email");
        } else if (error.code === "auth/weak-password") {
            alert("Слишком слабый пароль");
        } else {
            alert("Ошибка: " + error.message);
        }
    }
};

async function loadUsers() {
    const tbody = document.querySelector(".table tbody");

    try {
        const snapshot = await db.ref("admins").get();
        const data = snapshot.val();

        tbody.innerHTML = "";

        if (!data) return;

        Object.entries(data).forEach(([uid, user]) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${user.name || ""}</td>
                <td>${user.email || ""}</td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
    }
}
