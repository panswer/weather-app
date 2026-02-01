import LoadingShape from "../../atoms/loading-shape";

import styles from "./styles.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.loadingAnimationContainer}>
      <div className={styles.loadShape}>
        <LoadingShape />
      </div>
      <div className={styles.loadShape}>
        <LoadingShape />
      </div>
      <div className={styles.loadShape}>
        <LoadingShape />
      </div>
    </div>
  );
};

export default LoadingAnimation;
