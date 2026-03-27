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
