// Data storage (loaded from localStorage if available)
let stations = JSON.parse(localStorage.getItem('stations')) || {};

// Initialize map
document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for stations with commodities
    Object.keys(stations).forEach(stationName => {
        const station = stations[stationName];
        const totalQuantity = Object.values(station.commodities || {}).reduce((acc, qty) => acc + qty, 0);
        
        // Only add marker if the station has commodities
        if (totalQuantity > 0) {
            const marker = L.marker([station.lat, station.lon])
                .addTo(map)
                .bindPopup(`<strong>${stationName}</strong><br>Total Commodities: ${totalQuantity}`);
        }
    });
});
