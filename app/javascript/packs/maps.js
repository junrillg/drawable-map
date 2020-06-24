import mapInstance from './lib/mapInstance';
import {mapEventOnCreate, mapEventOnEdit, mapGeoJson, mapToolbar, mapUtil} from "./lib/mapUtil";

import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw-src.css';
import 'leaflet/dist/leaflet.css';

(async function() {
    const map = await mapInstance();

    const { response, drawnItems } = await mapGeoJson(map);

    mapToolbar(drawnItems, map);

    mapEventOnCreate(map, drawnItems, response);

    mapEventOnEdit(map);

    mapUtil();
})();