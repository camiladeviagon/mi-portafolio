// src/models/mensaje.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Mensaje = sequelize.define(
  "Mensaje",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "mensajes",
    timestamps: true,
  }
);
