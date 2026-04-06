import * as React from "react";
import {FC} from "react";
import style from "../../ui/CheckBox/CheckBox.module.css";

interface CheckboxProps {
  className?: string,
  defaultChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<CheckboxProps> = ({className, defaultChecked, onChange}) => {

  const checkBoxClasses = [
    style.checkbox,
    className,
  ].filter(Boolean).join(' ');

  return (
    <input className={checkBoxClasses}
           type="checkbox"
           defaultChecked={defaultChecked}
           onChange={onChange}
    />
  )
}

export default Checkbox