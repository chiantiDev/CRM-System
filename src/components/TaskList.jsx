import {useState, useEffect} from "react";
import style from "./TaskList.module.css"

const TaskList = (props) => {
  const [tasks, setTasks] = useState([])
  const [taskFilter, setTaskFilter] = useState('all')
  const [taskCount, setTaskCount] = useState([])

  const showTaskFilter = (props) => {
    setTaskFilter(props)
  }

  useEffect(() => {
    fetch(`https://easydev.club/api/v1/todos?filter=${taskFilter}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setTasks(result.data)
        setTaskCount(result.info)
      })
      .catch(error => console.log(error.message))
  }, [props.updateList, taskFilter]);

  return (
    <>
      <div className={style.wrapperButton}>
        <button className={`${style.button} ${taskFilter === 'all' ? style.buttonActive : null}`}
                onClick={() => showTaskFilter('all')}>Все ({taskCount.all})
        </button>
        <button className={`${style.button} ${taskFilter === 'inWork' ? style.buttonActive : null}`}
                onClick={() => showTaskFilter('inWork')}>в работе ({taskCount.inWork})
        </button>
        <button className={`${style.button} ${taskFilter === 'completed' ? style.buttonActive : null}`}
                onClick={() => showTaskFilter('completed')}>сделано ({taskCount.completed})
        </button>
      </div>
      {tasks.map((task) => <div className={style.taskItem} key={task.id}>{task.title}</div>)}
    </>
  )
}

export default TaskList