import Card from "../../atoms/card";
import styles from "./card-info.module.css";

interface CardInfoProps {
  field: string;
  value?: string;
}

const CardInfo = ({ field, value }: CardInfoProps) => (
  <Card cardClass={styles.card}>
    <span className={styles.cardInfoField}>{field}</span>
    <span className={styles.cardInfoValue}>{value}</span>
  </Card>
);

export default CardInfo;
