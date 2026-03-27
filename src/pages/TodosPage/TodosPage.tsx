import {useEffect, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import AddNewTodo from "../../components/AddNewTodo/AddNewTodo.tsx";
import ButtonsFilterTodo from "../../components/ButtonsFilterTodo/ButtonsFilterTodo.tsx";
import TodoItem from "../../components/TodoItem/TodoItem.tsx";
import {TodoStatus, Todo, TodoInfo, MetaResponse} from "../../types/todo.ts"
import style from './TodosPage.module.css'

const TodosPage = () => {
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
  const [shouldUpdateTodoList, setShouldUpdateTodoList] = useState<boolean>(false);

  useEffect(() => {
    const currentTodoList = async () => {
      try {
        const result: MetaResponse<Todo, TodoInfo> = await todoApi.getTodosData(todoStatus);
        setTodosData(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
        alert(errorMessage)
        console.error(errorMessage)
      } finally {
        setShouldUpdateTodoList(false);
      }
    };

    void currentTodoList()
  }, [shouldUpdateTodoList, todoStatus]);

  return (
    <main className={style.main}>
      <section className={style.todo}>
        <AddNewTodo updateTodoList={setShouldUpdateTodoList}/>
        <ButtonsFilterTodo todoFilter={todoStatus}
                           setTodoFilter={setTodoStatus}
                           todoInfo={todosData.info}/>
        <div className={style.wrapperTaskList}>
          {todosData.data.map((todo) =>
            <TodoItem key={todo.id}
                      id={todo.id}
                      titleTodo={todo.title}
                      isDone={todo.isDone}
                      updateTodoList={setShouldUpdateTodoList}
            />)}
        </div>
      </section>
    </main>
  )
}

export default TodosPage