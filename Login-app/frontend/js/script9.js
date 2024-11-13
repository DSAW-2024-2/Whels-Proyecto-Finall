// URLs de las APIs de TransMilenio y SITP
const transMilenioApiUrl = 'https://gis.transmilenio.gov.co/arcgis/rest/services/Troncal/consulta_estaciones_troncales/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
const sitpApiUrl = 'https://gis.transmilenio.gov.co/arcgis/rest/services/SITP/consulta_paradas_sitp/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

// Coordenadas específicas para cada ruta y un radio de búsqueda ajustado
const routeCoordinates = {
    "Universidad La Sabana": { x: -74.0419, y: 4.7255, radius: 0.05 },
    "Boyacá": { x: -74.1194, y: 4.6979, radius: 0.05 },
    "Novena": { x: -74.0712, y: 4.6364, radius: 0.05 },
    "Portal": { x: -74.1417, y: 4.6492, radius: 0.05 }, //corregir
    "Séptima": { x: -74.0622, y: 4.6450, radius: 0.05 },
    "Suba": { x: -74.0905, y: 4.7312, radius: 0.05 },
    "Autopista": { x: -74.0724, y: 4.7002, radius: 0.05 }
};

// Función para cargar estaciones basadas en la API de TransMilenio y, si es necesario, usar la API de SITP como respaldo
async function loadStations(routeName) {
    try {
        console.log(`Cargando estaciones/paradas para la ruta: ${routeName}`);
        
        // Intentamos cargar estaciones desde la API de TransMilenio
        let stations = await fetchStationsFromApi(transMilenioApiUrl, routeName);
        
        // Si no se encontraron estaciones, intentamos con la API de SITP
        if (stations.length === 0) {
            console.warn('No se encontraron estaciones en TransMilenio. Intentando con SITP...');
            stations = await fetchStationsFromApi(sitpApiUrl, routeName, true); // true indica que es de SITP
        }
        
        // Si no se encontraron estaciones en ninguna de las dos APIs
        if (stations.length === 0) {
            alert('No se encontraron estaciones cercanas para esta ruta en TransMilenio ni en SITP.');
            return;
        }
        
        // Llenamos los dropdowns con las estaciones encontradas
        const pickupSelect = document.getElementById('pickup');
        const destinationSelect = document.getElementById('destination');
        
        // Limpiamos las opciones existentes en los selectores
        pickupSelect.innerHTML = '';
        destinationSelect.innerHTML = '';

        stations.forEach(stationName => {
            const option = document.createElement('option');
            option.value = stationName;
            option.textContent = stationName;
            
            // Agregar la opción a ambas listas desplegables
            pickupSelect.appendChild(option.cloneNode(true));
            destinationSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener las estaciones/paradas:', error);
        alert('Hubo un error al obtener las estaciones o paradas. Por favor, inténtelo de nuevo.');
    }
}

// Función para obtener estaciones o paradas de una API específica (TransMilenio o SITP)
async function fetchStationsFromApi(apiUrl, routeName, isSitp = false) {
    const { x, y, radius } = routeCoordinates[routeName];

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.features || data.features.length === 0) {
            console.warn('No se encontraron estaciones en la respuesta de la API');
            return [];
        }
        
        console.log(`Total de estaciones obtenidas de ${isSitp ? 'SITP' : 'TransMilenio'}: ${data.features.length}`);
        
        // Filtrar estaciones/paradas basadas en la proximidad
        const filteredStations = data.features.filter(feature => {
            const stationX = feature.geometry?.x;
            const stationY = feature.geometry?.y;

            if (stationX === undefined || stationY === undefined) {
                console.warn('Estación sin coordenadas válidas:', feature);
                return false;
            }

            const distance = Math.sqrt(Math.pow(stationX - x, 2) + Math.pow(stationY - y, 2));
            return distance <= radius;
        });

        console.log(`Estaciones encontradas después de filtrar para la ruta ${routeName}: ${filteredStations.length}`);

        // Retornar los nombres de las estaciones filtradas
        return filteredStations.map(feature => isSitp ? feature.attributes.nombre_parada : feature.attributes.nombre_estacion);
    } catch (error) {
        console.error(`Error al obtener estaciones de ${isSitp ? 'SITP' : 'TransMilenio'}:`, error);
        return [];
    }
}

// Función para mostrar el formulario de nuevo viaje para la ruta seleccionada
function showNewTripForm(routeName) {
    document.getElementById('route-selection').classList.remove('active');
    document.getElementById('new-trip-form').classList.add('active');
    document.getElementById('selected-route').textContent = routeName;

    // Cargar estaciones específicas de la ruta seleccionada
    loadStations(routeName);
}

// Confirmación antes de crear un nuevo viaje
function confirmNewTrip() {
    document.getElementById('new-trip-form').classList.remove('active');
    document.getElementById('confirm-new-trip').classList.add('active');
}

// Manejo de la creación del viaje basado en la confirmación
function createTrip(confirm) {
    document.getElementById('confirm-new-trip').classList.remove('active');
    document.getElementById('trip-result').classList.add('active');
    document.getElementById('trip-message').textContent = confirm ? 
        "Tu viaje ha sido creado correctamente" : "Lo sentimos, hubo un error con tu solicitud";
}

// Volver a la selección de rutas
function goBackToRoutes() {
    document.getElementById('new-trip-form').classList.remove('active');
    document.getElementById('route-selection').classList.add('active');
}

// Volver a la pantalla de inicio (selección de rutas)
function goToHome() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById('route-selection').classList.add('active');
}
