import type { Rule } from 'antd/es/form';

const LIMITS = {
  TODO_TITLE: { MIN: 1, MAX: 60 },
} as const;

export const todoTitleRules: Rule[] = [
   { required: true, message: 'Введите название задачи' },
   { min: LIMITS.TODO_TITLE.MIN, message: `Название задачи должно быть не менее 2 символов` },
   { max: LIMITS.TODO_TITLE.MAX, message: `Название задачи не должно превышать 64 символов` },
 ]