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

    // очищаем форму
    form.reset();
    form.onsubmit = saveDevice;
    // меняем текст кнопки
    document.querySelector('#addDeviceForm button[type="submit"]').textContent = 'Добавить устройство';
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

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><strong>${deviceData.name}</strong></td>
        <td>${deviceData.ip}<br><span class="muted">${deviceData.domain || ''}</span></td>
        <td><span class="status-pill status-ok">${deviceData.status || 'Онлайн'}</span></td>
        <td class="muted">${deviceData.lastPing ? new Date(deviceData.lastPing).toLocaleTimeString() : '-'}</td>
        <td class="muted">${deviceData.location || '-'}</td>
        <td style="display:none;">${deviceData.id}</td>
        <td>
            <button class="btn btn-small btn-light" onclick="openDetailModal('${groupId}', '${deviceData.id}')">Подробнее</button>
            <button class="btn btn-small btn-danger" onclick="deleteDevice('${groupId}', '${deviceData.id}', this)">Удалить</button>
            <button class="btn btn-small btn-warning" onclick="editDevice('${groupId}', '${deviceData.id}')">Редактировать</button>
        </td>
    `;
    tbody.appendChild(tr);
};

window.openDetailModal = (groupId, deviceId) => {
    const device = devicesCache[groupId][deviceId];
    if (!device) return;

    const setText = (id, value) => document.getElementById(id).textContent = value || '-';

    setText('detailTitle', device.name);
    setText('detailId', device.id);
    setText('detailIp', device.ip);
    setText('detailDomain', device.domain);
    setText('detailModel', device.model || '-');
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
    const model = document.getElementById('deviceModel')?.value?.trim() || '';

    if (!name || !ip) return alert('Введите хотя бы имя и IP устройства!');

    const groupKey = type === 'Рабочая станция' ? 'workstations' :
        type === 'Сетевое устройство' ? 'network' : 'servers';

    const newDeviceRef = db.ref(groupKey).push();
    const deviceData = {
        id: newDeviceRef.key,
        name, ip, domain, location, model,
        status: 'Онлайн',
        lastPing: new Date().toISOString()
    };

    try {
        await newDeviceRef.set(deviceData);
        addDeviceRow(groupKey, deviceData);
        updateCounters();
        closeModal();
        ['deviceName','deviceIp','deviceDomain','deviceLocation','deviceModel'].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).value = '';
        });
        alert('Устройство успешно добавлено в Firebase!');
    } catch (err) {
        console.error(err);
        alert('Ошибка при добавлении устройства');
    }
};

// ---------------------- Удаление устройства ----------------------
window.deleteDevice = async (groupId, deviceId, btn) => {
    if (!confirm('Вы уверены, что хотите удалить устройство?')) return;
    try {
        await db.ref(`${groupId}/${deviceId}`).remove();
        btn.closest('tr').remove();
        delete devicesCache[groupId][deviceId];
        updateCounters();
        alert('Устройство удалено!');
    } catch (err) {
        console.error(err);
        alert('Ошибка при удалении устройства');
    }
};

// ---------------------- Редактирование устройства ----------------------
window.editDevice = (groupId, deviceId) => {
    const device = devicesCache[groupId][deviceId];
    if (!device) return;

    document.getElementById('addModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('deviceType').value =
        groupId === 'workstations' ? 'Рабочая станция' :
            groupId === 'network' ? 'Сетевое устройство' : 'Сервер';
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceIp').value = device.ip;
    document.getElementById('deviceDomain').value = device.domain || '';
    document.getElementById('deviceLocation').value = device.location || '';
    document.getElementById('deviceModel').value = device.model || '';

    const form = document.getElementById('addDeviceForm');
    form.onsubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('deviceName').value.trim();
        const ip = document.getElementById('deviceIp').value.trim();
        const domain = document.getElementById('deviceDomain').value.trim();
        const location = document.getElementById('deviceLocation').value.trim();
        const model = document.getElementById('deviceModel').value.trim();

        if (!name || !ip) return alert('Введите хотя бы имя и IP устройства!');

        const updatedData = { name, ip, domain, location, model, lastPing: new Date().toISOString() };

        try {
            await db.ref(`${groupId}/${deviceId}`).update(updatedData);
            Object.assign(devicesCache[groupId][deviceId], updatedData);

            // Обновляем строку в таблице
            const tbody = document.querySelector(`#${groupId} tbody`);
            const tr = Array.from(tbody.querySelectorAll('tr')).find(r => r.querySelector('td:nth-child(6)').innerText === deviceId);
            if(tr){
                tr.querySelector('td:nth-child(1) strong').innerText = name;
                tr.querySelector('td:nth-child(2)').innerHTML = `${ip}<br><span class="muted">${domain || ''}</span>`;
                tr.querySelector('td:nth-child(4)').innerText = new Date().toLocaleTimeString();
                tr.querySelector('td:nth-child(5)').innerText = location || '-';
            }

            updateCounters();
            closeModal();
            alert('Устройство успешно обновлено!');
        } catch (err) {
            console.error(err);
            alert('Ошибка при обновлении устройства');
        }
    };

    document.querySelector('#addDeviceForm button[type="submit"]').textContent = 'Сохранить изменения';
};


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
            const status = row.querySelector('td:nth-child(3) .status-pill')?.textContent.trim();

            const matchesText = name.includes(textFilter) || domain.includes(textFilter);
            const matchesStatus = (statusFilter === 'Все статусы' || status === statusFilter);

            row.style.display = (matchesText && matchesStatus) ? '' : 'none';
        });
    });
};

searchInput?.addEventListener('input', filterDevices);
statusSelect?.addEventListener('change', filterDevices);

// ---------------------- Экспорт таблицы ----------------------
window.exportTable = () => {

    const activeGroup = document.querySelector('.device-group.active');
    if (!activeGroup) return alert('Нет активной группы для экспорта!');

    const groupId = activeGroup.id;

    const groupNames = {
        workstations: "Рабочие_станции",
        network: "Сетевые_устройства",
        servers: "Серверы"
    };

    const table = activeGroup.querySelector("table");
    if (!table) return alert('Нет таблицы для экспорта!');

    const rows = table.querySelectorAll("tbody tr");
    if (!rows.length) return alert('Нет данных для экспорта!');

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
// ---------------------- Инициализация ----------------------
loadDevices();
