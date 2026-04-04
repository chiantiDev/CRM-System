import styles from './IconButton.module.css'
import * as React from "react";
import {CSSProperties, FC, ReactNode} from "react";

type CSSVariables = {
  [key: `--${string}`]: string | number | undefined;
};

interface IconButtonProps {
  style?: CSSProperties & CSSVariables
  className?: string
  type?: 'button' | 'submit'
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}



const IconButton: FC<IconButtonProps> = ({
                                           style = {},
                                           className,
                                           type = 'button',
                                           children,
                                           onClick}) => {
  const iconButtonClasses: string = [
    styles.iconButton,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button style={style}
            className={iconButtonClasses}
            type={type}
            onClick={onClick}>{children}
    </button>
  )
}

export default IconButton