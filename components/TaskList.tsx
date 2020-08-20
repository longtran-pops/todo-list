import {observer} from "mobx-react";
import {Todo} from "../model/todo";
import TaskListItem from "./TaskListItem";
import {TodoService} from "../service/todo.service";

export default observer(() => {
  return (
    <>
      <ul className="task-list">
          {TodoService.todoList.map((task: Todo) => {
              return (
                  <TaskListItem key={task.id} model={task} />
              )
          })}
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
});
