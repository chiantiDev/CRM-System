import style from "../../ui/CheckBox/CheckBox.module.css";

const CheckBox = ({
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
           onChange={onChange}/>
  )
}

export default CheckBox