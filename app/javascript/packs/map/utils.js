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