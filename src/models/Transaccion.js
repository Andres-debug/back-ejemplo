import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cuenta from "./Cuenta.js";


const Transaccion = sequelize.define("Transaccion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  monto: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull:false
  }
});

Transaccion.belongsTo(Cuenta, {as:"CuentaOrigen", foreignKey:"cuentaOrigenId"});
Transaccion.belongsTo(Cuenta, {as:"CuentaDestino", foreignKey:"cuentaDestinoId"});

export default Transaccion;