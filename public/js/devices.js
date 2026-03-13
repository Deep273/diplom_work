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
    document.getElementById('addModal').classList.add('active');
    document.body.style.overflow = 'hidden';
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
    devicesCache[groupId][deviceData.name] = deviceData;

    const tbody = document.querySelector(`#${groupId} tbody`);
    if (!tbody) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><strong>${deviceData.name}</strong></td>
        <td>${deviceData.ip}<br><span class="muted">${deviceData.domain || ''}</span></td>
        <td><span class="status-pill status-ok">${deviceData.status || 'Онлайн'}</span></td>
        <td class="muted">${deviceData.lastPing ? new Date(deviceData.lastPing).toLocaleTimeString() : '-'}</td>
        <td><button class="btn btn-small btn-light" onclick="openDetailModal('${groupId}', '${deviceData.name}')">Подробнее</button></td>
    `;
    tbody.appendChild(tr);
};

window.openDetailModal = (groupId, deviceName) => {
    const device = devicesCache[groupId][deviceName];
    if (!device) return;

    const setText = (id, value) => document.getElementById(id).textContent = value || '-';

    setText('detailTitle', device.name);
    setText('detailId', device.id);
    setText('detailIp', device.ip);
    setText('detailDomain', device.domain);
    setText('detailModel', device.model);
    setText('detailLocation', device.location);
    setText('detailStatus', device.status);
    setText('detailLastOnline', device.lastPing ? new Date(device.lastPing).toLocaleString() : '-');
    setText('detailConnections', device.connections || '0 подчинённых');

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

    if (!name || !ip) return alert('Введите хотя бы имя и IP устройства!');

    const groupKey = type === 'Рабочая станция' ? 'workstations' :
        type === 'Сетевое устройство' ? 'network' : 'servers';

    const newDeviceRef = db.ref(groupKey).push();
    const deviceData = { name, ip, domain, location, status: 'Онлайн', lastPing: new Date().toISOString() };

    try {
        await newDeviceRef.set(deviceData);
        addDeviceRow(groupKey, deviceData);
        updateCounters();
        closeModal();
        ['deviceName','deviceIp','deviceDomain','deviceLocation'].forEach(id => document.getElementById(id).value = '');
        alert('Устройство успешно добавлено в Firebase!');
    } catch (err) {
        console.error(err);
        alert('Ошибка при добавлении устройства');
    }
};
document.getElementById('addDeviceForm').addEventListener('submit', saveDevice);

// ---------------------- Обновление счетчиков ----------------------
window.updateCounters = () => {
    const groups = ['workstations', 'network', 'servers'];
    groups.forEach(groupId => {
        const tbody = document.querySelector(`#${groupId} tbody`);
        const rows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
        const total = rows.length;

        let online = 0, offline = 0, warn = 0;
        rows.forEach(row => {
            const status = row.querySelector('td:nth-child(3) .status-pill')?.textContent.trim();
            if (status === 'Онлайн') online++;
            else if (status === 'Офлайн') offline++;
            else if (status === 'Предупреждение') warn++;
        });

        const groupCountEl = document.querySelector(`#${groupId} .group-count`);
        if (groupCountEl) groupCountEl.textContent = `${total} устройств`;

        const cardMap = {
            workstations: [0, `Онлайн: ${online} · Офлайн: ${offline}`],
            network: [1, warn ? `Критичных: ${warn}` : 'Критичных нет'],
            servers: [2, warn ? `Предупреждений: ${warn}` : 'Предупреждений нет']
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
        snapshot.forEach(deviceSnap => addDeviceRow(group, deviceSnap.val()));
    }
    updateCounters();
};

// ---------------------- Фильтры ----------------------
const statusSelect = document.querySelector('.filters select');
const searchInput = document.querySelector('.filters input');

const filterDevices = () => {
    const textFilter = searchInput.value.toLowerCase().trim();
    const statusFilter = statusSelect.value;
    const groups = ['workstations', 'network', 'servers'];

    groups.forEach(groupId => {
        const tbody = document.querySelector(`#${groupId} tbody`);
        if (!tbody) return;
        tbody.querySelectorAll('tr').forEach(row => {
            const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const domain = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const status = row.querySelector('td:nth-child(3) .status-pill')?.textContent.trim();
            row.style.display = (name.includes(textFilter) || domain.includes(textFilter)) &&
            (statusFilter === 'Все статусы' || status === statusFilter)
                ? '' : 'none';
        });
    });
};

searchInput?.addEventListener('input', filterDevices);
statusSelect?.addEventListener('change', filterDevices);

// ---------------------- Инициализация ----------------------
loadDevices();
