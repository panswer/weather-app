import { useContext } from "react";
import Card from "../../atoms/card";
import Image from "../../atoms/image";
import styles from "./weather-hourle.module.css";
import {
  FilterWeatherContext,
  loadingStatus,
} from "../../../contexts/filter-weather-context";

export interface HourlyData {
  moment: string;
  weather: string;
  temperature: string;
}

const WeatherHourly = ({ moment, temperature, weather }: HourlyData) => {
  const { status } = useContext(FilterWeatherContext);

  return (
    <Card cardClass={styles.weatherHourlyItem}>
      {!loadingStatus.includes(status) && (
        <>
          <div className={styles.momentWeather}>
            <Image src={weather} imgClass={styles.weatherImage} />
            <span className={styles.hour}>{moment}</span>
          </div>
          <div className={styles.temperature}>{temperature}</div>
        </>
      )}
    </Card>
  );
};

export default WeatherHourly;
