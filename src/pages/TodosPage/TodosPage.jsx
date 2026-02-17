import {useEffect, useState} from "react";
import todoApi from '../../api/todos.js'
import AddTask from "../../components/AddTask/AddTask.jsx";
import ButtonsFilterTask from "../../components/ButtonsFilterTask/ButtonsFilterTask.jsx";
import TaskItem from "../../components/TaskItem/TaskItem.jsx";
import style from './TodosPage.module.css'


const TodosPage = () => {
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskData, setTaskData] = useState({tasks: [], count: []});
  const [isUpdatesList, setIsUpdatesList] = useState(false);

  useEffect(() => {
    const currentTodoList = async () => {
      try {
        const result = await todoApi.getTask(taskFilter);
        setTaskData(result);
      } catch (error) {
        alert(error)
        console.error(error)
      } finally {
        setIsUpdatesList(false);
      }
    };

    void currentTodoList()
  }, [isUpdatesList, taskFilter]);

  return (
    <main className={style.main}>
      <section className={style.todo}>
        <AddTask isUpdateList={setIsUpdatesList}/>
        <ButtonsFilterTask taskFilter={taskFilter}
                           setTaskFilter={setTaskFilter}
                           count={taskData.count}/>
        <div className={style.wrapperTaskList}>
          {taskData.tasks.map((task) =>
            <TaskItem key={task.id}
                      id={task.id}
                      title={task.title}
                      isDone={task.isDone}
                      isUpdateList={setIsUpdatesList}
            />)}
        </div>
      </section>
    </main>
  )
}

export default TodosPage