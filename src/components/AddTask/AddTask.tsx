import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import textValidation from "../../helpers/validate/textValidation.ts";
import {ValidationType} from "../../types/todo.ts"
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import style from './AddTask.module.css'

interface AddTaskProps {
  updateList: (value: boolean) => void
}

const AddTask: FC<AddTaskProps> = ({updateList}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [validationError, setValidationError] = useState<ValidationType>({
    errorMessage: '',
    isValid: false
  });

  const newTaskSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (textValidation(inputValue).isValid) {
        setValidationError(textValidation(inputValue))
        await todoApi.postTask(inputValue)
        setInputValue('')
        updateList(true)
        return
      }
      setValidationError(textValidation(inputValue))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  return (
    <form className={style.form} onSubmit={newTaskSubmit}>
      <Input size={'large'}
             placeholder={'Task To Be Done...'}
             value={inputValue}
             validation={validationError}
             errorMessageFor={'addTask'}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <Button type="submit" variant="primary">Add</Button>
    </form>
  )
}

export default AddTask