import { NextApiRequest, NextApiResponse } from 'next';
import {TodoService} from "../../service/todo.service";

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({
        list: TodoService.todoListServer,
    });
}
