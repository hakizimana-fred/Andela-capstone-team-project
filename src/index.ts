import express from "express";
import { todosRouter } from "./controllers/todosRouter";

const app = express();

const PORT = 3000 || process.env.PORT;
app.use("/api/v1/todos", todosRouter);
app.use((req, res) => {
  res.status(404).send({
    message: "route not found",
    status: "resource not found",
  });
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
