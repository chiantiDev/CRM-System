import {FC, useCallback, useEffect, useRef, useState} from "react";
import {MetaResponse, Todo, TodoInfo, TodoStatus} from "@/types/todo"
import {message} from "antd";
import todoApi from '@/api/todoApi'
import AddNewTodo from "@/components/AddNewTodo";
import MenuFilterTodo from "@/components/MenuFilterTodo";
import TodoList from "@/components/TodoList";
import axios from "axios";

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

  const loadTodoList = useCallback(async (signal?: AbortSignal): Promise<void> => {
    try {
      const data = await todoApi.getTodosData(todoStatusRef.current, { signal });
      setTodosData(data);
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      await messageApi.error('Ошибка загрузки списка дел')
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadTodoList(controller.signal);
    const timerTodos = setInterval(() => {void loadTodoList()}, 5000);
    return () => {
      clearInterval(timerTodos);
      controller.abort();
    };
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