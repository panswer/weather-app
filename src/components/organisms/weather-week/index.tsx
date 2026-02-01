import { useContext } from "react";
import styles from "./weather-week.module.css";
import Card from "../../atoms/card";
import dayjs from "dayjs";
import Image from "../../atoms/image";
import { WeatherDailyContext } from "../../../contexts/daily-weather-context";
import { apiFormatDate } from "../../../utils/consts";
import {
  FilterWeatherContext,
  loadingStatus,
} from "../../../contexts/filter-weather-context";

const WeatherWeek = () => {
  const dailyList = useContext(WeatherDailyContext);
  const { status } = useContext(FilterWeatherContext);

  return (
    <div className={styles.weatherWeekContainer}>
      <h3 className={styles.weekTitle}>Daily forecast</h3>

      <div className={styles.daysContainer}>
        {dailyList.map((day, i) => (
          <Card key={`card-${i}`} cardClass={styles.card}>
            {!loadingStatus.includes(status) && (
              <>
                <span className={styles.dayText}>
                  {dayjs(day.format.time, apiFormatDate).format("ddd")}
                </span>
                <Image src={day.weatherImage} alt={"sunny"} key={i} />

                <div className={styles.temperatureRange}>
                  <span className={styles.dayTemperature}>
                    {day.format.temperature2mMax}
                  </span>
                  <span className={styles.dayTemperature}>
                    {day.format.temperature2mMin}
                  </span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherWeek;
