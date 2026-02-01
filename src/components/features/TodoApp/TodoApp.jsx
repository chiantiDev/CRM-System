import {useState} from "react";
import AddTask from "../AddTask/AddTask.jsx";
import TodoList from "../TodoList/TodoList.jsx";
import styles from './TodoApp.module.css'


const TodoApp = () => {
  const [updateList, setUpdateList] = useState(false)

  const updateTodoList = () => {
    setUpdateList(!updateList)
  }

  return (
    <main className={styles.main}>
      <section className={styles.todo}>
        <AddTask updateTodoList={updateTodoList}/>
        <TodoList updateList={updateList} updateTodoList={updateTodoList}/>
      </section>
    </main>
  )
}

export default TodoApp