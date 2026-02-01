import {useState} from "react";
import fetchPutTaskChecked from "../../../api/fetchPutTaskChecked.jsx";
import validate from "../../../helpers/validate/validate.jsx";
import fetchPutTaskEdit from "../../../api/fetchPutTaskEdit.jsx";
import fetchDeleteTask from "../../../api/fetchDeleteTask.jsx";
import style from "./TaskItem.module.css";
import Button from "../../common/Button/Button.jsx";


const TaskItem = (props) => {
  const [title, setTitle] = useState(`${props.title}`)
  const [valid, setValid] = useState({});
  const [taskEditDisabled, setTaskEditDisabled] = useState(true)
  const [buttonEditAndSaveType, setButtonEditAndSaveType] = useState('edit')
  const [buttonDeleteAndCancelType, setButtonDeleteAndCancelType] = useState('delete')
  const [clickDeleteOrCancel, setClickDeleteOrCancel] = useState(true)

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

  const checkedTask = async (checked) => {
    try {
      await fetchPutTaskChecked(checked, props.id)
      props.updateTodoList()
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const saveEditTask = async () => {
    try {
      setValid(validate(title, 'textarea'))

      if (validate(title).isValid) {
        await fetchPutTaskEdit(title, props.id)
        editButton()
        props.updateTodoList()
      }
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const cancelEditTask = () => {
    setTitle(props.title)
    editButton()
  }

  const deleteTask = async () => {
    try {
      await fetchDeleteTask(props.id)
      props.updateTodoList()
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <div className={style.taskItem}>
      <input className={style.checkbox}
             type="checkbox"
             defaultChecked={props.isDone}
             onChange={(e) => checkedTask(e.target.checked)}/>
      <div className={style.wrapperTextarea}>
        <textarea className={`${style.textarea} ${props.isDone ? style.isDone : null}`}
                  value={title}
                  disabled={taskEditDisabled}
                  onChange={(e) => setTitle(e.target.value)}/>
        {valid.message}
      </div>
      <Button name='ButtonsTaskItem'
              clickDeleteOrCancel={clickDeleteOrCancel}
              saveEditTask={saveEditTask}
              editButton={editButton}
              deleteTask={deleteTask}
              cancelEditTask={cancelEditTask}/>
    </div>
  )
}

export default TaskItem