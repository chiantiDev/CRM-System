import apiClient from "@/api/apiClient";
import {handleErrorTodo} from "@/api/apiError"
import {MetaResponse, Todo, TodoInfo, TodoRequest, TodoStatus} from "@/types/todo";
import axios, {AxiosRequestConfig} from "axios";

const addNewTodo = async (title: string): Promise<void> => {
  try {
    await apiClient.post('todos', {
        title: title,
        isDone: false,
    })
  } catch (error: unknown) {
    handleErrorTodo(error);
  }
}

const updateTodo = async (id: number, updates: TodoRequest): Promise<void> => {
  try {
    await apiClient.put(`todos/${id}`, updates)
  } catch (error: unknown) {
    handleErrorTodo(error);
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`todos/${id}`)
  } catch (error: unknown) {
    handleErrorTodo(error);
  }
}

const getTodosData = async (tasksFilter: TodoStatus, config?: AxiosRequestConfig): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await apiClient.get('todos', {params: {filter: tasksFilter}, ...config})
    return data
  } catch (error: unknown) {
    if (axios.isCancel(error)) throw error;
    return handleErrorTodo(error);
  }
}

export default {addNewTodo, updateTodo, deleteTodo, getTodosData}