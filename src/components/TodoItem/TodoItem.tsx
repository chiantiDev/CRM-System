import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import {ModeButtons, ValidationType} from "../../types/todo.ts";
import textValidation from "../../helpers/validate/textValidation.ts";
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
  const [isModeButtons, setIsModeButtons] = useState<ModeButtons>('viewing');
  const [error, setError] = useState<ValidationType>({
    errorMessage: '',
    isValid: false
  });

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
    setIsModeButtons('editing')
  }

  const savingEditedTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (textValidation(title).isValid) {
        setError(textValidation(title))
        await todoApi.updateTodo(id, {title})
        setIsModeButtons('viewing')
        updateTodoList(true)
        return
      }
      setError(textValidation(title))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const cancelEditingTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setTitle(titleTodo)
    setIsModeButtons('viewing')
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
    <form className={style.form}>
      <Checkbox defaultChecked={isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkedTodo(e.target.checked)}
      />
      <Input size={'medium'}
             value={title}
             disabled={isModeButtons !== 'editing'}
             isDone={isDone}
             validation={error}
             errorMessageFor={'taskItem'}
             onChange={(e) => setTitle(e.target.value)}
      />
      <IconButton type={'edit'} isModeButtons={isModeButtons} onClick={editingTodo}></IconButton>
      <IconButton type={'save'} isModeButtons={isModeButtons} onClick={savingEditedTodo}></IconButton>
      <IconButton type={'cancel'} isModeButtons={isModeButtons} onClick={cancelEditingTodo}></IconButton>
      <IconButton type={'delete'} isModeButtons={isModeButtons} onClick={deletingTodo}></IconButton>
    </form>
  )
}

export default TodoItem