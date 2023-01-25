import express from "express";
import { config } from "dotenv";
import { todosRouter } from "./controllers/todosRouter";
import { authRouter } from "./controllers/authMiddleware";
const app = express();

if (process.env.NODE_ENV !== "production") {
  config();
}

const PORT = 3000 || process.env.PORT;

app.use("/api/v1/todos", todosRouter);

app.use("/api/auth/google", authRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "route not found",
    status: "resource not found",
  });
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
