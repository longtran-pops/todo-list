import { useState } from 'react'
import {NewTodo} from "../model/todo";
import {TodoService} from "../service/todo.service";

export default () => {
  const [taskTitle, updateTaskTitle] = useState('')
  const addTask = () => {
    if (taskTitle) {
      TodoService.addTodo(new NewTodo(taskTitle));
    }
    updateTaskTitle('')
  }
  return (
    <>
      <form className="container" onSubmit={(e) => {
        e.preventDefault()
        addTask()
      }} >
        <input className="task-input" type="text" value={taskTitle} onChange={(e) => updateTaskTitle(e.currentTarget.value)} />
      </form>
      <style jsx>{`
      .container {
        display: flex;
        margin: 16px 0px;
      }
      .task-input {
        appearance: none;
        padding: 8px 4px;
        display: block;
        flex: 1;
        border: 1px solid #dedede;
        border-radius: 2px;
      }
      `}</style>
    </>
  )
}
