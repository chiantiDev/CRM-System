const textValidation = (text) => {
  if (text.startsWith(" ")) {
    return {
      errorMessage: 'Текст не должен начинаться с пробела',
      isValid: false
    };
  }

  if (text.length === 0) {
    return {
      errorMessage: 'Это поле не может быть пустым',
      isValid: false
    };
  }

  if (text.length < 2 || text.length === 2 && text[1] === ' ') {
    return {
      errorMessage:'Минимальная длина текста 2 символа',
      isValid: false
    };
  }

  if (text.length > 64) {
    return {
      errorMessage: 'Максимальная длина текста 64 символа',
      isValid: false
    };
  }

  return {
    errorMessage: '',
    isValid: true
  };

};

export default textValidation;