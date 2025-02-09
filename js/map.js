// Initialize the map
var map = L.map('fireMap').setView([51.505, -0.09], 13); // Default center and zoom level

// Set up the map tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Mock Fire Alerts Data
var mockAlerts = [
    {
        lat: 51.505,
        lon: -0.09,
        location: 'Central Park',
        severity: 'High',
        time: '2025-01-12 14:30'
    },
    {
        lat: 51.515,
        lon: -0.1,
        location: 'Greenwich Park',
        severity: 'Medium',
        time: '2025-01-12 15:00'
    },
    {
        lat: 51.525,
        lon: -0.11,
        location: 'Hyde Park',
        severity: 'Low',
        time: '2025-01-12 16:00'
    }
];

// Define Geofenced Areas
var geofences = [
    { center: [51.505, -0.09], radius: 2000, name: 'Central Geofence' }, // 2km radius
    { center: [51.515, -0.1], radius: 1500, name: 'Greenwich Geofence' } // 1.5km radius
];

// Function to calculate distance between two points (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // Earth's radius in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

// Function to update the map with mock fire alerts
function updateMap(alerts) {
    // Clear existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });

    // Draw geofences on the map
    geofences.forEach(geofence => {
        L.circle(geofence.center, {
            color: 'blue',
            fillColor: '#3388ff',
            fillOpacity: 0.2,
            radius: geofence.radius
        }).addTo(map).bindPopup(`<b>Geofence:</b> ${geofence.name}`);
    });

    // Add new markers based on alerts
    alerts.forEach(alert => {
        var markerColor;
        var isInGeofence = false;

        // Check if the alert is within any geofence
        geofences.forEach(geofence => {
            var distance = getDistance(alert.lat, alert.lon, geofence.center[0], geofence.center[1]);
            if (distance <= geofence.radius) {
                isInGeofence = true;
            }
        });

        // Determine the color based on severity and geofence status
        if (alert.severity === 'High') {
            markerColor = isInGeofence ? 'purple' : 'red'; // Highlight if in geofence
        } else if (alert.severity === 'Medium') {
            markerColor = isInGeofence ? 'yellow' : 'orange';
        } else {
            markerColor = isInGeofence ? 'blue' : 'green';
        }

        // Create and add a circle marker for the alert
        var marker = L.circleMarker([alert.lat, alert.lon], {
            color: markerColor,
            radius: 10,
            fillOpacity: 0.7
        }).addTo(map);

        // Add a popup with alert information
        marker.bindPopup(`
            <b>Location:</b> ${alert.location} <br>
            <b>Severity:</b> ${alert.severity} <br>
            <b>Time:</b> ${alert.time} <br>
            <b>In Geofence:</b> ${isInGeofence ? 'Yes' : 'No'}
        `);
    });
}

// Function to update the alerts list on the page
function updateAlertsList(alerts) {
    var alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '<h3>Active Fire Alerts</h3>'; // Reset the list

    alerts.forEach(alert => {
        var isInGeofence = geofences.some(geofence => {
            return getDistance(alert.lat, alert.lon, geofence.center[0], geofence.center[1]) <= geofence.radius;
        });

        var alertDiv = document.createElement('div');
        alertDiv.classList.add('alert');
        alertDiv.innerHTML = `
            <div class="icon">
                <i class="fas fa-fire" style="color: ${alert.severity === 'High' ? 'red' : alert.severity === 'Medium' ? 'orange' : 'green'};"></i>
            </div>
            <div class="details">
                <strong>Location:</strong> ${alert.location} | <strong>Severity:</strong> ${alert.severity} <br>
                <strong>In Geofence:</strong> ${isInGeofence ? 'Yes' : 'No'}
            </div>
            <div class="time">${alert.time}</div>
        `;
        alertsList.appendChild(alertDiv);
    });
}

// Initial data fetch with mock alerts
updateMap(mockAlerts);
updateAlertsList(mockAlerts);
