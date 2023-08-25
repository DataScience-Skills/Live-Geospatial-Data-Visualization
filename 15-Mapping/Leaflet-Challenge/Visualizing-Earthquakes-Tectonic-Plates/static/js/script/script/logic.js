// Store the URL of the earthquake dataset JSON file as our API endpoint
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Using the d3 library, perform a GET request using queryURL.
d3.json(queryUrl).then(function(data) {
    // Call the createFeatures function with the retrieved data
    createFeatures(data);
});

// Function createFeatures() extracts required features from the JSON file to plot earthquakes on the map
function createFeatures(earthquakeData) {
  // Create a GeoJSON layer and customize the markers
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 5, // Adjust the size based on magnitude
        fillColor: feature.geometry.coordinates[2] > 90
          ? "#800026" // Maroon for depth > 90 km
          : feature.geometry.coordinates[2] > 70
          ? "#e31a1c" // Red for depth > 70 km
          : feature.geometry.coordinates[2] > 50
          ? "#fd8d3c" // Red-Orange for depth > 50 km
          : feature.geometry.coordinates[2] > 30
          ? "#feb24c" // Orange for depth > 30 km
          : feature.geometry.coordinates[2] > 10
          ? "#fed976" // Yellow for depth > 10 km
          : "#ffeda0", // Pale Yellow for depth <= 10 km
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    // Function onEachFeature() adds popup with earthquake information
    onEachFeature: function (feature, layer) {
      // Create a popup with earthquake information
      let popupContent = `
        <h3>${feature.properties.place}</h3>
        <hr>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${feature.geometry.coordinates[2]} km</p>
        <p>Date: ${new Date(feature.properties.time)}</p>
      `;
      layer.bindPopup(popupContent);
    }
  });

  // Fetch tectonic plates data using D3
  let tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  d3.json(tectonicPlatesUrl).then(function (tectonicData) {
    // Create the tectonic plates layer
    let tectonicPlates = L.geoJSON(tectonicData, {
      style: function (feature) {
        return {
          color: "#00FF00", // Green for tectonic plates
          weight: 2,
        };
      },
    });

    // Create tile layers
    // Add OpenStreetMaps tile layer
    let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    });

    // Add Outdoors Map tile layer
    let outdoorsMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
    });

    // Create the map and set its initial view
    let myMap = L.map("map2", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetMap, earthquakes, tectonicPlates] // Add tectonicPlates layer to the map
    });

    // Add the tile layers and earthquakes layer to the map
    let baseMaps = {
      "Street Map": streetMap,
      "Outdoors Map": outdoorsMap // Add the Outdoors layer as a baseMaps option
    };

    let overlayMaps = {
      "Earthquakes": earthquakes,
      "Tectonic Plates": tectonicPlates // Add tectonicPlates to the overlayMaps
    };

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);


    // Function to get color based on depth
    function getColor(depth) {
      return depth > 90
        ? "#800026" // Maroon for depth > 90 km
        : depth > 70
        ? "#e31a1c" // Red for depth > 70 km
        : depth > 50
        ? "#fd8d3c" // Red-Orange for depth > 50 km
        : depth > 30
        ? "#feb24c" // Orange for depth > 30 km
        : depth > 10
        ? "#fed976" // Yellow for depth > 10 km
        : "#ffeda0"; // Pale Yellow for depth <= 10 km
    }

    // Custom legend
    let legend = L.control({ position: "bottomleft" });

    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "info legend");
      let categories = [0, 10, 30, 50, 70, 90];
      let labels = [];

      // loop through the categories and generate a label with a colored square for each category
      for (let i = 0; i < categories.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(categories[i] + 1) + '"></i> ' +
          categories[i] + (categories[i + 1] ? '&ndash;' + (categories[i + 1] - 1) + ' km<br>' : '+ km');
      }

      return div;
    };

    legend.addTo(myMap);
  });
}