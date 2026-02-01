import styles from "./main-title.module.css";

interface MainTitleProps {
  children: any;
}

const MainTitle = ({ children }: MainTitleProps) => (
  <h1 className={styles.mainTitleStyle}>{children}</h1>
);

export default MainTitle;
