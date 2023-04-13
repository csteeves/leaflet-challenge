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


///// Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude. /////

// function to determine color based on depth
function chooseColor(depth) {
    if (depth >= 90) return "red";
    else if (depth >= 70) return "darkorange";
    else if (depth >= 50) return "orange";
    else if (depth >= 30) return "yellow";
    else if (depth >= 10) return "lime";
    else return "green";
  };

// Select data using D3.
d3.json(queryUrl).then(function(response) {

    // log response
    console.log(response);

    // use geoJson to plot points
    L.geoJson(response, {

        // create circles instead of markers
        pointToLayer: (feature,latlng) => {
            return new L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], feature.properties.mag*10000);
        },

        // adding style and calling chooseColor function
        style: function(feature) {
            return{
                color: "black",
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.55,
                weight:.4
                };
        },

        // binding popUp
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




