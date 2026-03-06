<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Дашборд</title>
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item nav-item-section active">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
            <a href="{{ route('login') }}" class="nav-item btn-logout">Выход</a>
        </div>
    </aside>

    <main class="main">
        <header class="main-header">
            <h1 class="page-title">Дашборд</h1>
            <div class="header-meta">Обновлено: сейчас</div>
        </header>

        <section class="page-content">
            <div class="cards">
                <div class="card">
                    <div class="card-title">Количество устройств</div>
                    <div class="card-value">128</div>
                    <div class="card-subtitle">Всего устройств в системе</div>
                    <div style="margin-top: 14px;">
                        <a href="{{ route('devices') }}" class="btn btn-small btn-light">Подробнее</a>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Ошибки</div>
                    <div class="card-value">
                        <span class="status-pill status-warn">12 за 24 часа</span>
                    </div>
                    <div class="card-subtitle">Критические и предупреждения</div>
                    <div style="margin-top: 14px;">
                        <a href="{{ route('checks') }}" class="btn btn-small btn-light">Подробнее</a>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Подключенные / отключенные</div>
                    <div class="card-value">
                        <span class="status-pill status-ok">96 онлайн</span>
                        <span class="status-pill status-bad">32 офлайн</span>
                    </div>
                    <div class="card-subtitle">Текущий статус устройств</div>
                    <div style="margin-top: 14px;">
                        <a href="{{ route('devices') }}" class="btn btn-small btn-light">Подробнее</a>
                    </div>
                </div>
            </div>

            <!-- Графики -->
            <div class="charts-grid">
                <div class="card">
                    <div class="card-title">Подключенные / отключенные устройства</div>
                    <div class="chart-container">
                        <canvas id="pieChart"></canvas>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Активность устройств (за 24ч)</div>
                    <div class="chart-container">
                        <canvas id="activityChart"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>

<style>
    .charts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        margin-top: 22px;
    }

    .chart-container {
        position: relative;
        height: 220px;
        width: 100%;
    }

    .chart-container canvas {
        max-height: 100% !important;
        width: 100% !important;
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Онлайн', 'Офлайн'],
                datasets: [{
                    data: [96, 32],
                    backgroundColor: [
                        '#000160',
                        '#111111'
                    ],
                    borderWidth: 2,
                    borderColor: '#000000'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    }
                }
            }
        });

        // График активности
        const activityCtx = document.getElementById('activityChart').getContext('2d');
        new Chart(activityCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Активные устройства',
                    data: [80, 85, 92, 95, 88, 96],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(31,41,55,0.5)' }
                    },
                    x: { grid: { color: 'rgba(31,41,55,0.5)' } }
                }
            }
        });
    });
</script>
</body>
</html>
