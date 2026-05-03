export const validationLengthTitleTodo = (min: number, max: number) => {
  return [
   { required: true, message: 'Введите название задачи' },
   { min, message: `Название задачи должно быть не менее ${min} символов` },
   { max, message: `Название задачи не должно превышать ${max} символов` },
 ]
};