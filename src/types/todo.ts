export type TasksStatus = 'all' | 'inWork' | 'completed'

export interface TaskItem {
  id: number,
  title: string,
  created: string,
  isDone: boolean,
}

export interface TasksStatuses {
  all: number,
  inWork: number,
  completed: number,
}

export interface TasksMeta {
  totalAmount: number
}

export interface MetaResponse<T, N, M> {
  data: T,
  info: N,
  meta: M,
}

export interface ValidationType {
  errorMessage: string,
  isValid: boolean,
}

export type ModeButtons = 'viewing' | 'editing'