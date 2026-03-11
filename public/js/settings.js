function saveAccount() {
    const formData = {
        lang: document.getElementById('languageSelect').value,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value
    };
    fetch('/api/settings/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => {
            alert('Сохранено!');
            if (formData.lang !== 'ru') location.reload();
        })
        .catch(error => alert('Ошибка: ' + error));
}
function addUser() {
    alert('Добавить учетку');
}
