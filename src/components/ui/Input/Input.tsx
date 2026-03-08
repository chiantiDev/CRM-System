import * as React from "react";
import {FC} from "react";
import {ValidationType} from "../../../types/todo.ts";
import style from './Input.module.css';
import styleErrorMessage from "../../../helpers/validate/textValidation.module.css";

interface InputProps {
  type?: string,
  size?: string,
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  isDone?: boolean,
  validation: ValidationType
  errorMessageFor: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
                 type = 'text',
                 size = 'medium',
                 placeholder,
                 value,
                 disabled,
                 isDone,
                 validation,
                 errorMessageFor,
                 onChange,
               }) => {

  const wrapperClasses: string = [
    style.inputWrapper,
  ].filter(Boolean).join(' ');

  const inputClasses: string = [
    style.input,
    style[size],
    isDone ? style.isDone : '',
  ].filter(Boolean).join(' ');

  const errorClasses: string = [
    styleErrorMessage.errorMessage,
    styleErrorMessage[errorMessageFor],
    validation.errorMessage ? styleErrorMessage[errorMessageFor+'Visible'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <p className={errorClasses}>{validation.errorMessage}</p>
    </div>
  );
};

export default Input;