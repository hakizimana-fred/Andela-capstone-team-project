import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todos", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Tables created");
  })
  .catch((err) => {
    console.log("An error occurred: ", err);
  });
