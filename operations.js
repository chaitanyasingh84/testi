// Load data from localStorage
let stations = JSON.parse(localStorage.getItem('stations')) || {};
let commodityTypes = JSON.parse(localStorage.getItem('commodityTypes')) || [];

// Function to save stations
function saveStations() {
    localStorage.setItem('stations', JSON.stringify(stations));
}

// Function to save commodity types
function saveCommodityTypes() {
    localStorage.setItem('commodityTypes', JSON.stringify(commodityTypes));
}

// Function to add a new commodity type
function addCommodityType() {
    const newType = document.getElementById('newCommodityType').value;
    if (newType && !commodityTypes.includes(newType)) {
        commodityTypes.push(newType);
        saveCommodityTypes();
        updateCommoditySelect();
        document.getElementById('newCommodityType').value = '';
    }
}

// Function to add a new station
function addStation() {
    const name = document.getElementById('stationName').value;
    const lat = parseFloat(document.getElementById('stationLat').value);
    const lon = parseFloat(document.getElementById('stationLon').value);

    if (name && !isNaN(lat) && !isNaN(lon)) {
        stations[name] = { lat, lon, commodities: {} };
        saveStations();
        updateStationSelect();
        renderStationBlocks();
        document.getElementById('stationName').value = '';
        document.getElementById('stationLat').value = '';
        document.getElementById('stationLon').value = '';
    }
}

// Function to update the quantity of a commodity at a station
function updateQuantity() {
    const stationName = document.getElementById('stationSelect').value;
    const commodity = document.getElementById('commoditySelect').value;
    const quantity = parseInt(document.getElementById('commodityQuantity').value);

    if (stationName && commodity && !isNaN(quantity) && quantity > 0) {
        if (!stations[stationName].commodities[commodity]) {
            stations[stationName].commodities[commodity] = 0;
        }
        stations[stationName].commodities[commodity] += quantity;
        saveStations();
        renderStationBlocks();
        document.getElementById('commodityQuantity').value = '';
    }
}

// Update station dropdown
function updateStationSelect() {
    const stationSelect = document.getElementById('stationSelect');
    stationSelect.innerHTML = '<option value="">Select Station</option>';
    Object.keys(stations).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        stationSelect.appendChild(option);
    });
}

// Update commodity dropdown
function updateCommoditySelect() {
    const commoditySelect = document.getElementById('commoditySelect');
    commoditySelect.innerHTML = '<option value="">Select Commodity</option>';
    commodityTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        commoditySelect.appendChild(option);
    });
}

// Function to render station blocks
function renderStationBlocks() {
    const stationDisplay = document.getElementById('station-display');
    stationDisplay.innerHTML = '';
    Object.keys(stations).forEach(stationName => {
        const station = stations[stationName];
        const stationBlock = document.createElement('div');
        stationBlock.className = 'station-block';

        let commoditiesHtml = '';
        Object.entries(station.commodities).forEach(([commodity, quantity]) => {
            commoditiesHtml += `<div>${commodity}: ${quantity}</div>`;
        });

        stationBlock.innerHTML = `<h3>${stationName}</h3><div>${commoditiesHtml}</div>`;
        stationDisplay.appendChild(stationBlock);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateStationSelect();
    updateCommoditySelect();
    renderStationBlocks();
});
