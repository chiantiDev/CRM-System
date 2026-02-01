import style from './Button.module.css';

const Button = (props) => {

  if (props.name === 'ButtonAddTask') {
    return (
      <button className={style.buttonAddTask} type="submit">Add</button>
    )
  }

  if (props.name === 'ButtonsFilterTask') {
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
  if (props.name === 'ButtonsTaskItem') {
    return (
      <>
        <button className={`${style.buttonTaskItem} ${!props.clickDeleteOrCancel ? style.save : style.edit}`}
                onClick={!props.clickDeleteOrCancel ? props.saveEditTask : props.editButton}></button>
        <button className={`${style.buttonTaskItem} ${props.clickDeleteOrCancel ? style.delete : style.cancel}`}
                onClick={props.clickDeleteOrCancel ? props.deleteTask : props.cancelEditTask}></button>
      </>
    )
  }
}
export default Button;