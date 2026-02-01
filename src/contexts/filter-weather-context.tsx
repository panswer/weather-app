import { createContext, useCallback, useState } from "react";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  WindSpeedUnit,
} from "../services/api-weather";

export interface FilterWeatherData {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export type FilterStatusType = "empty" | "loading" | "ready" | "error";

export const loadingStatus: FilterStatusType[] = ["empty", "loading"];

export interface FilterWeatherContextParams extends FilterWeatherData {
  status: FilterStatusType;
  changeFilter: (filterWeather: FilterWeatherData) => void;
  changeStatus: (newStatus: FilterStatusType) => void;
}

export const FilterWeatherContext = createContext<FilterWeatherContextParams>({
  precipitation: "mm",
  temperature: "celsius",
  windSpeed: "kmh",
  status: "empty",
  changeFilter: () => undefined,
  changeStatus: () => undefined,
});

export interface FilterWeatherParams {
  children?: any;
}

const FilterWeatherProvider = ({ children }: FilterWeatherParams) => {
  const [filter, setFilter] = useState<FilterWeatherData>({
    precipitation: "mm",
    temperature: "celsius",
    windSpeed: "kmh",
  });

  const [status, setStatus] = useState<FilterStatusType>("empty");

  const handleChangeFilter = useCallback((filterWeather: FilterWeatherData) => {
    setFilter(filterWeather);
  }, []);

  const handleChangeStatus = useCallback((newStatus: FilterStatusType) => {
    setStatus(newStatus);
  }, []);

  return (
    <FilterWeatherContext
      value={{
        ...filter,
        status,
        changeFilter: handleChangeFilter,
        changeStatus: handleChangeStatus,
      }}
    >
      {children}
    </FilterWeatherContext>
  );
};

export default FilterWeatherProvider;
