import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    }
},{
    tableName: "users",
    timestamps: true
}
);

export default User;
