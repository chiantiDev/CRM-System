import * as React from "react";
import {CSSProperties, FC} from "react";
import styles from './Input.module.css';

type CSSVariables = {
  [key: `--${string}`]: string | number | undefined;
};

interface InputProps {
  style?: CSSProperties & CSSVariables
  className?: string;
  type?: string,
  name?: string,
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
                                 style,
                                 className,
                                 type = 'text',
                                 name = 'input',
                                 placeholder,
                                 value,
                                 disabled = false,
                                 onChange,
                               }) => {

  const inputClasses: string = [
    styles.input,
    style,
    className,
  ].filter(Boolean).join(' ');

  // const errorClasses: string = [
  //   styleErrorMessage.errorMessage,
  //   styleErrorMessage[errorMessageFor],
  //   validation.errorMessage ? styleErrorMessage[errorMessageFor+'Visible'] : '',
  // ].filter(Boolean).join(' ');

  return (
    <input
      style={style}
      className={inputClasses}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;