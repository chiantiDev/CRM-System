import style from './IconButton.module.css'
import * as React from "react";
import {FC} from "react";
import {ModeButtons} from "../../../types/todo.ts";

interface IconButtonProps {
  type: 'edit' | 'delete' | 'save' | 'cancel'
  isModeButtons: ModeButtons
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const IconButton: FC<IconButtonProps> = ({
                      type,
                      isModeButtons,
                      onClick,
                    }) => {

  const buttonVisibility = {
    viewing: ['edit', 'delete'],
    editing: ['save', 'cancel']
  };

  const iconButtonClasses: string = [
    style.iconButton,
    style[type],
    buttonVisibility[isModeButtons].includes(type) ? style.visible : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={iconButtonClasses}
            onClick={onClick}></button>
  )
}

export default IconButton