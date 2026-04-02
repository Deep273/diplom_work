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

// ---------------------- Инициализация ----------------------
document.addEventListener('DOMContentLoaded', async () => {

    const stats = await updateDashboardStats();

    // собираем все устройства для графика
    const allDevices = [];

    const groups = ['workstations', 'network', 'servers'];

    for (const group of groups) {
        const snapshot = await db.ref(group).get();
        snapshot.forEach(child => {
            allDevices.push(child.val());
        });
    }

    const activityData = buildActivityData(allDevices);

    initCharts(stats.online, stats.offline, activityData);
});

// ---------------------- Статистика ----------------------
async function updateDashboardStats() {
    const groups = ['workstations', 'network', 'servers'];
    const dashboardTranslations = {
        ru: {
            online: 'онлайн',
            offline: 'офлайн',
            last24: 'за 24 часа'
        },
        en: {
            online: 'online',
            offline: 'offline',
            last24: 'last 24 hours'
        }
    };

    let total = 0;
    let online = 0;
    let offline = 0;
    let warnings = 0;

    for (const group of groups) {
        const snapshot = await db.ref(group).get();

        snapshot.forEach(child => {
            const device = child.val();
            total++;

            if (device.status === 'online') online++;
            else if (device.status === 'offline') offline++;
            else if (device.status === 'war') warnings++;
        });
    }

    const lang = localStorage.getItem('language') || 'ru';
    const t = dashboardTranslations[lang];

    // карточка "Количество устройств"
    document.querySelectorAll('.card-value')[0].textContent = total;

    // карточка "Ошибки"
    const errorCard = document.querySelectorAll('.card-value')[1];
    errorCard.innerHTML = `
        <span class="status-pill status-warn">${warnings} ${t.last24}</span>
    `;

    // карточка "Онлайн / Офлайн"
    document.querySelectorAll('.card-value')[2].innerHTML = `
        <span class="status-pill status-ok">${online} ${t.online}</span>
        <span class="status-pill status-bad">${offline} ${t.offline}</span>
    `;

    return { total, online, offline, warnings };
}

// ---------------------- Графики ----------------------
function buildActivityData(devices) {
    const hours = [0, 4, 8, 12, 16, 20];
    const counts = [0, 0, 0, 0, 0, 0];

    devices.forEach(device => {
        if (!device.lastPing) return;

        const date = new Date(device.lastPing);
        const hour = date.getHours();

        if (hour < 4) counts[0]++;
        else if (hour < 8) counts[1]++;
        else if (hour < 12) counts[2]++;
        else if (hour < 16) counts[3]++;
        else if (hour < 20) counts[4]++;
        else counts[5]++;
    });

    return counts;
}

let pieChart;
let activityChart;

function initCharts(online, offline, activityData) {
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const chartTranslations = {
        ru: {
            online: 'Онлайн',
            offline: 'Офлайн',
            activity: 'Активность'
        },
        en: {
            online: 'Online',
            offline: 'Offline',
            activity: 'Activity'
        }
    };
    const lang = localStorage.getItem('language') || 'ru';
    const t = chartTranslations[lang];

    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: [t.online, t.offline],
            datasets: [{
                data: [online, offline],
                backgroundColor: ['#000160', '#111111'],
                borderColor: '#000000',
                borderWidth: 2
            }]
        }
    });

    const activityCtx = document.getElementById('activityChart').getContext('2d');

    activityChart = new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: t.activity,
                data: activityData,
                borderColor: '#3b82f6',
                tension: 0.4,
                fill: true
            }]
        }
    });
}
