import {useEffect, useState} from "react";
import fetchGetTask from "../../api/fetchGetTask.jsx";
import ButtonsFilterTask from "../ButtonsFilterTask/ButtonsFilterTask.jsx";
import TaskItem from "../TaskItem/TaskItem.jsx";
import style from "./TodoList.module.css";

const TodoList = (props) => {
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentTodoList = async () => {
      try {
        const result = await fetchGetTask(taskFilter);
        setTaskData({tasks: result.tasks, count: result.count});
      } catch (error) {
        alert(error)
        console.error(error)
      }
    };
    currentTodoList().finally(() => setLoading(false));
  }, [props.updateTodoList, taskFilter]);

  if (loading) return <div>Загрузка данных...</div>;

  const {tasks, count} = taskData;

  return (
    <>
      <ButtonsFilterTask taskFilter={taskFilter}
              setTaskFilter={setTaskFilter}
              count={count}/>
      <div className={style.wrapperTaskList}>
        {tasks.map((task) => <TaskItem key={task.id}
                                       id={task.id}
                                       title={task.title}
                                       isDone={task.isDone}
                                       updateTodoList={props.updateTodoList}/>)}
      </div>
    </>
  )
}

export default TodoList