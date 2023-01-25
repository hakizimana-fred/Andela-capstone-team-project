import express from "express";

export const todosRouter = express.Router();
const todos = [
  {
    id: 1,
    text: "hello",
    completed: false,
  },
  {
    id: 1,
    text: "hi",
    completed: true,
  },
];
todosRouter.route("/").get((req, res) => {
  res.send(todos);
});

todosRouter.route("/:todoId").delete((req, res) => {
  const { todoId } = req.body;
  res.send(todos.filter((todo) => todo.id != todoId));
});
