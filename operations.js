// Load stored data
let stations = JSON.parse(localStorage.getItem('stations')) || {};
let commodityTypes = JSON.parse(localStorage.getItem('commodityTypes')) || [];

// Function to add a new commodity type
function addCommodityType() {
    const newType = document.getElementById('newCommodityType').value.trim();
    if (newType && !commodityTypes.includes(newType)) {
        commodityTypes.push(newType);
        localStorage.setItem('commodityTypes', JSON.stringify(commodityTypes));
        document.getElementById('newCommodityType').value = '';
    }
}

// Function to add a new station
function addStation() {
    const stationName = document.getElementById('stationName').value.trim();
    const lat = parseFloat(document.getElementById('stationLat').value);
    const lon = parseFloat(document.getElementById('stationLon').value);
    if (stationName && !isNaN(lat) && !isNaN(lon)) {
        stations[stationName] = { lat, lon, commodities: {} };
        localStorage.setItem('stations', JSON.stringify(stations));
        updateStationList();
    }
}

// Function to update commodity quantity
function updateQuantity() {
    const stationName = document.getElementById('stationSelect').value.trim();
    const commodity = document.getElementById('commoditySelect').value.trim();
    const quantity = parseInt(document.getElementById('commodityQuantity').value);
    if (stationName && commodity && !isNaN(quantity)) {
        if (!stations[stationName].commodities) stations[stationName].commodities = {};
        stations[stationName].commodities[commodity] = (stations[stationName].commodities[commodity] || 0) + quantity;
        localStorage.setItem('stations', JSON.stringify(stations));
        updateStationList();
    }
}

// Function to update station list display
function updateStationList() {
    const stationList = document.getElementById('stationList');
    stationList.innerHTML = '';
    Object.keys(stations).forEach(stationName => {
        const station = stations[stationName];
        const stationDiv = document.createElement('div');
        stationDiv.className = 'station-box';
        stationDiv.innerHTML = `<h3>${stationName}</h3><p>Latitude: ${station.lat}, Longitude: ${station.lon}</p>`;
        
        const commodities = station.commodities || {};
        for (const commodity in commodities) {
            const quantity = commodities[commodity];
            const commodityDiv = document.createElement('div');
            commodityDiv.className = 'commodity-box';
            commodityDiv.innerHTML = `${commodity}: ${quantity}`;
            stationDiv.appendChild(commodityDiv);
        }
        
        stationList.appendChild(stationDiv);
    });
}

// Initial load of station list
document.addEventListener("DOMContentLoaded", updateStationList);
