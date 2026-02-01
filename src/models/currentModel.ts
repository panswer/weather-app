import BaseModel from "./baseModel";

interface CurrentInterface {
    cloudCover: number;
    interval: number;
    precipitation: number;
    rain: number;
    snowfall: number;
    time: string;
    temperature2m: string;
    windSpeed10m: number;
    isDay: any;
    relativeHumidity2m: number;
    weatherCode: number;
};

interface CurrentLocation {
    city: string;
    country: string;
}

type CurrentUnits = Record<keyof CurrentInterface, string>;

class CurrentModel extends BaseModel implements CurrentInterface {
    cloudCover: number;
    interval: number;
    precipitation: number;
    rain: number;
    snowfall: number;
    time: string;
    temperature2m: string;
    isDay: string;
    relativeHumidity2m: number;
    weatherCode: number;
    windSpeed10m: number;

    units: Record<string, string> = {
        cloudCover: '',
        interval: '',
        precipitation: '',
        rain: '',
        snowfall: '',
        time: '',
        temperature2m: '',
        isDay: '',
        relativeHumidity2m: '',
        weatherCode: '',
        windSpeed10m: '',
    }

    currentLocation?: CurrentLocation;

    static dictionary = {
        cloud_cover: "cloudCover",
        interval: "interval",
        precipitation: "precipitation",
        rain: "rain",
        snowfall: "snowfall",
        time: "time",
        temperature_2m: 'temperature2m',
        wind_speed_10m: 'windSpeed10m',
        is_day: "isDay",
        relative_humidity_2m: "relativeHumidity2m",
        weather_code: "weatherCode",
    }

    constructor(params: CurrentInterface, units: CurrentUnits, currentLocation?: CurrentLocation) {
        super();

        this.cloudCover = params.cloudCover;
        this.interval = params.interval;
        this.precipitation = params.precipitation;
        this.rain = params.rain;
        this.snowfall = params.snowfall;
        this.time = params.time;
        this.temperature2m = params.temperature2m;
        this.isDay = params.isDay;
        this.relativeHumidity2m = params.relativeHumidity2m;
        this.weatherCode = params.weatherCode;
        this.windSpeed10m = params.windSpeed10m;
        this.units = units;

        this.currentLocation = currentLocation;
    }

    static parseFromApiResponse(data: Record<string, any>, units: Record<string, any>, currentLocation?: CurrentLocation) {
        const currentInterface: any = {};
        const currentUnits: any = {};

        Object.entries(this.dictionary).forEach(([key, value]) => {
            currentInterface[value] = data[key];
            currentUnits[value] = units[key];
        });

        return new CurrentModel(currentInterface, currentUnits, currentLocation);
    }

    get format(): CurrentUnits {
        return {
            cloudCover: this.formatValue(this.cloudCover, this.units.cloudCover),
            interval: this.formatValue(this.interval, this.units.interval),
            precipitation: this.formatValue(this.precipitation, this.units.precipitation),
            rain: this.formatValue(this.rain, this.units.rain),
            snowfall: this.formatValue(this.snowfall, this.units.snowfall),
            time: `${this.time}`,
            temperature2m: this.formatValue(this.temperature2m, this.units.temperature2m),
            isDay: `${this.isDay}`,
            relativeHumidity2m: this.formatValue(this.relativeHumidity2m, this.units.relativeHumidity2m),
            weatherCode: `${this.weatherCode}`,
            windSpeed10m: this.formatValue(this.windSpeed10m, this.units.windSpeed10m),
        }
    }

    get weatherImage(): string {
        return this.getWeatherImgByCode(this.weatherCode);
    }
}

export default CurrentModel;