import { useCallback, useState, type ReactElement } from "react";
import styles from "./select-input.module.css";

type OptionValue = string | number | boolean;

export interface SelectOption {
  text: string;
  value: OptionValue;
}

export interface SelectSection {
  section: string;
  sectionLabel?: string;
  options: SelectOption[];
}

export interface OnChangeEvent {
  section: string;
  value: OptionValue;
}

interface SelectInputParams {
  btnContent?: string | ReactElement;
  sections: SelectSection[];
  defaultValues?: Record<string, OptionValue>;
  onChange?: (e: OnChangeEvent) => void;
  disabled?: boolean;
}

const SelectInput = ({
  sections,
  onChange,
  btnContent,
  defaultValues = {},
  disabled,
}: SelectInputParams) => {
  const [selectStatus, setSelectStatus] =
    useState<Record<string, OptionValue>>(defaultValues);

  const handleChange = useCallback(
    (e: any) => {
      e.preventDefault();

      const section = e.target.getAttribute("data-section");
      const value = e.target.getAttribute("data-value");

      if (onChange) {
        onChange({ section, value });
      }

      setSelectStatus({
        ...selectStatus,
        [section]: value,
      });
    },
    [selectStatus]
  );

  return (
    <div className={styles.selectComponent}>
      <button className={styles.selectBtn} disabled={disabled}>
        {btnContent}
      </button>
      {!disabled && (
        <div className={styles.selectSection}>
          {sections.map((section, i) => (
            <div
              className={styles.sectionGroup}
              key={`${section.section}-${i}`}
            >
              {section.sectionLabel && (
                <span className={styles.selectTitle}>
                  {section.sectionLabel}
                </span>
              )}

              {section.options.map((option, j) => (
                <button
                  className={styles.selectOption}
                  data-selected={selectStatus[section.section] === option.value}
                  data-section={section.section}
                  data-value={option.value}
                  onClick={handleChange}
                  key={`${section.section}-${j}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
