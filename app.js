// require leaflet.js
var L = require('leaflet');
// Lefalet shortcuts for common tile providers - is it worth adding such 1.5kb to Leaflet core?
var A = require('leaflet-providers')


// specify the path to the leaflet images folder
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
 
// initialize the map

cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
var OpenMapSurfer_Roads = L.tileLayer('http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z}');
var baseLayers = [ 'OpenStreetMap.Mapnik','Stamen.Watercolor'],
    overlays = ['OpenWeatherMap.Clouds'];

var leaf_map = L.map('map', {
    center: new L.LatLng(31.768942802505826, 35.21461486816406),
    zoom: 9,
    attribution: cmAttr
});

var layerControl = L.control.layers.provided(baseLayers, overlays).addTo(leaf_map);

/**
 * Created by kobi on 3/26/14.
 */
var geojson;

var user_select = 4;

var info;

function getColor(d) {
    return d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
            d > 100 ? '#FC4E2A' :
                d > 50 ? '#FD8D3C' :
                    d > 20 ? '#FEB24C' :
                        d > 10 ? '#FED976' :
                            d > 1 ? '#800026' :
                                '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.id),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#87AFC7',
        dashArray: '',
        fillOpacity: 0.99
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function filter_muni(feature,layer){
    if (feature.properties.id == 1 ){
        return false
    }


    return true;


}
function onEachFeature(feature, layer) {
    if(feature.properties.id == 1){
        return
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(geo_data, {
    style: style,
    onEachFeature: onEachFeature,
    filter: filter_muni
}).addTo(leaf_map);