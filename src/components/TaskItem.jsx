import {useState} from "react";
import style from "./TaskItem.module.css";
import styleValid from "./ValidText.module.css";

const TaskItem = (props) => {
  const [taskEditDisabled, setTaskEditDisabled] = useState(true)
  const [title, setTitle] = useState(`${props.title}`)
  const [buttonEditAndSaveType, setButtonEditAndSaveType] = useState('edit')
  const [buttonDeleteAndCancelType, setButtonDeleteAndCancelType] = useState('delete')
  const [clickDeleteOrCancel, setClickDeleteOrCancel] = useState(true)
  const [validText, setValidText] = useState('')
  const [showValidText, setShowValidText] = useState(false)

  const editButton = () => {
    if (buttonEditAndSaveType === 'edit' && buttonDeleteAndCancelType === 'delete') {
      setButtonEditAndSaveType('save')
      setButtonDeleteAndCancelType('cancel')
      setTaskEditDisabled(false)
      setClickDeleteOrCancel(false)
    } else {
      setButtonEditAndSaveType('edit')
      setButtonDeleteAndCancelType('delete')
      setTaskEditDisabled(true)
      setClickDeleteOrCancel(true)
    }
  }

  const checkedTask = (checked) => {
    fetch(`https://easydev.club/api/v1/todos/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({isDone: checked}),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(result => console.log(result))
      .catch(error => console.log(error))
      .finally(() => {
        props.updateTaskList()
      })
  }

  const saveEditTask = () => {
    if (title.length === 0) {
      setValidText('Это поле не может быть пустым')
      setShowValidText(true)
    } else if (title.length < 2) {
      setValidText('Минимальная длина текста 2 символа')
      setShowValidText(true)
    } else if (title.length > 64) {
      setValidText('Максимальная длина текста 64 символа')
      setShowValidText(true)
    } else {
      fetch(`https://easydev.club/api/v1/todos/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: title}),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then(result => console.log(result))
        .catch(error => console.log(error))
        .finally(() => {
          editButton()
          setShowValidText(false)
          props.updateTaskList()
        })
    }
  }

  const cancelEditTask = () => {
    setShowValidText(false)
    setTitle(props.title)
    editButton()
  }

  const deleteTask = () => {
    fetch(`https://easydev.club/api/v1/todos/${props.id}`, {
      method: 'DELETE',
    }).finally(() => {
      props.updateTaskList()
    })
  }

  return (
    <div className={style.taskItem}>
      <input className={style.checkbox} type="checkbox" defaultChecked={props.isDone}
             onChange={(e) => checkedTask(e.target.checked)}/>
      <div className={style.wrapperTextarea}>
        <textarea className={`${style.textarea} ${props.isDone ? style.isDone : null}`} value={title}
                  disabled={taskEditDisabled} onChange={(e) => setTitle(e.target.value)}/>
        <div style={{width: '83%', top: '55px'}}
             className={`${styleValid.validText} ${showValidText ? styleValid.active : styleValid.noActive}`}>{validText}</div>
      </div>
      <button className={`${style.button} ${!clickDeleteOrCancel ? style.save : style.edit}`} type={"button"}
              onClick={!clickDeleteOrCancel ? saveEditTask : editButton}></button>
      <button className={`${style.button} ${clickDeleteOrCancel ? style.delete : style.cancel}`} type={"button"}
              onClick={clickDeleteOrCancel ? deleteTask : cancelEditTask}></button>
    </div>
  )
}

export default TaskItem