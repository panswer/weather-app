import type { DailyData, DailyUnit } from "../contexts/daily-weather-context";
import BaseModel from "./baseModel";

export interface DailyInterface {
    rainSum: number;
    showersSum: number;
    snowfallSum: number;
    sunrise: string;
    sunset: string;
    temperature2mMax: number;
    temperature2mMin: number;
    time: string;
    weatherCode: number;
}

class DailyModel extends BaseModel implements DailyInterface {
    rainSum: number;
    showersSum: number;
    snowfallSum: number;
    sunrise: string;
    sunset: string;
    temperature2mMax: number;
    temperature2mMin: number;
    time: string;
    weatherCode: number;

    units: Record<string, string> = {
        rainSum: '',
        showersSum: '',
        snowfallSum: '',
        sunrise: '',
        sunset: '',
        temperature2mMax: '',
        temperature2mMin: '',
        time: '',
    };

    static dictionary: Record<keyof DailyInterface, keyof DailyData> = {
        rainSum: 'rain_sum',
        showersSum: 'showers_sum',
        snowfallSum: 'snowfall_sum',
        sunrise: 'sunrise',
        sunset: 'sunset',
        temperature2mMax: 'temperature_2m_max',
        temperature2mMin: 'temperature_2m_min',
        time: 'time',
        weatherCode: 'weather_code',
    };

    constructor(params: DailyInterface, units: DailyUnit) {
        super();

        this.rainSum = params.rainSum;
        this.showersSum = params.showersSum;
        this.snowfallSum = params.snowfallSum;
        this.sunrise = params.sunrise;
        this.sunset = params.sunset;
        this.temperature2mMax = params.temperature2mMax;
        this.temperature2mMin = params.temperature2mMin;
        this.time = params.time;
        this.weatherCode = params.weatherCode;

        this.units = units;
    }

    static parseFromApiResponse(data: Record<string, any>, units: Record<string, string>) {
        const dailyInterface: any = {};
        const dailyUnits: any = {};

        Object.entries(this.dictionary).forEach(([key, value]) => {
            dailyInterface[key] = data[value];
            dailyUnits[key] = units[value];
        });

        return new DailyModel(dailyInterface, dailyUnits);
    }

    get format(): Record<keyof DailyInterface, string> {
        return {
            rainSum: this.formatValue(this.rainSum, this.units.rainSum),
            showersSum: this.formatValue(this.showersSum, this.units.showersSum),
            snowfallSum: this.formatValue(this.snowfallSum, this.units.snowfallSum),
            sunrise: this.sunrise,
            sunset: this.sunset,
            temperature2mMax: this.formatValue(this.temperature2mMax, this.units.temperature2mMax),
            temperature2mMin: this.formatValue(this.temperature2mMin, this.units.temperature2mMin),
            time: this.time,
            weatherCode: `${this.weatherCode}`,
        }
    }

    get weatherImage(): string {
        return this.getWeatherImgByCode(this.weatherCode);
    }
}

export default DailyModel;