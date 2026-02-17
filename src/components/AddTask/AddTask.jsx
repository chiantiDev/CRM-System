import {useState} from "react";
import todoApi from '../../api/todos.js'
import textValidation from "../../helpers/validate/textValidation.jsx";
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import style from './AddTask.module.css'


const AddTask = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState({
    errorMessage: '',
    isValid: false
  });

  const newTaskSubmit = async (e) => {
    e.preventDefault()
    try {
      if (textValidation(inputValue).isValid) {
        setError(textValidation(inputValue))
        await todoApi.postTask(inputValue)
        setInputValue('')
        props.isUpdateList(true)
        return
      }
      setError(textValidation(inputValue))
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <form className={style.form} onSubmit={newTaskSubmit}>
      <Input size={'large'}
             placeholder={'Task To Be Done...'}
             value={inputValue}
             error={error}
             errorMessageFor={'addTask'}
             onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" variant="primary">Add</Button>
    </form>
  )
}

export default AddTask