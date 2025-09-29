import app from "./app.js";
import sequelize from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD");

    await sequelize.sync({ alter: true });
    console.log("Modelos Sincronizados");

    app.listen(PORT, () => {
      console.log(`Servidor ejecuntando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la BD", error);
  }
}

startServer();
