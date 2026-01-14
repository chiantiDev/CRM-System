import {useState} from "react";
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
import styles from './Todo.module.css'


const Todo = () => {
  const [updateTaskList, setUpdateTaskList] = useState(false)

  const inputUpdateTaskList = () => {
    setUpdateTaskList(!updateTaskList)
  }

  return (
    <main className={styles.todo}>
      <TaskInput inputUpdateTaskList={inputUpdateTaskList}/>
      <TaskList updateList={updateTaskList}/>
    </main>
  )
}

export default Todo