import axios from 'axios';

export const handleErrorTodo = (error: unknown): never => {
  let errorMessageTodo = "Произошла неизвестная ошибка";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessageTodo = `Запрос отправлен, сервер ответил ошибкой: ${JSON.stringify(error.response.data)}`;
    } else if (error.request) {
      errorMessageTodo = "Нет ответа от сервера. Проверьте соединение.";
    } else {
      errorMessageTodo = `Ошибка настройки запроса к серверу: ${error.message}`;
    }
  } else if (error instanceof Error) {
    errorMessageTodo = `Произошла ошибка: ${error.message}`;
  }
  console.error(errorMessageTodo, error);
  throw new Error(errorMessageTodo);
};

export const handleErrorAuthentication = (error: unknown): string => {
  let errorMessageRegistration = "Произошла неизвестная ошибка";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          errorMessageRegistration = 'Ошибка десериализации запроса или неверный ввод';
          break;
        case 401:
          errorMessageRegistration = 'Неверные учетные данные или токен истек';
          break;
        case 409:
          errorMessageRegistration = 'Пользователь уже существует';
          console.log(error.response);
          break;
        case 500:
          errorMessageRegistration = 'Внутренняя ошибка сервера';
          break;
        default:
          errorMessageRegistration = `Необработанный статус ошибки: ${status}`;
      }
    } else {
      errorMessageRegistration = 'Сетевая ошибка или запрос не дошел до сервера';
    }
  }
  console.error(errorMessageRegistration, error);
  return errorMessageRegistration;
}