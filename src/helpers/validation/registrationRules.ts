import type {Rule} from 'antd/es/form';

const LIMITS = {
  USER_NAME: { MIN: 1, MAX: 60 },
  LOGIN: { MIN: 2, MAX: 60 },
  PASSWORD: { MIN: 6, MAX: 60 },
  PHONE: { MIN: 7, MAX: 15 },
} as const;

export const userNameRules: Rule[] = [
  { required: true, message: 'Введите имя пользователя' },
  { min: LIMITS.USER_NAME.MIN, message: `Имя пользователя не может быть меньше ${LIMITS.USER_NAME.MIN} символа` },
  { max: LIMITS.USER_NAME.MAX, message: `Имя пользователя не может быть больше ${LIMITS.USER_NAME.MAX} символов` },
  {
    pattern: /^[A-Za-zА-Яа-яёЁ]+$/,
    message: 'Только буквы русского или латинского алфавита'
  },
];

export const loginRules: Rule[] = [
  { required: true, message: 'Введите логин' },
  { min: LIMITS.LOGIN.MIN, message: `Логин не может быть меньше ${LIMITS.LOGIN.MIN} символов` },
  { max: LIMITS.LOGIN.MAX, message: `Логин не может быть больше ${LIMITS.LOGIN.MAX} символов` },
  {
    pattern: /^[A-Za-z]+$/,
    message: 'Только буквы латинского алфавита'
  },
];

export const passwordRules: Rule[] = [
  { required: true, message: 'Введите пароль' },
  { min: LIMITS.PASSWORD.MIN, message: `Пароль не может быть меньше ${LIMITS.PASSWORD.MIN} символов` },
  { max: LIMITS.PASSWORD.MAX, message: `Пароль не может быть больше ${LIMITS.PASSWORD.MAX} символов` }
];

export const confirmPasswordRules = (): Rule[] => [
  { required: true, message: 'Повторите пароль' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают'));
    },
  }),
];

export const emailRules: Rule[] = [
  { required: true, message: 'Введите email адрес' },
  { type: 'email', message: 'Введите корректный email адрес' }
];

const phoneRegex = new RegExp(`^\\+?[\\d\\s\\-()]{${LIMITS.PHONE.MIN},${LIMITS.PHONE.MAX}}$`);

export const phoneNumberRules: Rule[] = [
  { pattern: phoneRegex, message: 'Введите корректный номер телефона' }
];
