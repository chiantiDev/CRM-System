import TaskInput from "./TaskInput.jsx";
import styles from './Todo.module.css'

const Todo = () => {
  return (
    <main className={styles.todo}>
      <TaskInput />
    </main>
  )
}

export default Todo