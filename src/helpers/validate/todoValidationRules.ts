export const todoValidationRules = [
  { required: true, message: 'Введите название задачи' },
  { min: 2, message: 'Название должно быть не менее 2 символов' },
  { max: 64, message: 'Название не должно превышать 64 символов' },
  {
    validator: (_: any, value: string) => {
      if (!value) return Promise.resolve();
      if (value.startsWith(' ')) {
        return Promise.reject(new Error('Название не может начинаться пробелом'));
      }
      if (value.endsWith(' ')) {
        return Promise.reject(new Error('Название не может заканчиваться пробелом'));
      }
      return Promise.resolve();
    }
  }
];