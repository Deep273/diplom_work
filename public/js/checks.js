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

// ---------------------- Глобальные переменные ----------------------
const checksCache = {};
let editingCheck = null;
let formMode = "create";

const devicesCache = {
    workstations: {},
    network: {},
    servers: {}
};

// ---------------------- Вспомогательные функции ----------------------
function formatDateDisplay(isoString) {
    if (!isoString || isoString === "-") return "-";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("ru-RU", { hour12: false });
}

function getStatusClass(result) {
    switch(result) {
        case "Успешно": return "status-ok";
        case "Предупреждение": return "status-warning";
        case "Ошибка": return "status-error";
        case "В процессе": return "status-pending";
        default: return "status-unknown";
    }
}

// ---------------------- Работа с таблицей ----------------------
function addCheckRow(check) {
    const tbody = document.getElementById("checksTableBody");
    const tr = document.createElement("tr");
    const lastRunDisplay = formatDateDisplay(check.lastRun);

    tr.innerHTML = `
        <td><strong>${check.name}</strong></td>
        <td>${check.description}</td>
        <td>${check.target}</td>
        <td class="muted">${lastRunDisplay || "-"}</td>
        <td><span class="status-pill ${getStatusClass(check.result)}">${check.result || "Не запускалась"}</span></td>
        <td>
            <div class="btn-group">
                <button class="btn btn-small btn-light" onclick="openCheckModal('${check.id}')">Настроить</button>
                <button class="btn btn-small btn-primary" onclick="runCheck('${check.id}')">Запустить</button>
            </div>
        </td>
    `;

    tbody.appendChild(tr);
}

function updateCheckRowStatus(id, result, statusClass, lastRunDisplay = null) {
    const tbody = document.getElementById("checksTableBody");
    const rows = tbody.querySelectorAll("tr");

    rows.forEach(row => {
        const btn = row.querySelector(`button[onclick="openCheckModal('${id}')"]`);
        if (btn) {
            // Обновляем статус
            const statusCell = row.cells[4];
            statusCell.innerHTML = `<span class="status-pill ${statusClass}">${result}</span>`;

            // Обновляем последний запуск
            if (lastRunDisplay) {
                row.cells[3].textContent = lastRunDisplay;
            }
        }
    });
}

// ---------------------- Работа с устройствами ----------------------
function populateDevices() {
    const container = document.getElementById("checkDeviceList");
    const target = document.getElementById("checkTarget").value;
    container.innerHTML = "";

    if (target === "Одно устройство" || target === "Серверы") {
        const select = document.createElement("select");
        select.id = "checkDevice";

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Выберите устройство";
        select.appendChild(placeholder);

        let groupsToShow = target === "Одно устройство" ? ['workstations', 'network'] : ['servers'];

        groupsToShow.forEach(groupName => {
            Object.values(devicesCache[groupName] || {}).forEach(device => {
                const option = document.createElement("option");
                option.value = device.id;
                option.textContent = device.name;
                select.appendChild(option);
            });
        });

        container.appendChild(select);
    }

    if (target === "Группа устройств") {
        const devices = [
            ...Object.values(devicesCache['workstations'] || {}),
            ...Object.values(devicesCache['network'] || {})
        ];

        devices.forEach(device => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.style.cursor = "pointer";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = device.id;
            checkbox.name = "devices";

            label.appendChild(checkbox);
            label.append(" " + device.name);

            container.appendChild(label);
        });
    }
}

function updateTargetFields() {
    const deviceField = document.getElementById("deviceField");
    const target = document.getElementById("checkTarget").value;

    if (formMode !== "edit") {
        deviceField.style.display = "none";
        document.getElementById("checkDeviceList").innerHTML = "";
        return;
    }


    if (["Одно устройство", "Серверы", "Группа устройств"].includes(target)) {
        deviceField.style.display = "block";
        populateDevices();

        if (editingCheck) {
            const selected = checksCache[editingCheck]?.selectedDevice;

            if (target === "Группа устройств" && Array.isArray(selected)) {
                const checkboxes = document.querySelectorAll("input[name='devices']");
                checkboxes.forEach(cb => { cb.checked = selected.includes(cb.value); });
            }

            if ((target === "Одно устройство" || target === "Серверы") && selected) {
                const select = document.getElementById("checkDevice");
                if (select) select.value = selected;
            }
        }
    }
}

// ---------------------- Модальные окна ----------------------
window.openAddCheckModal = async () => {
    formMode = "create";
    editingCheck = null;

    const modal = document.getElementById("checkModal");
    modal.classList.add("active");
    document.getElementById("checkModalTitle").textContent = "Добавить проверку";

    document.getElementById("checkName").value = "";
    document.getElementById("checkDescription").value = "";
    document.getElementById("checkTarget").value = "Одно устройство";
    document.getElementById("checkDeviceList").innerHTML = "";
    document.getElementById("deviceField").style.display = "none";
    toggleAdvanced(false);
};

window.openCheckModal = async (id) => {
    formMode = "edit";
    const check = checksCache[id];
    editingCheck = id;

    const modal = document.getElementById("checkModal");
    modal.classList.add("active");
    document.getElementById("checkModalTitle").textContent = "Настройка проверки";

    document.getElementById("checkName").value = check.name;
    document.getElementById("checkDescription").value = check.description;
    document.getElementById("checkTarget").value = check.target;

    await loadDevicesForChecks();
    populateDevices();

    if (check.target === "Одно устройство" || check.target === "Серверы") {
        document.getElementById("checkDevice").value = check.selectedDevice;
    }

    updateTargetFields();
};

window.closeCheckModal = () => {
    document.getElementById('checkModal').classList.remove('active');
};

// ---------------------- Добавление / редактирование проверки ----------------------
window.addCheck = async () => {
    const name = document.getElementById("checkName").value.trim();
    const description = document.getElementById("checkDescription").value.trim();
    const target = document.getElementById("checkTarget").value;

    let selectedDevice = null;
    if (target === "Группа устройств") {
        selectedDevice = Array.from(document.querySelectorAll("input[name='devices']:checked"))
            .map(cb => cb.value);
    } else {
        const select = document.getElementById("checkDevice");
        selectedDevice = select ? select.value : null;
    }

    if (!name) {
        alert("Введите название проверки");
        return;
    }

    if (formMode === "create") {
        const checkRef = db.ref("checks").push();
        const data = {
            id: checkRef.key,
            name,
            description,
            target,
            lastRun: "-",
            result: "Не запускалась",
            selectedDevice: selectedDevice
        };
        await checkRef.set(data);
        checksCache[data.id] = data;
        addCheckRow(data);

    } else if (formMode === "edit" && editingCheck) {
        const checkRef = db.ref("checks/" + editingCheck);

        const updatedData = {
            ...checksCache[editingCheck],
            name,
            description,
            target,
            selectedDevice: selectedDevice
        };

        await checkRef.set(updatedData);
        checksCache[editingCheck] = updatedData;

        // обновляем таблицу
        const tbody = document.getElementById("checksTableBody");
        tbody.innerHTML = "";
        Object.values(checksCache).forEach(addCheckRow);
    }

    closeCheckModal();
};

// ---------------------- Фильтры ----------------------
function filterChecks() {
    const query = document.getElementById("checkSearch").value.toLowerCase();
    const statusFilter = document.getElementById("checkStatusFilter").value;
    const tbody = document.getElementById("checksTableBody");
    tbody.innerHTML = "";

    Object.values(checksCache)
        .filter(check => check.name.toLowerCase().includes(query) &&
            (statusFilter === "all" || check.result === statusFilter))
        .forEach(addCheckRow);
}


// ---------------------- Run Check ----------------------
window.runCheck = async (id) => {
    const check = checksCache[id];
    if (!check) return;

    updateCheckRowStatus(id, "В процессе", "status-pending");

    try {
        const result = await new Promise(resolve => {
            setTimeout(() => {
                const outcomes = ["Успешно", "Предупреждение", "Ошибка"];
                resolve(outcomes[Math.floor(Math.random() * outcomes.length)]);
            }, 2000);
        });

        const now = new Date();
        const nowISO = now.toISOString();
        const nowDisplay = formatDateDisplay(nowISO);

        await db.ref("checks/" + id).update({ result, lastRun: nowISO });

        checksCache[id].result = result;
        checksCache[id].lastRun = nowISO;

        updateCheckRowStatus(id, result, getStatusClass(result), nowDisplay);
        updateCheckCounters();

    } catch (err) {
        console.error("Ошибка проверки:", err);
        updateCheckRowStatus(id, "Ошибка", "status-error");
        updateCheckCounters();
    }
};

// ---------------------- Счетчики ----------------------
function updateCheckCounters() {
    let success = 0, warning = 0, error = 0;
    const now = new Date();
    const cutoff = new Date(now.getTime() - 24*60*60*1000);

    Object.values(checksCache).forEach(check => {
        if (!check.lastRun || check.lastRun === "-") return;
        const lastRunDate = new Date(check.lastRun);
        if (isNaN(lastRunDate.getTime())) return;

        if (lastRunDate >= cutoff) {
            switch(check.result) {
                case "Успешно": success++; break;
                case "Предупреждение": warning++; break;
                case "Ошибка": error++; break;
            }
        }
    });

    const card = document.querySelector(".cards .card");
    if (card) {
        const values = card.querySelectorAll(".card-value");
        if(values.length >= 2) {
            values[0].textContent = error;
            values[1].textContent = warning;
        }

        const statusPill = card.querySelector(".status-pill.status-ok");
        if(statusPill) statusPill.textContent = success + "/" + Object.keys(checksCache).length;
    }
}

// ---------------------- Загрузка данных ----------------------
async function loadChecks() {
    const snapshot = await db.ref("checks").get();

    snapshot.forEach(checkSnap => {
        const check = checkSnap.val();
        check.id = checkSnap.key;
        checksCache[check.id] = check;
        addCheckRow(check);
    });

    updateCheckCounters();
}

async function loadDevicesForChecks() {
    const groups = ['workstations', 'network', 'servers'];

    for (const group of groups) {
        const snapshot = await db.ref(group).get();
        devicesCache[group] = {};

        snapshot.forEach(deviceSnap => {
            const device = deviceSnap.val();
            device.id = deviceSnap.key;
            devicesCache[group][device.id] = device;
        });
    }
}

// ---------------------- UI ----------------------
function toggleAdvanced(show) {
    ["intervalField","timeoutField","activeField"].forEach(id => {
        document.getElementById(id).style.display = show ? "block" : "none";
    });
}

// ---------------------- Привязка событий ----------------------
document.addEventListener("DOMContentLoaded", () => {
    const checkTarget = document.getElementById("checkTarget");
    if (checkTarget) checkTarget.addEventListener("change", updateTargetFields);

    const searchInput = document.getElementById("checkSearch");
    if (searchInput) searchInput.addEventListener("input", filterChecks);

    const statusFilter = document.getElementById("checkStatusFilter");
    if (statusFilter) statusFilter.addEventListener("change", filterChecks);
});

// ---------------------- Инициализация ----------------------
loadChecks();

