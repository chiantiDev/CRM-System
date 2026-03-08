export type TaskStatus = 'all' | 'inWork' | 'completed'

export interface Task {
  id: number,
  title: string,
  isDone: boolean,
}

export interface Counts {
  all: number,
  inWork: number,
  completed: number,
}

export interface TaskResponse {
  tasks: Task[],
  counts: Counts,
}

export interface ValidationType {
  errorMessage: string,
  isValid: boolean,
}

export type ModeButtons = 'viewing' | 'editing'