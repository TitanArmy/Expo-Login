export function getRegion(latitude, longitude, distance) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

    return {
        latitude: 28.539927134661628,
        longitude: 77.34059570765518,
        latitudeDelta,
        longitudeDelta
    }
};