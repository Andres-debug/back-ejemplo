import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cuenta = sequelize.define("Cuenta",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    titular:{
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: DataTypes.DECIMAL(12,2),
        defaultValue: 0,
        allowNull: false,
    }
})

export default Cuenta;