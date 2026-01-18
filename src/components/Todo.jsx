import {useState} from "react";
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
import styles from './Todo.module.css'


const Todo = () => {
  const [updateList, setUpdateList] = useState(false)

  const updateTaskList = () => {
    setUpdateList(!updateList)
  }

  return (
    <main className={styles.main}>
      <div className={styles.todo}>
        <TaskInput updateTaskList={updateTaskList}/>
        <TaskList updateList={updateList} updateTaskList={updateTaskList}/>
      </div>
    </main>
  )
}

export default Todo