
import TaskList from './TaskList'
import TaskInput from './TaskInput'
import { useState } from 'react'

export default () => {
  const [tasks, setTasks] = useState([])

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
  return (
    <>
      <TaskInput onAdd={(task) => {
        setTasks([...tasks, task])
        }} />
        <TaskList tasks={tasks} structure={ITEMS} actions={ACTIONS} />
    </>
  )
}