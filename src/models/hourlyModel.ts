import dayjs from "dayjs";
import BaseModel from "./baseModel";

export interface HourlyInterface {
    precipitation: number;
    temperature2m: number;
    time: Date;
    weatherCode: number;
}

export type HourlyUnits = Record<keyof HourlyInterface, string>;

class HourlyModel extends BaseModel implements HourlyInterface {
    precipitation: number;
    temperature2m: number;
    time: Date;
    weatherCode: number;

    units: HourlyUnits;

    static dictionary: Record<string, string> = {
        precipitation: "precipitation",
        temperature2m: "temperature_2m",
        time: "time",
        weatherCode: "weather_code",
    };

    constructor(hourlyData: HourlyInterface, units: HourlyUnits) {
        super();

        this.precipitation = hourlyData.precipitation;
        this.temperature2m = hourlyData.temperature2m;
        this.time = hourlyData.time;
        this.weatherCode = hourlyData.weatherCode;

        this.units = units;
    }

    static parseHourlyDataFromApi(data: Record<string, any>, unitData: Record<string, string>) {
        const hourlyInterface: any = {};
        const units: any = {};

        Object.entries(this.dictionary).forEach(([key, value]) => {
            hourlyInterface[key] = this.parseValue(key, data[value]);
            units[key] = unitData[value];
        });

        return new HourlyModel(hourlyInterface, units);
    }

    static parseValue(key: string, value: number | string) {
        if (key === 'time') {
            return dayjs(value, 'YYYY-MM-DDTHH:mm').toDate();
        }

        return value;
    }

    static getEmptyHourly() {
        return new HourlyModel({
            precipitation: 0,
            temperature2m: 0,
            time: new Date(),
            weatherCode: 0
        }, {
            precipitation: '',
            temperature2m: '',
            time: '',
            weatherCode: '',
        });
    }

    get day() {
        return dayjs(this.time).format('dddd').toLowerCase();
    }

    get format(): Record<keyof HourlyInterface, string> {
        return {
            precipitation: this.formatValue(this.precipitation, this.units.precipitation),
            temperature2m: this.formatValue(this.temperature2m, this.units.temperature2m),
            time: dayjs(this.time).format('h A'),
            weatherCode: `${this.weatherCode}`,
        };
    }

    get weatherImage(): string {
        return this.getWeatherImgByCode(this.weatherCode);
    }
}

export default HourlyModel;