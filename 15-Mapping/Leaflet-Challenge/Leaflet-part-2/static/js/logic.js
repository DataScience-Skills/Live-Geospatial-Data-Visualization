// Background
    /* The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards,
    the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods
    and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building 
    a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the
    world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to 
    visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding)
    on issues facing our planet. */

// Part 1: Create the Earthquake Visualization
    // 2-BasicMap
        // Your first task is to visualize an earthquake dataset. Complete the following steps:
        // Get your dataset. To do so, follow these steps:
        /* The USGS provides earthquake data in a number of different formats, updated every 5 minutes.
        Visit the [USGS GeoJSON FeedLinks](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and 
        choose a dataset to visualize.*/

    // 3-Data
        /* When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data.
        Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:*/

    // 4-JSON
        // Import and visualize the data by doing the following:
        // Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
        // Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
        // Hint: The depth of the earth can be found as the third coordinate for each earthquake.
        // Include popups that provide additional information about the earthquake when its associated marker is clicked.
        // Create a legend that will provide context for your map data.
        // Your visualization should look something like the preceding map.

// Part 2: Gather and Plot More Data (Optional with no extra points earning)
    /* Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity.
    You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found 
    at [Github Tectonic Plates](https://github.com/fraxen/tectonicplatesLinks).*/
    // This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

// 5-Advanced

    // Perform the following tasks:
    // Plot the tectonic plates dataset on the map in addition to the earthquakes.
    // Add other base maps to choose from.
    // Put each dataset into separate overlays that can be turned on and off independently.
    // Add layer controls to your map.

// Requirements: These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.
    // Map (60 points)
    // TileLayer loads without error (20 points)
    // Connects to geojson API using D3 without error (20 points)
    // Markers with size corresponding to earthquake magnitude (10 points)
    // A legend showing the depth and their corresponding color (10 points)

// Data Points (40 points)
    // Data points scale with magnitude level (10 points)
    // Data points colors change with depth level (10 points)
    // Each point has a tooltip with the Magnitude, the location and depth (10 points)
    // All data points load in the correct locations (10 points)
// Global Variables
let myMap;

// Function to create the map
function createMap(earthquakes, tectonicPlates) {
  // Create a tile layer
  let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  });

  // Create the map and set its initial view
  myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetMap, earthquakes], // Show earthquakes layer by default
  });

  // Add the tile layer and earthquakes layer to the map
  let baseMaps = {
    "Street Map": streetMap
  };

  let overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Fetch tectonic plates data using D3
  let tectonicPlatesUrl = "path/to/PB2002_plates.json";
  d3.json(tectonicPlatesUrl).then(function (tectonicData) {
    // Function to create the tectonic plates layer
    function createTectonicPlatesLayer(tectonicData) {
      // ... (code similar to createFeatures function but tailored for tectonic plates)
    }

    // Call the createTectonicPlatesLayer function with the retrieved data
    createTectonicPlatesLayer(tectonicData);

    // Add tectonic plates layer to overlayMaps
    overlayMaps["Tectonic Plates"] = tectonicPlates;

    // Add layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

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
  });

}

// Function to create the earthquake features
function createFeatures(earthquakeData) {
  // ... (existing code)
}

// Fetch earthquake data using D3
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl).then(function (data) {
  // Call the createFeatures function with the retrieved data
  createFeatures(data);

  // Call the createMap function
  // This should be done after both earthquake and tectonic plates data are loaded
  createMap(earthquakes, tectonicPlates);
});

// Function to add more base maps (optional)
// ...
