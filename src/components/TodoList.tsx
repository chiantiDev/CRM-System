import {FC} from "react";
import {MetaResponse, Todo, TodoInfo} from "@/types/todo";
import TodoItem from "@/components/TodoItem";

interface TodoListProps {
  todosData: MetaResponse<Todo, TodoInfo>,
  onUpdate: () => Promise<void>
}

const TodoList: FC<TodoListProps> = ({todosData, onUpdate}) => {
  return (
    <>
      {todosData.data.map((todo) =>
        <TodoItem key={todo.id}
                  id={todo.id}
                  titleTodo={todo.title}
                  isDone={todo.isDone}
                  onUpdate={onUpdate}
        />)}
    </>
  )
}

export default TodoList