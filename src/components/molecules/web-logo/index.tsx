import Image from "../../atoms/image";
import weatherLogo from "../../../assets/images/logo.svg";
import styles from "./web-logo.module.css";

const WebLogo = () => (
  <div className={styles.webLogoStyle}>
    <Image src={weatherLogo} alt="Weather logo" />;
  </div>
);

export default WebLogo;
