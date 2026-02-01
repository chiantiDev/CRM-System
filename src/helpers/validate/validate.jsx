import style from "./validate.module.css";

const validate = (text, blockStyle) => {
  if (text.startsWith(" ")) {
    return {
      message: (
        <div className={`
        ${style.validText} 
        ${blockStyle === 'input' ? style.input : 
          blockStyle === 'textarea' ? style.textarea : null}`}
        >{'Текст не должен начинаться с пробела'}</div>
      ),
      isValid: false
    };
  } else if (text.length === 0) {
    return {
      message: (
        <div className={`
        ${style.validText} 
        ${blockStyle === 'input' ? style.input :
          blockStyle === 'textarea' ? style.textarea : null}`}
        >{'Это поле не может быть пустым'}</div>
      ),
      isValid: false
    };
  } else if (text.length < 2) {
    return {
      message: (
        <div className={`
        ${style.validText} 
        ${blockStyle === 'input' ? style.input :
          blockStyle === 'textarea' ? style.textarea : null}`}
        >{'Минимальная длина текста 2 символа'}</div>
      ),
      isValid: false
    };
  } else if (text.length > 64) {
    return {
      message: (
        <div className={`
        ${style.validText} 
        ${blockStyle === 'input' ? style.input :
          blockStyle === 'textarea' ? style.textarea : null}`}
        >{'Максимальная длина текста 64 символа'}</div>
      ),
      isValid: false
    };
  } else {
    return {
      message: null,
      isValid: true
    };
  }
};

export default validate;