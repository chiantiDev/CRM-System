import styles from './ValidationMessage.module.css'
import {FC} from "react";

interface ValidationMessageProps {
  className?: string;
  text: string;
}

const ValidationMessage: FC<ValidationMessageProps> = ({className, text}) => {

  const ValidationMessageClasses: string = [
    styles.errorMessage,
    className,
  ].filter(Boolean).join(' ');

  const getErrorMessage = () => {
    if (text.startsWith(" ")) {
      return 'Текст не должен начинаться с пробела';
    }
    if (text.length === 0) {
      return 'Это поле не может быть пустым';
    }
    if (text.length < 2 || (text.length === 2 && text[1] === ' ')) {
      return 'Минимальная длина текста 2 символа';
    }
    if (text.length > 64) {
      return 'Максимальная длина текста 64 символа';
    }
    return '';
  };

  const errorMessage = getErrorMessage();

  return errorMessage ? (
    <p className={ValidationMessageClasses}>{errorMessage}</p>
  ) : null;
}

export default ValidationMessage;