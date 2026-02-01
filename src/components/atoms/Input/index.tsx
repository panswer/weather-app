import type { HTMLInputTypeAttribute } from "react";
import styles from "./index.module.css";

export interface InputProps {
  value?: any;
  onChange?: (e: any) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}

const Input = ({
  id,
  name,
  onChange,
  placeholder,
  type,
  value,
  autoComplete
}: InputProps) => (
  <input
    type={type}
    id={id}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    className={styles.inputStyle}
    autoComplete={autoComplete}
  />
);

export default Input;
