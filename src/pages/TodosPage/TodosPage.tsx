import * as React from "react";
import {FC, useEffect, useState} from "react";
import {TodoStatus, Todo, TodoInfo, MetaResponse} from "../../types/todo.ts"
import todoApi from '../../api/todoApi.ts'
import AddNewTodo from "../../components/AddNewTodo/AddNewTodo.tsx";
import {Button, Flex, Space} from "antd";
import TodoItem from "../../components/TodoItem/TodoItem.tsx";

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
  }, [todoStatus]);


  const boxStyle: React.CSSProperties = {
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'var(--color-background-200)',
    boxShadow: '0 0 5px 0 var(--color-shodow)',
    borderRadius: '10px',
  }

  return (
      <Flex vertical={true}
            align='center'
            justify="center"
            style={boxStyle}
      >
        <AddNewTodo updateTodoList={loadTodoList}/>
        <Space style={{marginBottom: '10px'}}>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={{fontSize: '22px'}}
                  color={todoStatus === 'all' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('all')}}
          >Все ({todosData.info.all})</Button>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={{fontSize: '22px'}}
                  color={todoStatus === 'inWork' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('inWork')}}
          >в работе ({todosData.info.inWork})</Button>
          <Button type='text'
                  variant='text'
                  size='large'
                  style={{fontSize: '22px'}}
                  color={todoStatus === 'completed' ? 'primary' : undefined}
                  onClick={() => {setTodoStatus('completed')}}
          >сделано ({todosData.info.completed})</Button>
        </Space>
          {todosData.data.map((todo) =>
            <TodoItem key={todo.id}
                      id={todo.id}
                      titleTodo={todo.title}
                      isDone={todo.isDone}
                      updateTodoList={loadTodoList}
            />)}
      </Flex>
  )
}

export default TodosPage