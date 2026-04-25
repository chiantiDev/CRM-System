import {FC, ReactNode} from "react";
import style from './ValidationMessage.module.css'

interface ValidationMessageProps {
  className?: string;
  children: ReactNode;
}

const ValidationMessage: FC<ValidationMessageProps> = ({className, children}) => {

  const ValidationMessageClasses: string = [
    style.errorMessage,
    className,
  ].filter(Boolean).join(' ');

  return <p className={ValidationMessageClasses}>{children}</p>
}

export default ValidationMessage;