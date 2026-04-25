import {FC} from "react";
import {TodoInfo, TodoStatus} from "../../types/todo.ts";
import style from './ButtonsFilterTodo.module.css';

interface ButtonsFilterTaskProps {
    todoFilter: TodoStatus
    setTodoFilter: (value: TodoStatus) => void
    todoInfo: TodoInfo
}

const ButtonsFilterTodo: FC<ButtonsFilterTaskProps> = ({todoFilter, setTodoFilter, todoInfo}) => {
    return (
      <div className={style.wrapperButtonsFilter}>
        <button className={`${style.buttonFilter} ${todoFilter === 'all' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTodoFilter('all')}>Все ({todoInfo.all})
        </button>
        <button className={`${style.buttonFilter} ${todoFilter === 'inWork' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTodoFilter('inWork')}>в работе ({todoInfo.inWork})
        </button>
        <button className={`${style.buttonFilter} ${todoFilter === 'completed' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTodoFilter('completed')}>сделано ({todoInfo.completed})
        </button>
      </div>
    )
}
export default ButtonsFilterTodo;