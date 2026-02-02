import {useState} from "react";
import validate from '../../helpers/validate/validate.jsx'
import fetchPostTask from '../../api/fetchPostTask.jsx'
import style from './AddTask.module.css'

const AddTask = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [valid, setValid] = useState({});

  const newTaskSubmit = async (e) => {
    e.preventDefault()
    try {
      setValid(validate(inputValue, 'input'))
      validate(inputValue).isValid ? await fetchPostTask(inputValue) : null
      setInputValue('')
      props.updateTodoList()
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <form className={style.form} onSubmit={newTaskSubmit}>
      <div className={style.inputWrapper}>
        <input className={style.input} type="text" placeholder={'Task To Be Done...'} value={inputValue}
               onChange={(e) => {setInputValue(e.target.value)}}/>
        {valid.message}
      </div>
      <button className={style.buttonAddTask} type="submit">Add</button>
    </form>
  )
}

export default AddTask