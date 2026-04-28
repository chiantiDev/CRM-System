import {FC, useCallback, useEffect, useRef, useState} from "react";
import {TodoStatus, Todo, TodoInfo, MetaResponse} from "../types/todo.ts"
import {message} from "antd";
import todoApi from '../api/todoApi.ts'
import AddNewTodo from "../components/AddNewTodo.tsx";
import MenuFilterTodo from "../components/MenuFilterTodo.tsx";
import TodoList from "../components/TodoList.tsx";


const TodosPage: FC = () => {
  const [todoStatus, setTodoStatus] = useState<TodoStatus>('all');
  const [todosData, setTodosData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {all: 0, completed: 0, inWork: 0},
    meta: {totalAmount: 0},
  });
  const [messageApi, contextHolder] = message.useMessage();

  const todoStatusRef = useRef(todoStatus);
  useEffect(() => {
    todoStatusRef.current = todoStatus;
  }, [todoStatus]);

  const loadTodoList = useCallback(async (): Promise<void> => {
    try {
      const data = await todoApi.getTodosData(todoStatusRef.current);
      setTodosData(data);
    } catch (error: unknown) {
      messageApi.open({
        type: 'error',
        content: `${error}`,
      })
    }
  }, []);

  useEffect(() => {
    void loadTodoList();
    const timerTodos = setInterval(() => {void loadTodoList()}, 5000);
    return () => clearInterval(timerTodos);
  }, [todoStatus, loadTodoList]);

  return (
    <>
      {contextHolder}
      <AddNewTodo onUpdate={loadTodoList}/>
      <MenuFilterTodo todoStatus={todoStatus} setTodoStatus={setTodoStatus} todoInfo={todosData.info}/>
      <TodoList todosData={todosData} onUpdate={loadTodoList}/>
    </>
  )
}

export default TodosPage