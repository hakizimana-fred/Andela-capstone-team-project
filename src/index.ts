import express from "express";
import { config } from "dotenv";
import { dbConnection } from "./config/db";
import routes from "./routes";
import { User } from "./schemas/User.schema";
//import { todosRouter } from "./controllers/todosRouter";
//import { authRouter } from "./controllers/authMiddleware";

const app = express();

if (process.env.NODE_ENV !== "production") {
  config();
}

const PORT = 3000 || process.env.PORT;

const main = async ()  => {
try {
// middlewares
app.use(express.json())
app.use('/api/user', routes)

// app.use("/api/v1/todos", todosRouter);

// app.use("/api/auth/google", authRouter);
await dbConnection()
// sync tables


app.use((req, res) => {
  res.status(404).send({
    message: "route not found",
    status: "resource not found",
  });
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
}catch(err) {process.exit(1)}
}

main()

