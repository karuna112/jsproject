const map = L.map('map').setView([20, 0], 2);

// Base Maps (Physical, Political, Dark)
const baseLayers = {
  "Carto Light (Political)": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map),

  "Carto Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB',
    subdomains: 'abcd'
  }),

  "OpenTopoMap (Physical)": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap'
  })
};

// Layer Groups
const g20Layer = L.layerGroup();
const riverLayer = L.layerGroup();
const mountainLayer = L.layerGroup();
const humanGeoLayer = L.layerGroup();

// Add Layer Control
L.control.layers(baseLayers, {
  "🌐 G20 Countries": g20Layer,
  "🗻 Mountains": mountainLayer,
  "🌊 Rivers": riverLayer,
  "🏙️ Human Geography": humanGeoLayer
}).addTo(map);

// Load GeoJSON data
function loadLayer(layer, url, popupField) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: (feature, layerEl) => {
          if (feature.properties && feature.properties[popupField]) {
            layerEl.bindPopup(feature.properties[popupField]);
          }
        },
        style: {
          color: '#3388ff',
          weight: 1
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, { radius: 5, fillColor: 'red', fillOpacity: 0.6 });
        }
      }).addTo(layer);
    });
}

// Load each layer
loadLayer(g20Layer, 'data/g20.geojson', 'name');
loadLayer(riverLayer, 'data/rivers.geojson', 'name');
loadLayer(mountainLayer, 'data/mountains.geojson', 'name');
loadLayer(humanGeoLayer, 'data/population_centers.geojson', 'name');
