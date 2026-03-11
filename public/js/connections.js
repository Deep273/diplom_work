 function openAddConnectionModal() {
    document.getElementById('addConnectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

    function closeConnectionModal() {
    document.getElementById('addConnectionModal').classList.remove('active');
    document.body.style.overflow = '';
}

    function saveConnection(event) {
    event.preventDefault();

    const connection = {
    source: document.getElementById('sourceDevice').value,
    type: document.getElementById('connectionType').value,
    target: document.getElementById('targetDevice').value,
    timestamp: new Date().toISOString()
};

    fetch('/connections/save', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
},
    body: JSON.stringify(connection)
}).then(res => res.json()).then(data => {
    alert('Связь сохранена в Firebase!');
    closeConnectionModal();
});
}
    const nodes = new vis.DataSet([
    { id: 1, label: 'Core Router 1', group: 'router', color: '#3b82f6' },
    { id: 2, label: 'Switch 7', group: 'switch', color: '#10b981' },
    { id: 3, label: 'Access Point 12', group: 'ap', color: '#f59e0b' },
    { id: 4, label: 'DB-Server-01', group: 'server', color: '#ef4444' }
    ]);

    const edges = new vis.DataSet([
    { from: 1, to: 2, label: 'подчинённое', arrows: 'to' },
    { from: 2, to: 3, label: 'подчинённое', arrows: 'to' },
    { from: 1, to: 4, label: 'зависимость', arrows: 'to' }
    ]);

    const container = document.getElementById('networkGraph');
    const data = { nodes, edges };
    const options = {
    layout: { hierarchical: false },
    physics: { enabled: true },
    nodes: { shape: 'box', font: { size: 14 } },
    edges: { font: { size: 12 } }
};
    new vis.Network(container, data, options);

    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeConnectionModal();
});
