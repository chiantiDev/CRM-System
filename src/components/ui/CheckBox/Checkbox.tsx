import * as React from "react";
import {FC} from "react";
import style from "../../ui/CheckBox/CheckBox.module.css";

interface CheckboxProps {
  type?: string
  defaultChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<CheckboxProps> = ({
                    type = "checkbox",
                    defaultChecked,
                    onChange
                  }) => {

  const checkBoxClasses = [
    style.checkbox
  ].filter(Boolean).join(' ');

  return (
    <input className={checkBoxClasses}
           type={type}
           defaultChecked={defaultChecked}
           onChange={onChange}
    />
  )
}

export default Checkbox