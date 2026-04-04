import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
// import {ValidateResult} from "../../types/todo.ts";
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
  const [modeButtons, setModeButtons] = useState<'viewing' | 'editing'>('viewing');

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
    try {
      if (textValidation(e.target.input.value).isValid) {
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
      <div className={style.wrapperClasses}>
        <Input style={{ textDecoration: isDone ? 'line-through' : 'none' }} value={titleTodo} disabled={modeButtons !== 'editing'}/>
        {/*<p className={errorClasses}>{validation.errorMessage}</p>*/}
      </div>
      {modeButtons === 'viewing' &&
        (<>
          <IconButton style={{backgroundColor: 'var(--color-primary)'}}
                      onClick={editingTodo}
          >
            <img width={35} src="/src/assets/icons/buttonIcons/edit.svg" alt="deleting-todo"/>
          </IconButton>
          <IconButton style={{backgroundColor: 'var(--color-danger)'}}
                      onClick={deletingTodo}
          >
            <img width={35} src="/src/assets/icons/buttonIcons/delete.svg" alt="deleting-todo"/>
          </IconButton>
        </>)
      }
      {modeButtons === 'editing' &&
        (<>
          <IconButton style={{backgroundColor: 'var(--color-success)'}}
                      type={'submit'}
          >
            <img width={35} src="/src/assets/icons/buttonIcons/save.svg" alt="saving-editing-todo"/>
          </IconButton>
          <IconButton style={{border: '2px solid var(--color-outline)'}}
                      onClick={cancelEditingTodo}
          >
            <img width={35} src="/src/assets/icons/buttonIcons/cancel.svg" alt="cancel-editing-todo"/>
          </IconButton>
        </>)
      }
    </form>
  )
}

export default TodoItem