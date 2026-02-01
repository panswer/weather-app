import { createContext, useEffect, useState } from "react";
import HourlyModel from "../models/hourlyModel";

export const WeatherDayContext = createContext<WeatherDayState>({});

interface HourlyWeatherData {
  precipitation: number[];
  temperature_2m: number[];
  time: string[];
  weather_code: number[];
}

type HourlyWeatherUnit = Record<keyof HourlyWeatherData, string>;

export interface WeatherDayContextData {
  hourlyData?: HourlyWeatherData;
  hourlyUnit?: HourlyWeatherUnit;
}

interface WeatherDayContextProps extends WeatherDayContextData {
  children: any;
}

export type WeatherDayState = Record<string, HourlyModel[]>;

const WeatherDayContextProvider = ({
  children,
  hourlyData,
  hourlyUnit,
}: WeatherDayContextProps) => {
  const [day, setDay] = useState<WeatherDayState>({});

  useEffect(() => {
    if (hourlyData && hourlyUnit) {
      console.group("WeatherDayContextProvider: useEffect");
      console.log({
        hourlyData,
        hourlyUnit,
      });
      console.groupEnd();
      const newWeatherDay: WeatherDayState = {};

      hourlyData.time.forEach((_, i) => {
        const data: Record<keyof HourlyWeatherData, any> = {
          precipitation: hourlyData.precipitation[i],
          temperature_2m: hourlyData.temperature_2m[i],
          time: hourlyData.time[i],
          weather_code: hourlyData.weather_code[i],
        };
        const hourly = HourlyModel.parseHourlyDataFromApi(data, hourlyUnit);

        if (!(newWeatherDay[hourly.day] instanceof Array)) {
          newWeatherDay[hourly.day] = [];
        }

        newWeatherDay[hourly.day].push(hourly);
      });

      setDay(newWeatherDay);
    }
  }, [hourlyData, hourlyUnit]);

  return <WeatherDayContext value={day}>{children}</WeatherDayContext>;
};

export default WeatherDayContextProvider;
