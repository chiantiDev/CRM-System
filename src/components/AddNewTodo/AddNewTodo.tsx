import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import textValidation from "../../helpers/validate/textValidation.ts";
// import {ValidateResult} from "../../types/todo.ts"
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import styles from './AddNewTodo.module.css'
import ValidationMessage from "../ValidationMessage/ValidationMessage.tsx";

interface AddNewTodoProps {
  updateTodoList: (value: boolean) => void
}

const AddNewTodo: FC<AddNewTodoProps> = ({updateTodoList}) => {
  const [valueInput, setValueInput] = useState<string>("");

  const newTaskSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValueInput(e.target.input.value)
    try {
      if (textValidation(e.target.input.value).isValid) {
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
        <ValidationMessage className={valueInput && styles.validationMessage} text={valueInput}/>
      </div>
      <Button type="submit" variant="primary">Add</Button>
    </form>
  )
}

export default AddNewTodo