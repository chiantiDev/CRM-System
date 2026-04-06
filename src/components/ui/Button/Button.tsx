import * as React from "react";
import {FC, ReactNode} from "react";
import style from './Button.module.css';

interface ButtonProps {
  className?: string;
  type: "button" | "submit"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({className, type, onClick, children,}) => {

  const buttonClasses = [
    style.button,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses}
            type={type}
            onClick={onClick}
    >{children}</button>
  );
};

export default Button;