import styles from "./card.module.css";

interface CardProps {
  children: any;
  cardClass?: string;
}

const Card = ({ children, cardClass }: CardProps) => (
  <div className={styles.card.concat(cardClass ? ` ${cardClass}` : "")}>
    {children}
  </div>
);

export default Card;
