import type {Rule} from 'antd/es/form';

export const userNameRules: Rule[] = [
  {required: true, message: 'Введите имя пользователя'},
  {min: 1, message: `Имя пользователя не может быть меньше 1 символа`},
  {max: 60, message: `Имя пользователя не может быть больше 60 символов`},
  {
    pattern: /^[A-Za-zА-Яа-яёЁ]+$/,
    message: 'Только буквы русского или латинского алфавита'
  },
]

export const loginRules: Rule[] = [
  {required: true, message: 'Введите логин'},
  {min: 2, message: `Логин не может быть меньше 2 символов`},
  {max: 60, message: `Логин не может быть больше 60 символов`},
  {
    pattern: /^[A-Za-z]+$/,
    message: 'Только буквы латинского алфавита'
  },
]

export const passwordRules: Rule[] = [
  {required: true, message: 'Введите пароль'},
  {min: 6, message: 'Пароль не может быть меньше 6 символов'},
  {max: 60, message: 'Пароль не может быть больше 60 символов'}
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
  {required: true, message: 'Введите email адрес'},
  {type: 'email', message: 'Введите корректный email адрес'}
];

export const phoneNumberRules: Rule[] = [
  { pattern: /^\+?[\d\s\-()]{7,15}$/, message: 'Введите корректный номер телефона' }
];