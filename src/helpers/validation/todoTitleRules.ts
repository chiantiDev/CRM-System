import type { Rule } from 'antd/es/form';

export const todoTitleRules: Rule[] = [
   { required: true, message: 'Введите название задачи' },
   { min: 2, message: `Название задачи должно быть не менее 2 символов` },
   { max: 64, message: `Название задачи не должно превышать 64 символов` },
 ]