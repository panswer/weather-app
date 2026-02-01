import { useContext, useEffect, useState } from "react";
import "./App.css";
import Button from "./components/atoms/button";
import MainTitle from "./components/atoms/main-title";
import InputSearch from "./components/molecules/input-search";
import MainHeader from "./components/organisms/main-header";
import WeatherData from "./components/organisms/weather-data";
import WeatherDay from "./components/organisms/weather-day";
import WeatherNow from "./components/organisms/weather-now";
import WeatherWeek from "./components/organisms/weather-week";
import { getGeoApiLocation } from "./services/geoLocation";
import dayjs from "dayjs";
import { getWeather } from "./services/api-weather";
import { apiFormatDate } from "./utils/consts";
import CurrentWeatherContext, {
  type CurrentData,
} from "./contexts/current-weather-context";
import { parseDailyWeatherFromApi } from "./utils/parse";
import type { WeatherDailyContextData } from "./contexts/daily-weather-context";
import WeatherDailyContextProvider from "./contexts/daily-weather-context";
import WeatherDayContextProvider, {
  type WeatherDayContextData,
} from "./contexts/weather-day-context";
import { FilterWeatherContext } from "./contexts/filter-weather-context";
import ErrorPage from "./pages/error";

function App() {
  const [current, setCurrent] = useState<CurrentData | undefined>();
  const [daily, setDaily] = useState<WeatherDailyContextData | undefined>();
  const [hourly, setHourly] = useState<WeatherDayContextData>();
  const { precipitation, temperature, windSpeed, changeStatus, status } =
    useContext(FilterWeatherContext);

  useEffect(() => {
    const today = dayjs();
    const after = today.add(6, "day");

    let city = "";
    let country = "";

    getGeoApiLocation()
      .then((res) => {
        city = res.city;
        country = res.country;

        return getWeather({
          precipitationUnit: precipitation,
          temperatureUnit: temperature,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          windSpeedUnit: windSpeed,
          endDate: after.format(apiFormatDate),
          latitude: res.latitude,
          longitude: res.longitude,
          startDate: today.format(apiFormatDate),
        });
      })
      .then((res) => {
        setCurrent({
          weather: res.current,
          weatherUnit: res.current_units,
          city,
          country,
        });

        const dailyData = parseDailyWeatherFromApi(res.daily);

        setDaily({
          daily: dailyData,
          dailyUnit: res.daily_units,
        });

        setHourly({
          hourlyData: res.hourly,
          hourlyUnit: res.hourly_units,
        });

        changeStatus("ready");
      })
      .catch(() => {
        changeStatus("error");
      });
  }, [temperature, windSpeed, precipitation, status]);

  return (
    <div className="main-container">
      <MainHeader />

      {status !== "error" && (
        <>
          <div className="main_title-content">
            <MainTitle>How's the sky looking today?</MainTitle>
          </div>

          <div className="search_input-section">
            <InputSearch placeholder="Search for a place..." name="city" />
            <Button btnClass="btn-search">Search</Button>
          </div>

          <div className="main-divider">
            <CurrentWeatherContext current={current}>
              <WeatherNow />

              <WeatherData />
            </CurrentWeatherContext>

            <WeatherDailyContextProvider weatherDailyData={daily}>
              <WeatherWeek />
            </WeatherDailyContextProvider>

            <WeatherDayContextProvider
              hourlyData={hourly?.hourlyData}
              hourlyUnit={hourly?.hourlyUnit}
            >
              <WeatherDay />
            </WeatherDayContextProvider>
          </div>
        </>
      )}

      {status === "error" && <ErrorPage />}
    </div>
  );
}

export default App;
