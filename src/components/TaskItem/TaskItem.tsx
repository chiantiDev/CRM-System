import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import {ModeButtons, ValidationType} from "../../types/todo.ts";
import textValidation from "../../helpers/validate/textValidation.ts";
import Input from "../ui/Input/Input.tsx";
import Checkbox from "../ui/CheckBox/Checkbox.tsx";
import IconButton from "../ui/IconButton/IconButton.tsx";
import style from "./TaskItem.module.css";

interface TaskItemProps {
  id: number
  titleTask: string
  isDone: boolean
  updateList: (value: boolean) => void
}

const TaskItem: FC<TaskItemProps> = ({id, titleTask, isDone, updateList}) => {
  const [title, setTitle] = useState<string>(titleTask)
  const [isModeButtons, setIsModeButtons] = useState<ModeButtons>('viewing');
  const [error, setError] = useState<ValidationType>({
    errorMessage: '',
    isValid: false
  });

  const checkedTask = async (checked: boolean) => {
    try {
      await todoApi.putTaskChecked(checked, id)
      updateList(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const editingTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModeButtons('editing')
  }

  const savingEditedTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (textValidation(title).isValid) {
        setError(textValidation(title))
        await todoApi.putTaskEdit(title, id)
        setIsModeButtons('viewing')
        updateList(true)
        return
      }
      setError(textValidation(title))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const cancelEditingTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setTitle(await todoApi.getTitleTask(id))
      setError({
        errorMessage: '',
        isValid: false
      })
      setIsModeButtons('viewing')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  const deletingTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await todoApi.deleteTask(id)
      updateList(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      alert(errorMessage)
      console.error(errorMessage)
    }
  }

  return (
    <form className={style.form}>
      <Checkbox defaultChecked={isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkedTask(e.target.checked)}
      />
      <Input size={'medium'}
             value={title}
             disabled={isModeButtons !== 'editing'}
             isDone={isDone}
             validation={error}
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