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