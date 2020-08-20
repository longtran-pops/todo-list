import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import {CancelledTodo, CompletedTodo, InprogressTodo, NewTodo, Todo, TODO_STATE} from "../model/todo";
import {TodoService} from "../service/todo.service";
import {observer} from "mobx-react";

const icons: {
  [k in TODO_STATE]: string
} = {
  'todo': 'assignment',
  'in-progress': 'autorenew',
  'done': 'assignment_turned_in',
  'deleted': 'delete',
  'canceled': 'cancel'
}
const colors: {
  [k in TODO_STATE]: string
} = {
  'todo': 'grey',
  'in-progress': 'blue',
  'done': 'green',
  'deleted': 'red',
  'canceled': 'black'
}

export default observer((props: {model: Todo}) => {
  const {model} = props;
  return (
    <>
      <li className="task-list__item">
        <Icon style={{ color: colors[model.status], margin: 'auto 4px auto 0px' }}>{icons[model.status]}</Icon>
        <p className="title">{model.title}</p>
        <div className="btn-group">
          {model instanceof NewTodo && <Button type="button" color="primary" onClick={() => TodoService.startTodo(model)}>Start</Button>}
          {model instanceof InprogressTodo && <Button
              onClick={() => TodoService.doneTodo(model)}
              type="button" color="secondary">Done</Button>}
          {model instanceof InprogressTodo && <Button
              onClick={() => TodoService.cancelTodo(model)}
              type="button">Cancel</Button>}
          {(model instanceof NewTodo || model instanceof CancelledTodo || model instanceof CompletedTodo)
          && <Button
              onClick={() => TodoService.deleteTodo(model)}
              type="button">Delete</Button>}
        </div>
      </li>
      <style jsx>{
        `
        .task-list__item {
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
});
