import axios from 'axios';

let message = "Произошла неизвестная ошибка";

export const handleErrorTodo = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      message = `Запрос отправлен, сервер ответил ошибкой: ${JSON.stringify(error.response.data)}`;
    } else if (error.request) {
      message = "Нет ответа от сервера. Проверьте соединение.";
    } else {
      message = `Ошибка настройки запроса к серверу: ${error.message}`;
    }
  } else if (error instanceof Error) {
    message = `Произошла ошибка: ${error.message}`;
  }
  console.error(message, error);
  throw new Error(message);
};

export const handleErrorRegistration = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          message = 'Ошибка десериализации запроса или неверный ввод';
          break;
        case 401:
          message = 'Неверные учетные данные';
          break;
        case 500:
          message = 'Внутренняя ошибка сервера.';
          break;
        default:
          message = `Необработанный статус ошибки: ${status}`;
      }
    } else {
      message = 'Сетевая ошибка или запрос не дошел до сервера';
    }
  }
  console.error(message, error);
  throw new Error(message);
}