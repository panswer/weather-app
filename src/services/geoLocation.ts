import { apiGeo, apiGeoFieldQuery } from "../utils/consts";

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

    url.searchParams.set('fields', apiGeoFieldQuery.join(','));

    return fetch(url.toString()).then(res => res.json()).then((data) => {
        if (data.status !== 'success') {
            return Promise.reject(new Error("Location not found"));
        }

        return Promise.resolve({
            city: data.city,
            country: data.country,
            latitude: data.lat,
            longitude: data.lon
        })
    });
}