// Create a map object
let myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
});

// add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// API URL
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

function chooseColor(depth) {
    if (depth >= 90) return "red";
    else if (depth >= 70) return "darkorange";
    else if (depth >= 50) return "orange";
    else if (depth >= 30) return "yellow";
    else if (depth >= 10) return "lime";
    else return "green";
  }

// Use the URL of this JSON to pull in the data for the visualization.
// d3.json(queryUrl).then(function(response) {
//     console.log(response);
//     L.geoJson(response, {
//             style: function(feature) {
//                 return{
//                     color: "white",
//                     fillColor: chooseColor(feature.geometry.coordinates[2]),
//                     fillOpacity: 0.5,
//                     weight: 1.5

//                 };
//         },

//         onEachFeature: function(feature, layer) {
//             layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//             return L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{radius: feature.properties.mag});
//         }
//     }).addTo(myMap);
// });


////// TEST ///////
d3.json(queryUrl).then(function(response) {
    console.log(response);
    L.geoJson(response, {
        pointToLayer: (feature,latlng) => {
            return new L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], feature.properties.mag*10000);
        },
        style: function(feature) {
            return{
                color: "black",
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.55,
                weight:.4
                };
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
            
        }
    }).addTo(myMap);

    // Creating legend
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        div.innerHTML = [
            "<h3>EarthquakeDepth</h3>",
            "<p class='lt10' >-10-10</p>",
            "<p class='lt30' >10-30</p>",
            "<p class='lt50' >30-50</p>",
            "<p class='lt70' >50-70</p>",
            "<p class='lt90' >70-90</p>",
            "<p class='gt90' >90+</p>"
        ].join("");

        return div;
    };
    // Add Legend to the Map
    legend.addTo(myMap);

});



//////// TEST ///////
// d3.json(queryUrl).then(function(response) {
//     console.log(response);
//     createFeatures(response.features);
// });

// function createFeatures(earthquakeData) {
//     function onEachFeature(feature,layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }

//     let earthquakes = L.geoJson(earthquakeData, {
//         onEachFeature: onEachFeature
//     });

//     createMap(earthquakes);
// }

// function createMap(earthquakes) {
//     let myMap = L.map("map", {
//         center: [37.0902, -95.7129],
//         zoom: 5,
//         layers: street
//     });
    
//     let overlayMaps = {
//         Earthquakes: earthquakes
//     };

// }




// Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

    // Your data markers should reflect the magnitude of the earthquake by their size and 
    // the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, 
    // and earthquakes with greater depth should appear darker in color.

    // Hint: The depth of the earth can be found as the third coordinate for each earthquake.

    // Include popups that provide additional information about the earthquake when its associated marker is clicked.

    // Create a legend that will provide context for your map data.