import * as L from 'leaflet';
import mapInstance from './lib/mapInstance';
import { fetchGeoJSON } from './services/mapApi';
import { displayToolbar } from './lib/utils';
import { mapEventOnCreate, mapEventOnEdit, mapToolbar, mapUtil } from "./lib/mapUtil";

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

    if(displayToolbar()) mapToolbar(drawnItems, map);

    mapEventOnCreate(map, drawnItems, response);

    mapEventOnEdit(map);

    mapUtil();
})();