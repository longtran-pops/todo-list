import { useState, useEffect } from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

export default ({ children, status, structure, actions}) => {
  const [taskStatus, updateTaskStatus] = useState(status)
  
  const [task, updateTask] = useState(structure[taskStatus])
  useEffect(() => {
    updateTask(structure[taskStatus])
  },[taskStatus]);

  const [buttonStatus, updateButtonStatus] = useState(
    Object.keys(actions).map(action => !task.next || task.next.indexOf(action) < 0 ? false : true)
  )
  useEffect(() => {
    updateButtonStatus(
      Object.keys(actions).map(innerAction =>  {
        return !task.next || task.next.indexOf(innerAction) < 0 ? false : true
      })
    )
  },[task])

  return (
    <>
      <li className="task-list__item">
        <Icon style={{ color: task.color, margin: 'auto 4px auto 0px' }}>{task.icon}</Icon>
        <p className="title">{children} - {taskStatus}</p>
        <div className="btn-group">
          {
            Object.keys(actions).map((key, index) => {
                let action = actions[key]
                return (
                  <Button
                    key={key}
                    type="button"
                    color={action.color || "default"}
                    disabled={!buttonStatus[index]}
                    onClick={() => {
                      updateTaskStatus(action.status)
                    }}>
                      {action.label}
                    </Button>
                )
            })
          }
        </div>
      </li>
      <style jsx>{
        `
        .innerTaskState-list__item {
          padding: 4px 8px;
          margin: 2px 0px;
          display: flex;
          background: #fff;
        }
        .title {
          flex: 1;
          margin: auto 0;
        }
        .btn-group {
          display: flex;
        }
        `
      }</style>
    </>
  )
}