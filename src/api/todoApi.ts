import {Todo, TodoRequest, TodoInfo, MetaResponse, TodoStatus} from "../types/todo.ts";
import axios, {AxiosError} from "axios";

const apiClient = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const handleError = (error: AxiosError) => {
  const errorMessage = error.message || "Неизвестная ошибка";
  alert(errorMessage)
  console.error(errorMessage)
}

const addNewTodo = async (title: string): Promise<void> => {
  try {
    await apiClient.post('todos', {
        title: title,
        isDone: false,
    })
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
}

const updateTodo = async (id: number, updates: TodoRequest): Promise<void> => {
  try {
    await apiClient.put(`todos/${id}`, updates)
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`todos/${id}`)
  } catch (error) {
    handleError(error as AxiosError);
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
  } catch (error) {
    handleError(error as AxiosError);
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
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
}

export default {addNewTodo, updateTodo, deleteTodo, getTodoById, getTodosData}