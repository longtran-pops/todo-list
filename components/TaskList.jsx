import TaskListItem from "./TaskListItem"
export default ({ tasks, structure, actions }) => {
  return (
    <>
      <ul className="task-list">
        {tasks?.length > 0 ?
            tasks.map((task) => {
              return (
                <TaskListItem task={task} key={task.id} status={task.status}
                  structure={structure} actions={actions}
                >{task.title}</TaskListItem>
              )
            }) :
            <div style={{textAlign: "center"}}>No item</div>
        }
      </ul>
      <style jsx>{
        `.task-list {
          border: 0;
          padding: 5px;
          margin: 0;
          border-radius: 2px;
          background: #f0f0f0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
        }`
      }</style>
    </>
  )
}