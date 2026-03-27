import {TasksStatus, TaskItem, TasksStatuses, TasksMeta, MetaResponse} from "../types/todo.ts";
const BASE_URL = 'https://easydev.club/api/v1/'

const addNewTask = async (title: string): Promise<void> => {
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


const getTodoListData = async (tasksFilter: TasksStatus): Promise<MetaResponse<TaskItem, TasksStatuses, TasksMeta>> => {
  const response = await fetch(`${BASE_URL}todos=${tasksFilter}`, {
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

const updateTask = async (id: number, updates: {title?: string, isDone?: boolean}): Promise<void> => {
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

const deleteTask = async (id: number): Promise<void> => {
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

export default {addNewTask, getTodoListData, updateTask, deleteTask}