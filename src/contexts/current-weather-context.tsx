import { createContext, useEffect, useState } from "react";
import CurrentModel from "../models/currentModel";

export interface CurrentWeather {
  cloud_cover: number;
  interval: number;
  precipitation: number;
  rain: number;
  snowfall: number;
  time: string;
}

export interface CurrentUnitsWeather {
  cloud_cover: string;
  interval: string;
  precipitation: string;
  rain: string;
  snowfall: string;
  time: string;
}

export interface CurrentData {
  weather: CurrentWeather;
  weatherUnit: CurrentUnitsWeather;
  city?: string;
  country?: string;
}

interface CurrentWeatherContextProps {
  children?: any;
  current?: CurrentData;
}

export const WeatherNowContext = createContext<CurrentModel>(
  CurrentModel.parseFromApiResponse({}, {})
);

const CurrentWeatherContext = ({
  children,
  current,
}: CurrentWeatherContextProps) => {
  const [currentWeather, setCurrentWeather] = useState(
    CurrentModel.parseFromApiResponse({}, {})
  );

  useEffect(() => {
    console.group("CurrentWeatherContext: useEffect");
    console.log(current);
    console.groupEnd();

    if (current) {
      setCurrentWeather(
        CurrentModel.parseFromApiResponse(
          current.weather,
          current.weatherUnit,
          {
            city: current.city ?? "",
            country: current.country ?? "",
          }
        )
      );
    }
  }, [current]);

  return (
    <WeatherNowContext value={currentWeather}>{children}</WeatherNowContext>
  );
};

export default CurrentWeatherContext;
