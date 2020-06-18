import * as L from 'leaflet';
import { getLocation } from "./utils";

export default async function() {
    const position = await getLocation();
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

    return  new L.Map('map', {layers: [osm], center: new L.LatLng(position.coords.latitude, position.coords.longitude), zoom: 15});
}