// Importamos Sequelize, el ORM para interactuar con bases de datos SQL
import { Sequelize } from "sequelize";
// Importamos dotenv para acceder a variables de entorno
import dotenv from 'dotenv';

// CONFIGURACIÓN DE VARIABLES DE ENTORNO: carga el archivo .env
dotenv.config();

// CONFIGURACIÓN DE SEQUELIZE: creamos la instancia de conexión a MySQL
const sequelize = new Sequelize(
    // PARÁMETROS DE CONEXIÓN (obtenidos del archivo .env para seguridad):
    process.env.DB_NAME,    // Nombre de la base de datos (ej: "mi_aplicacion")
    process.env.DB_USER,    // Usuario de MySQL (ej: "root")
    process.env.DB_PASS,    // Contraseña de MySQL (ej: "password123")
    {
        // CONFIGURACIONES ADICIONALES:
        host: process.env.DB_HOST,  // Servidor de BD (ej: "localhost" o IP remota)
        dialect:"mysql"             // Tipo de base de datos (mysql, postgres, sqlite, etc.)
        
        // Otras opciones disponibles:
        // port: 3306,              // Puerto de MySQL (3306 por defecto)
        // logging: false,          // Desactiva logs SQL en consola
        // pool: { max: 5 },        // Configuración de pool de conexiones
    }
)

// EXPORTACIÓN: exportamos la instancia configurada para usarla en modelos y server.js
export default sequelize;