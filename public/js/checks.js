    function openCheckModal(checkType) {
    const titles = {
    'ping': 'Ping - Настройки',
    'port': 'Проверка порта - Настройки',
    'http': 'HTTP тест - Настройки',
    'disk': 'Дисковое пространство - Настройки',
    null: 'Новая проверка'
};

    document.getElementById('checkModalTitle').textContent = titles[checkType] || titles.null;
    document.getElementById('checkModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

    function runCheck(checkType) {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Запуск...';
    btn.disabled = true;

    setTimeout(() => {
    const result = 'Успешно (12ms)';
    fetch('{{ route("checks.run") }}', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': '{{ csrf_token() }}'
},
    body: JSON.stringify({
    checkType: checkType,
    result: result
})
})
    .then(response => response.json())
    .then(data => {
    if (data.status === 'success') {
    btn.textContent = 'Готово!';
} else {
    btn.textContent = 'Ошибка!';
    console.error(data.message);
}
})
    .catch(err => {
    btn.textContent = 'Ошибка!';
    console.error(err);
})
    .finally(() => {
    setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
}, 1500);
});

}, 2000);
}

    function closeCheckModal() {
    document.getElementById('checkModal').classList.remove('active');
    document.body.style.overflow = '';
}

    function saveCheckSettings() {
    alert('Настройки сохранены!');
    closeCheckModal();
}

    function runCheckNow() {
    alert('Проверка запущена!');
    closeCheckModal();
}
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCheckModal();
});
