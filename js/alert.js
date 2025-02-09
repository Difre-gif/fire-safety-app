const map = L.map('map').setView([37.7749, -122.4194], 8);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Fire data (sample)
const fireData = [
    { id: 1, title: 'Fire Alert #1', severity: 'high', location: [37.7749, -122.4194] },
    { id: 2, title: 'Fire Alert #2', severity: 'medium', location: [37.7849, -122.4294] },
    { id: 3, title: 'Fire Alert #3', severity: 'low', location: [37.7949, -122.4394] }
];

// Generate alert cards
const alertsContainer = document.getElementById('alerts-container');
fireData.forEach(alert => {
    const card = document.createElement('div');
    card.className = `alert-card severity ${alert.severity}`;
    card.innerHTML = `
        <h3>${alert.title}</h3>
        <p>Severity: <span class="${alert.severity}">${alert.severity.toUpperCase()}</span></p>
    `;
    alertsContainer.appendChild(card);

    // Add markers to map
    const color = alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'orange' : 'yellow';
    L.circle(alert.location, { color, radius: 500 }).addTo(map).bindPopup(alert.title);
});

// Modal functionality
const filterModal = document.getElementById('filter-modal');
document.getElementById('filter-btn').addEventListener('click', () => {
    filterModal.style.display = 'block';
});
document.getElementById('close-modal').addEventListener('click', () => {
    filterModal.style.display = 'none';
});
