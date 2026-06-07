import apiClient from "@/api/apiClient";
import {handleErrorTodo} from "@/api/apiError"
import {MetaResponse, Todo, TodoInfo, TodoRequest, TodoStatus} from "@/types/todo";

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

const getTodosData = async (tasksFilter: TodoStatus): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await apiClient.get('todos', {params: {filter: tasksFilter}})
    return data
  } catch (error: unknown) {
   return handleErrorTodo(error);
  }
}

export default {addNewTodo, updateTodo, deleteTodo, getTodosData}