import * as React from "react";
import {FC, useEffect, useState} from "react";
import {TodoStatus, Todo, TodoInfo, MetaResponse} from "../types/todo.ts"
import todoApi from '../api/todoApi.ts'
import AddNewTodo from "../components/AddNewTodo.tsx";
import {Button, Flex, Space} from "antd";
import TodoItem from "../components/TodoItem.tsx";

const TodosPage: FC = () => {
  const [todoStatus, setTodoStatus] = useState<TodoStatus>('all');
  const [todosData, setTodosData] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: {
      totalAmount: 0,
    },
  });

  const loadTodoList = async (): Promise<void> => {
      const data = await todoApi.getTodosData(todoStatus);
      setTodosData(data);
  };

  useEffect(() => {
    void loadTodoList()
    const timerTodos = setInterval(loadTodoList, 5000);
    return () => clearInterval(timerTodos);
  }, [todoStatus]);



  const boxStyleTodoPage: React.CSSProperties = {
    maxWidth: '400px',
    maxHeight: '800px',
    padding: '30px',
    backgroundColor: 'var(--color-background-200)',
    boxShadow: '0 0 5px 0 var(--color-shodow)',
    borderRadius: '10px',
  }

  const boxStyleButton: React.CSSProperties = {
    fontSize: '22px',
    paddingInline: '10px',
  }

  const boxStyleWrapperTodos: React.CSSProperties = {
    overflowY: 'auto',
    padding: "1px 10px 1px 1px",
  }

  return (
      <Flex vertical={true}
            align='center'
            justify="center"
            style={boxStyleTodoPage}
      >
        <AddNewTodo updateTodoList={loadTodoList}/>
        <Space style={{marginBottom: '10px'}}>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={boxStyleButton}
                  color={todoStatus === 'all' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('all')}}
          >Все ({todosData.info.all})</Button>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={boxStyleButton}
                  color={todoStatus === 'inWork' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('inWork')}}
          >в работе ({todosData.info.inWork})</Button>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={boxStyleButton}
                  color={todoStatus === 'completed' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('completed')}}
          >сделано ({todosData.info.completed})</Button>
        </Space>
        <Space vertical={true} style={boxStyleWrapperTodos}>
          {todosData.data.map((todo) =>
            <TodoItem key={todo.id}
                      id={todo.id}
                      titleTodo={todo.title}
                      isDone={todo.isDone}
                      updateTodoList={loadTodoList}
            />)}
        </Space>
      </Flex>
  )
}

export default TodosPage