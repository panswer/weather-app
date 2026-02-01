import { useContext } from "react";
import CardInfo from "../../molecules/card-info";
import styles from "./weather-data.module.css";
import { WeatherNowContext } from "../../../contexts/current-weather-context";
import {
  FilterWeatherContext,
  loadingStatus,
} from "../../../contexts/filter-weather-context";

const WeatherData = () => {
  const currentWeather = useContext(WeatherNowContext);
  const { status } = useContext(FilterWeatherContext);

  return (
    <div className={styles.weatherDataContainer}>
      {!loadingStatus.includes(status) && (
        <>
          <CardInfo
            field="Feels Like"
            value={currentWeather.format.temperature2m}
          />
          <CardInfo
            field="Humidity"
            value={currentWeather.format.relativeHumidity2m}
          />
          <CardInfo field="Wind" value={currentWeather.format.windSpeed10m} />
          <CardInfo
            field="Precipitation"
            value={currentWeather.format.precipitation}
          />
        </>
      )}
      {loadingStatus.includes(status) && (
        <>
          <CardInfo field="Feels Like" value={"--"} />
          <CardInfo field="Humidity" value={"--"} />
          <CardInfo field="Wind" value={"--"} />
          <CardInfo field="Precipitation" value={"--"} />
        </>
      )}
    </div>
  );
};

export default WeatherData;
