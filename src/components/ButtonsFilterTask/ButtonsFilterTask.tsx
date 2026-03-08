import {FC} from "react";
import style from './ButtonsFilterTask.module.css';
import {Counts, TaskStatus} from "../../types/todo.ts";

interface ButtonsFilterTaskProps {
    taskFilter: TaskStatus
    setTaskFilter: (value: TaskStatus) => void
    counts: Counts
}

const ButtonsFilterTask: FC<ButtonsFilterTaskProps> = ({taskFilter, setTaskFilter, counts}) => {
    return (
      <div className={style.wrapperButtonsFilter}>
        <button className={`${style.buttonFilter} ${taskFilter === 'all' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTaskFilter('all')}>Все ({counts.all})
        </button>
        <button className={`${style.buttonFilter} ${taskFilter === 'inWork' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTaskFilter('inWork')}>в работе ({counts.inWork})
        </button>
        <button className={`${style.buttonFilter} ${taskFilter === 'completed' ? style.buttonActiveFilter : ''}`}
                onClick={() => setTaskFilter('completed')}>сделано ({counts.completed})
        </button>
      </div>
    )
}
export default ButtonsFilterTask;