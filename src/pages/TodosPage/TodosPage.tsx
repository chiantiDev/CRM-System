import {useEffect, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import AddTask from "../../components/AddTask/AddTask.tsx";
import ButtonsFilterTask from "../../components/ButtonsFilterTask/ButtonsFilterTask.tsx";
import TaskItem from "../../components/TaskItem/TaskItem.tsx";
import {TaskStatus, TaskResponse } from "../../types/todo.ts"
import style from './TodosPage.module.css'

const TodosPage = () => {
  const [taskFilter, setTaskFilter] = useState<TaskStatus>('all');
  const [taskData, setTaskData] = useState<TaskResponse>({
    tasks: [],
    counts: {
      all: 0,
      inWork: 0,
      completed: 0,
    }});
  const [shouldUpdateList, setShouldUpdateList] = useState<boolean>(false);

  useEffect(() => {
    const currentTodoList = async () => {
      try {
        const result: TaskResponse = await todoApi.getTask(taskFilter);
        setTaskData(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
        alert(errorMessage)
        console.error(errorMessage)
      } finally {
        setShouldUpdateList(false);
      }
    };

    void currentTodoList()
  }, [shouldUpdateList, taskFilter]);

  return (
    <main className={style.main}>
      <section className={style.todo}>
        <AddTask updateList={setShouldUpdateList}/>
        <ButtonsFilterTask taskFilter={taskFilter}
                           setTaskFilter={setTaskFilter}
                           counts={taskData.counts}/>
        <div className={style.wrapperTaskList}>
          {taskData.tasks.map((task) =>
            <TaskItem key={task.id}
                      id={task.id}
                      titleTask={task.title}
                      isDone={task.isDone}
                      updateList={setShouldUpdateList}
            />)}
        </div>
      </section>
    </main>
  )
}

export default TodosPage