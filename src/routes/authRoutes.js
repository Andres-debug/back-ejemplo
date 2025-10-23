// Importamos Router de Express para crear rutas modulares
import {Router} from 'express';

// Importamos las funciones de autenticación del controlador
import { login,register } from '../controllers/authController.js';

// Creamos una instancia del router para agrupar rutas de autenticación
const router = Router();

// RUTA REGISTER: registrar nuevos usuarios con autenticación
// Endpoint: POST /api/auth/register
// Body esperado: { "nombre": "Juan", "correo": "juan@email.com", "password": "123456" }
// Función: crea usuario con contraseña hasheada y validaciones de seguridad
router.post("/register",register);

// RUTA LOGIN: autenticar usuarios existentes
// Endpoint: POST /api/auth/login
// Body esperado: { "correo": "juan@email.com", "password": "123456" }
// Función: valida credenciales y retorna JWT token para sesiones
router.post("/login",login);

// Exportamos el router para usarlo en app.js
export default router;