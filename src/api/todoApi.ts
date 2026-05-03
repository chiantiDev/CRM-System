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

const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Запрос отправлен, сервер ответил ошибкой", error.response.data);
      throw new Error("Запрос отправлен, сервер ответил ошибкой")
    } else if (error.request) {
      console.error("Нету ответа от сервера", error.request);
      throw new Error("Нету ответа от сервера")
    } else {
      console.error("Ошибка настройки запроса к серверу", error.message);
      throw new Error("Ошибка настройки запроса к серверу")
    }
  } else if (error instanceof Error) {
    console.error("Общая ошибка:", error.message);
    throw new Error(`Произошла ошибка: ${error.message}`)
  } else {
    console.error("Неизвестная ошибка:", error);
    throw new Error("Произошла неизвестная ошибка")
  }
}

const addNewTodo = async (title: string): Promise<void> => {
  try {
    await apiClient.post('todos', {
        title: title,
        isDone: false,
    })
  } catch (error: unknown) {
    handleError(error);
  }
}

const updateTodo = async (id: number, updates: TodoRequest): Promise<void> => {
  try {
    await apiClient.put(`todos/${id}`, updates)
  } catch (error: unknown) {
    handleError(error);
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`todos/${id}`)
  } catch (error: unknown) {
    handleError(error);
  }
}

const getTodosData = async (tasksFilter: TodoStatus): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await apiClient.get('todos', {params: {filter: tasksFilter}})
    return data
  } catch (error: unknown) {
   return handleError(error);
  }
}

export default {addNewTodo, updateTodo, deleteTodo, getTodosData}