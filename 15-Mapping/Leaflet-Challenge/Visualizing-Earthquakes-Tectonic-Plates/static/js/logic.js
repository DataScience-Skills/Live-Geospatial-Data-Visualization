// Function to create the earthquake features
function createFeatures(earthquakeData) {
    let earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: feature.properties.mag * 5, // Adjust the size based on magnitude
          fillColor: getColor(feature.geometry.coordinates[2]), // Get color based on depth
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      }
    });
  
    // Fetch tectonic plates data using D3
    let tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
    d3.json(tectonicPlatesUrl).then(function (tectonicData) {
      // Create the tectonic plates layer
      let tectonicPlates = L.geoJSON(tectonicData, {
        style: function (feature) {
          return {
            color: "#FF0000", // Red for tectonic plates
            weight: 2
          };
        }
      });
  
      // Create the map and add the earthquake and tectonic plates layers
      createMap(earthquakes, tectonicPlates);
    });
  }
  
  // Update the createMap function to use the new JSON data structure.
  function createMap(earthquakes, tectonicPlates) {
    // Create a tile layer
    let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    });
  
    // Create the map and set its initial view
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetMap, earthquakes, tectonicPlates] // Add tectonicPlates layer to the map
    });
  
    // Add the tile layer, earthquakes layer, and tectonicPlates layer to the map
    let baseMaps = {
      "Street Map": streetMap
    };
  
    let overlayMaps = {
      "Earthquakes": earthquakes,
      "Tectonic Plates": tectonicPlates // Add tectonicPlates to the overlayMaps
    };
  
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
    // Create a legend
    let legend = L.control({ position: "bottomright" });
  
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let labels = ["<strong>Depth</strong>"];
      let categories = ["< 50", "50-100", "> 100"];
      let colors = ["#FFFF00", "#FFA500", "#FF0000"];
  
      for (let i = 0; i < categories.length; i++) {
        div.innerHTML +=
          labels.push(
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i]
          );
      }
      div.innerHTML = labels.join("<br>");
      return div;
    };
  
    legend.addTo(myMap);
  }
  
  // Function to get color based on depth
  function getColor(depth) {
    // Add your color scheme logic here
    // Example color scheme:
    return depth > 100 ? "#FF0000" : // Red for depth > 100
      depth > 50 ? "#FFA500" : // Orange for depth > 50
      "#FFFF00"; // Yellow for depth <= 50
  }
  
  // Store the URL of the earthquake dataset JSON file as our API endpoint
  let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Using the d3 library, perform a GET request using queryURL.
  d3.json(queryUrl).then(function(data) {
    // Call the createFeatures function with the retrieved data
    createFeatures(data);
  });
  