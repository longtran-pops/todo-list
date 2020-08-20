import {action, computed, observable, observe} from "mobx";
import {
    CancelledTodo,
    CompletedTodo,
    DeletedTodo,
    deserializer,
    InprogressTodo,
    NewTodo,
    serializer,
    Todo
} from "../model/todo";

// Use a simple singleton for example (in reality we would have a dependency injection system in place)

enum TODO_STORE_KEY {
    LIST = "todoList",
}

class TodoServiceClass {

    @observable
    private todoListMutable: Todo[] = [];

    @computed
    public get todoList() {
        return this.todoListMutable.slice(0, this.todoListMutable.length);
    }

    public get todoListServer() {
        return this.todoListMutable.slice(0, this.todoListMutable.length);
    }

    public cancelTodo(todo: InprogressTodo) {
        this.updateTodoList(todo, todo.cancel());
    }

    public startTodo(todo: NewTodo) {
        this.updateTodoList(todo, todo.start());
    }

    public deleteTodo(todo: NewTodo | CancelledTodo | CompletedTodo) {
        this.updateTodoList(todo, todo.delete());
    }

    public doneTodo(todo: InprogressTodo) {
        this.updateTodoList(todo, todo.done());
    }

    @action.bound
    private updateTodoList(old: Todo, updated: Todo) {
        const index = this.todoListMutable.indexOf(old);
        if (index === -1) {
            throw new Error("Invalid update");
        }
        if (updated instanceof DeletedTodo) {
            this.todoListMutable.splice(index, 1);
        } else {
            this.todoListMutable[index] = updated;
        }
        this.saveTodoList();
    }

    @action.bound
    public replaceTodos(t: Todo[]) {
        this.todoListMutable.splice(0, this.todoListMutable.length, ...t);
    }

    @action.bound
    public addTodo(todo: NewTodo) {
        this.todoListMutable.push(todo);
        this.saveTodoList();
    }

    public saveTodoList() {
        if (window && window.localStorage) {
            window.localStorage.setItem(TODO_STORE_KEY.LIST, serializer(this.todoListMutable));
        }
    }

    public async loadTodoList() {
        if (window && window.localStorage) {
            const raw = JSON.parse(window.localStorage.getItem(TODO_STORE_KEY.LIST));
            if (Array.isArray(raw)) {
                this.todoListMutable.push(...deserializer(
                    raw,
                ));
            }
        }
    }

    public saveToServer = async () => {
        await fetch(`/api/todo-save`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                list: this.todoList,
            }),
        });
    }

    public loadFromServer = async () => {
        const listFromServer = await fetch(`/api/todo-list`);
        if (listFromServer.status === 200) {
            const { list } = await listFromServer.json();
            this.todoListMutable.splice(0, this.todoListMutable.length, ...deserializer(
                list
            ));
            this.saveTodoList();
        }
    }
}

export const TodoService = new TodoServiceClass();

if (typeof window !== "undefined") {
    TodoService.loadTodoList();
}
