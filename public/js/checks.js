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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const checksCache = {};
let editingCheck = null;

window.openAddCheckModal = () => {

    editingCheck = null;

    const modal = document.getElementById("checkModal");
    modal.classList.add("active");

    document.getElementById("checkModalTitle").textContent = "Добавить проверку";

    document.getElementById("checkName").value = "";
    document.getElementById("checkDescription").value = "";
    document.getElementById("checkTarget").value = "Одно устройство";
};


// закрыть модалку
window.closeCheckModal = () => {
    document.getElementById('checkModal').classList.remove('active');
};


// добавление строки
function addCheckRow(check) {

    const tbody = document.getElementById("checksTableBody");

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><strong>${check.name}</strong></td>
        <td>${check.description}</td>
        <td>${check.target}</td>
        <td class="muted">${check.lastRun || "-"}</td>
        <td><span class="status-pill status-ok">${check.result || "Не запускалась"}</span></td>
        <td>
            <div class="btn-group">
                <button class="btn btn-small btn-light" onclick="openCheckModal('${check.id}')">Настроить</button>
                <button class="btn btn-small btn-primary" onclick="runCheck('${check.id}')">Запустить</button>
            </div>
        </td>
    `;

    tbody.appendChild(tr);
}

// добавление проверки
window.addCheck = async () => {

    const name = document.getElementById("checkName").value.trim();
    const description = document.getElementById("checkDescription").value.trim();
    const target = document.getElementById("checkTarget").value;

    if (!name) {
        alert("Введите название проверки");
        return;
    }

    const checkRef = db.ref("checks").push();

    const data = {
        id: checkRef.key,
        name: name,
        description: description,
        target: target,
        lastRun: "-",
        result: "Не запускалась"
    };

    await checkRef.set(data);

    checksCache[data.id] = data;

    addCheckRow(data);

    closeCheckModal();


}

async function loadChecks() {

    const snapshot = await db.ref("checks").get();

    snapshot.forEach(checkSnap => {

        const check = checkSnap.val();
        check.id = checkSnap.key;

        checksCache[check.id] = check;

        addCheckRow(check);
    });

}

loadChecks();



