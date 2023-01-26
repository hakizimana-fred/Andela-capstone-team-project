import Sequelize from "sequelize";
import { sequelize } from "../config/db";

export const User = sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleID: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
    hooks: {
        beforeCreate: (user: any, options: any) => {
            if (user.googleID) {
                user.password = 'google'
            }
        },
        beforeUpdate: (user: any, options: any) => {
            if (user.googleID) {
                user.password = 'google'
            }
        }
    }
  }
);

