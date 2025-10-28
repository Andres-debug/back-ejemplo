// Importamos Express framework para crear el servidor web
import express from "express";
// Importamos CORS para habilitar peticiones desde diferentes dominios
import cors from "cors";

// IMPORTACIÓN DE RUTAS: importamos todos los módulos de rutas de la aplicación
import userRoutes from "./routes/userRoutes.js";           // Rutas CRUD de usuarios
import commentRoutes from "./routes/commentRoutes.js";     // Rutas de comentarios
import postRoutes from "./routes/postRoutes.js";           // Rutas de posts/publicaciones
import authRoutes from './routes/authRoutes.js'            // Rutas de autenticación (login/register)
import tranferenciaRoutes from "./routes/transferenciasRoutes.js"  // Rutas de transferencias bancarias
import cuentaRoutes from "./routes/cuentaRoutes.js"        // Rutas de cuentas bancarias

// CREACIÓN DE LA APLICACIÓN: inicializamos Express
const app = express();

// MIDDLEWARE GLOBAL: habilitamos CORS para todas las rutas
// Esto permite que aplicaciones frontend desde otros dominios accedan a la API
app.use(cors());

// MIDDLEWARE GLOBAL: parser para convertir JSON del body de las peticiones
// Sin este middleware, req.body sería undefined
app.use(express.json());

// CONFIGURACIÓN DE RUTAS: asociamos cada grupo de rutas con su prefijo URL
// Todas las rutas de userRoutes.js se acceden con /api/user/*
app.use("/api/user", userRoutes);       // GET/POST/PUT/DELETE /api/user
app.use("/api/post", postRoutes);       // Rutas para manejo de posts
app.use("/api/comment", commentRoutes); // Rutas para manejo de comentarios
app.use("/api/auth", authRoutes);       // POST /api/auth/login y /api/auth/register
app.use("/api/transferencia",tranferenciaRoutes)  // Rutas para transferencias
app.use("/api/cuenta", cuentaRoutes)    // Rutas para manejo de cuentas

// EXPORTACIÓN: exportamos la app configurada para usarla en server.js
export default app;
