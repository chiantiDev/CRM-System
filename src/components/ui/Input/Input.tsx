import * as React from "react";
import {FC} from "react";
import style from './Input.module.css';

interface InputProps {
  className?: string;
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
                                 className,
                                 placeholder,
                                 value,
                                 disabled,
                                 onChange,
                               }) => {

  const inputClasses: string = [
    style.input,
    className,
  ].filter(Boolean).join(' ');

  return (
    <input
      className={inputClasses}
      type='text'
      name='input'
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;