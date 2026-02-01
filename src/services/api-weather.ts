import { apiCurrent, dailyParams, hourlyParams } from "../utils/consts";

export const api = "https://api.open-meteo.com";

export type TemperatureUnit = "celsius" | "fahrenheit";

export type WindSpeedUnit = 'kmh' | 'ms' | 'mph' | 'kn';

export type PrecipitationUnit = 'mm' | 'inch';

export interface GetWeatherProps {
    latitude?: number;
    longitude?: number;
    timezone: string;
    temperatureUnit: TemperatureUnit;
    windSpeedUnit: WindSpeedUnit;
    precipitationUnit: PrecipitationUnit;
    startDate?: string;
    endDate?: string;
};

export const getWeather = ({
    precipitationUnit = 'mm',
    temperatureUnit = 'celsius',
    timezone = 'GMT',
    windSpeedUnit = 'kmh',
    latitude,
    longitude,
    startDate,
    endDate
}: GetWeatherProps) => {
    const url = new URL(api);

    url.pathname = 'v1/forecast';

    if (latitude && longitude) {
        url.searchParams.append('latitude', latitude.toString())
        url.searchParams.append('longitude', longitude.toString());
    }

    url.searchParams.append('hourly', hourlyParams.join(','));
    url.searchParams.append('current', apiCurrent.join(','));
    url.searchParams.append('precipitation_unit', precipitationUnit);
    url.searchParams.append('temperature_unit', temperatureUnit);
    url.searchParams.append('timezone', timezone);
    url.searchParams.append('wind_speed_unit', windSpeedUnit);
    url.searchParams.append('daily', dailyParams.join(','));

    if (startDate && endDate) {
        url.searchParams.append('start_date', startDate);
        url.searchParams.append('end_date', endDate);
    }

    return fetch(url.toString()).then(res => res.json());
};