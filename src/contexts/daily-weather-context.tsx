import { createContext, useEffect, useState } from "react";
import DailyModel from "../models/dailyModel";

export const WeatherDailyContext = createContext<DailyModel[]>([]);

export interface DailyData {
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}

export type DailyUnit = Record<keyof DailyData, string>;

export interface WeatherDailyContextData {
  daily: Record<string, any>[];
  dailyUnit: DailyUnit;
}

export interface WeatherDailyContextProviderProps {
  weatherDailyData?: WeatherDailyContextData;
  children: any;
}

const WeatherDailyContextProvider = ({
  weatherDailyData,
  children,
}: WeatherDailyContextProviderProps) => {
  const [weatherDaily, setWeatherDaily] = useState<DailyModel[]>([]);

  useEffect(() => {
    if (weatherDailyData) {
      console.group("WeatherDailyContextProvider: useEffect");
      console.log(weatherDailyData);
      console.groupEnd();

      setWeatherDaily(
        weatherDailyData.daily.map((daily) =>
          DailyModel.parseFromApiResponse(daily, weatherDailyData.dailyUnit)
        )
      );
    }
  }, [weatherDailyData]);

  return (
    <WeatherDailyContext value={weatherDaily}>{children}</WeatherDailyContext>
  );
};

export default WeatherDailyContextProvider;
