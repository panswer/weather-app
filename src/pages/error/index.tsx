import styles from "./error-page.module.css";
import Image from "../../components/atoms/image";

import { imgFolder } from "../../utils/consts";
import Button from "../../components/atoms/button";
import { useCallback, useContext } from "react";
import { FilterWeatherContext } from "../../contexts/filter-weather-context";

const ErrorPage = () => {
  const { changeStatus } = useContext(FilterWeatherContext);

  const handleRetry = useCallback((e: any) => {
    e.preventDefault();

    changeStatus("empty");
  }, []);

  return (
    <div className={styles.errorContainer}>
      <Image
        src={imgFolder.concat("icon-error.svg")}
        alt="error icons"
        imgClass={styles.errorIcon}
      />

      <h2 className={styles.errorTitle}>Something went wrong</h2>

      <p className={styles.errorDescription}>
        We couldn't connect to the server (API error). Please try again in a few
        moments
      </p>

      <Button type="reset" onClick={handleRetry}>
        <Image src={imgFolder.concat("icon-retry.svg")} />
        <span className={styles.resetBtnText}>Retry</span>
      </Button>
    </div>
  );
};

export default ErrorPage;
