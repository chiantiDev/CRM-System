export type TodoStatus = 'all' | 'completed' | 'inWork'

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export type TodoRequest = Partial<Omit<Todo, "id" | "created">>

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export interface MetaResponse<T, N> {
  data: T[]
  info: N
  meta: {
    totalAmount: number
  }
}