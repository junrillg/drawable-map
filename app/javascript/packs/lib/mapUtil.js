import * as L from "leaflet";
import {fetchGeoJSON, updateGeoJSON} from "../services/mapApi";
import { displayToolbar } from "./utils";

export async function mapGeoJson(map) {
    const response = await fetchGeoJSON();
    L.geoJSON(response.data).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    return {response, drawnItems};
}

export function mapToolbar(drawnItems, map) {
    if(!displayToolbar()) return;
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