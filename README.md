
# Earthquake Visualization with Leaflet


## Background

The United States Geological Survey (USGS) plays a critical role in providing scientific data about natural hazards, ecosystem health, environmental conditions, and climate and land-use changes. To better educate the public and government organizations on global issues, the USGS seeks to visualize their vast amount of earthquake data. They need a meaningful way to display this data and enhance public awareness and understanding of our planet's challenges.

## Goals

The primary goal of this project is to develop a web-based visualization tool using Leaflet to display earthquake data from the USGS. By visualizing this data, the aim is to:

1. Provide an interactive map that plots earthquake events based on their longitude and latitude.
2. Use markers with sizes corresponding to earthquake magnitudes and colors reflecting earthquake depths to enhance the visual representation.
3. Enable popups to display additional information about each earthquake when a marker is clicked.
4. Create a legend to provide context for the map data, allowing users to understand the earthquake magnitude and depth variations.

Additionally, a second dataset is plotted on the map to illustrate the relationship between tectonic plates and seismic activity. This dataset will be fetched from https://githubusercontent.com/fraxen/tectonicplates.

## Tools and Skills Used

Throughout this project, the following tools were utilized:

1. [Leaflet](https://leafletjs.com/examples/quick-start/): A JavaScript library for creating interactive maps, which is used to plot earthquake data and tectonic plates on the map.
2. [HTML](https://www.w3schools.com/html/): Used to structure the webpage and create the necessary elements for the map and data visualization.
3. [CSS](https://www.w3schools.com/css/): Styled the webpage and map elements to provide an attractive and user-friendly interface.
4. [JavaScript](https://www.w3schools.com/js/): Utilized to fetch earthquake and tectonic plates data, manipulate the data, and create the map with interactive features.
5. [D3.js](https://d3js.org/): A JavaScript library for data manipulation, which enabled us to fetch and process JSON data.

## Results

### Part 1: Create the Earthquake Visualization

These steps were used to visualize the earthquake dataset from the USGS:

1. Obtained the earthquake data in JSON format from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page, which is updated every 5 minutes.
2. Used Leaflet to create an interactive map that plots all earthquakes based on their longitude and latitude.
3. Implemented data markers with sizes corresponding to earthquake magnitudes and colors reflecting earthquake depths.
4. Included popups to provide additional information about each earthquake when a marker is clicked.
5. Created a legend to provide context for the map data, displaying earthquake magnitude and depth variations.

### Part 2: Add the Tectonic Plates Layer to Earthquake Visualization

The steps required to add tectonic plates data on the map alongside the earthquake data include:

1. Fetched tectonic plates data from this [GeoJSON URL](https://github.com/fraxen/tectonicplates/tree/master/GeoJSON) using D3.js.
2. Plotted the tectonic plates dataset on the map in addition to the earthquakes.
3. Added other base maps as choices to provide users with different visualizations.
4. Organized each dataset into separate overlays that can be turned on and off independently.
5. Implemented layer controls to allow users to toggle between earthquake and tectonic plates data on the map.

## Conclusion

The earthquake data from the USGS has been successfully visualized using Leaflet. The interactive map displays earthquake events with markers sized according to magnitude and colored based on depth. Additionally, popups offer more information about each earthquake, and a legend provides context for the map data. In addition to the earthquakes data, tectonic plates data is plotted on the map alongside the earthquakes and a layer controls is offered to enable users to explore both datasets independently.

Thia visualization will assist the USGS in better educating the public and government organizations about the critical issues facing our planet. Tools like this one, we hope, contribute to greater awareness, understanding, and support for initiatives related to natural hazards and environmental conservation.

LICENSE
© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.