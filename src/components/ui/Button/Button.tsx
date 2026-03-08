import * as React from "react";
import {FC, ReactNode} from "react";
import styles from './Button.module.css';

interface ButtonProps {
  type: "button" | "submit" | "reset"
  variant?: string
  size?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
                  type = 'button',
                  variant = 'primary',
                  size = 'large',
                  onClick,
                  children,
                }) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;