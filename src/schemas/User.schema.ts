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
      allowNull: false,
    },
    googleID: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true
    },
    district: {
      type: Sequelize.STRING,
      allowNull: true
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true
    },
    cell : {
      type: Sequelize.STRING,
      allowNull: true
    }

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

