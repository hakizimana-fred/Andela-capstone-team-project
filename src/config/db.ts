import { Sequelize } from "sequelize";
import { config  } from 'dotenv'


config()
// DB credentials
const db_credentials = {
  dbName: process.env.DB_NAME as string,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbHost: process.env.DB_HOST as string
}


export const sequelize = new Sequelize(db_credentials.dbName, db_credentials.dbUser, db_credentials.dbPassword, {
  host: db_credentials.dbHost,
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
