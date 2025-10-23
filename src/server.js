// IMPORTACIONES: módulos necesarios para iniciar el servidor
import app from "./app.js";                    // Aplicación Express configurada con rutas y middlewares
import sequelize from "./config/database.js";  // Instancia de Sequelize para conexión a MySQL
import dotenv from "dotenv";                   // Para cargar variables de entorno desde .env

// CONFIGURACIÓN DE VARIABLES DE ENTORNO: carga el archivo .env
dotenv.config();

// CONFIGURACIÓN DEL PUERTO: lee desde variable de entorno o usa 4000 por defecto
// En producción, el servidor (Heroku, Railway, etc.) asigna un puerto automáticamente
const PORT = process.env.PORT || 4000;

// FUNCIÓN PRINCIPAL: inicia el servidor con conexión a base de datos
async function startServer() {
  try {
    // PASO 1: AUTENTICACIÓN DE BD - verifica que la conexión a MySQL sea exitosa
    await sequelize.authenticate();
    console.log("Conectado a la BD");

    // PASO 2: SINCRONIZACIÓN DE MODELOS - crea/actualiza tablas según los modelos
    // alter: true modifica tablas existentes si hay cambios en los modelos
    // Opciones: force: true (elimina y recrea), sin opciones (solo crea si no existen)
    await sequelize.sync({ alter: true });
    console.log("Modelos Sincronizados");

    // PASO 3: INICIO DEL SERVIDOR - pone Express a escuchar en el puerto especificado
    app.listen(PORT, () => {
      console.log(`Servidor ejecuntando en http://localhost:${PORT}`);
    });
  } catch (error) {
    // MANEJO DE ERRORES: captura fallos de conexión BD o inicio del servidor
    console.error("Error al conectar a la BD", error);
  }
}

// EJECUCIÓN: iniciamos el servidor llamando a la función principal
startServer();
