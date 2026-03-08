import {TaskStatus, TaskResponse} from "../types/todo.ts";

const postTask = async (title: string): Promise<void> => {
  const response = await fetch('https://easydev.club/api/v1/todos', {
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


const getTask = async (taskFilter: TaskStatus): Promise<TaskResponse> => {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${taskFilter}`, {
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
    tasks: result.data,
    counts: result.info
  };
}

const putTaskChecked = async (checked: boolean, id: number): Promise<void> => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({isDone: checked}),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

const putTaskEdit = async (title: string, id: number): Promise<void> => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title: title}),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
  }
}

export default {postTask, getTask, putTaskChecked, putTaskEdit, deleteTask}