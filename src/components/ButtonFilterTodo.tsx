import {FC} from "react";
import {TodoInfo, TodoStatus} from "../types/todo.ts";
import {Button, Space} from "antd";

type ButtonFilterTodoProps = {
  todoStatus: TodoStatus;
  setTodoStatus: (value: TodoStatus) => void;
  todoInfo: TodoInfo;
}

const ButtonFilterTodo: FC<ButtonFilterTodoProps> = ({todoStatus, setTodoStatus, todoInfo}) => {
  return (
    <Space size="medium">
      <Button type='text'
              variant='text'
              size='large'
              color={todoStatus === 'all' ? 'primary' : undefined}
              onClick={() => {setTodoStatus('all')}}
      >Все ({todoInfo.all})</Button>
      <Button type='text'
              variant='text'
              size='large'
              color={todoStatus === 'inWork' ? 'primary' : undefined}
              onClick={() => {setTodoStatus('inWork')}}
      >в работе ({todoInfo.inWork})</Button>
      <Button type='text'
              variant='text'
              size='large'
              color={todoStatus === 'completed' ? 'primary' : undefined}
              onClick={() => {setTodoStatus('completed')}}
      >сделано ({todoInfo.completed})</Button>
    </Space>
  )
}

export default ButtonFilterTodo