import { apiGeo } from "../utils/consts";

export interface GetGeolocation {
    latitude: number;
    longitude: number;
}

export const getGeolocation = () => new Promise<GetGeolocation>((res, rej) => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.group('getGeolocation');
        console.log(position);
        console.groupEnd();
        res({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        })
    }, err => {
        console.error(err);
        rej(err);
    });
});

export interface GetGeoApiLocation extends GetGeolocation {
    country: string;
    city: string;
}

export const getGeoApiLocation = (): Promise<GetGeoApiLocation> => {
    const url = new URL(apiGeo);

    url.searchParams.set('format', 'json');

    return getGeolocation()
        .then(({ latitude, longitude }) => {
            url.searchParams.set('lat', latitude.toString())
            url.searchParams.set('lon', longitude.toString())

            return fetch(url.toString());
        })
        .then(res => res.json())
        .then(data => ({
            city: data.address.city,
            country: data.address.country,
            latitude: Number(url.searchParams.get('lat')),
            longitude: Number(url.searchParams.get('lon'))
        }));
}