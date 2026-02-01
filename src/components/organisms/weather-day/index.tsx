import dayjs from "dayjs";
import SelectInput, {
  type OnChangeEvent,
  type SelectOption,
  type SelectSection,
} from "../../atoms/select-input";
import WeatherHourly from "../../molecules/weather-hourly";
import styles from "./weather-day.module.css";
import Card from "../../atoms/card";
import { useCallback, useContext, useMemo, useState } from "react";
import { WeatherDayContext } from "../../../contexts/weather-day-context";
import {
  FilterWeatherContext,
  loadingStatus,
} from "../../../contexts/filter-weather-context";
import HourlyModel from "../../../models/hourlyModel";

export interface BtnDayProps {
  day: string;
  btnDisabled?: boolean;
}

const BtnDay = ({ day, btnDisabled }: BtnDayProps) => {
  if (btnDisabled) {
    return <span className={styles.btnDay}>--</span>;
  }

  return <div className={styles.btnDay}>{day}</div>;
};

const WeatherDay = () => {
  const [daySelected, setDaySelected] = useState<any>();
  const { status } = useContext(FilterWeatherContext);
  const hourlyRecords = useContext(WeatherDayContext);

  const dayOptions = useMemo<SelectSection>(() => {
    const today = dayjs();

    setDaySelected(today.format("dddd").toLowerCase());

    return {
      options: new Array(7).fill(null).map<SelectOption>((_, i) => {
        const moment = today.add(i, "day");

        return {
          text: moment.format("dddd"),
          value: moment.format("dddd").toLowerCase(),
        };
      }),
      section: "day",
    };
  }, []);

  const handleChangeDay = useCallback((e: OnChangeEvent) => {
    setDaySelected(e.value);
  }, []);

  const isLoading = useMemo(() => loadingStatus.includes(status), [status]);

  const hourlyDefault = useMemo(
    () => new Array(24).fill(HourlyModel.getEmptyHourly()),
    []
  );

  return (
    <Card cardClass={styles.weatherDayContainer}>
      <div className={styles.weatherDayHeader}>
        <h3 className={styles.weatherDayTitle}>Hourly forecast</h3>
        <SelectInput
          sections={[dayOptions]}
          onChange={handleChangeDay}
          btnContent={<BtnDay day={daySelected} btnDisabled={isLoading} />}
          defaultValues={{ day: daySelected }}
          disabled={isLoading}
        />
      </div>

      <div className={styles.hourlyContent}>
        {(hourlyRecords[daySelected] || hourlyDefault).map((weather, i) => (
          <WeatherHourly
            key={`weather-${i}`}
            moment={weather.format.time}
            temperature={weather.format.temperature2m}
            weather={weather.weatherImage}
          />
        ))}
      </div>
    </Card>
  );
};

export default WeatherDay;
