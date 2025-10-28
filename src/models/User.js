// Importamos DataTypes para definir tipos de datos de Sequelize
import { DataTypes } from "sequelize";
// Importamos la instancia de conexión a la base de datos
import sequelize from "../config/database.js";

// Definimos el modelo User usando sequelize.define()
// Primer parámetro: nombre del modelo
// Segundo parámetro: definición de campos/columnas
const User = sequelize.define("User",{
    // Campo ID: clave primaria autoincremental
    id:{
        type: DataTypes.INTEGER,        // Tipo entero
        primaryKey: true,               // Es clave primaria
        autoIncrement:true,             // Se incrementa automáticamente
    },
    // Campo nombre: obligatorio para identificar al usuario
    nombre: {
        type: DataTypes.STRING,         // Tipo texto/varchar
        allowNull:false,                // No puede ser null (obligatorio)
    },
    // Campo correo: único para login y comunicación
    correo: {
        type: DataTypes.STRING,         // Tipo texto/varchar
        allowNull: false,               // No puede ser null (obligatorio)
        unique:true,                    // Debe ser único en la tabla
    },
    // Campo password: contraseña hasheada del usuario
    password:{
        type: DataTypes.STRING,         // Tipo texto para almacenar hash
        allowNull: true                // No puede ser null (obligatorio)
    }
},{
    // Opciones del modelo
    tableName: "users",                 // Nombre específico de la tabla en MySQL
    timestamps: true                    // Agrega createdAt y updatedAt automáticamente
}
);

// Exportamos el modelo para usarlo en otros archivos
export default User;
