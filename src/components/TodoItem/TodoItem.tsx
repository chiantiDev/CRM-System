import * as React from "react";
import {FC, useState} from "react";
import {ValidateResult} from "../../types/todo.ts";
import todoApi from '../../api/todoApi.ts'
import validationInput from "../../helpers/validate/validationInput.ts";
import ValidationMessage from "../ui/ValidationMessage/ValidationMessage.tsx";
import Input from "../ui/Input/Input.tsx";
import Checkbox from "../ui/CheckBox/Checkbox.tsx";
import IconButton from "../ui/IconButton/IconButton.tsx";
import style from "./TodoItem.module.css";

interface TodoItemProps {
  id: number
  titleTodo: string
  isDone: boolean
  updateTodoList: (value: boolean) => void
}

const TodoItem: FC<TodoItemProps> = ({id, titleTodo, isDone, updateTodoList}) => {
  const [title, setTitle] = useState<string>(titleTodo)
  const [modeButtons, setModeButtons] = useState<'viewing' | 'editing'>('viewing');
  const [validationResult, setValidationResult] = useState<ValidateResult>({
    errorMessage: '',
    isValid: true
  })

  const checkedTodo = async (isDone: boolean) => {
    try {
      await todoApi.updateTodo(id, {isDone})
      updateTodoList(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const editingTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModeButtons('editing')
  }

  const savingEditedTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationResult(validationInput(e.target.input.value))
    try {
      if (validationInput(e.target.input.value).isValid) {
        await todoApi.updateTodo(id, {title: e.target.input.value})
        setModeButtons('viewing')
        updateTodoList(true)
        return
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const cancelEditingTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setTitle(titleTodo)
    setValidationResult({
      errorMessage: '',
      isValid: true
    })
    setModeButtons('viewing')
  }

  const deletingTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await todoApi.deleteTodo(id)
      updateTodoList(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  return (
    <form className={style.form} onSubmit={savingEditedTodo}>
      <Checkbox defaultChecked={isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkedTodo(e.target.checked)}
      />
      <div className={style.inputWrapper}>
        <Input className={`
               ${style.input}
               ${isDone ? style.isDone: ''}
               ${modeButtons === 'editing' ? style.activeInput : ''}
               `}
               value={title}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
               disabled={modeButtons === 'viewing'}
        />
        <ValidationMessage className={`${style.validMessage}
                                       ${!validationResult.isValid ? style.validMessageVisible : ''}`}
        >{validationResult.errorMessage}</ValidationMessage>
      </div>
      {modeButtons === 'viewing' &&
        (<>
          <IconButton className={style.editButton} type={"button"} onClick={editingTodo}>
            <img width={35} src="/src/assets/icons/buttonIcons/edit.svg" alt="editing-todo"/>
          </IconButton>
          <IconButton className={style.deleteButton} type={"button"} onClick={deletingTodo}>
            <img width={35} src="/src/assets/icons/buttonIcons/delete.svg" alt="deleting-todo"/>
          </IconButton>
        </>)
      }
      {modeButtons === 'editing' &&
        (<>
          <IconButton className={style.saveButton} type={"submit"}>
            <img width={35} src="/src/assets/icons/buttonIcons/save.svg" alt="saving-editin-todo"/>
          </IconButton>
          <IconButton className={style.cancelButton} type={"button"} onClick={cancelEditingTodo}>
            <img width={35} src="/src/assets/icons/buttonIcons/cancel.svg" alt="cancel-editing-todo"/>
          </IconButton>
        </>)
      }
    </form>
  )
}

export default TodoItem