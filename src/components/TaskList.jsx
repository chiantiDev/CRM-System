import {useState, useEffect} from "react";
import style from "./TaskList.module.css"
import TaskItem from "./TaskItem.jsx";

const TaskList = (props) => {
  const [tasks, setTasks] = useState([])
  const [taskFilter, setTaskFilter] = useState('all')
  const [taskCount, setTaskCount] = useState([])

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
      <div className={style.wrapperButtons}>
        <button className={`${style.button} ${taskFilter === 'all' ? style.buttonActive : null}`}
                onClick={() => setTaskFilter('all')}>Все ({taskCount.all})
        </button>
        <button className={`${style.button} ${taskFilter === 'inWork' ? style.buttonActive : null}`}
                onClick={() => setTaskFilter('inWork')}>в работе ({taskCount.inWork})
        </button>
        <button className={`${style.button} ${taskFilter === 'completed' ? style.buttonActive : null}`}
                onClick={() => setTaskFilter('completed')}>сделано ({taskCount.completed})
        </button>
      </div>
      <div className={style.wrapperTaskList}>
        {tasks.map((task) => <TaskItem key={task.id} id={task.id} title={task.title} isDone={task.isDone}
                                       updateTaskList={props.updateTaskList}/>)}
      </div>
    </>
  )
}

export default TaskList