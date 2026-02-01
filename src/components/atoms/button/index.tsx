import type React from "react";
import styles from "./button.module.css";

type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  children: any;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  btnClass?: string;
}

const Button = ({ children, type, onClick, btnClass }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={styles.buttonStyle.concat(btnClass ? " " + btnClass : "")}
  >
    {children}
  </button>
);

export default Button;
