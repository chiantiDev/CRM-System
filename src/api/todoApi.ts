import {Todo, TodoRequest, TodoInfo, MetaResponse, TodoStatus} from "../types/todo.ts";
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Запрос отправлен, сервер ответил ошибкой", error.response.data);
    } else if (error.request) {
      console.error("Нету ответа", error.request);
    } else {
      console.error("Ошибка настройки запроса", error.message);
    }
  } else if (error instanceof Error) {
    console.error("Ошибка", error);
  } else {
    console.error("Ошибка при загрузке данных");
  }
  throw new Error('Ошибка при запросе на сервер')
}


const addNewTodo = async (title: string): Promise<void> => {
  try {
    await apiClient.post('todos', {
        title: title,
        isDone: false,
    })
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
}

const updateTodo = async (id: number, updates: TodoRequest): Promise<void> => {
  try {
    await apiClient.put(`todos/${id}`, updates)
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`todos/${id}`)
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
}

const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const { data } = await apiClient.get(`todos/${id}`)
    return {
      id: data.id,
      title: data.title,
      created: data.created,
      isDone: data.isDone,
    };
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
}

const getTodosData = async (tasksFilter: TodoStatus): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await apiClient.get('todos', {params: {filter: tasksFilter}})
    return {
      data: data.data,
      info: data.info,
      meta: data.meta,
    };
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
}

export default {addNewTodo, updateTodo, deleteTodo, getTodoById, getTodosData}