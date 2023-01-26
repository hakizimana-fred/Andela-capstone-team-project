import Sequelize from "sequelize"
import { sequelize } from "../config/db"

export const User = sequelize.define("user", {
    //  id: {
    //         type: Sequelize.UUID,
    //         defaultValue: Sequelize.UUIDV4,
    //         primaryKey: true,
    // },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    tableName: 'users',
  });
