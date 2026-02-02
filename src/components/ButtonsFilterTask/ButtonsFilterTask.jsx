import style from './ButtonsFilterTask.module.css';

const ButtonsFilterTask = (props) => {
    return (
      <div className={style.wrapperButtonsFilter}>
        <button className={`${style.buttonFilter} ${props.taskFilter === 'all' ? style.buttonActiveFilter : null}`}
                onClick={() => props.setTaskFilter('all')}>Все ({props.count.all})
        </button>
        <button className={`${style.buttonFilter} ${props.taskFilter === 'inWork' ? style.buttonActiveFilter : null}`}
                onClick={() => props.setTaskFilter('inWork')}>в работе ({props.count.inWork})
        </button>
        <button className={`${style.buttonFilter} ${props.taskFilter === 'completed' ? style.buttonActiveFilter : null}`}
                onClick={() => props.setTaskFilter('completed')}>сделано ({props.count.completed})
        </button>
      </div>
    )
}
export default ButtonsFilterTask;