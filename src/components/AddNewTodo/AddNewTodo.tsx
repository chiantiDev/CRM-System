import * as React from "react";
import {FC, useState} from "react";
import {ValidateResult} from "../../types/todo.ts";
import todoApi from '../../api/todoApi.ts'
import validationInput from "../../helpers/validate/validationInput.ts";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import styles from './AddNewTodo.module.css'
import stylesValidationMessage from '../../helpers/validate/validationMessage.module.css'

interface AddNewTodoProps {
  updateTodoList: (value: boolean) => void
}

const AddNewTodo: FC<AddNewTodoProps> = ({updateTodoList}) => {

  const [validationResult, setValidationResult] = useState<ValidateResult>({
    errorMessage: '',
    isValid: true
  })

  const newTaskSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationResult(validationInput(e.target.input.value))
      try {
        if (validationInput(e.target.input.value).isValid) {
          await todoApi.addNewTodo(e.target.input.value)
          e.target.input.value = ''
          updateTodoList(true)
          return
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
        alert(errorMessage)
        console.error(errorMessage)
      }
  }

  return (
    <form className={styles.form} onSubmit={newTaskSubmit}>
      <div className={styles.inputWrapper}>
        <Input className={styles.newTodoInput} placeholder={'Task To Be Done...'}/>
        <p className={`${stylesValidationMessage.errorMessage} 
                       ${stylesValidationMessage.addNewTodo}
                       ${!validationResult.isValid ? stylesValidationMessage.addNewTodoVisible : ''}
                       `}
        >{validationResult.errorMessage}</p>
      </div>
      <Button type="submit" variant="primary">Add</Button>
    </form>
  )
}

export default AddNewTodo