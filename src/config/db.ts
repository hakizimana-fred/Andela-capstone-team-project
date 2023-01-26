import {  Sequelize } from 'sequelize'

const sequelize = new Sequelize('todos', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

export const dbConnection = async () => {
    try {
    await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
}
