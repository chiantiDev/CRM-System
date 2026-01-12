import {useState} from "react";
import styles from './TaskInput.module.css'

const TaskInput = () => {
  const [taskValue, setTaskValue] = useState('')
  const [validText, setValidText] = useState('')
  const [showValidText, setShowValidText] = useState(false)

  const newTaskSubmit = (e) => {
    e.preventDefault()

    if (taskValue.length === 0) {
      setValidText('Это поле не может быть пустым')
      setShowValidText(true)
    } else if(taskValue.length < 2) {
      setValidText('Минимальная длина текста 2 символа')
      setShowValidText(true)
    } else if(taskValue.length > 64) {
      setValidText('Максимальная длина текста 64 символа')
      setShowValidText(true)
    } else {
      fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskValue,
          isDone: false,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
        .then(result => console.log(result) )
        .catch(error => console.log(error))
        .finally(() => {
          setTaskValue('')
          setShowValidText(false)
        })
    }
  }

  return (
    <>
      <form className={styles.form}  onSubmit={newTaskSubmit}>
        <div className={styles.inputWrapper}>
          <input className={styles.input} value={taskValue} placeholder={'Task To Be Done...'} onChange={(e) => setTaskValue(e.target.value)}/>
          <div className={`${styles.validText} ${showValidText ? styles.active : styles.noActive}`}>{validText}</div>
        </div>
        <button className={styles.button} type="submit">Add</button>
      </form>
      {}
    </>
  )
}

export default TaskInput