import { NextApiRequest, NextApiResponse } from 'next';
import {TodoService} from "../../service/todo.service";
import {deserializer} from "../../model/todo";

export default function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const {list} = req.body;
            const todoList = deserializer(list);
            TodoService.replaceTodos(todoList);
            res.status(200).json({
                status: "ok"
            });
        } catch (e) {
            res.status(400).end(e.message);
        }

    } else {
        res.status(404).end();
    }
}
