import * as L from 'leaflet';
import mapInstance from './lib/mapInstance';
import {fetchGeoJSON, updateGeoJSON} from './services/mapApi';
import {displayToolbar} from './lib/utils';
import get from 'lodash/get'

import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw-src.css';
import 'leaflet/dist/leaflet.css';

(async function() {
    const map = await mapInstance();

    const response = await fetchGeoJSON();
    L.geoJSON(response.data).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    if(displayToolbar()) {
        L.drawLocal.draw.toolbar.buttons.polygon = 'Draw polygon!';

        const drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polyline: true,
                polygon: true,
                circle: false,
                circlemarker: false,
                marker: false
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });

        map.addControl(drawControl);
    }


    map.on(L.Draw.Event.CREATED, async function (e) {
        const type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }
        drawnItems.addLayer(layer);

        try {
            const geoJSON = drawnItems.toGeoJSON();
            await updateGeoJSON({
                ...geoJSON,
                features: [
                    ...geoJSON.features,
                    ...get(response, 'data.features', [])
                ]
            });
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
    });

    L.DomUtil.get('changeColor').onclick = function () {
        drawControl.setDrawingOptions({rectangle: {shapeOptions: {color: '#004a80'}}});
    };
})();