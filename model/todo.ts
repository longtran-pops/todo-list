export enum TODO_STATE {
    NEW = "todo",
    INPROGRESS = "in-progress",
    CANCELLED = "canceled",
    DONE = "done",
    DELETED = "deleted",
}

export abstract class Todo {
    public id: number;
    public title: string = "";
    public abstract status: TODO_STATE;
}

export class NewTodo extends Todo {
    public readonly status: TODO_STATE.NEW = TODO_STATE.NEW;
    constructor(
        public title: string,
        public id: number = Date.now(),
    ) {
        super();
        Object.freeze(this);
    }
    public delete() {
        return new DeletedTodo(this);
    }

    public start(): InprogressTodo {
        return new InprogressTodo(this);
    }
}

export class CancelledTodo extends Todo {

    public readonly status: TODO_STATE.CANCELLED = TODO_STATE.CANCELLED;

    public constructor(t: InprogressTodo) {
        super();
        const {status, ...data} = t;
        Object.assign(this, data);
    }

    public delete() {
        return new DeletedTodo(this);
    }
}

export class InprogressTodo extends Todo {

    public readonly status: TODO_STATE.INPROGRESS = TODO_STATE.INPROGRESS;

    public constructor(t: NewTodo) {
        super();
        const {status, ...data} = t;
        Object.assign(this, data);
    }

    public cancel(): CancelledTodo {
        return new CancelledTodo(this);
    }

    public done(): CompletedTodo {
        return new CompletedTodo(this);
    }
}

export class CompletedTodo extends Todo {
    public readonly status: TODO_STATE.DONE = TODO_STATE.DONE;

    public constructor(t: InprogressTodo) {
        super();
        const {status, ...data} = t;
        Object.assign(this, data);
    }
    public delete() {
        return new DeletedTodo(this);
    }
}

export class DeletedTodo extends Todo {
    public readonly status: TODO_STATE.DELETED = TODO_STATE.DELETED;

    public constructor(t: NewTodo | CancelledTodo | CompletedTodo) {
        super();
        const {status, ...data} = t;
        Object.assign(this, data);
    }
}

const todoMap: {
    [K in TODO_STATE]: (t: Todo) => Todo
} = {
    [TODO_STATE.NEW]: (t: Todo): NewTodo => {
        return new NewTodo(t.title, t.id);
    },
    [TODO_STATE.INPROGRESS]: (t: NewTodo) => new InprogressTodo(t),
    [TODO_STATE.DONE]: (t: InprogressTodo) => new CompletedTodo(t),
    [TODO_STATE.CANCELLED]: (t: InprogressTodo) => new CancelledTodo(t),
    [TODO_STATE.DELETED]: (t: NewTodo | CancelledTodo | CompletedTodo) => new DeletedTodo(t),
}

// Naively serialize & deserialize data to and from JSON format
export function deserializer(data: unknown[]): Todo[] {
    return data.map((d: Todo) => {
        return todoMap[d.status](d);
    });
}

export function serializer(data: Todo[]): string {
    return JSON.stringify(data);
}
