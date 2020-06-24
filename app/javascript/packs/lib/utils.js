import {API_BASE_URL} from "./constants";

export function getLocation() {
    return new Promise(resolve => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => resolve(position));
        } else {
            resolve({
                coords: {
                    latitude: -37.7772,
                    longitude: 175.2756
                }
            })
        }
    })
}

export function getApiUrl() {
    const id = window.location.pathname.replace(/\/maps\/|\/edit/gi, '');
    return `${API_BASE_URL}/${id}`
}

export function displayToolbar() {
    return window.location.pathname.indexOf('edit') !== -1;
}