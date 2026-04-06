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

// ---------------------- Модальные окна ----------------------
window.openAddModal = () => {

    const modal = document.getElementById('addModal');
    const form = document.getElementById('addDeviceForm');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    form.reset();
    form.onsubmit = saveDevice;

    const title = document.querySelector('#addModal .modal-title');
    title.setAttribute('data-i18n', 'devices.add');
    applyTranslations(localStorage.getItem('language') || 'ru');
    const btn = document.querySelector('#addDeviceForm button[type="submit"]');
    btn.setAttribute('data-i18n', 'devices.add');

    applyTranslations(localStorage.getItem('language') || 'ru');
};

window.closeModal = () => {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
};

// ---------------------- Навигация ----------------------
window.showGroup = (groupId, element) => {
    document.querySelectorAll('.device-group').forEach(g => g.classList.remove('active'));
    document.getElementById(groupId)?.classList.add('active');

    document.querySelectorAll('.nav-item-sub').forEach(i => i.classList.remove('active'));
    element?.classList.add('active');
};

// ---------------------- Кэш устройств ----------------------
const devicesCache = {
    workstations: {},
    network: {},
    servers: {}
};

// ---------------------- Работа с устройствами ----------------------
window.addDeviceRow = (groupId, deviceData) => {
    devicesCache[groupId][deviceData.id] = deviceData;

    const tbody = document.querySelector(`#${groupId} tbody`);
    if (!tbody) return;

    const statusText = translateStatus(deviceData.status);
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', deviceData.id);
    tr.innerHTML = `
        <td><strong>${deviceData.name}</strong></td>
        <td>${deviceData.ip}<br><span class="muted">${deviceData.domain || ''}</span></td>
        <td>
           <span class="status-pill status-ok" data-status="${deviceData.status}">
           ${statusText}
           </span>
        </td>
        <td class="muted">${deviceData.lastPing ? new Date(deviceData.lastPing).toLocaleTimeString() : '-'}</td>
        <td class="muted">${deviceData.location || '-'}</td>
        <td style="display:none;">${deviceData.id}</td>
        <td>
            <button class="btn btn-small btn-light" data-i18n="devices.detail" onclick="openDetailModal('${groupId}', '${deviceData.id}')">Подробнее</button>
            <button class="btn btn-small btn-danger" data-i18n="devices.archive" onclick="archiveDevice('${groupId}', '${deviceData.id}', this)">Архивировать</button>
            <button class="btn btn-small btn-warning" data-i18n="devices.edit" onclick="editDevice('${groupId}', '${deviceData.id}')">Редактировать</button>
        </td>
    `;
    tbody.appendChild(tr);
    applyTranslations(localStorage.getItem('language') || 'ru');
};

window.openDetailModal = (groupId, deviceId) => {
    const device = devicesCache[groupId][deviceId];
    if (!device) return;

    document.getElementById('detailTitle').textContent = device.name;

    const container = document.getElementById('deviceDetails');

    container.innerHTML = `
        <div><strong>ID:</strong> ${device.id}</div>
        <div><strong>IP:</strong> ${device.ip}</div>
        <div><strong><span data-i18n="devices.domain"></span>:</strong> ${device.domain || '-'}</div>
        <div><strong><span data-i18n="devices.model"></span>:</strong> ${device.model || '-'}</div>
        <div><strong><span data-i18n="devices.table.location"></span>:</strong> ${device.location || '-'}</div>
        <div><strong><span data-i18n="devices.table.status"></span>:</strong> ${device.status || '-'}</div>
        <div><strong><span data-i18n="devices.table.ping"></span>:</strong> ${
        device.lastPing ? new Date(device.lastPing).toLocaleString() : '-'
        }</div>
    `;
    applyTranslations(localStorage.getItem('language') || 'ru');

    document.getElementById('detailModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ---------------------- Сохранение устройства ----------------------
window.saveDevice = async (event) => {
    event.preventDefault();

    const type = document.getElementById('deviceType').value;
    const name = document.getElementById('deviceName').value.trim();
    const ip = document.getElementById('deviceIp').value.trim();
    const domain = document.getElementById('deviceDomain').value.trim();
    const location = document.getElementById('deviceLocation').value.trim();
    const model = document.getElementById('deviceModel')?.value?.trim() || '';

    if (!name || !ip) return alert(translateAlert("message.invalidNameOrIP"));

    const groupKey = document.getElementById('deviceType').value;

    const newDeviceRef = db.ref(groupKey).push();
    const deviceData = {
        id: newDeviceRef.key,
        name, ip, domain, location, model,
        status: 'online',
        lastPing: new Date().toISOString()
    };

    try {
        await newDeviceRef.set(deviceData);
        addDeviceRow(groupKey, deviceData);
        applyTranslations(localStorage.getItem('language') || 'ru');
        updateCounters();
        closeModal();
        ['deviceName','deviceIp','deviceDomain','deviceLocation','deviceModel'].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).value = '';
        });
        alert(translateAlert("message.createDevice"));
    }  catch (err) {
    console.error("ОШИБКА:", err);
    alert(translateAlert("message.invalidCreateDevice"));
}
};

// ---------------------- Архивирование устройства ----------------------
window.archiveDevice = async (groupId, deviceId, btn) => {
    if (!confirm(translateAlert("message.wantArchiveDevice"))) return;

    try {
        const deviceRef = db.ref(`${groupId}/${deviceId}`);
        const snapshot = await deviceRef.once('value');
        const deviceData = snapshot.val();

        if (!deviceData) return;

        // 1. Сохраняем в архив
        await db.ref(`archive/${groupId}/${deviceId}`).set({
            ...deviceData,
            archivedAt: Date.now()
        });

        // 2. Удаляем из активных
        await deviceRef.remove();

        // 3. UI
        btn.closest('tr').remove();
        delete devicesCache[groupId][deviceId];
        updateCounters();

        alert(translateAlert("message.archiveDevice"));
    } catch (err) {
        console.error(err);
        alert(translateAlert("message.invalidArchiveDevice"));
    }
};

// ---------------------- Редактирование устройства ----------------------
window.editDevice = (groupId, deviceId) => {
    const title = document.querySelector('#addModal .modal-title');
    title.setAttribute('data-i18n', 'devices.edit.title');
    applyTranslations(localStorage.getItem('language') || 'ru');
    const device = devicesCache[groupId][deviceId];
    if (!device) return;

    document.getElementById('addModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('deviceType').value = groupId;
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceIp').value = device.ip;
    document.getElementById('deviceDomain').value = device.domain || '';
    document.getElementById('deviceLocation').value = device.location || '';
    document.getElementById('deviceModel').value = device.model || '';

    const form = document.getElementById('addDeviceForm');
    form.onsubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('deviceName').value.trim();
        const type = document.getElementById('deviceType').value;
        const ip = document.getElementById('deviceIp').value.trim();
        const domain = document.getElementById('deviceDomain').value.trim();
        const location = document.getElementById('deviceLocation').value.trim();
        const model = document.getElementById('deviceModel').value.trim();
        const currentDevice = devicesCache[groupId][deviceId];

        if (!name || !ip) return alert(translateAlert("message.invalidNameOrIP"));

        const updatedData = {
            name,
            ip,
            domain,
            location,
            model,
            status: currentDevice?.status ?? 'online',
            lastPing: new Date().toISOString()
        };

        const newGroup = type;

        try {

            if (newGroup !== groupId) {
                await db.ref(`${newGroup}/${deviceId}`).set({
                    ...updatedData,
                    id: deviceId
                });
                await db.ref(`${groupId}/${deviceId}`).remove();
                const tr = document.querySelector(`#${groupId} tbody tr[data-id="${deviceId}"]`);
                if (tr) tr.remove();
                delete devicesCache[groupId][deviceId];
                addDeviceRow(newGroup, {
                    ...updatedData,
                    id: deviceId
                });

            } else {
                await db.ref(`${groupId}/${deviceId}`).update(updatedData);
                Object.assign(devicesCache[groupId][deviceId], updatedData);
                const tbody = document.querySelector(`#${groupId} tbody`);
                const tr = Array.from(tbody.querySelectorAll('tr'))
                    .find(r => r.querySelector('td:nth-child(6)').innerText === deviceId);

                if (tr) {
                    tr.querySelector('td:nth-child(1) strong').innerText = name;
                    tr.querySelector('td:nth-child(2)').innerHTML =
                        `${ip}<br><span class="muted">${domain || ''}</span>`;
                    tr.querySelector('td:nth-child(4)').innerText = new Date().toLocaleTimeString();
                    tr.querySelector('td:nth-child(5)').innerText = location || '-';
                }
            }

            applyTranslations(localStorage.getItem('language') || 'ru');
            updateCounters();
            closeModal();
            alert(translateAlert("message.updateDevice"));

        } catch (err) {
            console.error(err);
            alert(translateAlert("message.invalidUpdateDevice"));
        }
    };

    const btn = document.querySelector('#addDeviceForm button[type="submit"]');

    btn.setAttribute('data-i18n', 'devices.save');
    applyTranslations(localStorage.getItem('language') || 'ru');
};

window.updateCounters = () => {
    const groups = ['workstations', 'network', 'servers'];
    groups.forEach(groupId => {
        const tbody = document.querySelector(`#${groupId} tbody`);
        const rows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
        const total = rows.length;
        const lang = localStorage.getItem('language') || 'ru';
        const t = {
            ru: {
                devices: 'устройств',
                online: 'Онлайн',
                offline: 'Офлайн',
                critical: 'Критичных',
                noneCritical: 'Критичных нет',
                warnings: 'Предупреждений',
                noneWarnings: 'Предупреждений нет'
            },
            en: {
                devices: 'devices',
                online: 'Online',
                offline: 'Offline',
                critical: 'Critical',
                noneCritical: 'No critical issues',
                warnings: 'Warnings',
                noneWarnings: 'No warnings'
            }
        }

        let online = 0, offline = 0, warn = 0;
        rows.forEach(row => {
            const status = row.querySelector('.status-pill')?.dataset.status;
            if (status === 'online') online++;
            else if (status === 'offline') offline++;
            else if (status === 'warn') warn++;
        });

        const tr = t[lang];
        const groupCountEl = document.querySelector(`#${groupId} .group-count`);
        if (groupCountEl) {
            groupCountEl.textContent = `${total} ${tr.devices}`;
        }

        const cardMap = {
            workstations: [
                0,
                `${tr.online}: ${online} · ${tr.offline}: ${offline}`
            ],
            network: [
                1,
                warn ? `${tr.critical}: ${warn}` : tr.noneCritical
            ],
            servers: [
                2,
                warn ? `${tr.warnings}: ${warn}` : tr.noneWarnings
            ]
        };

        const [cardIndex, subtitle] = cardMap[groupId];
        const cardValueEl = document.querySelector(`.cards .card:nth-child(${cardIndex+1}) .card-value`);
        const cardSubtitleEl = document.querySelector(`.cards .card:nth-child(${cardIndex+1}) .card-subtitle`);
        if (cardValueEl) cardValueEl.textContent = total;
        if (cardSubtitleEl) cardSubtitleEl.textContent = subtitle;
    });
};

// ---------------------- Загрузка устройств ----------------------
window.loadDevices = async () => {
    const groups = ['workstations', 'network', 'servers'];
    for (const group of groups) {
        const snapshot = await db.ref(group).get();
        snapshot.forEach(deviceSnap => {
            const deviceData = deviceSnap.val();
            deviceData.id = deviceSnap.key;
            addDeviceRow(group, deviceData);
        });
    }
    updateCounters();
};

// ---------------------- Фильтры ----------------------
const statusSelect = document.querySelector('.filters select');
const searchInput = document.querySelector('.filters input');

const filterDevices = () => {
    const textFilter = searchInput.value.toLowerCase().trim();
    const statusFilter = statusSelect.value;

    ['workstations', 'network', 'servers'].forEach(groupId => {
        const tbody = document.querySelector(`#${groupId} tbody`);
        if (!tbody) return;

        tbody.querySelectorAll('tr').forEach(row => {
            const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const domain = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const statusEl = row.querySelector('.status-pill');

            const status = statusEl?.dataset.status;

            const matchesText = name.includes(textFilter) || domain.includes(textFilter);
            const matchesStatus = (statusFilter === 'all' || status === statusFilter);

            row.style.display = (matchesText && matchesStatus) ? '' : 'none';
        });
    });
};

searchInput?.addEventListener('input', filterDevices);
statusSelect?.addEventListener('change', filterDevices);

// ---------------------- Экспорт таблицы ----------------------
window.exportTable = () => {

    const activeGroup = document.querySelector('.device-group.active');
    if (!activeGroup) return alert(translateAlert("message.invalidExportGroup"));

    const groupId = activeGroup.id;

    const groupNames = {
        workstations: "Рабочие_станции",
        network: "Сетевые_устройства",
        servers: "Серверы"
    };

    const table = activeGroup.querySelector("table");
    if (!table) return alert(translateAlert("message.invalidExportTable"));

    const rows = table.querySelectorAll("tbody tr");
    if (!rows.length) return alert(translateAlert("message.invalidExportTable"));

    const data = [];

    rows.forEach(row => {

        if (row.style.display === 'none') return;

        const cols = row.querySelectorAll("td");

        data.push({
            "ID": cols[5].innerText.trim(),
            "Название": cols[0].innerText.trim(),
            "IP / Домен": cols[1].innerText.trim(),
            "Статус": cols[2].innerText.trim(),
            "Последний ping": cols[3].innerText.trim(),
            "Локация": cols[4].innerText.trim()
        });

    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    // ширина колонок
    worksheet['!cols'] = [
        { wch: 18 }, // ID
        { wch: 28 }, // Название
        { wch: 30 }, // IP
        { wch: 15 }, // Статус
        { wch: 22 }, // ping
        { wch: 25 }  // локация
    ];

    // автофильтр
    worksheet['!autofilter'] = { ref: "A1:F1" };

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Устройства");

    XLSX.writeFile(workbook, `${groupNames[groupId]}.xlsx`);

};

// ---------------------- Переводы ----------------------
const statusTranslations = {
    ru: {
        online: 'Онлайн',
        offline: 'Офлайн',
        warn: 'Предупреждение'
    },
    en: {
        online: 'Online',
        offline: 'Offline',
        warn: 'Warning'
    }
};

function translateStatus(statusKey) {
    const lang = localStorage.getItem('language') || 'ru';

    return statusTranslations[lang]?.[statusKey] || statusKey;
}

// ---------------------- Инициализация ----------------------
loadDevices();
