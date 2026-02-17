import {useState} from "react";
import todoApi from '../../api/todos.js'
import textValidation from "../../helpers/validate/textValidation.jsx";
import Input from "../ui/Input/Input.jsx";
import Checkbox from "../ui/Checkbox/Checkbox.jsx";
import IconButton from "../ui/IconButton/IconButton.jsx";
import style from "./TaskItem.module.css";


const TaskItem = (props) => {
  const [title, setTitle] = useState(props.title)
  const [isModeButtons, setIsModeButtons] = useState('viewing');
  const [error, setError] = useState({
    errorMessage: '',
    isValid: false
  });

  const checkedTask = async (checked) => {
    try {
      await todoApi.putTaskChecked(checked, props.id)
      props.isUpdateList(true)
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const editingTask = (e) => {
    e.preventDefault()
    setIsModeButtons('editing')
  }

  const savingEditedTask = async (e) => {
    e.preventDefault()
    try {
      if (textValidation(title).isValid) {
        setError(textValidation(title))
        await todoApi.putTaskEdit(title, props.id)
        setIsModeButtons('viewing')
        props.isUpdateList(true)
        return
      }
      setError(textValidation(title))
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const cancelEditingTask = (e) => {
    e.preventDefault()
    setTitle(props.title)
    setError({
      errorMessage: '',
      isValid: false
    })
    setIsModeButtons('viewing')
  }

  const deletingTask = async (e) => {
    e.preventDefault()
    try {
      await todoApi.deleteTask(props.id)
      props.isUpdateList(true)
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <form className={style.form}>
      <Checkbox defaultChecked={props.isDone}
                onChange={(e) => checkedTask(e.target.checked)}
      />
      <Input size={'medium'}
             value={title}
             disabled={isModeButtons !== 'editing'}
             isDone={props.isDone}
             error={error}
             errorMessageFor={'taskItem'}
             onChange={(e) => setTitle(e.target.value)}
      />
      <IconButton type={'edit'} isModeButtons={isModeButtons} onClick={editingTask}></IconButton>
      <IconButton type={'save'} isModeButtons={isModeButtons} onClick={savingEditedTask}></IconButton>
      <IconButton type={'cancel'} isModeButtons={isModeButtons} onClick={cancelEditingTask}></IconButton>
      <IconButton type={'delete'} isModeButtons={isModeButtons} onClick={deletingTask}></IconButton>
    </form>
  )
}

export default TaskItem