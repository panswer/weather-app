import Input, { type InputProps } from "../../atoms/Input";
import styles from "./input-search.module.css";
import iconSearch from "../../../assets/images/icon-search.svg";
import Image from "../../atoms/image";

const InputSearch = ({
  id,
  name,
  onChange,
  placeholder,
  type,
  value,
  autoComplete
}: InputProps) => (
  <label className={styles.inputSearchContent}>
    <Image src={iconSearch} alt="icon search" />
    <Input
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      autoComplete={autoComplete}
    />
  </label>
);

export default InputSearch;
