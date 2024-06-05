// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
}

let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
});

  // Send our earthquakes layer to the createMap function/
createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

  // Create a baseMaps object.
let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
};

  // Create an overlay object to hold our overlay.
let overlayMaps = {
    Earthquakes: earthquakes
};

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
    center: [
    37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
});


//var marker = L.marker([51.5, -0.09]).addTo(map);
// Create a circle, and pass in some initial options.
    let circles = L.circle([37.09, -95.71], {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 500
}).addTo(myMap);


//specify which ranges will correspond with the gradient




  // Create a layer control.
  // Pass in our baseMaps and overlayMaps.
  // Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, circles, {
    collapsed: false
}).addTo(myMap);

}
