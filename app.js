// require leaflet.js
var L = require('leaflet');
// Lefalet shortcuts for common tile providers - is it worth adding such 1.5kb to Leaflet core?
var A = require('leaflet-providers')


// specify the path to the leaflet images folder
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
 
// initialize the map

cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
var OpenMapSurfer_Roads = L.tileLayer('http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z}');
var baseLayers = ['Stamen.Watercolor', 'OpenStreetMap.Mapnik'],
    overlays = ['OpenWeatherMap.Clouds'];

var leaf_map = L.map('map', {
    center: new L.LatLng(31.768942802505826, 35.21461486816406),
    zoom: 9,
    attribution: cmAttr
});

var layerControl = L.control.layers.provided(baseLayers, overlays).addTo(leaf_map);

var C = require('./tax_map')