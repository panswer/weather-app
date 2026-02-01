import { useCallback, useContext, useMemo } from "react";
import SelectInput, {
  type OnChangeEvent,
  type SelectSection,
} from "../../atoms/select-input";
import WebLogo from "../../molecules/web-logo";
import styles from "./main-header.module.css";
import {
  FilterWeatherContext,
} from "../../../contexts/filter-weather-context";

const Btn = () => <div className={styles.btnSelect}>Units</div>;

const MainHeader = () => {
  const { changeFilter, precipitation, temperature, windSpeed } =
    useContext(FilterWeatherContext);

  const unitsTemperature = useMemo<SelectSection>(
    () => ({
      options: [
        {
          text: "Celsius (C)",
          value: "celsius",
        },
        {
          text: "Fahrenheit (F)",
          value: "fahrenheit",
        },
      ],
      section: "temperature",
      sectionLabel: "Temperature",
    }),
    []
  );
  const unitsWindsSpeed = useMemo<SelectSection>(
    () => ({
      options: [
        {
          text: "km/h",
          value: "kmh",
        },
        {
          text: "mph",
          value: "mph",
        },
      ],
      section: "windSpeed",
      sectionLabel: "Wind Speed",
    }),
    []
  );
  const unitPrecipitation = useMemo<SelectSection>(
    () => ({
      options: [
        {
          text: "Millimeters (mm)",
          value: "mm",
        },
        {
          text: "Inches (in)",
          value: "inch",
        },
      ],
      section: "precipitation",
      sectionLabel: "Precipitation",
    }),
    []
  );
  const defaultValues = useMemo<Record<string, string>>(
    () => ({
      temperature,
      windSpeed,
      precipitation,
    }),
    []
  );

  const handleChange = useCallback(
    (e: OnChangeEvent) => {
      const newFilter: any = {
        precipitation,
        temperature,
        windSpeed,
      };

      newFilter[e.section] = e.value;

      changeFilter(newFilter);
    },
    [precipitation, temperature, windSpeed]
  );

  return (
    <hgroup className={styles.mainHeaderContainer}>
      <WebLogo />
      <SelectInput
        sections={[unitsTemperature, unitsWindsSpeed, unitPrecipitation]}
        defaultValues={defaultValues}
        btnContent={<Btn />}
        onChange={handleChange}
      />
    </hgroup>
  );
};

export default MainHeader;
