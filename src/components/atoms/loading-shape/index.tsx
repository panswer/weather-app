import styles from "./loading-shape.module.css";

export interface LoadingShapeParams {
  children?: any;
}

const LoadingShape = ({ children }: LoadingShapeParams) => {
  return <div className={styles.loadingShape}>{children}</div>;
};

export default LoadingShape;
