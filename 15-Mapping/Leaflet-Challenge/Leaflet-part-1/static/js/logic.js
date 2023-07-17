// Store the URL of the earthquake datasete JSON file as our API endpoint
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Using the d3 library, perform a GET request using queryURL.
d3.json(queryUrl).then(function(data) {
    // Call the createFeatures function with the retrieved data
    createFeatures(data);
    /* Alternative line focusing on only the features, not the metadata or type data
    createFeatures(data.features);
    */
  });
  
// Function createFeatures() extracts required features from the JSON file to plot earthquakes on the map
function createFeatures(earthquakeData) {
    // Create a GeoJSON layer and customize the markers
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
    // Function onEachFeature() adds popup with earthquake information
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
    });
    // let earthquakes = L.geoJSON(earthquakeData.features, {
    //   onEachFeature: onEachFeature
    // });
  
    // Create the map and add the GeoJSON layer
    createMap(earthquakes);
  }
  
// Update the createMap function to use the new JSON data structure.// Function to create the map
function createMap(earthquakes) {
    // Create a tile layer
    let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    });
  
    // Create the map and set its initial view
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetMap, earthquakes]
    });
  
    // Add the tile layer and earthquakes layer to the map
    let baseMaps = {
      "Street Map": streetMap
    };
  
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  }
  
  // Function to get color based on depth
  function getColor(depth) {
    // Add your color scheme logic here
    // Example color scheme:
    return depth > 100 ? "#FF0000" : // Red for depth > 100
      depth > 50 ? "#FFA500" : // Orange for depth > 50
      "#FFFF00"; // Yellow for depth <= 50
  }

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
