import express from "express";
import crypto from "crypto";
import { ITodo } from "../types/todo";

export const todosRouter = express.Router();
const todos: ITodo[] = [
  {
    id: "1",
    text: "hello",
    completed: false,
  },
  {
    id: "2",
    text: "hi",
    completed: true,
  },
];
todosRouter
  .route("/")
  .get((req, res) => {
    res.send(todos);
  })
  .post((req, res) => {
    const { text, completed } = req.body;
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed,
    };
    todos.push(newTodo);
    res.json(todos);
  });

todosRouter
  .route("/:todoId")
  .delete((req, res) => {
    const { todoId } = req.params;
    res.json(todos.filter((todo) => todo.id !== todoId));
  })
  .get((req, res) => {
    const { todoId } = req.params;
    res.json(todos.find((todo) => todo.id !== todoId));
  })
  .put((req, res) => {
    const { todoId } = req.params;
    const { text, completed } = req.body;

    const todo: ITodo | undefined = todos.find((todo) => todo.id !== todoId);
    if (todo) {
      todo.completed = completed;
      todo.text = text;
    }
    res.json(todo);
  });
