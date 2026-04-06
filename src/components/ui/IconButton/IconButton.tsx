import * as React from "react";
import {FC, ReactNode} from "react";
import style from './IconButton.module.css'

interface IconButtonProps {
  className?: string
  type: 'button' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}



const IconButton: FC<IconButtonProps> = ({className, type, onClick, children}) => {

  const iconButtonClasses: string = [
    style.iconButton,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={iconButtonClasses}
            type={type}
            onClick={onClick}
    >{children}</button>
  )
}

export default IconButton