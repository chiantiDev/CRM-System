import {FC, useCallback, useEffect, useRef, useState} from "react";
import {TodoStatus, Todo, TodoInfo, MetaResponse} from "../types/todo.ts"
import todoApi from '../api/todoApi.ts'
import AddNewTodo from "../components/AddNewTodo.tsx";
import TodoItem from "../components/TodoItem.tsx";
import ButtonFilterTodo from "../components/ButtonFilterTodo.tsx";


const TodosPage: FC = () => {
  const [todoStatus, setTodoStatus] = useState<TodoStatus>('all');
  const [todosData, setTodosData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {all: 0, completed: 0, inWork: 0},
    meta: {totalAmount: 0},
  });

  const todoStatusRef = useRef(todoStatus);
  useEffect(() => {
    todoStatusRef.current = todoStatus;
  }, [todoStatus]);

  const loadTodoList = useCallback(async (): Promise<void> => {
    try {
      const data = await todoApi.getTodosData(todoStatusRef.current);
      setTodosData(data);
    } catch (error: unknown) {
      alert(`Ошибка запроса: ${error}`);
    }
  }, []);

  useEffect(() => {
    void loadTodoList();
    const timerTodos = setInterval(() => {void loadTodoList()}, 5000);
    return () => clearInterval(timerTodos);
  }, [todoStatus, loadTodoList]);

  return (
    <>
      <AddNewTodo updateTodoList={loadTodoList}/>
      <ButtonFilterTodo todoStatus={todoStatus} setTodoStatus={setTodoStatus} todoInfo={todosData.info}/>
      {todosData.data.map((todo) =>
        <TodoItem key={todo.id}
                  id={todo.id}
                  titleTodo={todo.title}
                  isDone={todo.isDone}
                  updateTodoList={loadTodoList}
        />)}
    </>
  )
}

export default TodosPage