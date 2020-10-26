
import TaskList from './TaskList'
import TaskInput from './TaskInput'
import { useState } from 'react'
import {getAllTasks, updateOrCreateTask} from "../plugins/tasks"

function fetchTasks(tasks, setTasks) {
  getAllTasks().then(res => {
    if (Object.keys(res).length !== tasks.length) {
      setTasks(Object.keys(res).map((key) => {
        let eachTask = res[key]
        eachTask.docID = key
        return eachTask
      }))
    }
  })
}
export default () => {
  const [tasks, setTasks] = useState([])

  React.useEffect(()=> {
    fetchTasks(tasks, setTasks)
  },tasks)
  
  //defined button props and actions
  const ACTIONS = {
    "start": {
      color: "primary",
      status: "in-progress",
      label: "start",
    },
    "done": {
      label: "done",
      color: "secondary",
      status: "done",
    },
    "cancel": {
      status: "canceled",
      label: "cancel",
    },
    "delete": {
      label: "delete",
      status: "deleted",
    }
  }
  //defined status props and next actions
  const ITEMS =
    {
      "todo": {
        icon: "assignment",
        color: "grey",
        next: ['start', 'delete']
      },
      "in-progress": {
        icon: "autorenew",
        color: "blue",
        next: ['done', 'cancel']
      },
      "done": {
        icon: "assignment_turned_in",
        color: "green",
        next: ['delete']
      },
      "canceled": {
        icon: "cancel",
        color: "red",
        next: ['delete']
      },
      "deleted": {
        icon: "delete",
        color: "red",
      },
  }

  const handleSubmit = (task) => {
    updateOrCreateTask({params:{id: task.docID},body:task}).then(res =>{
      if (!res?.json?.error) {
        fetchTasks(tasks, setTasks)
      }
    })
  }
  return (
    <>
      <TaskInput onAdd={(task) => {handleSubmit(task)}} />
        <TaskList onAdd={(task) => {handleSubmit(task)}} tasks={tasks} structure={ITEMS} actions={ACTIONS} />
    </>
  )
}