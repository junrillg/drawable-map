import * as L from 'leaflet';
import mapInstance from "./map/mapInstance";
import request from './lib/request';

import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw-src.css';
import 'leaflet/dist/leaflet.css';

(async function() {
    const map = await mapInstance();

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

    map.on(L.Draw.Event.CREATED, async function (e) {
        const type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }
        drawnItems.addLayer(layer);
        const url = window.location.pathname;
        try {
            const data = await request.put(url, drawnItems.toGeoJSON());
        }catch(e) {
           console.error(e);
        }
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