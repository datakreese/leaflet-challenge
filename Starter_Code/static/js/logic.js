// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function depthColor(depth) {
      let color = "";
      if (depth < 0) {
        color = "yellow";
      }
      else if (depth < 10) {
        color = "yellowgreen";
      }
      else if (depth < 20) {
        color = "teal";
      }
      else {
        color = "blue";
      }
    return color;}

    function createFeatures(earthquakeData) {
      let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: function (feature, layer) {
          let depth = feature.geometry.coordinates[2];
          layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p>`);
        },
        pointToLayer: function (feature, latlng) {
          let depth = feature.geometry.coordinates[2];
          return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            fillColor: depthColor(depth),
            color: "black",
            weight: .5,
            opacity: 1,
            fillOpacity: 0.8
          });
        }
      });
    
      createMap(earthquakes);
    }
    
    function createMap(earthquakes) {
      let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
      });

// Add the grayscale tile layer to the map
      
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


      street.addTo(myMap);
      earthquakes.addTo(myMap);
    }
    

// Adding the legend to the map
    // Perform a GET request to the query URL.
    d3.json(queryUrl).then(function (data) {
      createFeatures(data.features);
    });
// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     let depth = feature.geometry.coordinates[2];
// }

// // Loop through the earthquake data to create circle markers
// earthquakeData.forEach(function (earthquake) {
//   let depth = earthquake.geometry.coordinates[2];
//   L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
//       radius: earthquake.properties.mag * 5,
//       fillColor: depthColor(depth),
//       color: "black",
//       weight: 1,
//       opacity: 1,
//       fillOpacity: 0.8
//   }).bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>${new Date(earthquake.properties.time)}</p><p>Magnitude: ${earthquake.properties.mag}</p>`).addTo(myMap);
// });

// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function (data) {
//   createFeatures(data.features);
//   });
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load.
//       let myMap = L.map("map", {
//       center: [
//       37.09, -95.71
//       ],
//       zoom: 5,
//   });

// let earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
// });

//   // Send our earthquakes layer to the createMap function/
// createMap(earthquakes);
// }

// function createMap(earthquakes) {

//   // Create the base layers.
// let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

//   // Create a baseMaps object.
// let baseMaps = {
//     "Topographic Map": topo
// };

//   // Create an overlay object to hold our overlay.
// let overlayMaps = {
//     Earthquakes: earthquakes
// };

//   // Create a layer control.
//   // Pass in our baseMaps and overlayMaps.
//   // Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);
// }}