import {Todo, TodoRequest, TodoInfo, MetaResponse, TodoStatus} from "../types/todo.ts";

const BASE_URL = 'https://easydev.club/api/v1/'

const addNewTodo = async (title: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      isDone: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

const updateTodo = async (id: number, updates: TodoRequest): Promise<void> => {
  const response = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

const getTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  return {
    id: result.id,
    title: result.title,
    created: result.created,
    isDone: result.isDone,
  };
}

const getTodosData = async (tasksFilter: TodoStatus): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await fetch(`${BASE_URL}todos?filter=${tasksFilter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  return {
    data: result.data,
    info: result.info,
    meta: result.meta,
  };
}

export default {addNewTodo, updateTodo, deleteTodo, getTodoById, getTodosData}