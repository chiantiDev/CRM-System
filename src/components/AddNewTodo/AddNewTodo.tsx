import * as React from "react";
import {FC, useState} from "react";
import {ValidateResult} from "../../types/todo.ts";
import todoApi from '../../api/todoApi.ts'
import validationInput from "../../helpers/validate/validationInput.ts";
import ValidationMessage from "../ui/ValidationMessage/ValidationMessage.tsx";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import style from './AddNewTodo.module.css'

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
    <form className={style.form} onSubmit={newTaskSubmit}>
      <div className={style.inputWrapper}>
        <Input className={style.input} placeholder={'Task To Be Done...'}/>
        <ValidationMessage className={`${style.validMessage}
                                       ${!validationResult.isValid ? style.validMessageVisible : ''}`}
        >{validationResult.errorMessage}</ValidationMessage>
      </div>
      <Button className={style.button} type="submit">Add</Button>
    </form>
  )
}

export default AddNewTodo