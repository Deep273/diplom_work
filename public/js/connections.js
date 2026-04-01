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

// ---------------------- Rules ----------------------
const connectionRules = {
    server: {
        subordinate: ["workstation"],
        dependency: ["workstation"],
        gateway: ["workstation", "network"]
    },
    workstation: {
        subordinate: ["server"],
        dependency: ["server"],
        gateway: ["server", "network"]
    },
    network: {
        subordinate: ["server", "workstation"],
        dependency: ["server", "workstation"],
        gateway: ["server", "workstation", "network"]
    }
};

// ---------------------- Cache ----------------------
const devicesCache = {};

// ---------------------- Устройства ----------------------
async function loadDevices() {
    const groups = ['workstations', 'network', 'servers'];

    for (const group of groups) {
        const snapshot = await db.ref(group).get();

        snapshot.forEach(deviceSnap => {
            const device = deviceSnap.val();
            device.id = deviceSnap.key;

            if (group === "servers") device.type = "server";
            if (group === "workstations") device.type = "workstation";
            if (group === "network") device.type = "network";

            devicesCache[device.id] = device;
        });
    }
    updateDevicesCount();
}

function populateDeviceSelects() {
    const sourceSelect = document.getElementById("sourceDevice");
    const targetSelect = document.getElementById("targetDevice");

    sourceSelect.innerHTML = "";
    targetSelect.innerHTML = "";

    Object.values(devicesCache).forEach(device => {
        const option1 = new Option(device.name, device.id);
        const option2 = new Option(device.name, device.id);

        sourceSelect.add(option1);
        targetSelect.add(option2);
    });
}

// ---------------------- Фильтры ----------------------
function filterTargetDevices() {
    const sourceId = document.getElementById("sourceDevice").value;
    const type = document.getElementById("connectionType").value;
    const targetSelect = document.getElementById("targetDevice");

    const source = devicesCache[sourceId];
    if (!source || !type) return;

    targetSelect.innerHTML = "";

    const allowedTargets = connectionRules[source.type]?.[type] || [];

    Object.values(devicesCache).forEach(device => {
        if (
            device.id !== sourceId &&
            allowedTargets.includes(device.type)
        ) {
            const option = new Option(device.name, device.id);
            targetSelect.add(option);
        }
    });
}

function filterConnections() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const typeFilter = document.getElementById("typeFilter").value;

    const rows = document.querySelectorAll(".table tbody tr");

    rows.forEach(row => {
        const source = row.children[0].textContent.toLowerCase();
        const target = row.children[2].textContent.toLowerCase();

        let visible = true;

        if (search) {
            visible = source.includes(search) || target.includes(search);
        }

        if (typeFilter) {
            visible = visible && (row.dataset.type === typeFilter);
        }

        row.style.display = visible ? "" : "none";
    });
}

// ---------------------- Связи ----------------------
async function loadConnections() {
    const tbody = document.querySelector(".table tbody");
    tbody.innerHTML = "";

    const snapshot = await db.ref("connections").get();

    let count = 0;

    snapshot.forEach(snap => {
        addConnectionRow(snap.val());
        count++;
    });

    updateConnectionsCount(count);
    filterConnections();
}

function addConnectionRow(conn) {
    const tbody = document.querySelector(".table tbody");

    const tr = document.createElement("tr");

    tr.dataset.type = conn.type;
    tr.innerHTML = `
        <td>${conn.sourceName}</td>
        <td>${translateConnectionType(conn.type)}</td>
        <td>${conn.targetName}</td>
        <td>
            <button class="btn btn-small btn-light" onclick="deleteConnection('${conn.id}')">
                 ${getText('modal.delete')}
            </button>
        </td>
    `;
    applyTranslations(localStorage.getItem('language') || 'ru');

    tbody.appendChild(tr);
}


// ---------------------- Сохранение и валидация связей ----------------------
window.saveConnection = async (e) => {
    e.preventDefault();

    const sourceId = document.getElementById("sourceDevice").value;
    const targetId = document.getElementById("targetDevice").value;
    const type = document.getElementById("connectionType").value;

    const source = devicesCache[sourceId];
    const target = devicesCache[targetId];

    if (!source || !target) {
        alert("Выберите устройства");
        return;
    }


    const snapshot = await db.ref("connections").get();

    let exists = false;

    snapshot.forEach(snap => {
        const conn = snap.val();

        if (
            (conn.sourceId === sourceId && conn.targetId === targetId) ||
            (conn.sourceId === targetId && conn.targetId === sourceId)
        ) {
            exists = true;
        }
    });

    if (exists) {
        alert("Такая связь уже существует");
        return;
    }

    //

    //Проверка логики
    const allowedTargets = connectionRules[source.type]?.[type];

    if (!allowedTargets) {
        alert("Неверный тип связи");
        return;
    }

    if (!allowedTargets.includes(target.type)) {
        alert("Эта связь запрещена для выбранного типа");
        return;
    }

    if (sourceId === targetId) {
        alert("Нельзя подключить устройство к самому себе");
        return;
    }

    const ref = db.ref("connections").push();

    const data = {
        id: ref.key,
        sourceId,
        sourceName: source.name,
        sourceType: source.type,
        targetId,
        targetName: target.name,
        targetType: target.type,
        type
    };

    await ref.set(data);

    addConnectionRow(data);
    drawNetwork();
    closeConnectionModal();
};

// ---------------------- Граф----------------------
let networkInstance = null;

function drawNetwork() {
    const nodes = [];
    const edges = [];

    const addedNodes = new Set();

    //  добавляем узлы
    Object.values(devicesCache).forEach(device => {
        let color = "#4CAF50";

        if (device.type === "server") color = "#2196F3";
        if (device.type === "workstation") color = "#FF9800";
        if (device.type === "network") color = "#9C27B0";

        nodes.push({
            id: device.id,
            label: device.name,
            group: device.type,
            color: {
                background: color,
                border: "#222"
            }
        });
    });

    // добавляем связи
    db.ref("connections").once("value", snapshot => {
        snapshot.forEach(snap => {
            const conn = snap.val();

            edges.push({
                from: conn.sourceId,
                to: conn.targetId,
                label: translateConnectionType(conn.type),
                arrows: "to"
            });
        });

        renderNetwork(nodes, edges);
    });
}

function renderNetwork(nodes, edges) {
    const container = document.getElementById("networkGraph");

    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    const options = {
        nodes: {
            shape: "dot",
            size: 18,
            font: {
                size: 14
            }
        },
        edges: {
            font: {
                size: 12,
                align: "top"
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.8 }
            },
            smooth: {
                type: "dynamic"
            }
        },
        physics: {
            stabilization: false
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            navigationButtons: true
        }
    };

    if (networkInstance) {
        networkInstance.destroy();
    }

    networkInstance = new vis.Network(container, data, options);
}
// ---------------------- Счетчики ----------------------
function updateConnectionsCount(count) {
    const el = document.getElementById("connectionsCount");

    if (el) {
        el.textContent = count;
    }
}

function updateDevicesCount() {
    const count = Object.keys(devicesCache).length;
    const el = document.getElementById("devicesCount");

    if (el) {
        el.textContent = count;
    }
}

// ---------------------- Смена языка ----------------------
function getText(key) {
    const lang = localStorage.getItem('language') || 'ru';
    return window.translations?.[lang]?.[key] || key;
}

function translateConnectionType(type) {
    const map = {
        subordinate: 'connections.type.subordinate',
        dependency: 'connections.type.dependency',
        gateway: 'connections.type.gateway',
    };

    const key = map[type];
    return key ? getText(key) : type;
}


// ---------------------- Действия ----------------------
window.deleteConnection = async (id) => {
    await db.ref("connections/" + id).remove();

    drawNetwork();
    await loadConnections();
};

window.openAddConnectionModal = () => {
    document.getElementById("addConnectionModal").classList.add("active");
    filterTargetDevices();
};

document.addEventListener("DOMContentLoaded", async () => {
    await loadDevices();
    populateDeviceSelects();
    await loadConnections();

    drawNetwork();

    document.getElementById("sourceDevice")
        .addEventListener("change", filterTargetDevices);

    document.getElementById("connectionType")
        .addEventListener("change", filterTargetDevices);
});

window.closeConnectionModal = () => {
    document.getElementById("addConnectionModal").classList.remove("active");
};

document.getElementById("searchInput")
    .addEventListener("input", filterConnections);

document.getElementById("typeFilter")
    .addEventListener("change", filterConnections);

