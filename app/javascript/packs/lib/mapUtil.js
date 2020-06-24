import * as L from "leaflet";
import { updateGeoJSON } from "../services/mapApi";

export function mapToolbar(drawnItems, map) {
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

export function mapEventOnCreate(map, drawnItems, response) {
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
        } catch (e) {
            console.error(e);
        }
    });
}

export function mapEventOnEdit(map) {
    map.on(L.Draw.Event.EDITED, function (e) {
        const layers = e.layers;
        let countOfEditedLayers = 0;
        layers.eachLayer(function (layer) {
            countOfEditedLayers++;
        });
    });
}

export function mapUtil() {
    L.DomUtil.get('changeColor').onclick = function () {
        drawControl.setDrawingOptions({rectangle: {shapeOptions: {color: '#004a80'}}});
    };
}