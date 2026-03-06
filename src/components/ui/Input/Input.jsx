import style from './Input.module.css';
import styleErrorMessage from "../../../helpers/validate/textValidation.module.css";

const Input = ({
                 type = 'text',
                 size = 'medium',
                 placeholder,
                 value,
                 disabled,
                 isDone,
                 error,
                 errorMessageFor,
                 onChange,
               }) => {

  const wrapperClasses = [
    style.inputWrapper,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    style.input,
    style[size],
    isDone ? style.isDone : '',
  ].filter(Boolean).join(' ');

  const errorClasses = [
    styleErrorMessage.errorMessage,
    styleErrorMessage[errorMessageFor],
    error.errorMessage ? styleErrorMessage[errorMessageFor+'Visible'] : '',
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
      <p className={errorClasses}>{error.errorMessage}</p>
    </div>
  );
};

export default Input;