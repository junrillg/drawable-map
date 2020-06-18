import { getLocation } from "./map/utils";

import 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw-src.css';
import 'leaflet/dist/leaflet.css';

(async function() {
    const position = await getLocation();
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

    const map = new L.Map('map', {layers: [osm], center: new L.LatLng(position.coords.latitude, position.coords.longitude), zoom: 15});

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Set the title to show on the polygon button
    L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

    const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            marker: true
        },
        edit: {
            featureGroup: drawnItems,
            remove: true
        }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
        const type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });

    map.on(L.Draw.Event.EDITED, function (e) {
        const layers = e.layers;
        let countOfEditedLayers = 0;
        layers.eachLayer(function (layer) {
            countOfEditedLayers++;
        });
        console.log("Edited " + countOfEditedLayers + " layers");
    });

    L.DomUtil.get('changeColor').onclick = function () {
        drawControl.setDrawingOptions({rectangle: {shapeOptions: {color: '#004a80'}}});
    };
})();