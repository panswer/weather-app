import { useContext, useEffect, useState } from "react";
import styles from "./weather-now.module.css";
import dayjs from "dayjs";

import Image from "../../atoms/image";
import { WeatherNowContext } from "../../../contexts/current-weather-context";
import {
  FilterWeatherContext,
  loadingStatus,
} from "../../../contexts/filter-weather-context";
import LoadingAnimation from "../../molecules/loading-animation";

interface LocationData {
  city: string;
  country: string;
}

interface WeatherNowProps {
  location?: LocationData;
  temperature?: string;
  time?: Date;
}

const WeatherNow = ({
  time = new Date(),
}: WeatherNowProps) => {
  const weatherNow = useContext(WeatherNowContext);
  const { status } = useContext(FilterWeatherContext);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(dayjs(time).format("dddd, MMM D, YYYY"));
  }, [time]);

  return (
    <div className={styles.weatherNowContainer} data-status={status}>
      {!loadingStatus.includes(status) && (
        <>
          <div className={styles.areaContent}>
            <span className={styles.locationContent}>
              {weatherNow.currentLocation?.city ?? ""},{" "}
              {weatherNow.currentLocation?.country ?? ""}
            </span>
            <span className={styles.nowContent}>{date}</span>
          </div>

          <div className={styles.temperatureContent}>
            <div className={styles.weatherImgContent}>
              <Image src={weatherNow.weatherImage} alt="sunny" />
            </div>
            <i className={styles.temperature}>
              {weatherNow.format.temperature2m}
            </i>
          </div>
        </>
      )}
      {loadingStatus.includes(status) && (
        <>
          <LoadingAnimation />
          <span className={styles.loadingText}>Loading...</span>
        </>
      )}
    </div>
  );
};

export default WeatherNow;
