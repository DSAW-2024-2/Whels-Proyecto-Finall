// Updated Transmilenio API URL with all fields
const apiUrl = 'https://gis.transmilenio.gov.co/arcgis/rest/services/Troncal/consulta_estaciones_troncales/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

// Route-specific coordinates for filtering (example values, adjust as needed)
const routeCoordinates = {
    "Universidad La Sabana": { x: -74.0479, y: 4.8601, radius: 0.01 },
    "Boyacá": { x: -74.1065, y: 4.7101, radius: 0.01 },
    "Novena": { x: -74.0705, y: 4.6545, radius: 0.01 },
    "Portal": { x: -74.1500, y: 4.6637, radius: 0.01 },
    "Séptima": { x: -74.0614, y: 4.6586, radius: 0.01 },
    "Suba": { x: -74.0822, y: 4.7424, radius: 0.01 },
    "Autopista": { x: -74.0588, y: 4.7109, radius: 0.01 }
};

// Function to fetch and filter stations based on route
async function loadStations(routeName) {
    try {
        console.log(`Fetching stations for route: ${routeName}`);
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if we received data from the API
        if (!data.features || data.features.length === 0) {
            console.error('No stations found in the API response');
            alert('No se encontraron estaciones para esta ruta.');
            return;
        }
        
        console.log(`Total stations fetched: ${data.features.length}`);
        console.log('Sample station data:', data.features[0]);  // Log a sample of the station data

        // Get route coordinates and radius for filtering
        const { x, y, radius } = routeCoordinates[routeName];
        
        // Get dropdown elements
        const pickupSelect = document.getElementById('pickup');
        const destinationSelect = document.getElementById('destination');

        // Clear existing options
        pickupSelect.innerHTML = '';
        destinationSelect.innerHTML = '';

        // Filter stations based on proximity to route coordinates
        const filteredStations = data.features.filter(feature => {
            const stationX = feature.attributes.coordenada_x_estacion;
            const stationY = feature.attributes.coordenada_y_estacion;
            const distance = Math.sqrt(Math.pow(stationX - x, 2) + Math.pow(stationY - y, 2));
            return distance <= radius;
        });

        // Check filtered stations count
        console.log(`Stations after filtering for route ${routeName}: ${filteredStations.length}`);
        
        // Populate dropdowns with filtered stations
        if (filteredStations.length === 0) {
            console.warn('No stations found within the specified radius for this route.');
            alert('No se encontraron estaciones cercanas para esta ruta.');
        }

        filteredStations.forEach(feature => {
            const stationName = feature.attributes.nombre_estacion;
            const option = document.createElement('option');
            option.value = stationName;
            option.textContent = stationName;

            // Append to both dropdowns
            pickupSelect.appendChild(option.cloneNode(true));
            destinationSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching stations:', error);
        alert('Hubo un error al obtener las estaciones. Por favor, inténtelo de nuevo.');
    }
}

// Display the new trip form for the selected route
function showNewTripForm(routeName) {
    document.getElementById('route-selection').classList.remove('active');
    document.getElementById('new-trip-form').classList.add('active');
    document.getElementById('selected-route').textContent = routeName;

    // Load stations specific to the selected route
    loadStations(routeName);
}

// Confirm before creating a new trip
function confirmNewTrip() {
    document.getElementById('new-trip-form').classList.remove('active');
    document.getElementById('confirm-new-trip').classList.add('active');
}

// Handle trip creation based on confirmation
function createTrip(confirm) {
    document.getElementById('confirm-new-trip').classList.remove('active');
    document.getElementById('trip-result').classList.add('active');
    document.getElementById('trip-message').textContent = confirm ? 
        "Tu viaje ha sido creado correctamente" : "Lo sentimos, hubo un error con tu solicitud";
}

// Go back to route selection
function goBackToRoutes() {
    document.getElementById('new-trip-form').classList.remove('active');
    document.getElementById('route-selection').classList.add('active');
}

// Go back to home (route selection)
function goToHome() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById('route-selection').classList.add('active');
}
